import { Product } from "./product";

export class Order {
    id: number;
    displayname: string;
    status: string;
    date: string;
    total: number;
    phone?: string;
    city?: string;
    postcode?: string;
    address1?: string;
    address2?: string;
    products?: number[];
    quantity?: number[];
    productInfo?: Array<Product>;
}