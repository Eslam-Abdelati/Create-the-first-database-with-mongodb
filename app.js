const mongodb = require('mongodb')
const client = mongodb.MongoClient
const url = 'mongodb://127.0.0.1:27017'
const dbname = 'Eso-Company'

client.connect(url, (err, res) => {
    if (err) {
        return console.log(err);
    }
    console.log('success');
    const db = res.db(dbname)

    /////////////////////////////////////////////

    // 1- insert one 

    db.collection('users').insertOne(
        {
            name: 'eslam',
            lasname: 'amaar',
            age: 30
        }
        ,
        {
            name: 'selim',
            lasname: 'eslam',
            age: 25
        }
        , (err, data) => {
            if (err) {
                console.log(err);
            }
            console.log('id for one inserted ==>', data.insertedId);
        })

    /////////////////////////////////////////////

    //1- insert many

    db.collection('users').insertMany([
        {
            name: 'mansour',
            lasname: 'kalaf',
            age: 45
        },
        {
            name: 'ahmed',
            lasname: 'adam',
            age: 33
        },
        {
            name: 'ahmed',
            lasname: 'ibrahem',
            age: 41
        },
        {
            name: 'ahmed',
            lasname: 'hamouda',
            age: 34
        },
        {
            name: 'fatma',
            lasname: 'abdel hakem',
            age: 27
        },
        {
            name: 'mohamed',
            lasname: 'kamel',
            age: 27
        },
        {
            name: 'ramadan',
            lasname: 'antar',
            age: 36
        },
        {
            name: 'walid',
            lasname: 'said',
            age: 27
        },
        {
            name: 'yaser',
            lasname: 'awad',
            age: 27
        },
        {
            name: 'ahmed',
            lasname: 'hosne',
            age: 40
        },
        {
            name: 'ayman',
            lasname: 'refaee',
            age: 27
        },
    ], (err, data) => {
        if (err) {
            console.log(err);
        }
        console.log('all users insertedCount ==>', data.insertedCount);
    })


    ///////////////////////////////////////////////

    // 3- find All users are 27 years old

    db.collection('users').find({ age: 27 }).toArray((err, data) => {
        if (err) {
            console.log(err);
        }
        console.log('All users are 27 years old ==>');
        console.table(data);
    })

    //////////////////////////////////////////////

    // 4- find users (The first 3 users are 27 years old)

    db.collection('users').find({ age: 27 }).limit(3).toArray((err, data) => {
        if (err) {
            console.log(err);
        }
        console.log('The first 3 users are 27 years old ==>');
        console.table(data);
    })

    //////////////////////////////////////////////

    // 5- Update the name of the first 4 users in the data 

    db.collection('users').find().limit(4).toArray((err, data) => {
        if (err) {
            console.log(err);
        }
        data.forEach((user) => {
            db.collection('users').updateMany(
                { _id: user._id },
                { $set: { name: 'esoo' } }
            )
                .then(data => console.log('update name first 4 users ==> ', data.modifiedCount))
                .catch(err => console.log(err))
        })

    })
    //////////////////////////////////////////////

    // 6- update many ( The first 4 users are 27 years old)

    db.collection('users').find({ age: 27 }).limit(4).toArray((err, data) => {
        if (err) {
            console.log(err);
        }
        data.forEach((user) => {
            db.collection('users').updateMany(
                { _id: user._id },
                { $inc: { age: 4 } }
            )
                .then(data => console.log('update age for 27 =>', data.modifiedCount))
                .catch(err => console.log(err))
        })
        console.table("update age for 27 =>", data);
    })

    //////////////////////////////////////////////


    //////////////////////////////////////////////

    // 7- delete all 41 years olde

    db.collection('users').deleteMany({ age: 41 })
        .then(data => console.log('deleteMany 41 yers', data.deletedCount))
        .catch(err => console.log(err))


    //////////////////////////////////////////////

    // 8- update all users 

    db.collection('users').updateMany(
        {},
        { $inc: { age: 10 } }
    )
        .then(data => console.log('update all age 10 yers', data.modifiedCount))
        .catch(err => console.log(err))


    //////////////////////////////////////////////



})