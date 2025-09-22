export interface IProduct {
  id: string;
  name: string;
  image: string;
  color: string;
}

export interface IProductAdditionalTextResponse {
  id: string;
  text: string;
}

export interface IProductsResponse {
  title: string;
  items: IProduct[];
}
