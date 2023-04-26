const { firebase } = require('../../utils');
const { db } = firebase;

async function updateLinkedIn(req, res) {
    try {
        const docRef = db.collection('frontend-db').doc("about");
        const query = await docRef.get();
        if (!query.exists) {
            throw new Error(`About information does not exist.`);
        }
        const linkedin = req.body.linkedin;

        if (linkedin.length === 0) {
            throw new Error(`LinkedIn cannot be empty.`);
        } else if (!linkedin.match(/^(http(s)?:)?\/\/([\w]+\.)?linkedin\.com\/(pub|in|profile)\/([-a-zA-Z0-9]+)\/*$/g)) {
            throw new Error(`LinkedIn does not have a valid LinkedIn URL format.`);
        }
        
        await docRef.update({ linkedin });
        res.status(200).json({ msg: 'Successfully updated LinkedIn.', linkedin });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error.', error: err.message });
    }
}

module.exports = updateLinkedIn;