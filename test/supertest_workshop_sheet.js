var request = require('supertest')('https://sheets.googleapis.com/v4/spreadsheets');
var chai = require('chai');
var expect = require('chai').expect;

var spreadsheetId = '1F15tvnbDoWAbectuHgtRhDO9LDHBzbC_hMu5lDD_Tqc'
var accessToken = 'Bearer ya29.Ci87A3yvYjIPGWiLONbTBORj9WpDtTUpG6cQWFBzMH9KkPDqMZ3s9VKMN50BPybBFg'


var titleName = "YaoPingping"
var titleName1 = 'pingping1';
var titleName2 = 'ppyao'
var jsonType = 'application/json'
var dataRange = titleName1 + "!A1:C4"
var deleteId

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

    it('Add a new sheet -YaoPingping', function (done) {

        this.timeout(10000);

        var singleSheetBody = {
            "requests": [
                {
                    "addSheet": {
                        "properties": {
                            "sheetId": "1688769723",
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
            .send(singleSheetBody)
            .expect(function (res) {
                deleteId = res.body.replies[0].addSheet.properties.sheetId
                expect(res.body.spreadsheetId).to.equal(spreadsheetId)
                expect(res.body.replies[0].addSheet.properties.title).to.equal(titleName)
            }).end(done)
    });

    it('Add multiple sheets - ppyao & pingping1',function(done){
        this.timeout(10000)
        var requestBody = {
            "requests": [
                {
                    "addSheet": {
                        "properties": {
                            "sheetId": "1688769724",
                            "title": titleName1,
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
                }, {
                    "addSheet": {
                        "properties": {
                            "sheetId": "1688769725",
                            "title": titleName2,
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
                expect(res.body.spreadsheetId).to.equal(spreadsheetId)
                expect(res.body.replies[0].addSheet.properties.title).to.equal(titleName1)
                expect(res.body.replies[1].addSheet.properties.title).to.equal(titleName2)
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

        var requestBody = {
            "data": [
                {
                    "range": "pingping1!A5:C5",
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
        request.post('/' + spreadsheetId + '/values:batchUpdate')
            .query({valueInputOption: 'USER_ENTERED'})
            .set('Authorization', accessToken)
            .set('Content-Type', jsonType)
            .send(requestBody)
            .expect(function (res) {

                expect(res.body.responses[0].updatedRange).to.equal('pingping1!A5:C5')
                expect(res.body.responses[1].updatedRange).to.equal('ppyao!A1:C2')
                expect(res.body.spreadsheetId).to.equal(spreadsheetId)

            }).end(done)
    });

    it('delete a sheet by ID', function (done) {
        var deleteBody = {
            "requests": [
                {
                    "deleteSheet": {
                        "sheetId": deleteId
                    }

                }
            ]
        }

        request.post('/' + spreadsheetId + ':batchUpdate')
            .set('Authorization', accessToken)
            .set('Content-Type', jsonType)
            .send(deleteBody)
            .expect(function (res) {
                expect(res.body.spreadsheetId).to.equal(spreadsheetId)

            }).end(done)
    })


})