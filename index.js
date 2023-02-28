const http = require("http");
const fs = require("fs").promises;

const host = "localhost";
const port = 8000;

let indexFile;
let aboutFile;
let contactMeFile;
let error404File;

fs.readFile(__dirname + "/about.html")
  .then((contents) => {
    aboutFile = contents;
  })
  .catch((err) => {
    console.error(`Could not read about.html file: ${err}`);
    process.exit(1);
  });

fs.readFile(__dirname + "/contact-me.html")
  .then((contents) => {
    contactMeFile = contents;
  })
  .catch((err) => {
    console.error(`Could not read contact-me.html file: ${err}`);
    process.exit(1);
  });

fs.readFile(__dirname + "/404.html")
  .then((contents) => {
    error404File = contents;
  })
  .catch((err) => {
    console.error(`Could not read 404.html file: ${err}`);
    process.exit(1);
  });

const requestListener = function (req, res) {
  res.setHeader("Content-Type", "text/html");
  switch (req.url) {
    case "/":
      res.writeHead(200);
      res.end(indexFile);
      break;
    case "/about":
      res.writeHead(200);
      res.end(aboutFile);
      break
    case "/contact-me":
      res.writeHead(200);
      res.end(contactMeFile);
      break;
    default:
      res.writeHead(200);
      res.end(error404File);
      break;
  }
};

const server = http.createServer(requestListener);

fs.readFile(__dirname + "/index.html")
  .then((contents) => {
    indexFile = contents;
    server.listen(port, host, () => {
      console.log(`Server is running on http://${host}:${port}`);
    });
  })
  .catch((err) => {
    console.error(`Could not read index.html file: ${err}`);
    process.exit(1);
  });
