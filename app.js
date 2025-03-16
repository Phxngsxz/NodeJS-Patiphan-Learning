let formidable = require("formidable");
let http = require("http");
let fs = require("fs");
let path = require("path");

http
  .createServer(function (req, res) {
    if (req.url == "/fileupload") {
      let form = new formidable.IncomingForm({
        allowEmptyFiles: false,
        keepExtensions: true,
        multiples: false
      });

      form.parse(req, function (err, fields, files) {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.write("Error: " + err.message);
          return res.end();
        }

        // ✅ ตรวจสอบไฟล์ที่ได้รับ
        if (!files.fileupload) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.write("No file uploaded");
          return res.end();
        }

        let oldpath = files.fileupload[0].filepath; // ✅ ใช้ filepath แทน path
        let newpath = path.join("D:/CODE/NodeJS/NodeJS-Patiphan-Learning/img", files.fileupload[0].originalFilename);

        // ✅ ใช้ copyFile() + unlink() แทน rename()
        fs.copyFile(oldpath, newpath, (err) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.write("File copy error: " + err.message);
            return res.end();
          }

          // ลบไฟล์ต้นฉบับหลังจากคัดลอกสำเร็จ
          fs.unlink(oldpath, (err) => {
            if (err) {
              console.error("Failed to delete temp file:", err);
            }
          });

          res.write("File uploaded and moved successfully");
          res.end();
        });
      });
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(
        '<form action="fileupload" method="post" enctype="multipart/form-data">'
      );
      res.write('<input type="file" name="fileupload"><br>');
      res.write('<input type="submit">');
      res.write("</form>");
      return res.end();
    }
  })
  .listen(8000);

console.log("Server running at http://localhost:8000/");
