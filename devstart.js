"use strict";
const neeoapi = require("neeo-sdk");
const driver = require("./devices/index");

// IP of your NEEO Brain
const BRAIN_IP = '10.0.0.10';

neeoapi
    .startServer({
        brain: BRAIN_IP,
        port: 6336,
        name: 'debug-server',
        devices: [
            driver.devices,
        ]
    })
    .then(() => console.log('Server Ready'))
    .catch((error) => {
        console.error('ERROR:', error);
        process.exit(1);
    });