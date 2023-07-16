import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

// Endpoints
import kpiRoutes from './routes/kpi.js';

// DB Info
import KPI from './models/KPI.js';
import { kpis } from './data/data.js';

// EXPRESS CONFIGS
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// DEFINE ROUTES
app.use('/kpi', kpiRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT || 9000;
mongoose
	.connect(process.env.MONGO_DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(async () => {
		app.listen(PORT, () =>
			console.log(`Listening on Server Port: ${PORT}`)
		);
		// Add date as needed - adds new data and drops db for dev purposes
		// await mongoose.connection.db.dropDatabase();
		// KPI.insertMany(kpis);
	})
	.catch((error) => console.log(`${error}: did not connect.`));
