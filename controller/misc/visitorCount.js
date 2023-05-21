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
        visitCount.push(new Date().getTime());

        await docRef.update({ visitCount });
        res.status(200).json({ msg: `You are visitor number ${visitCount.length}.`, visitCount: visitCount.length });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error.', error: err.message });
    }
}

module.exports = visitorCount;