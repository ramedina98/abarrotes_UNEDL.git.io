/*SSR*/
const express = require("express");
const path = require("path");

const app = express();

//configure express to server static files...
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));
//we respond wiht the index file...
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname,"frontend","index.html"));
});

app.listen(5000, () => {
    console.log('Server up running in http://localhost:5000/')
});