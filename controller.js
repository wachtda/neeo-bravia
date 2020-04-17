'use strict';
const constNeeo = require('./constants-neeo');
const constBravia = require('./constants-bravia');
const BraviaRemoteControl = require('sony-bravia-tv-remote');

const braviaIP = process.env.BRAVIA_IP;
const braviaPort = process.env.BRAVIA_PORT;
const braviaCode = process.env.BRAVIA_CODE;
console.debug('- connect to Sony Bravia TV: ' + braviaIP + ':' + braviaPort + ' (code: ' + braviaCode + ')');
const remote = new BraviaRemoteControl(braviaIP, braviaPort, braviaCode);

function tvButtonMappings() {
    let buttons = new Map();
    // NEEO BUTTONS
    buttons.set(constNeeo.BTN_NEEO_POWER_ON, { label: 'Power On', braviaFunc: constBravia.FUNC_POWER_ON });
    buttons.set(constNeeo.BTN_NEEO_POWER_OFF, { label: 'Power Off', braviaFunc: constBravia.FUNC_POWER_OFF });
    buttons.set(constNeeo.BTN_NEEO_CURSOR_LEFT, { label: 'Left', braviaFunc: constBravia.FUNC_LEFT });
    buttons.set(constNeeo.BTN_NEEO_CURSOR_RIGHT, { label: 'Right', braviaFunc: constBravia.FUNC_RIGHT });
    buttons.set(constNeeo.BTN_NEEO_CURSOR_DOWN, { label: 'Down', braviaFunc: constBravia.FUNC_DOWN });
    buttons.set(constNeeo.BTN_NEEO_CURSOR_UP, { label: 'Up', braviaFunc: constBravia.FUNC_UP });
    buttons.set(constNeeo.BTN_NEEO_CURSOR_ENTER, { label: 'Enter', braviaFunc: constBravia.FUNC_ENTER });
    buttons.set(constNeeo.BTN_NEEO_MUTE, { label: 'Mute', braviaFunc: constBravia.FUNC_MUTE });
    buttons.set(constNeeo.BTN_NEEO_VOLUME_UP, { label: 'Volume Up', braviaFunc: constBravia.FUNC_VOLUME_UP });
    buttons.set(constNeeo.BTN_NEEO_VOLUME_DOWN, { label: 'Volume Down', braviaFunc: constBravia.FUNC_VOLUME_DOWN });
    buttons.set(constNeeo.BTN_NEEO_CHANNEL_UP, { label: 'Channel Up', braviaFunc: constBravia.FUNC_CHANNEL_UP });
    buttons.set(constNeeo.BTN_NEEO_CHANNEL_DOWN, { label: 'Channel Down', braviaFunc: constBravia.FUNC_CHANNEL_DOWN });
    buttons.set(constNeeo.BTN_NEEO_MENU, { label: 'Menu', braviaFunc: constBravia.FUNC_HOME });
    buttons.set(constNeeo.BTN_NEEO_GUIDE, { label: 'Guide', braviaFunc: constBravia.FUNC_GUIDE });
    buttons.set(constNeeo.BTN_NEEO_BACK, { label: 'Back', braviaFunc: constBravia.FUNC_RETURN });
    buttons.set(constNeeo.BTN_NEEO_EXIT, { label: 'Exit', braviaFunc: constBravia.FUNC_HOME });
    buttons.set(constNeeo.BTN_NEEO_FUNCTION_RED, { label: 'Red', braviaFunc: constBravia.FUNC_RED });
    buttons.set(constNeeo.BTN_NEEO_FUNCTION_GREEN, { label: 'Green', braviaFunc: constBravia.FUNC_GREEN });
    buttons.set(constNeeo.BTN_NEEO_FUNCTION_YELLOW, { label: 'Yellow', braviaFunc: constBravia.FUNC_YELLOW });
    buttons.set(constNeeo.BTN_NEEO_FUNCTION_BLUE, { label: 'Blue', braviaFunc: constBravia.FUNC_BLUE });
    buttons.set(constNeeo.BTN_NEEO_DIGIT_0, { label: '0', braviaFunc: constBravia.FUNC_DIGIT_0 });
    buttons.set(constNeeo.BTN_NEEO_DIGIT_1, { label: '1', braviaFunc: constBravia.FUNC_DIGIT_1 });
    buttons.set(constNeeo.BTN_NEEO_DIGIT_2, { label: '2', braviaFunc: constBravia.FUNC_DIGIT_2 });
    buttons.set(constNeeo.BTN_NEEO_DIGIT_3, { label: '3', braviaFunc: constBravia.FUNC_DIGIT_3 });
    buttons.set(constNeeo.BTN_NEEO_DIGIT_4, { label: '4', braviaFunc: constBravia.FUNC_DIGIT_4 });
    buttons.set(constNeeo.BTN_NEEO_DIGIT_5, { label: '5', braviaFunc: constBravia.FUNC_DIGIT_5 });
    buttons.set(constNeeo.BTN_NEEO_DIGIT_6, { label: '6', braviaFunc: constBravia.FUNC_DIGIT_6 });
    buttons.set(constNeeo.BTN_NEEO_DIGIT_7, { label: '7', braviaFunc: constBravia.FUNC_DIGIT_7 });
    buttons.set(constNeeo.BTN_NEEO_DIGIT_8, { label: '8', braviaFunc: constBravia.FUNC_DIGIT_8 });
    buttons.set(constNeeo.BTN_NEEO_DIGIT_9, { label: '9', braviaFunc: constBravia.FUNC_DIGIT_9 });
    // BRAVIA BUTTTONS
    buttons.set(constNeeo.BTN_BRAVIA_INPUT_TV, { label: 'TV', braviaFunc: constBravia.FUNC_INPUT_TV });
    buttons.set(constNeeo.BTN_BRAVIA_INPUT_RADIO, { label: 'Radio', braviaFunc: constBravia.FUNC_INPUT_RADIO });
    buttons.set(constNeeo.BTN_BRAVIA_INPUT, { label: 'Input', braviaFunc: constBravia.FUNC_INPUT });
    buttons.set(constNeeo.BTN_BRAVIA_INPUT_HDMI1, { label: 'HDMI 1', braviaFunc: constBravia.FUNC_INPUT_HDMI1 });
    buttons.set(constNeeo.BTN_BRAVIA_INPUT_HDMI2, { label: 'HDMI 2', braviaFunc: constBravia.FUNC_INPUT_HDMI2 });
    buttons.set(constNeeo.BTN_BRAVIA_INPUT_HDMI3, { label: 'HDMI 3', braviaFunc: constBravia.FUNC_INPUT_HDMI3 });
    buttons.set(constNeeo.BTN_BRAVIA_INPUT_HDMI4, { label: 'HDMI 4', braviaFunc: constBravia.FUNC_INPUT_HDMI4 });
    buttons.set(constNeeo.BTN_BRAVIA_STOP, { label: 'Stop', braviaFunc: constBravia.FUNC_STOP });
    buttons.set(constNeeo.BTN_BRAVIA_ENTER, { label: 'Enter', braviaFunc: constBravia.FUNC_ENTER });
    buttons.set(constNeeo.BTN_BRAVIA_PLAY, { label: 'Play', braviaFunc: constBravia.FUNC_PLAY });
    buttons.set(constNeeo.BTN_BRAVIA_PAUSE, { label: 'Pause', braviaFunc: constBravia.FUNC_PAUSE });
    buttons.set(constNeeo.BTN_BRAVIA_RECORD, { label: 'Rec', braviaFunc: constBravia.FUNC_REC });
    buttons.set(constNeeo.BTN_BRAVIA_SKIP_BACKWARD, { label: 'Skip Back', braviaFunc: constBravia.FUNC_SKIP_BACKWARD });
    buttons.set(constNeeo.BTN_BRAVIA_SKIP_FORWARD, { label: 'Skip Forward', braviaFunc: constBravia.FUNC_SKIP_FORWARD });
    buttons.set(constNeeo.BTN_BRAVIA_FORWARD, { label: 'Forward', braviaFunc: constBravia.FUNC_FORWARD });
    buttons.set(constNeeo.BTN_BRAVIA_REVERSE, { label: 'Reverse', braviaFunc: constBravia.FUNC_REVERSE });
    buttons.set(constNeeo.BTN_BRAVIA_NETFLIX, { label: 'Netflix', braviaFunc: constBravia.FUNC_NETFLIX });
    buttons.set(constNeeo.BTN_BRAVIA_GOOGLE_PLAY, { label: 'Goole Play', braviaFunc: constBravia.FUNC_GOOGLE_PLAY });
    return buttons;
}
module.exports.tvButtonMappings = tvButtonMappings();
module.exports.braviaButtonPressed = function braviaButtonPressed(name, deviceid) {
    const button = tvButtonMappings().find(name);
    remote.sendAction(button.braviaFunc);
    console.debug('Key, NEEO(' + deviceid + '): '+ name + ' Bravia: ' + button.braviaFunc);
};