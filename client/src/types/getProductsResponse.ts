export interface GetProductsResponse {
    id: string;
    _id: string;
    __v: number;
    price: number;
    expense: number;
    transactions: Array<string>;
    createdAt: string;
    updatedAt: string;
}
