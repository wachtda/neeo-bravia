"use strict";

const neeoapi = require("neeo-sdk");
const braviaDriver = require("./index");

// IP of your NEEO Brain
const brainIp = process.env.NEEO_BRAIN_IP;
console.log('- use NEEO Brain IP from env variable', brainIp);
neeoapi.startServer({
    brain: brainIp,
    port: 6336,
    name: 'debug-server',
    devices: [braviaDriver]
})
    .then(() => console.log('Server Ready'))
    .catch((error) => {
        console.error('ERROR:', error);
        process.exit(1);
    });