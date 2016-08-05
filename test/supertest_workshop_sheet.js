var request = require('supertest')('https://sheets.googleapis.com/v4/spreadsheets');
var chai = require('chai');
var expect = require('chai').expect;

var spreadsheetId = '1CvdK8uLhvLKyyFmD8Lap53Fe_zgRtEJIX2QVA27W6Xg'
var accessToken = 'Bearer ya29.Ci82Awwgb1Xm_ll1826ymTCmliEBE567lBaeHuSoujPJWVrbZQwaXzrGNOB_6bXJ5Q'

var titleName = 'Pingping1';
var jsonType = 'application/json'
var dataRange = titleName + "!A1:C4"

var singleBody = {
    range: dataRange,
    majorDimension: 'ROWS',
    values: [
        ['Name', 'Gender', 'Birthday'],
        ['Pingping', 'female', '3/1/2016'],
        ['Kongdan', 'male', '3/15/2016'],
        ['dandan', 'male', '30/20/2016']
    ]
}

describe('GOOGLE SHEETS API', function () {

    //it('Add a new sheet -Pingping Yao', function (done) {
    //
    //    this.timeout(10000);
    //
    //    var requestBody = {
    //        "requests": [
    //            {
    //                "addSheet": {
    //                    "properties": {
    //                        "title": titleName,
    //                        "gridProperties": {
    //                            "rowCount": 20,
    //                            "columnCount": 12
    //                        },
    //                        "tabColor": {
    //                            "red": 1.0,
    //                            "green": 0.3,
    //                            "blue": 0.4
    //                        }
    //                    }
    //                }
    //            }
    //        ]
    //    }
    //    request.post('/' + spreadsheetId + ':batchUpdate')
    //
    //        .set('Authorization', accessToken)
    //        .set('Content-Type', jsonType)
    //
    //        .send(requestBody)
    //
    //        .expect(function (res) {
    //            console.log(res.body.spreadsheetId)
    //            expect(res.body.spreadsheetId).to.equal(spreadsheetId);
    //            expect(res.body.replies[0].addSheet.properties.title).to.equal(titleName);
    //        }).end(done)
    //});

    //it('Add a content to specify range', function (done) {
    //    this.timeout(8000)
    //
    //    request.put('/' + spreadsheetId + '/values/' + dataRange)
    //        .query({valueInputOption: 'USER_ENTERED'})
    //        .set('Authorization', accessToken)
    //        .set('Content-Type', jsonType)
    //        .send(singleBody)
    //
    //        .expect(function (res) {
    //            expect(res.body.spreadsheetId).to.equal(spreadsheetId)
    //
    //            expect(res.body.updatedRange).to.equal(dataRange)
    //            expect(res.body.updatedRows).to.equal(4)
    //        }).end(done)
    //
    //});

    it('retrieve data from single range', function (done) {

        request.get('/' + spreadsheetId +'/values/'+ dataRange)
            .set('Authorization',accessToken)
            .set('Content-Type',jsonType)
            .expect(function(res){
                expect(res.body).to.eql(singleBody)
            }).end(done)

    })
})