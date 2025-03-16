let http = require('http');
let dt = require('./myfirstmodule');
let url = require('url');
let fs = require('fs');
const { log } = require('console');

http.createServer(function (req, res){
    fs.readFile('index.html', function(err, data){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    })
}).listen(8000);

fs.rename('mynewfile2.txt', 'myrenamefile.text' , function(err){
    if (err) throw err;
    console.log('File Deleted!');
})
