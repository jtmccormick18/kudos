const Users = require('../models/Users');
const Kudos = require('../models/Kudos');

module.exports = function (app) {

    app.get('/users', function (req, res) {
        Users.find({})
            .populate('kudos')
            .then(function (users) {
                res.json(users)
            }).catch(function (err) {
                res.json(err);
            });
    })
    app.get('/kudos', function (req, res) {
        Kudos.find({}).then(function (kudos) {
            res.json(kudos);
        }).catch(function (err) {
            res.json(err);
        });
    })
    app.post('/api/users', function (req, res) {
        console.log(req.body)
        Users.create(req.body)
        .then(function (newUser) {
            res.json(newUser)
        }).catch(function (err) {
            res.json(err);
        });
    })
    app.post('/api/kudos', function (req, res) {
        Kudos.create({
            title: req.body.title,
            sender_name: req.body.sender_name,
            receiver_name: req.body.receiver_name,
            body: req.body.body
        })
            .then(function (data) {
                return Users.updateMany(({ _id: req.body.getter_id} || {_id: req.body.sender_id }),
                    {
                        $push: {
                            kudos: data._id
                        }

                    })
            })
            .then(function (data) {
                console.log(data)
                res.json(data)
            })
            .catch(function (err) {
                res.json(err);
            })
    }
    )
}
