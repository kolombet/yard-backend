import * as Router from 'koa-router';
import { complexes, complexById, index } from './metods';

const routes = new Router();
routes.get('/', index);
routes.get('/complexes', complexes);
routes.get('/complexes/:complexId', complexById);

export default routes;
