const { firebase } = require('../../utils');
const { db } = firebase;

async function updateName(req, res) {
    try {
        const docRef = db.collection('frontend-db').doc("personal-information");
        const query = await docRef.get();
        if (!query.exists) {
            throw new Error(`Personal information does not exist`);
        }
        const name = req.body.name;

        if (name.length === 0) {
            throw new Error(`Name cannot be empty`);
        }
        
        await docRef.update({ name });
        res.status(200).json({ msg: 'Successfully updated name.', name });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error.' });
    }
}

module.exports = updateName;