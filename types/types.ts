export type ProductImage = {
  id: number;
  product_id: number;
  image: string;
};

export type Product = {
  id: number;
  name: string;
  category_name: string;
  quantity: number;
  price_each: number;
  description: string;
  images: ProductImage[];
};

export type CartProductImage = {
  id: number;
  product_id: number;
  image: string;
};

export type CartItem = {
  product_id: number;
  name: string;
  category_id: number;
  price: number;
  description: string;
  cart_quantity: number;
  images: CartProductImage[];
};