using my.bookshop as my from '../db/data-model';
using view.order as order from '../db/order';

service CatalogService {
    @readonly entity Books as projection on my.Books;
    @readonly entity OrderHeader as projection on order.Header;
}