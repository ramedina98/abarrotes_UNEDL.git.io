/*SSR*/
const express = require("express");
const path = require("path");

const app = express();

//configure express to server static files...
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));
//we respond wiht the index file...
app.get('/*', (_req, res) => {
    res.sendFile(path.resolve(__dirname,"frontend","index.html"));
});

// get the port number from enviroment variable or use the default port...
const PORT = process.env.PORT || 3000; 

//Start the server and listen on the specified port...
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server up running in http://localhost:${PORT}/`)
});