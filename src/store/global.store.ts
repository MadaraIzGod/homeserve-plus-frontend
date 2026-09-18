import { create } from "zustand";
import { Product } from "@/types/interfaces/product.interface";

export interface GlobalState {
  isOpen: boolean;
  isEdit: boolean;
  selectedProduct: Product | null;
  openProductModal: () => void;
  closeProductModal: () => void;
  toggleProductBtn: () => void;
  openEditModal: (data: Product) => void;
  setProduct: (data: Product | null) => void;
}

export const useProductStore = create<GlobalState>((set) => ({
  isOpen: false,
  isEdit: false,
  selectedProduct: null,

  openProductModal: () =>
    set({
      isOpen: true,
      isEdit: false,
      selectedProduct: null,
    }),

  closeProductModal: () =>
    set({
      isOpen: false,
      isEdit: false,
      selectedProduct: null,
    }),

  toggleProductBtn: () =>
    set((state) => ({
      isOpen: !state.isOpen,
      // Reset edit state if closing via toggle
      isEdit: state.isOpen ? false : state.isEdit,
      selectedProduct: state.isOpen ? null : state.selectedProduct,
    })),

  openEditModal: (data: Product) =>
    set({
      isOpen: true,
      isEdit: true,
      selectedProduct: data,
    }),

  setProduct: (data: Product | null) =>
    set({
      selectedProduct: data,
    }),
}));
