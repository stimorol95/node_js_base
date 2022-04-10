const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");

(async () => {
  const file = (path) => fs.lstatSync(path).isFile(); 

  const server = http.createServer((req, res) => {
    const fullPath = path.join(process.cwd(), req.url); 
    if (!fs.existsSync(fullPath)) return res.end("File or directory not found");

    if (file(fullPath)) {
      return fs.createReadStream(fullPath).pipe(res); 
    }

    let linksList = "";

    const urlParams = req.url.match(/[\d\w\.]+/gi);

    if (urlParams) {
      urlParams.pop();
      const prevUrl = urlParams.join("/");
      linksList = urlParams.length
        ? `<li><a href="/${prevUrl}">..</a></li>`
        : `<li><a href="/">..</a></li>`;
    }

    fs.readdirSync(fullPath)
      .forEach((fileName) => {
        const filePath = path.join(req.url, fileName);
        linksList += `<li><a href="${filePath}">${fileName}</a></li>`;
      });

    const HTML = fs
      .readFileSync(path.join(__dirname, "index.html"), "utf-8")
      .replace("##links", linksList);
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    return res.end(HTML);
  });
  server.listen(3000, "localhost", (error) => {
    error ? console.log(error) : console.log(`listening port ${3000}`);
  });
})();
