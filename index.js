
const fs = require("fs");

function handleRequest(req,res) {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
     fs.readFile("message.txt", "utf8",(err,data)=>{
        if (err) {
            console.log(err);
        }
        console.log('data from filr' + data);
        res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(`<html><body>${data}</body></html>`);
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
    });
    // res.setHeader('Content-Type', 'text/html');

    
  } else if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const messagebody = Buffer.concat(body).toString();
      const message = messagebody.split('=')[0];
      fs.writeFileSync("message.txt", message);
      res.write(`<html>${messagebody}</html>`);
    });

    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  // Set the response headers
  else {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write("<body><h1>Hello from my Node.js Server!</h1></body>");

    return res.end();
  }

}
 

// Start the server on port 4000
module.exports={
  handler:handleRequest,
  someText:'hello my name is khan'
};