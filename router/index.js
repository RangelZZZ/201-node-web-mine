import items from './routers/items';

export default function(app) {
    app.use('/items', items);
}