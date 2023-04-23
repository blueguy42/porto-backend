const { firebase } = require('../../utils');
const { db } = firebase;

async function updateSubtitle1(req, res) {
    try {
        const docRef = db.collection('frontend-db').doc("personal");
        const query = await docRef.get();
        if (!query.exists) {
            throw new Error(`Personal information does not exist.`);
        }
        const subtitle1 = req.body.subtitle1;

        if (subtitle1.length === 0) {
            throw new Error(`Subtitle1 cannot be empty.`);
        }
        
        await docRef.update({ subtitle1 });
        res.status(200).json({ msg: 'Successfully updated subtitle1.', subtitle1 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error.', error: err.message });
    }
}

module.exports = updateSubtitle1;