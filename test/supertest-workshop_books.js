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

        it('Search books with a keyword (e.g. "test") - Return 200 OK', function(done){

            this.timeout(10000)

            request
                .get('?q=test')
                .expect(200, done)

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