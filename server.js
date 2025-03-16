let http = require("http");
let dt = require("./myfirstmodule");
let url = require("url");
let fs = require("fs");
const { log } = require("console");

// let adr = 'http://localhost:8000/dafault.html?year=2020&month=november';
// let q = url.parse(adr, true);

// console.log(q.host); // return localhost:8000
// console.log(q.pathname);
// console.log(q.search);

// let qdata = q.query;
// console.log(qdata.month);

http
  .createServer(function (req, res) {
    let q = url.parse(req.url, true);
    let filename = "." + q.pathname;
    fs.readFile(filename, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("404 Not Found");
      }
      
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8000);

// fs.rename('mynewfile2.txt', 'myrenamefile.text' , function(err){
//     if (err) throw err;
//     console.log('File reanemd!');
// })
