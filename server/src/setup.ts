import useragent from 'express-useragent';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import nodemailer from 'nodemailer';
import {v2 as cloudinary} from 'cloudinary';
          
require('dotenv').config();

cloudinary.config({ 
	cloud_name: process.env.CLOUD_NAME, 
	api_key: process.env.CLOUD_API_KEY, 
	api_secret: process.env.CLOUD_API_SECRET 
  });

const corsOptions: cors.CorsOptions = {
	origin: [
		'http://localhost:3000',
		'http://localhost:3001',
		'https://the-comfy-villas.vercel.app'
	],
	credentials: true,
	optionsSuccessStatus: 200,
};

const app: Express = express();

// parse application/x-www-form-urlencoded
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(useragent.express());

export default app;
