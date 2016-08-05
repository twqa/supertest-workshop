var request = require('supertest');
var chai = require('chai');
var expect = require('chai').expect;
var endpoint = 'https://www.googleapis.com/books/v1'

/* Configurate endpoint in a separate config file
var config = require('../config/host_config.js')
var endpoint = config.host['google_books']
*/


// Test Google Books API
describe('Test Google Books API' ,function(){

    describe('Test Google Books - Volumes API', function(){

        request = request(endpoint + '/volumes')

        it('Search books with a mandatory parameter(q="test") - Return 200 OK', function(done){

            this.timeout(10000)

            request
                .get('?q=test')
                .expect(200,done)

        });

        it('Search books with name parameter(q="cucumber") and ) - Return 200 ok',function(done){
            this.timeout(80000)
            console.log("check")
            //request = request(endpoint +'/volumes')

            request.get('/')
                .query({ q: ' cucumber' ,MaxResult:2})
                .expect(function (res) {
                     id = res.body.items[0].id
                   expect(res.body.items[0].id).to.equal('0dge3Xh6EjUC')
                }).end(done)

        });

        it('Retrieves a Volume resource based on ID that is from last case - Return 200', function(done) {

            this.timeout(80000)

            request.get('/' + id)
                .expect(function(res){
                    expect(res.body.id).to.equal(id)

                })
                .end(done)
            //or
            //    .end(function(res){
            //        expect(res.body.id).to.equal(id)
            //        done()
            //    })


        })


    })

//    describe('Test Google Books - Bookshelf API', function(){
//
//       request = request(endpoint + '/users/userId/bookshelves')
//
//       it('Test....', function(){
//
//
//    })

})