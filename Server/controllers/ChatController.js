const admin = require('../firebaseConfig');
const db = admin.database();

exports.getMessages = async (req, res) => {
  const roomNumber = req.params.roomNumber;
  try {
    const ref = db.ref(`chats/${roomNumber}`);
    ref.once('value', snapshot => {
      res.status(200).json(snapshot.val());
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  const roomNumber = req.params.roomNumber;
  const { sender, message } = req.body;
  try {
    const ref = db.ref(`chats/${roomNumber}`);
    ref.push({
      sender,
      message,
      timestamp: Date.now()
    });
    res.status(200).json({ message: 'Message sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
