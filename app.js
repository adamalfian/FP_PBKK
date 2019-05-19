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

app.get('/rekap/:kode_mk', function(req, res){
    var kode_mk = req.params.kode_mk;
    var request = require("request");

    var options = {
        method: 'GET',
        url: 'http://13.67.55.177:8445/rekap/' + kode_mk,
        headers:
        {
            'postman-token': '184d17e1-52fb-0c40-469a-f37113bab8b3',
            'cache-control': 'no-cache'
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);        
        var obj = JSON.parse(body);
        console.log(obj.values.length);
        res.render('rekap_matakuliah', obj.values);
    });

});

app.get('/rekap/:kode_mk/:id_pertemuan', function (req, res) {
    var kode_mk = req.params.kode_mk;
    var id_pertemuan = req.params.id_pertemuan;

    var request = require("request");

    var options = {
        method: 'GET',
        url: 'http://13.67.55.177:8445/rekap/' + kode_mk + '/' + id_pertemuan,
        headers:
        {
            'postman-token': '4490d158-8e70-54e3-2028-2aa0976942e3',
            'cache-control': 'no-cache'
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        var obj = JSON.parse(body);
        console.log(obj.values);
        res.render('pertemu_rekap_matakuliah', obj.values);
        
    });

});

app.get('/rekapmahasiswa/:nrp/:kode_mk', function (req, res) {
    var nrp = req.params.nrp;
    var kode_mk = req.params.kode_mk;
    
    var request = require("request");

    var options = {
        method: 'GET',
        url: 'http://13.67.55.177:8445/rekapmahasiswa/' + nrp + '/' + kode_mk + '/',
        headers:
        {
            'postman-token': '1b0644c0-e77c-46b5-ca44-de94bf042840',
            'cache-control': 'no-cache'
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        var obj = JSON.parse(body);
        console.log(obj.values);
        res.render('rekap_mahasiswa', obj.values);
    });

});

app.get('/tambahmatkul', function (req, res) {
    res.render('tambahMatkul', { title: "Tambah Mata Kuliah"});
});

app.post('/tambahmatkul', function (req, res) {
    var data = req.body;
    var dumps;
    var options = { method: 'POST',
        url: 'http://13.67.55.177:8445/tambahmatkul',
        headers: 
        { 'postman-token': '832db1a0-1f76-486b-7bff-a20709fb99cc',
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded' },
        form: { kode_mk: data.kode_mk, mata_kuliah: data.mata_kuliah, kelas: data.kelas }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(response);
        console.log(body);
        dumps = JSON.parse(body);
        res.render('tambahMatkulsukses', dumps);

    });
});

app.route('/tambahjadwal')
    .get(function (req, res) {
        res.render('tambahJadwal', { title: "Tambah Jadwal Mata Kuliah"});
    })
    .post(function (req, res) {
        var data = req.body;
        var dumps;
        var options = { 
            method: 'POST',
            url: 'http://13.67.55.177:8445/tambahjadwal',
            headers: {
                'postman-Token': '52a8a49e-1fe1-4cd3-994d-74bb3db7d6d6',
                'cache-control': 'no-cache',
                'content-type': 'application/x-www-form-urlencoded'
            },
            form: { 
                fk_kode_mk: data.fk_kode_mk, 
                pertemuan: data.pertemuan, 
                jam_masuk: data.jam_masuk,
                jam_pulang: data.jam_pulang,
                ruang: data.ruang,
                // hari: 'senin'
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(response);
            console.log(body);
            dumps = JSON.parse(body);
            res.render('tambahJadwalSukses', dumps);

        });
    });

app.route('/tambahpeserta')
    .get(function (req, res) {
        res.render('tambahPeserta', { title: "Tambah Mahasiswa Mata Kuliah"});
    })
    .post(function (req, res) {
        var data = req.body;
        var dumps;
        var options = { 
            method: 'POST',
            url: 'http://13.67.55.177:8445/tambahpeserta/'+ data.nrp + '/' + data.kode_mk,
            headers: {
                'postman-Token': '52a8a49e-1fe1-4cd3-994d-74bb3db7d6d6',
                'cache-control': 'no-cache',
                'content-type': 'application/x-www-form-urlencoded'
            },
            form: { 
                kode_mk: data.kode_mk, 
                nrp: data.nrp, 
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(response);
            console.log(body);
            dumps = JSON.parse(body);
            res.render('tambahPesertaSukses', dumps);

        });
    });

app.get('/tambahmahasiswa', function (req, res) {
    res.render('addmahasiswa', { title: "Tambah Mahasiswa"});
});

app.post('/tambahmahasiswa', function (req, res) {
    var data = req.body;
    addMahasiswa(data.nrp, data.nama, data.password);
    res.redirect('/');
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