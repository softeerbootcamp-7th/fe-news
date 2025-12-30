import http from "http";
import fs from "fs";
import path from "path";

const server = http.createServer((req, res) => {
  const filePath = req.url === "/" ? "./index.html" : `.${req.url}`;

  const ext = path.extname(filePath);
  const typeMap = {
    ".html": "text/html",
    ".js": "text/javascript",
  };

  res.setHeader("Content-Type", typeMap[ext] || "text/plain");

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
    } else {
      res.end(data);
    }
  });
});

server.listen(3000, () => {
  console.log("http://localhost:3000");
});
