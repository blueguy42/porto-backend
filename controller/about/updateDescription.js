const { firebase } = require('../../utils');
const { db } = firebase;

async function updateDescription(req, res) {
    try {
        const docRef = db.collection('frontend-db').doc("about");
        const query = await docRef.get();
        if (!query.exists) {
            throw new Error(`About information does not exist.`);
        }
        const description = req.body.description;

        if (description.length === 0) {
            throw new Error(`Description cannot be empty.`);
        }
        
        const descriptionLines = descriptionLines.split(/\r\n|\r|\n/);
        if (descriptionLines.length >= 2) {
            throw new Error(`Description must have at least two lines`);
        }
        for (let i = 0; i < descriptionLines.length; i++) {
            if (descriptionLines[i].length === 0) {
                throw new Error(`Description line ${i + 1} cannot be empty.`);
            }
        }
        
        await docRef.update({ description });
        res.status(200).json({ msg: 'Successfully updated description.', description });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error.', error: err.message });
    }
}

module.exports = updateDescription;