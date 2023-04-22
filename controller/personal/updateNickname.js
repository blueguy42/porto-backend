const { firebase } = require('../../utils');
const { db } = firebase;

async function updateNickname(req, res) {
    try {
        const docRef = db.collection('frontend-db').doc("personal-information");
        const query = await docRef.get();
        if (!query.exists) {
            throw new Error(`Personal information does not exist.`);
        }
        const nickname = req.body.nickname;

        if (nickname.length === 0) {
            throw new Error(`Nickname cannot be empty.`);
        }
        
        await docRef.update({ nickname });
        res.status(200).json({ msg: 'Successfully updated nickname.', nickname });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error.', error: err.message });
    }
}

module.exports = updateNickname;