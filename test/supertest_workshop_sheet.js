var request = require('supertest')('https://sheets.googleapis.com/v4/spreadsheets');
var chai = require('chai');
var expect = require('chai').expect;

var spreadsheetId = '1CvdK8uLhvLKyyFmD8Lap53Fe_zgRtEJIX2QVA27W6Xg'
var accessToken = 'Bearer ya29.Ci82AwlBEUkAn1Lc1QXgnTpydddnAwYv_GaeV1K4Vxn_NWNj3KnoA5j0hXCA20xg0Q'

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

    it('Add a new sheet -Pingping Yao', function (done) {

        this.timeout(10000);

        var requestBody = {
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

            .expect(function (res) {
                console.log(res.body.spreadsheetId)
                expect(res.body.spreadsheetId).to.equal(spreadsheetId);
                expect(res.body.replies[0].addSheet.properties.title).to.equal(titleName);
            }).end(done)
    });

    it('Add a content to single range', function (done) {
        this.timeout(8000)

        request.put('/' + spreadsheetId + '/values/' + dataRange)
            .query({valueInputOption: 'USER_ENTERED'})
            .set('Authorization', accessToken)
            .set('Content-Type', jsonType)
            .send(singleBody)

            .expect(function (res) {
                expect(res.body.spreadsheetId).to.equal(spreadsheetId)

                expect(res.body.updatedRange).to.equal(dataRange)
                expect(res.body.updatedRows).to.equal(4)
            }).end(done)

    });

    it('retrieve data from single range', function (done) {

        request.get('/' + spreadsheetId + '/values/' + dataRange)
            .set('Authorization', accessToken)
            .set('Content-Type', jsonType)
            .expect(function (res) {
                expect(res.body).to.eql(singleBody)
            }).end(done)

    });

    it('Write to multiple ranges', function (done) {

        var requestBody ={
            "valueInputOption": "USER_ENTERED",
            "data": [
                {
                    "range": "Pingping1!A5:C5",
                    "majorDimension": "ROWS",
                    "values": [
                        ["pingping", "female", "11/11/1990"]
                    ]
                },
                {
                    "range": "ppyao!A1:C2",
                    "majorDimension": "ROWS",
                    "values": [
                        ["Cost", "Stocked", "Ship Date"],
                        ["$20.50", "4", "3/1/2016"]
                    ]
                }
            ]
        }
        request.post('/' + spreadsheetId +'/values:batchUpdate')
            .query({valueInputOption: 'USER_ENTERED'})
            .set('Authorization', accessToken)
            .set('Content-Type', jsonType)
            .send(requestBody)
            .expect(function (res) {
                expect(res.body.responses[0].updatedRange).to.equal('Pingping1!A5:C5')
                expect(res.body.responses[1].updatedRange).to.equal('ppyao!A1:C2')

                expect(res.body.spreadsheetId).to.equal(spreadsheetId)


            }).end(done)
    })


})