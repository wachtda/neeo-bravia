# Sony Bravia IP-Controller for Neeo
Control your [Sony Bravia TV](https://pro-bravia.sony.net/develop/integrate/ip-control/index.html) with a [NEEO remote](https://neeo.com) via IP-Control, without infrared.

Sony Bravia TV devices are auto-discovered on local subnet.
(Manual configuration is not yet possible.)

Tested with:
 - Node.js v10.15
 - NEEO SDK 0.53.8 (https://neeoinc.github.io/neeo-sdk/)
 - Sony Bravia MASTER Series AG9 OLED

## Features
 - Control your Sony Bravia TV with the IP-Control interface from Sony
 - Device-Type: TV with full control of all Sony standard remote commands
 - Auto discovery of Sony Bravia TV's (with automatic device update on changes)
 - Connection setup with pre-shared key (key must be defined on the target TV device)

## TODO
 - Possibility to add manual settings (fixed ip without auto discovery and more)
 - Possibility to configure custom buttons/actions via settings
 - Improve persistency of registered devices

## Requirements
 - Node.js >= v7.6 (https://nodejs.org)
 - NEEO CLI (https://github.com/NEEOInc/neeo-sdk-toolkit/tree/master/cli)

## Installation
Install source with required packages with npm
```
cd my-neeo-server
npm install --save https://github.com/wachtda/neeo-bravia @neeo/cli
```

Start the server with the driver
```
npx neeo-cli start
```
The CLI tool will automatically scan the node_modules directory to find NEEO Drivers.

For Debugging Run
```
DEBUG="neeo:cli*" npx neeo-cli start to see debug messages.
```

## Configuration

1. Enable IP control on your Sony Bravia TV (enable Simple IP control)
2. Define and enter a  Pre-Shared Key on your Sony Bravia TV
3. Search for Sony Bravia TV IP-Controller in your NEEO App (add devices)
4. Enter your Pre-Shared Key and discover your TV on the NEEO app
5. Test the commands and finish the adding process on the NEEO app

## History

### Version 0.0.1

Initial Release