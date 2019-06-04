const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const TargetType = require('../../extension-support/target-type');
const formatMessage = require('format-message');
const Cast = require('../../util/cast');
const log = require('../../util/log');

const io = require('socket.io-client');
var socket = io.connect('http://localhost:4268');


/*
var SerialPort = require("../../../node_modules/browser-serialport").SerialPort;
var serialPort = new SerialPort("/dev/ttyUSB0", {
    baudrate: 57600
  });
*/

class Device {
    constructor(device, options) { 
    this.device = device;
    this.options = options;
    this.id = false;
    let me = this;
    socket.emit('DEVICE', {  device: device, options: options}, this.setId.bind(this));
        /*
    socket.emit('DEVICE', {  device: device, options: options}, function (result) {
        console.log(result);
      me.id = result;
    });
    */
  }

  setId(result) {
      this.id = result;
  }

/**
 * On(): Create event listener
 *
 * @param event {String} Event to listen
 * @param attributes {Object} Attributes to receive from device
 * @param callback {myCallback} Callback to execute on data received
 * 
 * example:
 *  gps.on("change", ["latitude","longitude"] , function(d) { console.log(d) });
 */  
  on(event, attributes, callback) {
      socket.emit('DEVICE_EVENT', { id: this.id, event: event, attributes: attributes}, function (result) {
        console.log(result);
    });
    let me = this;
      if(typeof callback == "function")
        socket.on(event + this.id, function (data) {
            callback(data);
        })
  }

/**
 * Call(): Call method on device
 *
 * @param method {String} method to run with parenthesis and parameters
 * 
 * example:
 *    led.call('on(10)');
 */  
  call(method) {
      console.log(this.id);
    socket.emit('DEVICE_CALL', { id: this.id, method: method }, function (result) { 
      console.log(result);
    })
  }
}

class OUTPUT  {
    /**
   * Class Output
   * @constructor Output()
   *
   * @param index {Integer} output number
   * 
   */
    constructor(index) {
      this.index = index;
    }
    /**
   * On(): Turns ouput on
   *
   */
    on() {
      socket.emit('OUTPUT', { index: this.index, method: 'on' });
    }
    /**
   * Off(): Turns ouput off
   *
   */
    off() {
      socket.emit('OUTPUT', { index: this.index, method: 'off' });
    }
    /**
   * Brake(): Applies brake
   *
   */
    brake() {
      socket.emit('OUTPUT', { index: this.index, method: 'brake' });
    }
    /**
   * Inverse(): Inverts direction
   *
   */
    inverse() {
      socket.emit('OUTPUT', { index: this.index, method: 'inverse' }); 
    }
    /**
   * Direction(): Sets direction
   *
   * @param dir {Integer} direction: 0, 1
   * 
   */
    direction(dir) {
      socket.emit('OUTPUT', { index: this.index, method: 'direction', param: dir });
    }
    /**
   * Power(): Sets pwm power
   *
   * @param pow {Integer} power: 0 to 255
   * 
   */
    power(pow) {
      socket.emit('OUTPUT', { index: this.index, method: 'power', param: pow });
    }
  };



class Scratch3Interfaz {
    constructor (runtime) {
        this.runtime = runtime;
    }

    getInfo () {
        return {
            id: 'interfaz',
            name: 'Interfaz RRobótica',
            blocks: [
                {
                    opcode: 'conectar',
                    blockType: BlockType.COMMAND,
                    text: 'Cconectar'
                },
                {
                    opcode: 'Conectar',
                    blockType: BlockType.COMMAND,
                    text: 'log [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "hello"
                        }
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
        });
    };
}

module.exports = Scratch3Interfaz;