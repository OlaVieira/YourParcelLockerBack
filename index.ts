import express, {json} from "express";
import cors from 'cors';
import 'express-async-errors';
import rateLimit from "express-rate-limit";
import {handleErrors, ValErr} from "./utils/errors";
import {packageRouter} from "./routers/package.router";
import './utils/db';

const app = express();

app.use(cors(
    {
        origin: 'http://localhost:3000',
    }
));

app.use(json());
// Content-type: application/json

app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,

}))

//routers
app.use('/packages', packageRouter);



app.get('/', async (req, res) => {
    throw new ValErr('O nieeeee!');
});

app.use(handleErrors);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port: http://localhost:3001');
});
