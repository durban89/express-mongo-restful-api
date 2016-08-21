'use strict';
process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Book = require('../models/books');

//require test dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Books', () => {
  //before each test we empty the database
  beforeEach((done) => {
    Book.remove({}, (err) => {
      done();
    })
  });

  //test /GET route
  describe('/GET book', () => {
    it('it should GET all the books', () => {
      chai.request(server)
        .get('/books')
        .end((err, books) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
        })
    })
  });

  /**
   * test /GET/:id route
   */
  describe('/GET/:id book', () => {
    it('it should GET a book by the given id ', (done) => {
      let book = new Book({
        title: "第二本测试的书",
        author: "dapeng",
        year: 1956,
        pages: 300
      });

      book.save((err, res) => {
        chai.request(server)
          .get('/books/' + book.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title');
            res.body.should.have.property('author');
            res.body.should.have.property('pages');
            res.body.should.have.property('year');
            res.body.should.have.property('_id').eql(book.id);
            done();
          })
      })
    });
  })

  /**
   * test /POST route
   */
  describe('/POST book', () => {
    it('it should not POST a book without pages field', done => {
      let book = {
        title: "一本测试的书",
        author: "dapeng",
        year: 1956
      };

      chai.request(server)
        .post('/books')
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('pages');
          res.body.errors.pages.should.have.property('kind').eql('required');
          done();

        })
    });

    it('it should POST a book', done => {
      let book = {
        title: "一本测试的书",
        author: "dapeng",
        year: 1956,
        pages: 300
      };

      chai.request(server)
        .post('/books')
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Book Successfully added!');
          res.body.book.should.have.property('title');
          res.body.book.should.have.property('author');
          res.body.book.should.have.property('year');
          res.body.book.should.have.property('pages');
          done();
        })
    })
  });

  // test put book success
  describe('/PUT/:id book ', () => {
    it('it should UPDATE a book by given the id', done => {
      let book = new Book({
        title: "第三本测试的书",
        author: "dapeng",
        year: 1957,
        pages: 3010
      });

      book.save((err, res) => {
        chai.request(server)
          .put('/books/' + book.id)
          .send({ pages: 3070 })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Book Successfully updated!');
            res.body.book.should.have.property('pages').eql(3070);
            done();
          })
      })
    })
  });
  // test delete book success
  describe('/DELETE/:id book', () => {
    it('it should DELETE a book by given the id ', done => {
      let book = new Book({
        title: "第四本测试的书",
        author: "dapeng",
        year: 1967,
        pages: 3110
      });

      book.save((err, res) => {
        chai.request(server)
          .delete('/books/' + book.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Book Successfully deleted!');
            res.body.result.should.have.property('ok').eql(1);
            res.body.result.should.have.property('n').eql(1);
            done();
          })
      })
    })
  });
})
