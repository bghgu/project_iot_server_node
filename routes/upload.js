const express = require('express');
const router = express.Router();
const async = require('async');
const request = require('request-promise');
const db = require('../module/pool.js');
const key = require('../config/msKey').key;
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

let faceId1, faceId2, result2, resutl3, result4, max = Number.MIN_VALUE, id, index;

let options1 = {
    method : 'POST',
    uri : 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect',
    body : {
        url : null
    },
    json : true,
    headers : {
        'Content-Type' : "application/json",
        'ocp-apim-subscription-key' : key
    }
}

let options2 = {
    method : 'POST',
    uri : 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/verify',
    body : {
        faceId1 : null,
        faceId2 : null
    },
    json : true,
    headers : {
        'Content-Type' : "application/json",
        'ocp-apim-subscription-key' : key
    }
}

router.post('/', upload.array('photo'), async (req, res) => {
    if(req.files.length != 0) {
        let photoUrl = req.files ? req.files[0].location : null
        options1.body.url = photoUrl;
        const selectPhotoUrl = "select * from USER"
        const insertLog = "insert into LOG(id) values ?";
        let result = await request(options1);
        faceId1 = result[0].faceId;
        let userList = await db.FindAll(selectPhotoUrl);
        for(i = 0; i < userList.length; i++) {
            let temp = userList[i].photo;
            let id = userList[i].id;
            if(temp != null) {
                options1.body.url = temp;
                result2 = await request(options1);
                faceId2 = result2[0].faceId;
                options2.body.faceId1 = faceId1;
                options2.body.faceId2 = faceId2;
                result3 = await request(options2);
                console.log(result3);
                max = Math.max(max, result3.confidence);
            }
        }
        console.log(max);
        if(Number(max) > 0.7) {
            //await db.execute();
            res.status(200).send("SUCCESS");
        }else {
            res.status(400).send("FAIL");
        }
    }else {
        res.status(400).send("FAIL");
    }
});

module.exports = router;
