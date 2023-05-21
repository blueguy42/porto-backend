const { firebase } = require('../../utils');
const { db } = firebase;

async function visitorCount(req, res) {
    try {
        const docRef = db.collection('frontend-db').doc("misc");
        const query = await docRef.get();
        if (!query.exists) {
            throw new Error(`Miscellaneous document does not exist.`);
        }
        const visitCount = query.data().visitCount;

        await docRef.update({ visitCount: visitCount+1 });
        res.status(200).json({ msg: `You are the ${visitCount+1}st visitor.`, visitCount: visitCount+1 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error.', error: err.message });
    }
}

module.exports = visitorCount;