const express = require('express');
const router = express.Router();
const async = require('async');

const db = require('../module/pool.js');

router.get('/', async(req, res) => {
    const selectTime = "select l.index, u.name,l.time from LOG l join USER u on l.id = u.id ORDER BY l.index asc"
    let data = await db.FindAll(selectTime);
    res.status(200).send(data);
});

module.exports = router;
