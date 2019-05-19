var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var exphandlebars = require('express-handlebars');
var request = require("request");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine('handlebars', exphandlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


app.get('/', function (req, res) {
    var a;
    var dataDumps;

    var options = { method: 'GET',
    url: 'http://13.67.55.177:8445/users',
    headers: 
    { 'postman-token': 'a7462e73-e867-f4e7-c8ec-da48dcef8f7e',
        'cache-control': 'no-cache' } };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        // console.log(response);
        // console.log(body);
        dataDumps = JSON.parse(body);
        // return body;
        console.log(dataDumps.values);
        res.render('users', dataDumps.values);
    });
});

app.get('/tambahmatkul', function (req, res) {
    res.render('tambahMatkul', { title: "heheheh"});
});

app.post('/tambahmatkul', function (req, res) {
    var data = req.body;
    addmatkul(data.kode_mk, data.mata_kuliah, data.kelas);
    // res.render('tambahMatkul', { title: "heheheh"});
});

app.get('/tambahmahasiswa', function (req, res) {
    res.render('addmahasiswa', { title: "heheheh"});
});

app.post('/tambahmahasiswa', function (req, res) {
    var data = req.body;
    addMahasiswa(data.nrp, data.nama, data.password);
    res.redirect('/')
});


function addMahasiswa(nrp, nama, pass){
    var request = require("request");

    var options = { method: 'POST',
    url: 'http://13.67.55.177:8445/tambahmahasiswa',
    headers: 
    { 'postman-token': '7cd0db8c-32c7-a7ff-b7f2-77702b045c94',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded' },
    form: { nrp: nrp, nama: nama, password: pass } };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
    });

}
app.listen(3000, function (req, res) {
    console.log("App start at port 3000");
});