const express = require('express');
const router = express.Router();
const async = require('async');
const db = require('../module/pool.js');
const aws = require('aws-sdk');
aws.config.loadFromPath('./config/awsConfig.json');
const s3 = new aws.S3();
const multer = require('multer');
const multerS3 = require('multer-s3');
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'project-iot',
        acl: 'public-read',
        key: function(req, file, cb) {
            cb(null, Date.now() + '.' + file.originalname.split('.').pop());
        }
    })
});

router.post('/', upload.array('photo'), async (req, res) => {
    console.log(req);
    console.log(req.files);
    console.log(req.body);
    let photoUrl = req.files ? req.files[0].location : null
    if(photoUrl == null) {
        res.status(400).send(photoUrl);
    }else {
        res.status(200).send("SUCCESS");
    }
});

module.exports = router;
