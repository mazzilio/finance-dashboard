import mongoose from 'mongoose';
import { loadType } from 'mongoose-currency';

// ODM - Object Document Mapping for NoSQL DBs
// This will set up a model to call the DB & get data
const Schema = mongoose.Schema;

// Allowing to type for currencies and 2 decimal points
loadType(mongoose);

// Daily Data Schema
const daySchema = new Schema(
	{
		date: String,
		revenue: {
			type: mongoose.Types.Currency,
			currency: 'GBP',
			get: (v) => v / 100,
		},
		expenses: {
			type: mongoose.Types.Currency,
			currency: 'GBP',
			get: (v) => v / 100,
		},
	},
	{ toJSON: { getters: true } }
);

// Monthly Data Schema
const monthSchema = new Schema(
	{
		month: String,
		revenue: {
			type: mongoose.Types.Currency,
			currency: 'GBP',
			get: (v) => v / 100,
		},
		expenses: {
			type: mongoose.Types.Currency,
			currency: 'GBP',
			get: (v) => v / 100,
		},
		operationalExpenses: {
			type: mongoose.Types.Currency,
			currency: 'GBP',
			get: (v) => v / 100,
		},
		nonOperationalExpenses: {
			type: mongoose.Types.Currency,
			currency: 'GBP',
			get: (v) => v / 100,
		},
	},
	{ toJSON: { getters: true } }
);

const KPISchema = new Schema(
	{
		totalProfit: {
			type: mongoose.Types.Currency,
			currency: 'GBP',
			// Grab real value from MongoDB as currency is * 100
			// https://github.com/paulcsmith/mongoose-currency
			get: (v) => v / 100,
		},
		totalRevenue: {
			type: mongoose.Types.Currency,
			currency: 'GBP',
			get: (v) => v / 100,
		},
		totalExpenses: {
			type: mongoose.Types.Currency,
			currency: 'GBP',
			get: (v) => v / 100,
		},
		expensesByCategory: {
			type: Map,
			of: {
				type: mongoose.Types.Currency,
				currency: 'GBP',
				get: (v) => v / 100,
			},
		},
		monthlyData: [monthSchema],
		dailyData: [daySchema],
	},
	{ timeStamps: true, toJSON: { getters: true } }
);

const KPI = mongoose.model('KPI', KPISchema);

export default KPI;
