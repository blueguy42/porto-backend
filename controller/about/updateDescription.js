const { firebase } = require('../../utils');
const { db } = firebase;

async function updateDescription(req, res) {
    try {
        const docRef = db.collection('frontend-db').doc("about");
        const query = await docRef.get();
        if (!query.exists) {
            throw new Error(`About information does not exist.`);
        }
        const description = req.body.description;

        if (description.length === 0) {
            throw new Error(`Description cannot be empty.`);
        }
        
        await docRef.update({ description });
        res.status(200).json({ msg: 'Successfully updated description.', description });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error.', error: err.message });
    }
}

module.exports = updateDescription;