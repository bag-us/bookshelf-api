/* eslint-disable brace-style */
/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */
const {nanoid} = require('nanoid');
const books = require('./books');

/** Menambahkan buku */
const addBook = (request, h) => {
  const id = nanoid(16);
  const {name, year, author, summary, publisher,
    pageCount, readPage, reading} = request.payload;
  const finished = (pageCount === readPage ? true : false);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  /** Cek apakah mengisi properti nama */
  const hasName = name === undefined;
  if (hasName) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  /** Cek apakah mengisi readPage lebih besar dari pageCount */
  const cekPageCount = readPage > pageCount;
  if (cekPageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const newBooks = {
    id, name, year, author, summary, publisher,
    pageCount, readPage, finished, reading, insertedAt,
    updatedAt,
  };

  books.push(newBooks);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

/** Melihat semua buku */
const getAllBooks = (request, h) =>{
  const name = (request.query.name);
  const reading = request.query.reading;
  const finished = request.query.finished;

  if (name !== undefined) {
    const book = books.filter((n) => n.name === name.toLowerCase())[0];
    if (book !== undefined) {
      return {
        status: 'success',
        data: {
          books: books.map((b) => ({
            id: b.id,
            name: b.name,
            publisher: b.publisher,
          })),
        },
      };
    }
  }
  if (reading !== undefined) {
    const book = books.filter((n) => n.reading === (reading === '1' || reading === 'true'))[0];
    if (book !== undefined) {
      return {
        status: 'success',
        data: {
          books: books.map((b) => ({
            id: b.id,
            name: b.name,
            publisher: b.publisher,
          })),
        },
      };
    }
  }
  if (finished !== undefined) {
    const book = books.filter((n) => n.finished === (finished === '1' || finished === 'true'))[0];
    if (book !== undefined) {
      return {
        status: 'success',
        data: {
          books: books.map((b) => ({
            id: b.id,
            name: b.name,
            publisher: b.publisher,
          })),
        },
      };
    }
  }

  const response = h.response({
    status: 'success',
    data: {
      books: books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

/** Melihat buku by id */
const getBookById = (request, h) => {
  const {bookId} = request.params;
  const book = books.filter((n) => n.id === bookId)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

/** Mengedit buku */
const editBooks = (request, h) => {
  const {bookId} = request.params;
  const {name, year, author, summary, publisher,
    pageCount, readPage, reading} = request.payload;
  const finished = (pageCount === readPage ? true : false);
  const updatedAt = new Date().toISOString();

  /** Cek apakah mengisi properti nama */
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
    return response;
  }
  /** Cek apakah mengisi readPage lebih besar dari pageCount */
  else if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name, year, author,
      summary, publisher, pageCount,
      readPage, reading, finished, updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

/** Menghapus buku */
const deleteBook = (request, h) => {
  const {bookId} = request.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {addBook, getAllBooks, getBookById, editBooks,
  deleteBook};
