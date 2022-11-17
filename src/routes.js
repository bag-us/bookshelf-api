const {addBook, getAllBooks, getBookById, editBooks,
  deleteBook} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookById,
  },
  // {
  //   method: 'GET',
  //   path: '/books{name}',
  //   handler: getBookByName,
  // },
  // {
  //   method: 'GET',
  //   path: '/books/?reading',
  //   handler: getBookById,
  // },
  // {
  //   method: 'GET',
  //   path: '/books/?finished',
  //   handler: getBookById,
  // },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBooks,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBook,
  },
];

module.exports = routes;

