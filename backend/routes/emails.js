const router = require('express').Router();
let CustEmail = require('../models/email.model');

router.route('/add').post((req, res) => {
    const email = req.body.email;

    const newCust = new CustEmail({email});

    newCust.save()
        .then(() => res.json('New email added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;