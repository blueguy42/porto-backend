const { firebase } = require('../../utils');
const { db } = firebase;

async function read(req, res) {
    try {
        const docRef = db.collection('frontend-db').doc("allowed-emails");
        const query = await docRef.get();
        if (!query.exists) {
            throw new Error(`List of allowed emails does not exist`);
        }
        const email = query.data().emails;
        res.status(200).json({ msg: 'Successfully got list of allowed emails.', email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error.' });
    }
}

module.exports = read;