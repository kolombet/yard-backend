/**
 * Koa 2 routes
 */

import * as Router from 'koa-router';
import { Request } from 'koa';
import * as loadJsonFile from 'load-json-file';

const router = new Router();

type Complex = {
  id: number;
  slug: string;
  state: string;
};

const toInteger = (value: string): number => {
  return Math.floor(Number(value));
};

const isInteger = (value: string): boolean => {
  const n = toInteger(value);
  return String(n) === value && n >= 0;
};

router.get('/', async (ctx, next) => {
  ctx.body = `<a href="//github.com/kolombet/yard-backend">API FAQ</a>`;
});

/** 
 * All complexes list
 * You can filter with query string /complexes?filter%5Bstate%5D=public */
router.get('/complexes', async (ctx, next) => {
  await next();

  const json = await loadJsonFile('lib/data.json');
  //filter hardcoded - support filtration only by field `state`
  const filter = ctx.query['filter[state]'];
  if (filter) {
    const filtered = json.items.filter((item: Complex) => item.state == 'public');
    ctx.body = { items: filtered };
  } else {
    ctx.body = json;
  }
});

/**
 * Get complex by id/slug
 */
router.get('/complexes/:complexId', async (ctx, next) => {
  await next();

  const complexId: string = ctx.params.complexId;
  const json = await loadJsonFile('lib/data.json');

  const complexes: Array<Complex> = json.items;
  if (isInteger(complexId)) {
    const id = toInteger(complexId);
    ctx.body = complexes.filter((item: Complex) => item.id == id)[0];
  } else {
    ctx.body = complexes.filter((item: Complex) => item.slug == complexId)[0];
  }
});

export default router;
