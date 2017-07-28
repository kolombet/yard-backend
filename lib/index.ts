/**
 * Koa 2 TypeScript Boilerplate
 *
 * 2016 Ændrew Rininsland
 */

// Save your local vars in .env for testing. DO NOT VERSION CONTROL `.env`!.
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') require('dotenv').config();

import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as chalk from 'chalk';
import * as cors from 'kcors';

import routes from './routes';
import apiv1 from './apiv1';

const app = new Koa();
const port = process.env.PORT || 5555;

app.use(cors());
app.use(bodyParser());
app.use(routes.routes());
app.use(routes.allowedMethods());
app.use(apiv1.routes());
app.use(apiv1.allowedMethods());

app.listen(port, () => console.log(chalk.black.bgGreen.bold(`Listening on port ${port}`)));

export default app;
