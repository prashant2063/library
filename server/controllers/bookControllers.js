const mongoClient = require("mongodb").MongoClient;

const { ObjectID, ObjectId } = require("mongodb");
const keys = require("./../keys");
const dbUrl = keys.db.dbUrl;
const dbName = keys.db.dbName;
const collectionName = "books";

function getBooks(request, response) {
    mongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            response.status(500);
            response.send("Unable to connecto to db");
        }
        else {
            let db = dbHost.db(dbName);
            db.collection(collectionName, (err, coll) => {
                if (err) {
                    response.status(500);
                    response.send("Unable to connect to collection");
                }
                else {
                    const skip = parseInt(request.query.skip);
                    const limit = parseInt(request.query.limit);
                    coll.find({}).sort({ title: 1 }).skip(skip).limit(limit).toArray((err, res) => {
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

            response.status(500);
            response.send("Unable to connecto to db");
        }
        else {
            let db = dbHost.db(dbName);
            db.collection(collectionName, (err, coll) => {
                if (err) {

                    response.status(500);
                    response.send("Unable to connect to collection");
                }
                else {
                    const _id = ObjectId(request.query._id);
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

            response.status(500);
            response.send("Unable to connecto to db");
        }
        else {
            let db = dbHost.db(dbName);
            db.collection(collectionName, (err, coll) => {
                if (err) {

                    response.status(500);
                    response.send("Unable to connect to collection");
                }
                else {
                    const book = request.body;
                    const _id = ObjectId(book['_id']);
                    delete book._id;
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

function addBook(request, response) {
    mongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {

            response.status(500);
            response.send("Unable to connecto to db");
        }
        else {
            let db = dbHost.db(dbName);
            db.collection(collectionName, (err, coll) => {
                if (err) {

                    response.status(500);
                    response.send("Unable to connect to collection");
                }
                else {
                    const book = request.body;

                    book['pageCount'] = parseInt(book['pageCount']);
                    book['publishedDate'] = new Date(book['publishedDate']);
                    book['authors'] = book['authors'].split(",").map((item) => {
                        return item.trim();
                    });
                    book['categories'] = book['categories'].split(",").map((item) => {
                        return item.trim();
                    });
                    coll.insertOne(book, (err, res) => {
                        if (err) {
                            response.status(500);
                            response.send("Error while updating records");
                        }
                        else if (res) {
                            response.status(201);
                            response.send(res);
                        }
                    })
                }
            })
        }
    })
}

module.exports = { getBooks, deleteBook, updateBook, addBook }