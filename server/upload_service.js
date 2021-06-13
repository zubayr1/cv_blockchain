const Upld = require('./upload_model');

const ReadPreference = require('mongodb').ReadPreference;

require('./mongo').connect();


function create(req, res)
{
    const {id, registration, roll,catype, doctype, check, hash } = req.body;

    const new_upld = new Upld({id,  registration, roll,catype, doctype, check, hash})

    new_upld.save().then(()=>
    {
        res.json(new_upld)
    })
    .catch(err =>
        {
            res.status(500).send(err);
        })

}


function get(req, res)
{
    const docquery = Upld.find({}).read(ReadPreference.NEAREST);

    docquery.exec()
    .then(upld => 
        res.json(upld))
    .catch(err =>
        {
            res.status(500).send(err);
        });
}



module.exports = {
    get,
    create
};