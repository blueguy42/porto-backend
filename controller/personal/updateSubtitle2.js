const { firebase } = require('../../utils');
const { db } = firebase;

async function updateSubtitle2(req, res) {
    try {
        const docRef = db.collection('frontend-db').doc("personal-information");
        const query = await docRef.get();
        if (!query.exists) {
            throw new Error(`Personal information does not exist`);
        }
        const subtitle2 = req.body.subtitle2;
        
        await docRef.update({ subtitle2 });
        res.status(200).json({ msg: 'Successfully updated subtitle2.', subtitle2 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error.' });
    }
}

module.exports = updateSubtitle2;