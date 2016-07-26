var request = require('supertest')('https://www.googleapis.com/books/v1/volumes');
var chai = require('chai');
var expect = require('chai').expect;


// Test Google Books API
describe('GOOGLE BOOKS API - VOLUMES',function(){


    // Get book list that name includes "test", return http status 200 - OK
    it('Get book list that name includes "test", return http status 200 - OK', function(done){
        request.get('/?q=test')

            .expect(200)

            .end(function(err,res){

//                console.log(res);
                done(err);

            })

    })



    // Get book list that name includes "cucumber", return http status 200 - OK
    it('Get book list that name includes "cucumber", return http status 200 - OK', function(done){


    })


    // Retrieve the id from last case, then use this id to get the book info
    it('Get the first book by id, return http status 200 - OK', function(done){


    })

})