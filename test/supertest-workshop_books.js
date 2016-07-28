var request = require('supertest');
var chai = require('chai');
var expect = require('chai').expect;

var config = require('../config/host_config.js')
var url = config.host['google_books']

// Test Google Books API
describe('Test Google Books API',function(){

    describe('Test Google Books - Volumes API', function(){

        request = request(url + '/volumes');

        it('Search books a key(ThoughtWorks) - Return 200 OK', function(done){

            request

                .get('?q=ThoughtWorks')
                .expect(200,done)

        })

    })

    describe('Test Google Books - Bookshelf API', function(){

 //       request = request(url+'/users/userId/bookshelves');

    })


})