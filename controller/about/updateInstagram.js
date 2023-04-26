const { firebase } = require('../../utils');
const { db } = firebase;

async function updateInstagram(req, res) {
    try {
        const docRef = db.collection('frontend-db').doc("about");
        const query = await docRef.get();
        if (!query.exists) {
            throw new Error(`About information does not exist.`);
        }
        const instagram = req.body.instagram;

        if (instagram.length === 0) {
            throw new Error(`Instagram cannot be empty.`);
        } else if (!instagram.match(/^(http(s)?:)?\/\/(www\.)?instagram\.com\/([_.a-zA-Z0-9]+)\/*$/g)) {
            throw new Error(`Instagram does not have a valid Instagram URL format.`);
        }
        
        await docRef.update({ instagram });
        res.status(200).json({ msg: 'Successfully updated Instagram.', instagram });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error.', error: err.message });
    }
}

module.exports = updateInstagram;