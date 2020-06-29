var express = require("express");
var app = express();
const { Connection, CommandCall } = require('itoolkit');
const { parseString } = require('xml2js');

app.get("/url", (req, res, next) => {
    const connection = new Connection({
        transport: 'rest',
        transportOptions: { host: 'sipprod2', username: 'AMIKAOUANI', password: 'AMIKAOUANI', url: "http://sipprod2:8081/cgi-bin/xmlcgi.pgm" },
    });

    const command = new CommandCall({ type: 'cl', command: 'CHGUSRPRF USRPRF(aminetest) PASSWORD(AJDBC_2021)' });

    connection.add(command);

    connection.run((error, xmlOutput) => {
        if (error) {
            throw error;
        }
        parseString(xmlOutput, (parseError, result) => {
            if (parseError) {
                throw parseError;
            }
            res.json(JSON.stringify(result));
        });
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
