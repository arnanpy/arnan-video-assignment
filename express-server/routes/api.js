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
 

function pipe1(uid){
    return [
        {
            "$addFields": { 
                "likedpeople": { $size: "$liked" }
            }
    
        }, {
            "$addFields": { 
                "isliked": { $in: [ uid , "$liked" ] }
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
    ]
}
var id = 0;
var uid = "";
const ObjectId = mongoose.Types.ObjectId;

function pipe2(id){
    return [
    {
            "$match": { "_id": ObjectId(id) } 
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
} 
router.get('/ranking', (req, res) => {
    uid = req.query.uid
    Video.aggregate(pipe1(uid) ,function (err, videos) {
        if (err) res.status(500).send(err)
        res.status(200).json(videos);

    });
});

router.get('/score/:id', (req, res) => { 
    id = req.params.id
    Video.aggregate(pipe2(id) , (err, videos) => {
        if (err) res.status(500).send(err)
        res.status(200).json(
            {
                'id':id,
                'score':videos[0].score,
                'title':videos[0].title

            });
    });
});

router.post('/videos/like', (req, res) => {
    Video.findById( req.body.id , (err, video) => {
        uid = req.body.uid
        if (err) res.status(500).send(err)
        var idx = video.liked.indexOf(uid)
        if(idx == -1){
            video.liked.push(uid); 
        }
        else{
            video.liked.splice(idx,1);
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
 
module.exports = router;
