const { firebase } = require('../../utils');
const { db } = firebase;

async function read(req, res) {
    try {
        const docRef = db.collection('frontend-db').doc("personal-information");
        const query = await docRef.get();
        if (!query.exists) {
            throw new Error(`Personal information does not exist`);
        }
        const data = query.data();
        res.status(200).json({ msg: 'Successfully got personal information.', data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error.', error: err.message });
    }
}

module.exports = read;