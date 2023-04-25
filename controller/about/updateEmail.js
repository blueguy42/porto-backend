const { firebase } = require('../../utils');
const { db } = firebase;

async function updateEmail(req, res) {
    try {
        const docRef = db.collection('frontend-db').doc("about");
        const query = await docRef.get();
        if (!query.exists) {
            throw new Error(`About information does not exist.`);
        }
        const email = req.body.email;

        if (email.length === 0) {
            throw new Error(`Email cannot be empty.`);
        } else if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new Error(`Email is not a valid email format.`);
        }
        
        await docRef.update({ email });
        res.status(200).json({ msg: 'Successfully updated email.', email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error.', error: err.message });
    }
}

module.exports = updateEmail;