const mongoClient = require("mongodb").MongoClient;

const keys = require("./../keys");
const dbUrl = keys.db.dbUrl;
const dbName = keys.db.dbName;
const collectionName = "books";

function getBooks(request, response) {
    mongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            console.log("Unable to connecto to db");
            response.status(500);
            response.send("Unable to connecto to db");
        }
        else {
            let db = dbHost.db(dbName);
            db.collection(collectionName, (err, coll) => {
                if (err) {
                    console.log("Unable to connect to collection");
                    response.status(500);
                    response.send("Unable to connect to collection");
                }
                else {
                    let skip = parseInt(request.query.skip);
                    let limit = parseInt(request.query.limit);
                    coll.find({}).skip(skip).limit(limit).toArray((err, res) => {
                        if(err){
                            response.status(500);
                            response.send("Error while fetching records");
                        }
                        else if (res) {
                            response.status(200);
                            response.send(res);
                        }
                        else {
                            response.status(204);
                            response.send("No records found");
                        }
                    })
                }
            })
        }
    })
}

module.exports = { getBooks }