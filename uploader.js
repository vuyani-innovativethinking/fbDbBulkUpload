const admin = require("firebase-admin");
 
const serviceAccount = require("./service_key.json");
 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
 
const firestore = admin.firestore();
const path = require("path");
const fs = require("fs");
const directoryPath = path.join(__dirname, "files");
 
fs.readdir(directoryPath, function(err, files) {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
 
  files.forEach(function(file) {
    const lastDotIndex = file.lastIndexOf(".");
 
    const menu = require("./files/" + file);
 
    const count = 0;
    menu.forEach(function(obj) {
      firestore
        .collection(file.substring(0, lastDotIndex))
        .add(obj)
        .then(function(docRef) {
            ++count;
          console.log("Document written " +count);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    });
  });
});