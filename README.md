# Supertest Workshop

API automation test using supertest

## Preparation
Node.js - brew install nodejs

Postman (Chrome Plugin)


## Getting Started
Install the modules with: 'npm install'

install the grunt with :"npm install -g grunt"

Run test cases with 'grunt' or 'grunt mochaTest' or 'mocha test/supertest-workshop_books.js'

## Workshop Steps

- 启动Postman并导入postman文件夹下的Google.postman_collection文件

### Scenario 1
1. 在Postman中执行第1个测试用例 - BOOKS_Search books with a keyword

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
1. 在Postman中执行第2个测试用例 - BOOKS_Search books with two parameters (q=cucumber and maxResults=2)

2. 用Supertest实现这个测试用例

3. 断言

>- http status - 200 OK

>- 书名中包含第一个参数-q="cucumber"

>- items的总个数不大于第二个参数-maxResult=2

>- selfLink里的id等于item id

>- 'kind', 'totalItems', 'items'是mandatory的key


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

### Scenario 3
1. 在Postman中执行第3个测试用例 - BOOKS_Retrieves a Volume resource based on ID, the ID in request URL is from Scenario 2

2. 用Supertest实现这个测试用例

3. 断言
>- http status - 200 OK
>- Response里的Item ID等于request URL里的ID及Sceanrio2中返回的ID

#### Refer to https://developers.google.com/books/docs/v1/reference/volumes/get
#### Example

GET https://www.googleapis.com/books/v1/volumes/{ID}

    it('Retrieves a Volume resource based on ID that is from last case - Return 200', function(done){

        this.timeout(10000);

        request.get('/' + id)
            .expect(200)

            .expect(function(res){

                // Check the id in response is the same as parameter
                expect(res.body.id).to.equal(id)

            })

            .end(function(err,res){

                done(err);

            })

### Scenario 4
1. 在Postman中执行第4个测试用例 - SHEETS_Add a sheet
>- spreadsheetId: 1gU8HQ72E7ECWqQYINSE2zhJlFiSpqMTVG3ShnzJQquE
>- Access Token: Bearer ya29.CjAyA6ITDXpeKbG3UVe2wDk83HtVSApXHZLumlm_6blZms5OnQbWU2NmauuZRMGs4yU

2. 用Supertest实现这个测试用例
> 新建一个js文件

3. 断言
>- http status - 200 OK
>- Response里的spreadsheetId等于request URL里的spreadsheetID
>- Response里的sheet name等于request body里的sheet name

#### Refer to https://developers.google.com/sheets/samples/sheet
#### Example
POST https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}:batchUpdate

    var request = require('supertest')('https://sheets.googleapis.com/v4/spreadsheets');
    var chai = require('chai');
    var expect = require('chai').expect;

    var spreadsheetId = '1gU8HQ72E7ECWqQYINSE2zhJlFiSpqMTVG3ShnzJQquE'
    var accessToken = 'Bearer ya29.CjAyA3d9_ns2M1Mm9sl4_y8qIV_wgj5kU6tdBcyTj1r69aX4QBcADNfN42HhnkoGoSw'

    var sheetId;
    var sheetName = 'juewen';

    describe('GOOGLE SHEETS API',function(){

        it('Add a new sheet - Return 200', function(done){

            this.timeout(10000);

            var requestBody = {
                                "requests": [
                                  {
                                    "addSheet": {
                                      "properties": {
                                        "title": sheetName
                                      }
                                    }
                                  }
                                ]
                              }

            request.post('/' + spreadsheetId + ':batchUpdate')

            .set('Authorization', accessToken)
            .set('Content-Type', 'application/json')

            .send(requestBody)

            .expect(200)

            .expect(function(res){

                //spreadsheetId in response is the same as the one in request URL
                expect(res.body.spreadsheetId).to.equal(spreadsheetId);

                //sheet name in response is the same as the one in request body
                expect(res.body.replies[0].addSheet.properties.title).to.equal(sheetName);


            })

            .end(function(err, res){

                //Retrieve sheet id for next scenarios
                sheetId = res.body.replies[0].addSheet.properties.sheetId;
                done(err);

            })

        })
    })

### Scenario 5 - Homework:)
- 用Supertest实现Postman中的第5个用例 - SHEETS_Write to multiple ranges

#### Refer to https://developers.google.com/sheets/samples/writing

### Scenario 6
1. 在Postman中执行第6个测试用例 - SHEETS_Write a single range
    spreadsheetId: 1gU8HQ72E7ECWqQYINSE2zhJlFiSpqMTVG3ShnzJQquE
    Access Token: Bearer ya29.CjAyA3d9_ns2M1Mm9sl4_y8qIV_wgj5kU6tdBcyTj1r69aX4QBcADNfN42HhnkoGoSw

2. 用Supertest实现这个测试用例
> 为SHEETS API测试新建一个js文件

3. 断言
>- http status - 200 OK
>- Response里的spreadsheetId等于request URL里的spreadsheetID
>- Response里的sheet name等于request body里的sheet name

#### Refer to https://developers.google.com/sheets/samples/sheet
#### Example
PUT https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}?valueInputOption=USER_ENTERED

    var range = sheetName +'!A1:D4'

    var requestBody = {
                        "range": range,
                        "majorDimension": "ROWS",
                        "values": [
                          ["Item", "Cost", "Stocked", "Ship Date"],
                          ["Wheel", "$20.50", "4", "3/1/2016"],
                          ["Door", "$15", "2", "3/15/2016"],
                          ["Engine", "$100", "1", "30/20/2016"]
                        ]
                      }

    it('Write a single range - Return 200', function(done){

        this.timeout(10000);

        request

            .put('/'+spreadsheetId+'/values/'+range)
            .query({
                valueInputOption:'USER_ENTERED'
            })

            .set('Authorization', accessToken)
            .set('Content-Type', 'application/json')
            .send(requestBody)
            .expect(200)

            .expect(function(res){

                //spreadsheetId in response is the same as the one in request URL
                expect(res.body.spreadsheetId).to.equal(spreadsheetId)

                //range in response is the same the one in request body
                expect(res.body.updatedRange).to.equal(range)


            })

            .end(function(err,res){

                done(err);

            })

    })

### Scenario 7 - Homework :)

- 用Supertest实现Postman中的第7个用例 - SHEETS_Read a single range

- 请验证Scenario 7的response等于Scenario 6的Request Body

#### Refer to https://developers.google.com/sheets/samples/reading

### Scenario 8 - Homework :)

- 用Supertest实现Postman中的第8个用例 - SHEETS_Delete a sheet by ID

#### Refer to https://developers.google.com/sheets/samples/sheet

#### Grunt运行所有books和sheets API的用例, check测试结果


# can use Mochawesome to your project

1. Add MOCHAWESOME to your project

npm install --save-dev mochawesome

2. tell mocha to use the mochawesome reporter

grunt mochaTest  -- reporter mochawesome













