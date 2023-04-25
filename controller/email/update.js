const { firebase } = require('../../utils');
const { db } = firebase;

async function update(req, res) {
    try {
        const docRef = db.collection('frontend-db').doc("admin");
        const query = await docRef.get();
        if (!query.exists) {
            throw new Error(`List of allowed emails does not exist.`);
        }
        const newEmails = req.body.email;

        const validEmails = newEmails.split(', ');
        let valid = true;
        validEmails.forEach((email) => {
            if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                valid = false;
            }
        });

        if (!valid) {
            throw new Error(`Invalid email format.`);
        }
        
        await docRef.update({ email: newEmails });
        res.status(200).json({ msg: 'Successfully updated list of allowed emails.', email: newEmails });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error.', error: err.message });
    }
}

module.exports = update;