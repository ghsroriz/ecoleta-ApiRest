import express, { request, response } from 'express';
import routes from './routes';
import path from 'path';
import cors from 'cors';

/**
 * This is the main file of the app. Here we got all uses:
 * routes
 * json's uses by express
 * "upload" folder use.
 *
 * default port to connect to the API:  3333 (Local Host).
 *
 * Becaus of it's a local host app, nothing added to CORS.
 */


const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname,'..','uploads')));

app.listen(3333);