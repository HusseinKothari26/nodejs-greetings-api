/*jshint esversion: 6 */
const express = require('express');
const app = express();
const port = 3000;

// Api Endpoint to display greeting, taking name as a parameter.
app.get('/hello/:name?', function(req, res, next) {
    var name = req.params.name;
    // Check if parameter missing, greet a stranger.
    if (!name) {
        // Response greeting with name.
        res.send('Hello Stranger!.');
        return;
    }
    else {
        // If name parameter present save in datastore and greet.
        const fs = require('fs');
        // Check if file already existed.
        fs.access('./Greeted_Users_Db.json', fs.F_OK, (err) => {
        if (err) {
            // File does not exists so create file.
            var data = [{"name": name }];
            var writeData = fs.writeFile("Greeted_Users_Db.json", JSON.stringify(data,null,2), (err, result) => { // Write File
                if (err) {
                    return console.error(err);
                } else {
                    console.log("Successfully created file and saved name");
                }
            });
        }
        // File Exists
        fs.readFile("Greeted_Users_Db.json", (err, data) => { // Read File
            if (err) {
                return console.error(err);
            }
            data = JSON.parse(data);
            data.push({"name": name});
            var writeData = fs.writeFile("Greeted_Users_Db.json", JSON.stringify(data,null,2), (err, result) => { // Write File
                if (err) {
                    return console.error(err);
                } else {
                    console.log("Successfully saved name");
                }
            });
        });
    });
    // Response greeting with name.
    res.send('Hello ' + name + '!.');
    }
});
app.listen(port, () => console.log(`Greetings app is listening on port ${port}!`));