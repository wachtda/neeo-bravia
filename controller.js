'use strict';

/*
 * Device Controller
 * Events on that device from the Brain will be forwarded here for handling.
 * NOTE: there are no multiple devices support for this example, so only the button name is passed
 */
const BraviaRemoteControl = require('sony-bravia-tv-remote');
const braviaIP = '10.0.0.56';
const braviaPort = 80;
const braviaCode = '3028';
const remote = new BraviaRemoteControl(braviaIP, braviaPort, braviaCode);

function tvbuttonMappings() {
    return    [
        {neeo: 'POWER ON', bravia: 'PowerOn'},
        {neeo: 'POWER OFF', bravia: 'PowerOff'},
        {neeo: 'CURSOR LEFT', bravia: 'Left'},
        {neeo: 'CURSOR RIGHT', bravia: 'Right'},
        {neeo: 'CURSOR DOWN', bravia: 'Down'},
        {neeo: 'CURSOR UP', bravia: 'Up'},
        {neeo: 'INPUT HDMI 1', bravia: 'Hdmi1'},
        {neeo: 'INPUT HDMI 2', bravia: 'Hdmi2'},
        {neeo: 'INPUT HDMI 3', bravia: 'Hdmi3'},
        {neeo: 'INPUT HDMI 4', bravia: 'Hdmi4'},
        {neeo: 'HOME', bravia: 'Home'},
        {neeo: 'MUTE TOGGLE', bravia: 'Mute'},
        {neeo: 'VOLUME UP', bravia: 'VolumeUp'},
        {neeo: 'VOLUME DOWN', bravia: 'VolumeDown'},
        {neeo: 'BACK', bravia: 'Return'},
        {neeo: 'STOP', bravia: 'Stop'},
        {neeo: 'ENTER', bravia: 'Enter'},
        {neeo: 'PLAY', bravia: 'Play'},
        {neeo: 'PAUSE', bravia: 'Pause'},
        {neeo: 'RECORD', bravia: 'Rec'},
        {neeo: 'SKIP BACKWARD', bravia: 'Previous'},
        {neeo: 'SKIP FORWARD', bravia: 'Next'},
        {neeo: 'FORWARD', bravia: 'Forward'},
        {neeo: 'REVERSE', bravia: 'Rewind'},
        {neeo: 'MENU', bravia: 'Home'},
        {neeo: 'CHANNEL UP', bravia: 'ChannelUp'},
        {neeo: 'CHANNEL DOWN', bravia: 'ChannelDown'},
        {neeo: 'FUNCTION RED', bravia: 'Red'},
        {neeo: 'FUNCTION GREEN', bravia: 'Green'},
        {neeo: 'FUNCTION YELLOW', bravia: 'Yellow'},
        {neeo: 'CHANNEL BLUE', bravia: 'Blue'},
        {neeo: 'INPUT TV', bravia: 'Tv'},
        {neeo: 'DIGIT 1', bravia: 'Num1'},
        {neeo: 'DIGIT 2', bravia: 'Num2'},
        {neeo: 'DIGIT 3', bravia: 'Num3'},
        {neeo: 'DIGIT 4', bravia: 'Num4'},
        {neeo: 'DIGIT 5', bravia: 'Num5'},
        {neeo: 'DIGIT 6', bravia: 'Num6'},
        {neeo: 'DIGIT 7', bravia: 'Num7'},
        {neeo: 'DIGIT 8', bravia: 'Num8'},
        {neeo: 'DIGIT 9', bravia: 'Num9'},
        {neeo: 'DIGIT 0', bravia: 'Num0'},
        {neeo: 'INPUT TV', bravia: 'Tv'},
        {neeo: 'RADIO', bravia: 'Tv_Radio'},
        {neeo: 'GUIDE', bravia: 'GGuide'},
        {neeo: 'INPUT', bravia: 'Input'},
        {neeo: 'NETFLIX', bravia: 'Netflix'},
    ];
}

module.exports.braviaButtonPressed = function braviaButtonPressed(name, deviceid) {
    const keyMap = tvbuttonMappings().find((key) => key.neeo === name);
    remote.sendAction(keyMap.bravia);
    console.log('Key, NEEO:'+keyMap.neeo+' Bravia:'+keyMap.bravia);
};