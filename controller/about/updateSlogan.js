const { firebase } = require('../../utils');
const { db } = firebase;

async function updateSlogan(req, res) {
    try {
        const docRef = db.collection('frontend-db').doc("about");
        const query = await docRef.get();
        if (!query.exists) {
            throw new Error(`About information does not exist.`);
        }
        const slogan = req.body.slogan;

        if (slogan.length === 0) {
            throw new Error(`Slogan cannot be empty.`);
        }
        
        const sloganLines = slogan.split(/\r\n|\r|\n/);
        if (sloganLines.length != 2) {
            throw new Error(`Slogan must have two lines`);
        }
        for (let i = 0; i < sloganLines.length; i++) {
            if (sloganLines[i].length > 24) {
                throw new Error(`Slogan line ${i + 1} cannot be more than 24 characters.`);
            }
        }
        
        await docRef.update({ slogan });
        res.status(200).json({ msg: 'Successfully updated slogan.', slogan });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error.', error: err.message });
    }
}

module.exports = updateSlogan;