const { firebase } = require('../../utils');
const { db } = firebase;

async function readSlogan(req, res) {
    try {
        const docRef = db.collection('frontend-db').doc("about");
        const query = await docRef.get();
        if (!query.exists) {
            throw new Error(`About information does not exist.`);
        }
        const slogan = query.data().slogan;
        res.status(200).json({ msg: 'Successfully got slogan.', slogan });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error.', error: err.message });
    }
}

module.exports = readSlogan;