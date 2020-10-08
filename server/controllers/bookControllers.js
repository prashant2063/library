const mongoClient = require("mongodb").MongoClient;
const db = require("./dbConfig");
const dbUrl = db.dbUrl;
const dbName = db.dbName;
const collectionName = "books";

function getBooks(request, response) {
    mongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            console.log("Unable to connecto to db");
            response.send("not able to connect to db");
        }
        else {
            let db = dbHost.db(dbName);
            db.collection(collectionName, (err, coll) => {
                if(err){
                    console.log("Unable to connect to collection");
                    response.send("not able to connect to collection")
                }
                else{
                    coll.find({}).toArray((err, res)=>{
                        response.send(res);
                    })
                }
            })
        }
    })
}

module.exports = { getBooks }