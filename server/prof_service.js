const Prof = require('./profile_model');

const ReadPreference = require('mongodb').ReadPreference;

require('./mongo').connect();


function create(req, res)
{
    const {id, name, email, registration, roll, about, usertype} = req.body;

    const new_prof = new Prof({id, name, email, registration, roll, about, usertype})

    new_prof.save().then(()=>
    {
        res.json(new_prof)
    })
    .catch(err =>
        {
            res.status(500).send(err);
        })

}


function get(req, res)
{
    const docquery = Prof.find({}).read(ReadPreference.NEAREST);

    docquery.exec()
    .then(profs => 
        res.json(profs))
    .catch(err =>
        {
            res.status(500).send(err);
        });
}



module.exports = {
    get,
    create
};