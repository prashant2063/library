const express = require("express")
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const PORT = 3000;

const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use("/api/books",bookRoutes);
app.use("/api/user",userRoutes);

app.use(express.static(path.join(__dirname, "public", "dist", "Library")))
app.get('*',(request, response)=>{
    response.sendFile(path.join(__dirname,"public","dist","Library","index.html"))
})
app.listen(PORT, (err)=>{
    if(!err){
        console.log("Running on http://localhost:"+PORT)
    }
})