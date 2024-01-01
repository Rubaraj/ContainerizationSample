// import db from '../../../config/db.config.js';

import db from '../../../Common/config/db.config.js';

export const insertData = async (req, res) => {
  try {
    const data = req.body;
    const docRef = db.collection('Customer_Collection').doc();
    await docRef.set(data);
    res.status(200).json({ message: 'Data inserted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

