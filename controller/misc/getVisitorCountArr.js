const { firebase } = require('../../utils');
const { db } = firebase;

async function getVisitorCountArr(req, res) {
    try {
        const docRef = db.collection('frontend-db').doc("misc");
        const query = await docRef.get();
        if (!query.exists) {
            throw new Error(`Miscellaneous document does not exist.`);
        }

        const visitCount = query.data().visitCount;

        // return the array
        res.status(200).json({ msg: `There are ${visitCount.length} visitors.`, visitCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error.', error: err.message });
    }
}

module.exports = getVisitorCountArr;