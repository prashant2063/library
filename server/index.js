const express = require("express")
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const PORT = 3000;


const keys = require("./keys")
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

function authorize(request, response, next) {
    const bearerHeader = request.header("authorization");
    if (bearerHeader) {
        const token = bearerHeader.split(" ")[1];
        jwt.verify(token, keys.jwtSecret, (err, data) => {
            if (err) {
                response.status(403);
                response.send("Unathorized access");
            }
            else {
                next();
            }
        });
    }
    else {
        response.status(403);
        response.send("Unathorized access");
    }
}

app.use("/api/books", authorize,bookRoutes);
app.use("/api/user",userRoutes);

app.listen(PORT, (err)=>{
    if(!err){
        console.log("Running on http://localhost:"+PORT)
    }
})