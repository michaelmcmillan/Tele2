var config = require('./config.js');
var request = require('request');
var cheerio = require('cheerio');

function login () {
    request.post({
        url: 'https://www.tele2.no/Services/General/Common.svc/Login',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            dashboardEmail: config.username,
            dashboardPassword: config.password,
            loginFrom: 'login'
        })
    }, function (err, data, body) {
        if (err) throw err;
        var cookie = data.headers['set-cookie'][0]; 

        request('https://www.tele2.no/Pages/Selfservice/MyPagesUsage.aspx?msisdn=' + config.phone, {
            headers: {
                'Cookie': cookie         
            }    
        }, function (err, data, body) {
            if (err) throw err;
            var $ = cheerio.load(body);

            console.log($('div.dataused').text().trim()); 
        });
    });
}

login();
