const router = require("express").Router()
const Feedback = require('../models/Feedback')



router
    .post('/feedback', async (req, res, next) => {
        try {
            let feedback = await Feedback.create(req.body);
            res.status(200).json({ message: "created" }).location(feedback.id).send()

        } catch (error) {
            next(error)
        }

    })
    .get('/feedback', async (req, res, next) => {
        try {
            let feedback = await Feedback.findAll();
            res.status(200).json(feedback);//transmitem in json

        } catch (error) {
            next(error)
        }
    })
module.exports = router