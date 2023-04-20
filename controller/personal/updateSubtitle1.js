const { firebase } = require('../../utils');
const { db } = firebase;

async function updateSubtitle1(req, res) {
    try {
        const docRef = db.collection('frontend-db').doc("personal-information");
        const query = await docRef.get();
        if (!query.exists) {
            throw new Error(`Personal information does not exist`);
        }
        const subtitle1 = req.body.subtitle1;
        
        await docRef.update({ subtitle1 });
        res.status(200).json({ msg: 'Successfully updated subtitle1.', subtitle1 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error.' });
    }
}

module.exports = updateSubtitle1;