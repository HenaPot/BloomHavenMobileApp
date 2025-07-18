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

export type OrderType = {
  order_id: number;
  order_date: string;
  product_names: string;
  quantities: string;
  total_price: number;
  status_name: string;
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

export type WishlistItem = {
  product_id: number;
  name: string;
  price: number;
  cart_quantity: number;
  images: { id: number; product_id: number; image: string }[];
};
