var request = require('supertest')('https://sheets.googleapis.com/v4/spreadsheets');
var chai = require('chai');
var expect = require('chai').expect;

var spreadsheetId = '1CvdK8uLhvLKyyFmD8Lap53Fe_zgRtEJIX2QVA27W6Xg'
var accessToken = 'Bearer ya29.Ci82A1oqx9d6fIphGxry6ZpyQZZ2LyYJLQLnkhgnZS0OOL3SAaFO4sVPCJgdVpbhUA'

var titleName = 'ppyao';
var jsonType ='application/json'

describe('GOOGLE SHEETS API',function(){

    it('Add a new sheet -Pingping Yao', function(done){

        this.timeout(10000);

        var requestBody ={
            "requests": [
                {
                    "addSheet": {
                        "properties": {
                            "title": titleName,
                            "gridProperties": {
                                "rowCount": 20,
                                "columnCount": 12
                            },
                            "tabColor": {
                                "red": 1.0,
                                "green": 0.3,
                                "blue": 0.4
                            }
                        }
                    }
                }
            ]
        }
        request.post('/' + spreadsheetId + ':batchUpdate')

            .set('Authorization', accessToken)
            .set('Content-Type', jsonType)

            .send(requestBody)

            .expect(function(res){
                console.log(res.body.spreadsheetId)
                expect(res.body.spreadsheetId).to.equal(spreadsheetId);
                expect(res.body.replies[0].addSheet.properties.title).to.equal(titleName);
            }).end(done)
    });

    it('Add a content to specify range',function(done){
        this.timeout(8000)

        var dataRange =titleName + "!A5:C8"


        var requestBody ={
            "range": dataRange,
            "majorDimension": "ROWS",
            "values": [
                ["Name", "Gender", "birthday"],
                ["Pingping", "female", "3/1/2016"],
                ["Kongdan", "male","3/15/2016"],
                ["dandan", "male", "30/20/2016"]
            ]
        }
        request.put('/'+spreadsheetId+'/values/'+dataRange)
            .query({valueInputOption:'USER_ENTERED'})
            .set('Authorization',accessToken)
            .set('Content-Type',jsonType)
            .send(requestBody)

            .expect(function(res){
                expect(res.body.spreadsheetId).to.equal(spreadsheetId)

                expect(res.body.updatedRange).to.equal(dataRange)
                expect(res.body.updatedRows).to.equal(4)
            }).end(done)

    })
})