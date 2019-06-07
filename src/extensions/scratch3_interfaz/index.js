const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const TargetType = require('../../extension-support/target-type');
const formatMessage = require('format-message');
const Cast = require('../../util/cast');
const log = require('../../util/log');

const io = require('socket.io-client');
var socket = io.connect('http://localhost:4268');

/**
 * Enum for pen color parameter values.
 * @readonly
 * @enum {string}
 */
const SalidasParam = {
    UNO: 1,
    DOS: 2,
    TRES: 3,
    CUATRO: 4
};

class Scratch3Interfaz {
    constructor (runtime) {
        this.runtime = runtime;
    }

    getInfo () {
        return {
            id: 'interfaz',
            name: 'Interfaz Robótica',
            blocks: [
              /*
                {
                    opcode: 'conectar',
                    blockType: BlockType.COMMAND,
                    text: 'Cconectar'
                },
                */
                {
                    opcode: 'conectar',
                    blockType: BlockType.COMMAND,
                    text: 'log__ [SALIDAS_PARAM]',
                    arguments: {
                        SALIDAS_PARAM: {
                            type: ArgumentType.NUMBER,
                            menu: [1,2,3,4],
                            defaultValue: 1
                        },                    
                    } 
                }
            ],
            menus: {
            }
        };
    }

    conectar (args, util) {
        const text = Cast.toString(args.TEXT);
        
        socket.emit('CONNECT', {}, function(result) {
            var dc = new OUTPUT(1);
            dc.on(); 
        });
        
       console.log(text);
    };
}

module.exports = Scratch3Interfaz;