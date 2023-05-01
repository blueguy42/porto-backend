const { firebase } = require('../../utils');
const { db, storage } = firebase;

async function getCvUrl(req, res) {
    try {
        const docRef = db.collection('frontend-db').doc("about");
        const query = await docRef.get();
        if (!query.exists) {
            throw new Error(`About information does not exist.`);
        }
        const cvPath = query.data().cvPath;

        if (!cvPath) {
            throw new Error(`CV path does not exist.`);
        }

        const [url] = await storage.file(cvPath).getSignedUrl({ version: 'v4', action: 'read', expires: Date.now() + 4 * 24 * 60 * 60 * 1000, });
          
        res.status(200).json({ msg: 'Successfully got CV download URL.', url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error.', error: err.message });
    }
}

module.exports = getCvUrl;