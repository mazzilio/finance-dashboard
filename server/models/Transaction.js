import mongoose from 'mongoose';
import { loadType } from 'mongoose-currency';

const Schema = mongoose.Schema;
loadType(mongoose);

const TransactionSchema = new Schema(
	{
		buyer: {
			type: String,
			required: true,
		},
		amount: {
			type: mongoose.Types.Currency,
			currency: 'GBP',
			get: (v) => v / 100,
		},
		// Creating relationship between product and transaction :)
		productIds: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product',
			},
		],
	},
	{ timeStamps: true, toJSON: { getters: true } }
);

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
