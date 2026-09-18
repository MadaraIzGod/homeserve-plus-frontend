export interface productPayload {
  products: Product[];
}
export interface Product {
  _id?: string | null;
  name: string | null;
  category: string | null;
  description: string | null;
  price: string | null;
  image: string;
}
