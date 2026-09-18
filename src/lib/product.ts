import API from "@/api/api";
import { Product, productPayload } from "@/types/interfaces/product.interface";

export const getProduct = async () => {
  const res = await API.get(`/admin/products`);
  console.log("getProduct:", res.data);
  return res.data.data;
};

export const postProduct = async (data: Product) => {
  const res = await API.post(`/admin/products/`, data);
  console.log("postData:", res.data);
  return res.data;
};
