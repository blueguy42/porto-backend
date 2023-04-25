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
        } else if (slogan.split(/\r\n|\r|\n/).length != 2 ) {
            throw new Error(`Slogan can only have two lines`);
        }
        
        await docRef.update({ slogan });
        res.status(200).json({ msg: 'Successfully updated slogan.', slogan });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error.', error: err.message });
    }
}

module.exports = updateSlogan;