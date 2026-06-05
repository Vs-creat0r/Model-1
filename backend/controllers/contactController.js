const fs = require('fs');
const path = require('path');

const contactsFilePath = path.join(__dirname, '../data/contacts.json');

// Ensure contacts file exists
const getContacts = () => {
  if (fs.existsSync(contactsFilePath)) {
    const data = fs.readFileSync(contactsFilePath, 'utf8');
    return JSON.parse(data);
  }
  return [];
};

// @desc    Submit a contact message
// @route   POST /api/contact
// @access  Public
const submitContact = (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const contacts = getContacts();
    contacts.push({
      id: Date.now().toString(),
      name,
      email,
      phone,
      message,
      createdAt: new Date().toISOString(),
    });

    fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2));

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitContact,
};
