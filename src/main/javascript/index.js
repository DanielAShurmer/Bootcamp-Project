var MongoClient = require('mongodb').MongoClient

  MongoClient.connect('mongodb://localhost:27017/Test', function (err, client) {
    if (err) throw err

    var db = client.db('Test')

    db.collection('myTestCollection').find().toArray(function (err, result) {
      if (err) throw err

      console.log(result)
    })
  })