const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

 
const dbHost = 'mongodb://database/boat-mean';
mongoose.connect(dbHost);

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    likes: [Number]
  });


const videoSchema = new mongoose.Schema({
    description: String,
    sources: [String],
    subtitle: [String],
    thumb: String,
    title: String,
    liked: [String],
    views: Number
}, { usePushEach: true });

videoSchema.virtual('score').get(function() {  
    return this.liked.length+this.views;
});

videoSchema.set('toJSON', { 
    virtuals: true
});

const User = mongoose.model('User', userSchema);
const Video = mongoose.model('Video', videoSchema);



 
router.get('/', (req, res) => {
    res.send('api works');
});

 
router.get('/videos', (req, res) => {
    Video.find({}, (err, videos) => {
        if (err) res.status(500).send(err)
        res.status(200).json(videos);
    });
});
 
var pipeline = [
    {
        "$addFields": { 
            "likedpeople": { $size: "$liked" }
        }

    },{ 
        "$addFields": {  
            "score": { "$add": [ "$views", "$likedpeople" ] }
        }
    },
    {
        "$sort": { "score": -1 }
    },
    {
        "$limit": 10
    }   
];
var id = 0;
var pipeline2 = [
    {
        "$match": { "_id": id } 
    },
    {
        "$addFields": { 
            "likedpeople": { $size: "$liked" }
        }

    },{ 
        "$addFields": {  
            "score": { "$add": [ "$views", "$likedpeople" ] }
        }
    } 
];
router.get('/ranking', (req, res) => {
    
    Video.aggregate(pipeline ,function (err, videos) {
        if (err) res.status(500).send(err)
        res.status(200).json(videos);
    });
});

router.get('/score/:id', (req, res) => { 
    id = req.param.id
    Video.aggregate(pipeline2 , (err, users) => {
        if (err) res.status(500).send(err)
        res.status(200).json(users);
    });
    });

router.post('/videos/like', (req, res) => {
    Video.findById( req.body.id , (err, video) => {
        uid = 1
        if (err) res.status(500).send(err)
        if(video.liked.indexOf(uid ) == -1){


            video.liked.push(uid);
            console.log(video.liked)
        }
        video.save(function (err, updatedLike) {
          if (err) res.status(500).send(err)
          res.status(200).json(updatedLike);
        });
    });
});

router.post('/videos/view', (req, res) => {
    Video.findById( req.body.id , (err, video) => { 
        if (err) res.status(500).send(err)
        
        video.views++;
      
        video.save(function (err, updatedView) {
          if (err) res.status(500).send(err)
          res.status(200).json(updatedView);
        });
    });
});

/* GET all users. */
router.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) res.status(500).send(error)

        res.status(200).json(users);
    });
});

/* GET one users. */
router.get('/users/:id', (req, res) => {
    User.findById(req.param.id, (err, users) => {
        if (err) res.status(500).send(err)

        res.status(200).json(users);
    });
});

/* Create a user. */
router.post('/users', (req, res) => {
    let user = new User({
        name: req.body.name,
        id: req.body.id
    });

    user.save(error => {
        if (error) res.status(500).send(err);

        res.status(201).json({
            message: 'User created successfully'
        });
    });
});

module.exports = router;
