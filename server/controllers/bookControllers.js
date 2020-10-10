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
                    const skip = parseInt(request.query.skip);
                    const limit = parseInt(request.query.limit);
                    coll.find({}).skip(skip).limit(limit).toArray((err, res) => {
                        if (err) {
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

function deleteBook(request, response) {
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
                    const _id = parseInt(request.query._id);
                    coll.findOneAndDelete({ _id }, (err, res) => {
                        if (err) {
                            response.status(500);
                            response.send("Error while deleting records");
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

function updateBook(request, response) {
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
                    const book = request.body;
                    const _id = book['_id'];
                    book['pageCount'] = parseInt(book['pageCount']);
                    book['publishedDate'] = new Date(book['publishedDate']);
                    book['authors'] = book['authors'].split(",").map((item) => {
                        return item.trim();
                    });
                    book['categories'] = book['categories'].split(",").map((item) => {
                        return item.trim();
                    });
                    coll.updateOne({ _id }, { $set: book }, (err, res) => {
                        if (err) {
                            response.status(500);
                            response.send("Error while updating records");
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

module.exports = { getBooks, deleteBook, updateBook }