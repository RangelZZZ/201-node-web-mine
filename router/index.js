import items from './routers/items';
import categories from './routers/categories';

export default function (app) {
  app.use('/items', items);
  app.use('/categories', categories);

}