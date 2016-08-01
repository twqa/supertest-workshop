# Supertest Workshop

API automation test using supertest

## Preparation
Node.js - brew install nodejs

Postman (Chrome Plugin)


## Getting Started
Install the modules with: 'npm install'

Run test cases with 'grunt' or 'grunt mochaTest' or 'mocha test/supertest-workshop_books.js'

## Workshop Steps

- 启动Postman并导入postman文件夹下的Google.postman_collection文件

### Scenario 1
1. 在Postman中执行第一个测试用例 - Search books with a keyword

2. 用Supertest实现这个测试用例

3. 断言:
> http status - 200 OK

#### Refer to https://developers.google.com/books/docs/v1/reference/volumes/list
#### Example
GET https://www.googleapis.com/books/v1/volumes?q=test

    describe('Test Google Books - Volumes API', function(){

        request = request('https://www.googleapis.com/books/v1/volumes');

        it('Search books with a mandatory parameter(q="test") - Return 200 OK', function(done){
            this.timeout(10000)

            request

                .get('?q=test')
                .expect(200,done)

        })

    })

### Scenario 2
1. 在Postman中执行第二个测试用例 - Search books with two parameters (q=cucumber and maxResults=2)

2. 用Supertest实现这个测试用例

3. 断言
> http status - 200 OK

> 书名中包含第一个参数-q="cucumber"

>> items的总个数不大于第二个参数-maxResult=2

>> selfLink里的id等于item id

>> 'kind', 'totalItems', 'items'是mandatory的key


#### Refer to https://developers.google.com/books/docs/v1/reference/volumes/list
#### Example

GET https://www.googleapis.com/books/v1/volumes?q=cucumber&maxResults=2

    it('Search books with two parameters(q="cucumber"&maxResult=2) - Return 200 OK', function(done){

        var q = 'cucumber'
        var maxResults = 2

        this.timeout(10000);

        request.get('/')

            .query({
                q: q,
                maxResults: maxResults
            })

            .expect(200)

            .expect(function(res) {
                //Get item id for the first book
                id = res.body.items[0].id;
                var selfLinkLength = res.body.items[0].selfLink.split('/').length;
                var selfLinkId = res.body.items[0].selfLink.split('/')[selfLinkLength - 1];

                //Check book title contains the first parameter - cucumber
                expect(res.body.items[0].volumeInfo.title.toLowerCase()).to.contain(q);
                
                //Check total itmes <= the second parameter - 2
                expect(res.body.items.length).be.at.most(maxResults);
                
                //Check item id is the same as the id in selfLink
                expect(selfLinkId).to.equal(id);
                
                //Check mandatory keys, e.g. kind, totalItems, items....
                expect(res.body).to.include.keys('kind', 'totalItems', 'items');

            })

            .end(function(err,res){

               done(err);

            })

    })



