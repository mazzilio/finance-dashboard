export interface GetTransactionsResponse {
	id: string;
	_id: string;
	__v: number;
	amount: number;
	buyer: string;
	productIds: Array<string>;
}
