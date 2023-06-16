const { firebase } = require('../../utils');
const { db } = firebase;

async function addVisitorCount(req, res) {
    try {
        const loc = Buffer.from(req.body.loc, 'base64').toString();
        
        if (loc.length === 0) {
            throw new Error(`Location cannot be empty.`);
        // validate if loc is a valid ipv4 address
        } else if (!loc.match(/^(\d{1,3}\.){3}\d{1,3}$/g)) {
            throw new Error(`Location is not a valid location format.`);
        }
        
        const docRef = db.collection('frontend-db').doc("misc");
        const query = await docRef.get();
        if (!query.exists) {
            throw new Error(`Miscellaneous document does not exist.`);
        }

        const visitCount = query.data().visitCount;
        visitCount.push({ timestamp: Date.now(), ip: loc });

        await docRef.update({ visitCount });
        res.status(200).json({ msg: `You are visitor number ${visitCount.length}.`, visitCount: visitCount.length });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error.', error: err.message });
    }
}

module.exports = addVisitorCount;