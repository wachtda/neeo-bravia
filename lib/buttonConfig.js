'use strict';
const logger = require('./logger');
const fs = require('fs');
let buttons = new Map();

module.exports.initvButtonMappingsFromConfig = function() {
    let rawdata = fs.readFileSync('buttonconfig.json');
    const data = JSON.parse(rawdata);
    for(var i = 0; i < data.length; i++) {
        const config = data[i];
        if(config.func != null) {
            buttons.set(config.button, {label: config.label, func: config.func})
        } else if(config.app != null) {
            buttons.set(config.button, {label: config.label, launchApp: config.app})
        }
    }
};
module.exports.tvButtonsMapping = buttons;