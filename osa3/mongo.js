const mongoose = require("mongoose");
const { arch } = require("os");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://waeekron:${password}@cluster0.xgkz6.mongodb.net/phonebook-app?retryWrites=true`;

mongoose.connect(url);

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact", contactSchema);

if (process.argv.length === 5) {
  const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4],
  });

  contact.save().then((response) => {
    console.log("contact saved!");
    mongoose.connection.close();
  });
}

if (process.argv.length === 3) {
  Contact.find({}).then((res) => {
    res.forEach((contact) => {
      console.log(contact);
    });
    mongoose.connection.close();
  });
}
