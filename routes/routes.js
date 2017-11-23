// 각종 라우팅을 연결하는 코드
const express = require('express');
const router = express.Router();

//log
const log = require('./log');
router.use('/log', log);

//photo name and upload
const upload = require('./upload');
router.use('/upload', upload);

//test
const test = require('./test');
router.use('/test', test);

module.exports = router;
