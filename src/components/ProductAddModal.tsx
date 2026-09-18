import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useProductStore } from "@/store/global.store";
import { Product } from "@/types/interfaces/product.interface";
import { productFormSchema } from "@/services/validations/productSchema";
import { usePostProduct } from "@/hooks/post-product";
import { useUpdateProduct } from "@/hooks/update-product";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle } from "lucide-react";

const ProductAddModal = () => {
  const close = useProductStore((state) => state.closeProductModal);
  const isOpen = useProductStore((state) => state.isOpen);
  const isEdit = useProductStore((state) => state.isEdit);
  const selectedProduct = useProductStore((state) => state.selectedProduct);

  const {
    mutate: addMutate,
    error: apiError,
    isError,
    isPending: isAddPending,
    reset: resetAddMutation,
  } = usePostProduct();

  const {
    mutate: updateMutate,
    error: updateError,
    isError: updateIsError,
    isPending: updateIsPending,
    reset: resetUpdateMutation,
  } = useUpdateProduct();

  const isPending = isAddPending || updateIsPending;
  const activeError = (apiError || updateError) as any;
  const hasError = isError || updateIsError;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      resetAddMutation?.();
      resetUpdateMutation?.();

      if (isEdit && selectedProduct) {
        reset({
          name: selectedProduct.name || "",
          description: selectedProduct.description || "",
          // Ensure price loads into input as a string
          price: selectedProduct.price != null ? String(selectedProduct.price) : "",
          category: selectedProduct.category || "",
          image: selectedProduct.image || "",
        });
      } else {
        reset({
          name: "",
          description: "",
          price: "",
          category: "",
          image: "",
        });
      }
    }
  }, [isOpen, isEdit, selectedProduct, reset, resetAddMutation, resetUpdateMutation]);

  const handleModalClose = (open: boolean) => {
    if (!open) {
      reset();
      resetAddMutation?.();
      resetUpdateMutation?.();
      close();
    }
  };

  const onSubmit = (data: any) => {
    // Keep price as a pure string
    const payload: any = {
      name: data.name,
      description: data.description,
      category: data.category,
      price: String(data.price),
      image: data.image || selectedProduct?.image || "",
    };

    if (isEdit && selectedProduct?._id) {
      updateMutate(
        { id: selectedProduct._id, data: payload }, 
        {
          onSuccess: () => handleModalClose(false),
          onError: (err: any) => console.error("Update failed:", err?.response?.data || err),
        }
      );
    } else {
      addMutate(payload, {
        onSuccess: () => handleModalClose(false),
        onError: (err: any) => console.error("Add failed:", err?.response?.data || err),
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Product" : "Add New Product"}</DialogTitle>
        </DialogHeader>

        {hasError && (
          <div className="flex items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-xs text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>
              {activeError?.response?.data?.message ||
                activeError?.message ||
                "An unexpected error occurred."}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          {/* Name */}
          <div className="space-y-1">
            <label className="text-xs font-medium">Name *</label>
            <Input
              placeholder="Enter product name"
              aria-invalid={!!errors.name}
              className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message as string}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-medium">Description *</label>
            <Textarea
              placeholder="Enter product description"
              aria-invalid={!!errors.description}
              className={`resize-none ${
                errors.description ? "border-destructive focus-visible:ring-destructive" : ""
              }`}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description.message as string}</p>
            )}
          </div>

          {/* Price (String only) */}
          <div className="space-y-1">
            <label className="text-xs font-medium">Price *</label>
            <Input
              type="text"
              placeholder="0.00"
              aria-invalid={!!errors.price}
              className={errors.price ? "border-destructive focus-visible:ring-destructive" : ""}
              {...register("price")}
            />
            {errors.price && (
              <p className="text-xs text-destructive">{errors.price.message as string}</p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-1">
            <label className="text-xs font-medium">Category *</label>
            <Input
              placeholder="Enter product category"
              aria-invalid={!!errors.category}
              className={errors.category ? "border-destructive focus-visible:ring-destructive" : ""}
              {...register("category")}
            />
            {errors.category && (
              <p className="text-xs text-destructive">{errors.category.message as string}</p>
            )}
          </div>

          {/* Image Input */}
          <div className="space-y-1">
            <label className="text-xs font-medium">Image {isEdit ? "(Optional)" : "*"}</label>
            <Input
              type="file"
              accept="image/*"
              className={errors.image ? "border-destructive focus-visible:ring-destructive" : ""}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setValue("image", file, { shouldValidate: true });
                }
              }}
            />
            {errors.image && (
              <p className="text-xs text-destructive">{errors.image.message as string}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleModalClose(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? isEdit
                  ? "Updating..."
                  : "Adding..."
                : isEdit
                ? "Update Product"
                : "Add Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductAddModal;