const { firebase } = require('../../utils');
const { db } = firebase;

async function updateGitHub(req, res) {
    try {
        const docRef = db.collection('frontend-db').doc("about");
        const query = await docRef.get();
        if (!query.exists) {
            throw new Error(`About information does not exist.`);
        }
        const github = req.body.github;

        if (github.length === 0) {
            throw new Error(`GitHub cannot be empty.`);
        } else if (!github.match(/^(http(s)?:)?\/\/(www\.)?github\.com\/([A-z0-9_-]+)\/*/g)) {
            throw new Error(`GitHub does not have a valid GitHub URL format.`);
        }
        
        await docRef.update({ github });
        res.status(200).json({ msg: 'Successfully updated GitHub.', github });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error.', error: err.message });
    }
}

module.exports = updateGitHub;