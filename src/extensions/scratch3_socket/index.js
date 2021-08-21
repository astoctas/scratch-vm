const ArgumentType = require('../../extension-support/argument-type');
const Color = require('../../util/color');
const BlockType = require('../../extension-support/block-type');
const TargetType = require('../../extension-support/target-type');
const formatMessage = require('format-message');
const Cast = require('../../util/cast');
const log = require('../../util/log');
const MathUtil = require('../../util/math-util');

/**
 * The url of the speech server.
 * @type {string}
 */
const serverURL = 'ws://localhost:42002';

const blockIconURI = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCA0OCA0OCIgdmVyc2lvbj0iMS4xIj48ZyBpZD0ic3VyZmFjZTEiPjxwYXRoIGQ9Ik0yNC4wNDcgNWMtMS41NTUuMDA0LTIuNjMzLjE0LTMuOTM4LjM2Ny0zLjg0Ny42NjgtNC41NDcgMi4wNzgtNC41NDcgNC42NjhWMTRoOXYyaC0xMy42OWMtMi42MzggMC00Ljk0NiAxLjI0Mi01LjY3NyA0LjIxOS0uODI0IDMuNDE4LS44NjMgNS41NTggMCA5LjEyNUM1Ljg1MiAzMi4wMDQgNy4yOTMgMzQgOS45MyAzNGgzLjYzM3YtNS4xMDVjMC0yLjk2NSAyLjY4Ny01Ljg5NSA1Ljc2NS01Ljg5NWg3LjIzNWMyLjUyMyAwIDUtMS44NjMgNS00LjM3OXYtOC41ODZjMC0yLjQzNy0xLjc1OC00LjI2Mi00LjIyLTQuNjcyLjA2My0uMDA0LTEuNzUzLS4zNy0zLjI5Ni0uMzYzem0tNC45ODUgNGMuODIgMCAxLjUuNjc2IDEuNSAxLjUwNGExLjUgMS41IDAgMCAxLTEuNSAxLjQ5NiAxLjQ5IDEuNDkgMCAwIDEtMS41LTEuNDk2YzAtLjgyNC42NjUtMS41MDQgMS41LTEuNTA0eiIgZmlsbD0iIzAyNzdCRCIvPjxwYXRoIGQ9Ik0yMy4wNzggNDNjMS41NTUtLjAwNCAyLjYzMy0uMTQgMy45MzgtLjM2NyAzLjg0Ny0uNjY4IDQuNTQ3LTIuMDc4IDQuNTQ3LTQuNjY4VjM0aC05di0yaDEzLjY5NWMyLjYzMyAwIDQuOTQxLTEuMjQyIDUuNjcyLTQuMjE5LjgyOC0zLjQxOC44NjMtNS41NTggMC05LjEyNS0uNjU3LTIuNjYtMi4wOTgtNC42NTYtNC43MzUtNC42NTZoLTMuNjMzdjUuMTA1YzAgMi45NjUtMi42ODcgNS44OTUtNS43NjUgNS44OTVoLTcuMjM1Yy0yLjUyMyAwLTUgMS44NjMtNSA0LjM3OXY4LjU4NmMwIDIuNDM3IDEuNzU4IDQuMjYyIDQuMjIgNC42NzItLjA2My4wMDQgMS43NTMuMzcgMy4yOTYuMzYzem00Ljk4NS00Yy0uODIgMC0xLjUtLjY3Ni0xLjUtMS41MDRhMS41IDEuNSAwIDAgMSAxLjUtMS40OTZjLjgzNSAwIDEuNS42NjQgMS41IDEuNDk2IDAgLjgyNC0uNjY1IDEuNTA0LTEuNSAxLjUwNHoiIGZpbGw9IiNGRkMxMDciLz48L2c+PG1ldGFkYXRhPjxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgeG1sbnM6cmRmcz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj48cmRmOkRlc2NyaXB0aW9uIGFib3V0PSJodHRwczovL2ljb25zY291dC5jb20vbGVnYWwjbGljZW5zZXMiIGRjOnRpdGxlPSJweXRob24iIGRjOmRlc2NyaXB0aW9uPSJweXRob24iIGRjOnB1Ymxpc2hlcj0iSWNvbnNjb3V0IiBkYzpkYXRlPSIyMDE3LTEyLTE1IiBkYzpmb3JtYXQ9ImltYWdlL3N2Zyt4bWwiIGRjOmxhbmd1YWdlPSJlbiI+PGRjOmNyZWF0b3I+PHJkZjpCYWc+PHJkZjpsaT5JY29uczg8L3JkZjpsaT48L3JkZjpCYWc+PC9kYzpjcmVhdG9yPjwvcmRmOkRlc2NyaXB0aW9uPjwvcmRmOlJERj48L21ldGFkYXRhPjwvc3ZnPg==";

class Scratch3Socket {
    constructor (runtime) {
        this.runtime = runtime;
        this._socket = new WebSocket(serverURL);
        this._messages = new Array();
        var me = this;

        // Connection opened
        this._socket.addEventListener('open', function (event) {
            console.log("Websocket opened");
        });

        // Listen for messages
        this._socket.addEventListener('message', function (event) {
            try {
                var msg = JSON.parse(event.data);
            }
            catch(error) {
                console.log(error);
                return;
            }
            if(typeof msg.message == "undefined") return;
            var exists = false; 
            for (let index = 0; index < me._messages.length; index++) {
                if(me._messages[index].id == msg.message) {
                    me._messages[index].data = msg.data;
                    me._messages[index].new = true;
                    exists = true;
                }
            }
            if(!exists) {
                me._messages.push({"id": msg.message, "data": msg.data});
            }
        });

    }

    getInfo () {
        return {
            id: 'socket',
            name: 'Python',
            blockIconURI: blockIconURI,
           // showStatusButton: true,
            blocks: [

                {
                    opcode: 'send',
                    blockType: BlockType.COMMAND,
                    text:  'enviar [MSG] [DATA]',
                    arguments: {
                        MSG: {
                            type: ArgumentType.STRING,
                            defaultValue: 'mensaje' 
                        },                   
                        DATA: {
                            type: ArgumentType.STRING,
                            defaultValue: 'datos' 
                        }                    
                    } 
                },
                {
                    opcode: 'receive',
                    blockType: BlockType.HAT,
                    text:  'al recibir [MSG]',
                    arguments: {
                        MSG: {
                            type: ArgumentType.STRING,
                            defaultValue: 'mensaje' 
                        }                  
                    } 
                },
                {
                    opcode: 'getdata',
                    blockType: BlockType.REPORTER,
                    text: 'datos [MSG]',
                    arguments: {
                        MSG: {
                            type: ArgumentType.STRING,
                            defaultValue: 'mensaje' 
                        }
                    }
                }

            ],
            menus: {
                //salidas: ['1','2','3','4'],
            }
        };
    }


    
    send(args, util) {
        var msg = {"message": args.MSG, "data": args.DATA};
        this._socket.send(JSON.stringify(msg));
    }


    receive (args, util) {
        var result = false;
        for (let index = 0; index < this._messages.length; index++) {
            if(this._messages[index].id == args.MSG) {
                result = this._messages[index].new;
                this._messages[index].new = false; 
            }
        }
        return result;
    }    

    getdata (args, util) { 
        for (let index = 0; index < this._messages.length; index++) {
            if(this._messages[index].id == args.MSG) {
                return this._messages[index].data;
            }
        }
    }    
    
    
}

module.exports = Scratch3Socket;
