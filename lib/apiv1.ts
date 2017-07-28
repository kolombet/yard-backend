import * as Router from 'koa-router';
import { complexes, complexById, index } from './metods';

const apiv1 = new Router();
apiv1.get('/v1/complexes', complexes);
apiv1.get('/v1/complexes/:complexId', complexById);

export default apiv1;
