const ArgumentType = require('../../extension-support/argument-type');
const Color = require('../../util/color');
const BlockType = require('../../extension-support/block-type');
const TargetType = require('../../extension-support/target-type');
const formatMessage = require('format-message');
const Cast = require('../../util/cast');
const log = require('../../util/log');
const MathUtil = require('../../util/math-util');

const io = require('socket.io-client');
//const io = require('http://localhost:4268/socket.io/socket.io.js');
//const io = require('../../../node_modules/socket.io-client/dist/socket.io');

var socket = io.connect('http://localhost:4268');

const blockIconURI = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSItNDYgMCA1MTIgNTEyIiB3aWR0aD0iNTEycHgiPjxwYXRoIGQ9Im00MTAgNDMwdjcyaC02MHYtMTEyaDIwYzIyLjA4OTg0NCAwIDQwIDE3LjkxMDE1NiA0MCA0MHptMCAwIiBmaWxsPSIjNjc2ZTc0Ii8+PHBhdGggZD0ibTMxMC4wNTA3ODEgOTBoLTIwMC4xMDE1NjJjLTIyLjA4OTg0NCAwLTQwIDE3LjkxMDE1Ni00MCA0MHYxNDBjMCAyMi4wODk4NDQgMTcuOTEwMTU2IDQwIDQwIDQwaDIwMC4xMDE1NjJjMjIuMDg5ODQ0IDAgNDAtMTcuOTEwMTU2IDQwLTQwdi0xNDBjMC0yMi4wODk4NDQtMTcuOTEwMTU2LTQwLTQwLTQwem0wIDAiIGZpbGw9IiNmZjgwYWMiLz48cGF0aCBkPSJtMzEwIDM1MGgtMjAwYy0yMi4wODk4NDQgMC00MCAxNy45MTAxNTYtNDAgNDB2MTEyaDI4MHYtMTEyYzAtMjIuMDg5ODQ0LTE3LjkxMDE1Ni00MC00MC00MHptMCAwIiBmaWxsPSIjZmY4MGFjIi8+PGcgZmlsbD0iI2ZmZjM1YyI+PHBhdGggZD0ibTMxMCAxNjBjMCAxNi41NzAzMTItMTMuNDI5Njg4IDMwLTMwIDMwcy0zMC0xMy40Mjk2ODgtMzAtMzAgMTMuNDI5Njg4LTMwIDMwLTMwIDMwIDEzLjQyOTY4OCAzMCAzMHptMCAwIi8+PHBhdGggZD0ibTI3MCAyMzBoLTEyMGMtMTEuMDUwNzgxIDAtMjAgOC45NDkyMTktMjAgMjB2NjBoMTYwdi02MGMwLTExLjA1MDc4MS04Ljk0OTIxOS0yMC0yMC0yMHptMCAwIi8+PHBhdGggZD0ibTI3MCA0NTB2NTJoLTEyMHYtNTJjMC0xMS4wNTA3ODEgOC45NDkyMTktMjAgMjAtMjBoODBjMTEuMDUwNzgxIDAgMjAgOC45NDkyMTkgMjAgMjB6bTAgMCIvPjwvZz48cGF0aCBkPSJtMTUwIDMxMGgxMjB2NDBoLTEyMHptMCAwIiBmaWxsPSIjNjc2ZTc0Ii8+PHBhdGggZD0ibTI3MCA3MHYyMGgtMTIwdi0yMGMwLTExLjA1MDc4MSA4Ljk0OTIxOS0yMCAyMC0yMGg4MGMxMS4wNTA3ODEgMCAyMCA4Ljk0OTIxOSAyMCAyMHptMCAwIiBmaWxsPSIjNjc2ZTc0Ii8+PHBhdGggZD0ibTE3MCAxNjBjMCAxNi41NzAzMTItMTMuNDI5Njg4IDMwLTMwIDMwcy0zMC0xMy40Mjk2ODgtMzAtMzAgMTMuNDI5Njg4LTMwIDMwLTMwIDMwIDEzLjQyOTY4OCAzMCAzMHptMCAwIiBmaWxsPSIjZmZmMzVjIi8+PHBhdGggZD0ibTcwIDM5MHYxMTJoLTYwdi03MmMwLTIyLjA4OTg0NCAxNy45MTAxNTYtNDAgNDAtNDB6bTAgMCIgZmlsbD0iIzY3NmU3NCIvPjxwYXRoIGQ9Im0xMCA1MTJoNDAwYzUuNTIzNDM4IDAgMTAtNC40NzY1NjIgMTAtMTB2LTcyYzAtMjcuNTcwMzEyLTIyLjQyOTY4OC01MC01MC01MGgtMTEuMDA3ODEyYy00LjY0NDUzMi0yMi43OTY4NzUtMjQuODQzNzUtNDAtNDguOTkyMTg4LTQwaC0zMHYtMjBoMzAuMDUwNzgxYzI3LjU3MDMxMyAwIDQ5Ljk0OTIxOS0yMi40Mjk2ODggNDkuOTQ5MjE5LTUwdi0xNDBjMC0yNy41NzAzMTItMjIuMzc4OTA2LTUwLTQ5Ljk0OTIxOS01MGgtMzAuMDUwNzgxdi0xMGMwLTE2LjU0Mjk2OS0xMy40NTcwMzEtMzAtMzAtMzBoLTMwdi0zMGMwLTUuNTIzNDM4LTQuNDc2NTYyLTEwLTEwLTEwcy0xMCA0LjQ3NjU2Mi0xMCAxMHYzMGgtMzBjLTE2LjU0Mjk2OSAwLTMwIDEzLjQ1NzAzMS0zMCAzMHYxMGgtMzAuMDUwNzgxYy0yNy41NzAzMTMgMC00OS45NDkyMTkgMjIuNDI5Njg4LTQ5Ljk0OTIxOSA1MHY2MGMwIDUuNTIzNDM4IDQuNDI1NzgxIDEwIDkuOTQ5MjE5IDEwIDUuNTIzNDM3IDAgMTAtNC40NzY1NjIgMTAtMTB2LTIwaDIxLjMxNjQwNmM0LjQ1MzEyNSAxNy4yMzQzNzUgMjAuMTI4OTA2IDMwIDM4LjczNDM3NSAzMCAyMi4wNTQ2ODggMCA0MC0xNy45NDUzMTIgNDAtNDBzLTE3Ljk0NTMxMi00MC00MC00MGMtMTguNjA1NDY5IDAtMzQuMjgxMjUgMTIuNzY1NjI1LTM4LjczNDM3NSAzMGgtMjEuMzE2NDA2di0yMGMwLTE2LjU0Mjk2OSAxMy40NTcwMzEtMzAgMzAtMzBoMjAwLjEwMTU2MmMxNi41NDI5NjkgMCAzMCAxMy40NTcwMzEgMzAgMzB2MjBoLTIxLjMxNjQwNmMtNC40NTMxMjUtMTcuMjM0Mzc1LTIwLjEyODkwNi0zMC0zOC43MzQzNzUtMzAtMjIuMDU0Njg4IDAtNDAgMTcuOTQ1MzEyLTQwIDQwczE3Ljk0NTMxMiA0MCA0MCA0MGMxOC42MDU0NjkgMCAzNC4yODEyNS0xMi43NjU2MjUgMzguNzM0Mzc1LTMwaDIxLjMxNjQwNnYxMDBjMCAxNi41NDI5NjktMTMuNDU3MDMxIDMwLTMwIDMwaC0xMC4wNTA3ODF2LTUwYzAtMTYuNTQyOTY5LTEzLjQ1NzAzMS0zMC0zMC0zMGgtMTIwYy0xNi41NDI5NjkgMC0zMCAxMy40NTcwMzEtMzAgMzB2NTBoLTEwLjA1MDc4MWMtMTYuNTQyOTY5IDAtMzAtMTMuNDU3MDMxLTMwLTMwIDAtNS41MjM0MzgtNC40NzY1NjMtMTAtMTAtMTAtNS41MjM0MzggMC0xMCA0LjQ3NjU2Mi0xMCAxMCAwIDI3LjU3MDMxMiAyMi40Mjk2ODcgNTAgNTAgNTBoMzAuMDUwNzgxdjIwaC0zMGMtMjQuMTQ0NTMxIDAtNDQuMzQ3NjU2IDE3LjIwMzEyNS00OC45OTIxODggNDBoLTExLjAwNzgxMmMtMjcuNTcwMzEyIDAtNTAgMjIuNDI5Njg4LTUwIDUwdjcyYzAgNS41MjM0MzggNC40NzY1NjIgMTAgMTAgMTB6bTEzMC0zNzJjMTEuMDI3MzQ0IDAgMjAgOC45NzI2NTYgMjAgMjBzLTguOTcyNjU2IDIwLTIwIDIwLTIwLTguOTcyNjU2LTIwLTIwIDguOTcyNjU2LTIwIDIwLTIwem0yMC03MGMwLTUuNTE1NjI1IDQuNDg0Mzc1LTEwIDEwLTEwaDgwYzUuNTE1NjI1IDAgMTAgNC40ODQzNzUgMTAgMTB2MTBoLTEwMHptMTIwIDExMGMtMTEuMDI3MzQ0IDAtMjAtOC45NzI2NTYtMjAtMjBzOC45NzI2NTYtMjAgMjAtMjAgMjAgOC45NzI2NTYgMjAgMjAtOC45NzI2NTYgMjAtMjAgMjB6bS0yMCAzMTJoLTEwMHYtNDJjMC01LjUxNTYyNSA0LjQ4NDM3NS0xMCAxMC0xMGg4MGM1LjUxNTYyNSAwIDEwIDQuNDg0Mzc1IDEwIDEwem0xNDAtNjJ2NjJoLTQwdi05MmgxMGMxNi41NDI5NjkgMCAzMCAxMy40NTcwMzEgMzAgMzB6bS0yNTAtMTkwaDEyMGM1LjUxNTYyNSAwIDEwIDQuNDg0Mzc1IDEwIDEwdjEwaC0xNDB2LTEwYzAtNS41MTU2MjUgNC40ODQzNzUtMTAgMTAtMTB6bS0xMCA0MGgxNDB2MjBoLTE0MHptMjAgNDBoMTAwdjIwaC0xMDB6bS01MCA0MGgyMDBjMTYuNTQyOTY5IDAgMzAgMTMuNDU3MDMxIDMwIDMwdjEwMmgtNjB2LTQyYzAtMTYuNTQyOTY5LTEzLjQ1NzAzMS0zMC0zMC0zMGgtODBjLTE2LjU0Mjk2OSAwLTMwIDEzLjQ1NzAzMS0zMCAzMHY0MmgtNjB2LTEwMmMwLTE2LjU0Mjk2OSAxMy40NTcwMzEtMzAgMzAtMzB6bS02MCA0MGgxMHY5MmgtNDB2LTYyYzAtMTYuNTQyOTY5IDEzLjQ1NzAzMS0zMCAzMC0zMHptMCAwIi8+PHBhdGggZD0ibTgwIDIzMGMwIDUuNTIzNDM4LTQuNDc2NTYyIDEwLTEwIDEwcy0xMC00LjQ3NjU2Mi0xMC0xMCA0LjQ3NjU2Mi0xMCAxMC0xMCAxMCA0LjQ3NjU2MiAxMCAxMHptMCAwIi8+PC9zdmc+Cg==";

const LOW = 0;
const HIGH = 1;
const MAX_SALIDAS = 4; 
const MAX_ENTRADAS = 4; 
const MAX_DIGITALES = 4; 
const MAX_SERVOS = 2; 
const MAX_SALIDAS_DIGITALES = 2; 
const THRESHOLD_HIGH = 768;
const THRESHOLD_LOW = 256;

var OUTPUT = class {
    /**
   * Class Output
   * @constructor 
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


 var STEPPER = class {
    /**
   * class Stepper
   * @constructor
   *
   * @param index {Integer} motor number
   * 
   */
    constructor(index) {
      this.index = index;
      this.callback = function () { };
      var me = this;
      socket.on('STEPPER_MESSAGE', function (data) {
        if(data.index == me.index)
          me.callback(data);
      });
    }
    /**
   * Steps(): Moves the motor the amount of steps
   *
   * @param value {Integer}steps
   * @param callback {Function} callback function
   */
    steps(value, callback) {
      socket.emit('STEPPER', { index: this.index, method: 'steps', param: value });
      if (typeof callback == "function")
        this.callback = callback;
  }
  /**
 * Stop(): Stops the motor 
 *
 */
  stop() {
    socket.emit('STEPPER', { index: this.index, method: 'stop' });
  }
  /**
 * Speed(): Changes motor speed
 *
 * @param value {Integer} speed in steps per second
 * 
 */
  speed(value) {
    socket.emit('STEPPER', { index: this.index, method: 'speed', param: value });
  }
}

var   SERVO = class {
    /**
   * class Servo
   * @constructor
   *
   * @param index {Integer} motor number
   * 
   */
    constructor(index) {
      this.index = index;
    }
    /**
   * Position(): Sets position
   *
   * @param value {Integer}servo position: 0 to 180
   * 
   */
    position(value) {
      socket.emit('SERVO', { index: this.index, method: 'position', param: value });
    }
  }

 var  ANALOG = class {
     /**
      * class Analog
      * @constructor
      *
      * @param index {Integer} analog number
   * 
   */
  constructor(index) {
      this.index = index;
      this.status = 0;
      this.type = "analog";
      this.callback = function () { };
      var me = this;
      socket.on('ANALOG_MESSAGE', function (data) {
        if(data.index == me.index)
          me.callback(data);
      });      
    }
    /**
   * On(): Turns reporting on
   *
   * @param callback {Function} callback function
   */    
    on(callback) {
        this.status = 1;
        socket.emit('ANALOG', { index: this.index, method: 'on' });
        if (typeof callback == "function")
        this.callback = callback;
    }
    /**
     * Off(): Turns reporting off
     *
     */       
    off() { 
        this.status = 0;
      socket.emit('ANALOG', { index: this.index, method: 'off' });
    }
  }
  
  var  DIGITAL = class {
    /**
     * class Digital
   * @constructor
   *
   * @param index {Integer} digital number
   * 
   */
  constructor(index) {
      this.index = index;
      this.type = "digital";
      this.status = 0;
      this.callback = function () { };
      var me = this;
      socket.on('DIGITAL_MESSAGE', function (data) {
        if(data.index == me.index)
          me.callback(data);
      });      
    }
    /**
   * On(): Turns reporting on
   *
   * @param callback {Function} callback function
   */    
    on(callback) {
        this.status = 1;
      socket.emit('DIGITAL', { index: this.index, method: 'on' });
      if (typeof callback == "function")
      this.callback = callback;
    }
    /**
   * Off(): Turns reporting off
   *
   */       
    off() { 
        this.status = 0;
      socket.emit('DIGITAL', { index: this.index, method: 'off' });
    }
    /**
   * Pullup(): Enable or disable pullup
   *
   * @param enable {Boolean} Enables or disables.
   */       
    pullup(enable) { 
      socket.emit('DIGITAL', { index: this.index, method: 'pullup', param: enable });
    }
  }

  var I2C = class {
    /**
   * class I2C
   * @constructor
   *
   * @param address {Integer} device address
   * 
   */
    constructor(address) {
      this.address = address;
      this.callback = function () { };
      var me = this;
      socket.on('I2C_MESSAGE', function (data) {
        if (data.address == me.address)
          me.callback(data);
      });
    }
    /**
   * On(): Turns reporting on
   *
   * @param register {Integer} register to read
   * @param bytes {Integer} amount of bytes to read
   * @param callback {Function} callback function
   */    
    on(register, bytes, callback) {
      socket.emit('I2C', { address: this.address, register: register, method: 'on', param: bytes });
      if (typeof callback == "function")
      this.callback = callback;
    }
    /**
   * Off(): Turns reporting off
   *
   off(register) { 
     socket.emit('I2C', { address: this.address, register: register, method: 'off' });
    }
*/           
      /**
     * Read(): Reads register once
     *
     * @param register {Integer} register to read
     * @param bytes {Integer} amount of bytes to read
     * @param callback {Function} callback function
     */    
    read(register, bytes, callback) { 
      socket.emit('I2C', { address: this.address, register: register, method: 'read', param: bytes });
      if (typeof callback == "function")
      this.callback = callback;
    }  
    /**
   * Write(): Writes data into register
   *
   * @param register {Integer} register to read
   * @param data {Integer} data to write
   */    
    write(register, data) { 
      socket.emit('I2C', { address: this.address, register: register, method: 'write', param: data });
    }    
  }

/**
 * Device object to connect to device class
 * class Device
 *
 * @this .device {String} Name of class.
 * @this .options {Object} Options to pass as parameters of class
 *
 * example:
 *      light = new Device('Light', { controller: "BH1750"}); 
 *      led = new Device('Led', { pin: 13});
 */  
class Device {
    constructor(device, options) { 
    this.device = device;
    this.options = options;
    this.id = false;
    let me = this;
    socket.emit('DEVICE', {  device: device, options: options}, function (result) {
      me.id = result;
    });
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
    socket.emit('DEVICE_CALL', { id: this.id, method: method }, function (result) { 
      console.log(result);
    })
  }

}

var   LCD = class {
    /**
   * class LCD
   * @constructor
   *
   * 
   */
    constructor() {
    }

    /**
   * encender(): Turns on
   *
   */
  encender() {
      socket.emit('LCD', { method: 'on', param: false, param2: false });
    }
    /**
   * apagar(): Turns off
   *
   */
  apagar() {
      socket.emit('LCD', { method: 'off', param: false, param2: false });
    }
    /**
   * silenciar(): Turns silent
   *
   */
  silenciar() {
      socket.emit('LCD', { method: 'silence', param: false, param2: false });
    }
  }

  var  PING = class {
    /**
     * class Ping
     * @constructor
     *
     * @param index {Integer} analog number
  * 
  */
 constructor(index) {
     this.index = index;
     this.status = 0;
     this.type = "ping";
     this.cm = 0;
     this.inches = 0;
     this.callback = function () { };
     var me = this;
     socket.on('PING_MESSAGE', function (data) {
       if(data.index == me.index)
        me.cm = data.cm;
        me.inches = data.inches;
         me.callback(data);
     });      
   }
   /**
  * On(): Turns reporting on
  *
  * @param callback {Function} callback function
  */    
   on(callback) {
       this.status = 1;
       socket.emit('PING', { index: this.index, method: 'on' });
       if (typeof callback == "function")
       this.callback = callback;
   }
   /**
    * Off(): Turns reporting off
    *
    */       
   off() { 
       this.status = 0;
     socket.emit('PING', { index: this.index, method: 'off' });
   }
 }

  var   PIXEL = class {
    /**
   * class Pixel
   * @constructor
   *
   * @param index {Integer} motor number
   * 
   */
  constructor(index) {
    this.index = index;
    this.type = "pixel";
  }
    /**
   * create(length): Create strip
   *
   */
  create(length) {
      socket.emit('PIXEL', {index: this.index, method: 'create', param: length, param2: false, param3: false });
    }
    /**
   * encender(): Turns on
   *
   */
  encender(n) {
    socket.emit('PIXEL', {index: this.index, method: 'on', param: n, param2: false, param3: false  });
  }
  /**
     * apagar(): Turns off
     *
     */
    apagar(n) {
        socket.emit('PIXEL', {index: this.index, method: 'off', param: n, param2: false, param3: false  }); 
    }
    /**
   * color(): Change color to strip or pixel 
   *
   */
  color(color, i) {
      socket.emit('PIXEL', {index: this.index, method: 'color', param: color, param2: i, param3: false });
    }
    /**
   * shift(): Shift amount of pixels
   *
   */
  shift(offset, direction, wrap) {
      socket.emit('PIXEL', {index: this.index, method: 'shift', param: offset, param2: direction, param3: wrap });
    }
  }


class Scratch3Interfaz {
    constructor (runtime) {
        this.runtime = runtime;
        //this.runtime.emit(this.runtime.constructor.PERIPHERAL_CONNECTED);

        this.interfaz = {
            lcd: new LCD,
            salidas: [new OUTPUT(1),new OUTPUT(2),new OUTPUT(3),new OUTPUT(4)],
            entradas: [new ANALOG(1),new ANALOG(2),new ANALOG(3),new ANALOG(4)],
            digitales: [new DIGITAL(1),new DIGITAL(2),new DIGITAL(3),new DIGITAL(4)],
            servos: [new SERVO(1),new SERVO(2)],
            pixels: [], 
            pings: [], 
            analogValues: [0,0,0,0],
            digitalValues: [0,0,0,0],
            analogThreshold: [512,512,512,512],
            analogHIGH: [false, false, false, false],
            analogLOW: [false, false, false, false],
            entradaActiva: 0
        }
        var me = this;
        socket.on('DISCONNECTED_MESSAGE', function (data) {
            me.interfaz.entradas = [new ANALOG(1),new ANALOG(2),new ANALOG(3),new ANALOG(4)];
        });        
        socket.on('INTERFAZ_CONNECTED', function (data) {
            me.interfaz.entradas = [new ANALOG(1),new ANALOG(2),new ANALOG(3),new ANALOG(4)];
        });        
    }

    getInfo () {
        return {
            id: 'interfaz',
            name: 'Interfaz Robótica',
            blockIconURI: blockIconURI,
           // showStatusButton: true,
            blocks: [
              /*
                {
                    opcode: 'conectar',
                    blockType: BlockType.COMMAND,
                    text: 'Cconectar'
                },
                */
                {
                    opcode: 'salidas',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'interfaz.salidas',
                        default: 'salida [SALIDAS_PARAM] [SALIDAS_OP_PARAM]',
                        description: 'Acción sobre la salida'
                    }),
                    arguments: {
                        SALIDAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'salidas',
                            defaultValue: '1' 
                        },                    
                        SALIDAS_OP_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'salidas_op',
                            defaultValue: 'encender' 
                        }                    
                    } 
                },
                {
                    opcode: 'salidasDireccion',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'interfaz.salidasDireccion',
                        default: 'salida [SALIDAS_PARAM] dirección [SALIDAS_DIR_PARAM]',
                        description: 'Establece la polaridad de la salida [A-B]'
                    }),
                    arguments: {
                        SALIDAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'salidas',
                            defaultValue: '1' 
                        },                    
                        SALIDAS_DIR_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'direccion',
                            defaultValue: 'a' 
                        }                    
                    } 
                },
                {
                    opcode: 'salidasPotencia',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'interfaz.salidasPotencia',
                        default: 'salida [SALIDAS_PARAM] potencia [SALIDAS_POT_PARAM] %',
                        description: 'Establece la potencia de la salida [0-100]%'
                    }),
                    arguments: {
                        SALIDAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'salidas',
                            defaultValue: '1' 
                        },                    
                        SALIDAS_POT_PARAM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100 
                        }                    
                    } 
                },
                {
                    opcode: 'salidasByTime',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'interfaz.salidasByTime',
                        default: 'salida [SALIDAS_PARAM] encender  [LEDS_TIME] segundos',
                        description: 'Enciende salidas por un tiempo en [segundos]'
                    }),
                    arguments: {
                        SALIDAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'salidas',
                            defaultValue: '1' 
                        },      
                        LEDS_TIME: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1 
                        }                    
                    } 
                },'---',
/*

                {
                    opcode: 'ledAccion',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'interfaz.ledAccion',
                        default: 'led [SALIDAS_PARAM]  [SALIDAS_LED_OP] ',
                        description: 'Enciende/apaga leds'
                    }),
                    arguments: {
                        SALIDAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'salidas',
                            defaultValue: '1' 
                        },                    
                        SALIDAS_LED_OP: {
                            type: ArgumentType.STRING,
                            menu: 'leds_op',
                            defaultValue: 'encender A'
                        }                    
                    } 
                },
                {
                    opcode: 'ledsByTime',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'interfaz.ledsByTime',
                        default: 'led [SALIDAS_PARAM]  [SALIDAS_LED_OP_TIME]  [LEDS_TIME] segundos',
                        description: 'Enciende leds por un tiempo en [segundos]'
                    }),
                    arguments: {
                        SALIDAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'salidas',
                            defaultValue: '1' 
                        },      
                        SALIDAS_LED_OP_TIME: {
                            type: ArgumentType.STRING,
                            menu: 'leds_op_time',
                            defaultValue: 'encender A'
                        },
                        LEDS_TIME: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1 
                        }                    
                    } 
                },'---',
*/
                {
                    opcode: 'servoPosicion',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'interfaz.servoPosicion',
                        default: 'servo [SERVOS_PARAM] posición [SERVOS_POSICION]',
                        description: 'Posiciona el servomotor'
                    }),
                    arguments: {
                        SERVOS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'servos',
                            defaultValue: '1' 
                        },                    
                        SERVOS_POSICION: {
                            type: ArgumentType.ANGLE,
                            defaultValue: 90 
                        }                    
                    } 
                },'---',
                {
                    opcode: 'entradaValor1',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'interfaz.entradaValor1',
                        default: 'entrada 1',
                        description: 'Reporta el valor de la entrada 1'
                    })
                },
                {
                    opcode: 'entradaValor2',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'interfaz.entradaValor2',
                        default: 'entrada 2',
                        description: 'Reporta el valor de la entrada 2'
                    })
                },
                {
                    opcode: 'entradaValor3',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'interfaz.entradaValor3',
                        default: 'entrada 3',
                        description: 'Reporta el valor de la entrada 3'
                    })
                },
                {
                    opcode: 'entradaValor4',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'interfaz.entradaValor4',
                        default: 'entrada 4',
                        description: 'Reporta el valor de la entrada 4'
                    })
                },
                /*
                {
                    opcode: 'entradaValor',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'interfaz.entradaValor',
                        default: 'entrada [ENTRADAS_PARAM]',
                        description: 'Reporta el valor de la entrada'
                    }),
                    arguments: {
                        ENTRADAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'entradas',
                            defaultValue: '1' 
                        }                    
                    } 
                },
                */
                {
                    opcode: 'entradaEstado',
                    blockType: BlockType.BOOLEAN,
                    text: formatMessage({
                        id: 'interfaz.entradaEstado',
                        default: 'entrada [ENTRADAS_PARAM] estado [ENTRADA_ESTADO]',
                        description: 'Reporta el estado de la entrada [alto-bajo]'
                    }),
                    arguments: {
                        ENTRADAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'entradas',
                            defaultValue: '1' 
                        },                    
                        ENTRADA_ESTADO: {
                            type: ArgumentType.STRING,
                            menu: 'estados',
                            defaultValue: 'alto' 
                        }                    
                    } 
                },
                /*
                {
                    opcode: 'entradaUmbral',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'interfaz.entradaUmbral',
                        default: 'entrada [ENTRADAS_PARAM]  umbral [ENTRADA_UMBRAL]',
                        description: 'Reporta el valor de la entrada'
                    }),
                    arguments: {
                        ENTRADAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'entradas',
                            defaultValue: '1' 
                        },
                        ENTRADA_UMBRAL: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 512
                        }                    
                    } 
                },
                {
                    opcode: 'entradaActiva',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'interfaz.entradaActiva',
                        default: 'valor entrada activa',
                        description: 'Reporta el valor de la última entrada activada'
                    }),
                },*/
                '---',
                {
                    opcode: 'cuandoEntradaValor',
                    text: formatMessage({
                        id: 'interfaz.cuandoEntradaValor',
                        default: 'cuando entrada [ENTRADAS_PARAM] [ENTRADA_OPERADOR] [ENTRADA_VALOR]',
                        description: 'Cuando el valor de la entrada es  [mayor-menor-igual] que el [valor]'
                    }),
                    blockType: BlockType.HAT,
                    arguments: {
                        ENTRADAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'entradas',
                            defaultValue: '1' 
                        },                    
                        ENTRADA_OPERADOR: {
                            type: ArgumentType.NUMBER,
                            menu: 'operadores',
                            defaultValue: '>'
                        },                    
                        ENTRADA_VALOR: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 512
                        }                    
                    }
                },
                {
                    opcode: 'cuandoEntradaEstado',
                    text: formatMessage({
                        id: 'interfaz.cuandoEntradaEstado',
                        default: 'cuando entrada [ENTRADAS_PARAM]  [ENTRADA_ESTADO]',
                        description: 'Cuando la entrada esta en estado [alto-bajo]'
                    }),
                    blockType: BlockType.HAT,
                    arguments: {
                        ENTRADAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'entradas',
                            defaultValue: '1' 
                        },                    
                        ENTRADA_ESTADO: {
                            type: ArgumentType.STRING,
                            menu: 'estados',
                            defaultValue: 'alto' 
                        }                    
                    }
                },
                {
                    opcode: 'entradas',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'interfaz.entradasAccion',
                        default: 'entrada [ENTRADAS_PARAM] [ENTRADAS_OP_PARAM]',
                        description: 'Enciende/apaga el reporte de entradas'
                    }),
                    arguments: {
                        ENTRADAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'entradas',
                            defaultValue: '1' 
                        },                    
                        ENTRADAS_OP_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'entradas_op',
                            defaultValue: 'encender' 
                        }                    
                    } 
                },
                {
                    opcode: 'entradasTipo',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'interfaz.entradasTipo',
                        default: 'entradas [ENTRADAS_TIPO_PARAM]',
                        description: 'Define el tipo de entradas [analogicas/digitales]'
                    }),
                    arguments: {
                        ENTRADAS_TIPO_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'entradas_tipo',
                            defaultValue: 'analog' 
                        }                    
                    } 
                },
                '---',
                {
                    opcode: 'ultrasonido',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'interfaz.ultrasonidoAccion',
                        default: 'ultrasonido [ENTRADAS_PARAM] [ENTRADAS_OP_PARAM]',
                        description: 'Enciende/apaga el reporte de sensor de ultrasonido'
                    }),
                    arguments: {
                        ENTRADAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'entradas',
                            defaultValue: '1' 
                        },                    
                        ENTRADAS_OP_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'entradas_op',
                            defaultValue: 'encender' 
                        }                    
                    } 
                },   
                {
                    opcode: 'ultrasonidoValor',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'interfaz.ultrasonidoValor',
                        default: 'ultrasonido [ENTRADAS_PARAM] cm',
                        description: 'Reporta el valor del sensor de ultrasonido'
                    }),
                    arguments: {
                        ENTRADAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'entradas',
                            defaultValue: '1' 
                        }                    
                    } 
                },   
                {
                    opcode: 'cuandoUltrasonidoValor',
                    text: formatMessage({
                        id: 'interfaz.cuandoUltrasonidoValor',
                        default: 'cuando ultrasonido [ENTRADAS_PARAM] [ENTRADA_OPERADOR] [ENTRADA_VALOR] cm',
                        description: 'Cuando el valor del sensor de ultrasonido es  [mayor-menor-igual] que el [valor] en cm'
                    }),
                    blockType: BlockType.HAT,
                    arguments: {
                        ENTRADAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'entradas',
                            defaultValue: '1' 
                        },                    
                        ENTRADA_OPERADOR: {
                            type: ArgumentType.NUMBER,
                            menu: 'operadores',
                            defaultValue: '<'
                        },                    
                        ENTRADA_VALOR: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 10
                        }                    
                    }
                },
                '---',
                {
                    opcode: 'pixelCreate',
                    text: formatMessage({
                        id: 'interfaz.pixelCreate',
                        default: 'Pixel Led [SALIDA_DIGITAL] [CANTIDAD] leds',
                        description: 'Crea una tira de pixel leds'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        SALIDA_DIGITAL: {
                            type: ArgumentType.STRING,
                            menu: 'salidas_digitales',
                            defaultValue: '1' 
                        },
                        CANTIDAD: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }                    
                    }
                },
                {
                    opcode: 'pixelAccion',
                    text: formatMessage({
                        id: 'interfaz.pixelAccion',
                        default: 'Pixel Led [SALIDA_DIGITAL] [SALIDA_DIGITAL_OP]',
                        description: '[Enciende/apaga] una tira de pixel leds'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        SALIDA_DIGITAL: {
                            type: ArgumentType.STRING,
                            menu: 'salidas_digitales',
                            defaultValue: '1' 
                        },
                        SALIDA_DIGITAL_OP: {
                            type: ArgumentType.STRING,
                            menu: 'salidas_digitales_op',
                            defaultValue: 'encender' 
                        }                    
                    }
                },
                {
                    opcode: 'pixelAccionPos',
                    text: formatMessage({
                        id: 'interfaz.pixelAccionPos',
                        default: 'Pixel Led [SALIDA_DIGITAL] [SALIDA_DIGITAL_OP] led [POSICION] ',
                        description: '[Enciende/Apaga] un pixel led'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        SALIDA_DIGITAL: {
                            type: ArgumentType.STRING,
                            menu: 'salidas_digitales',
                            defaultValue: '1' 
                        },
                        POSICION: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        SALIDA_DIGITAL_OP: {
                            type: ArgumentType.STRING,
                            menu: 'salidas_digitales_op',
                            defaultValue: 'encender' 
                        }                    
                    }
                },
                {
                    opcode: 'pixelColor',
                    text: formatMessage({
                        id: 'interfaz.pixelColor',
                        default: 'Pixel Led [SALIDA_DIGITAL] todos [COLOR] ',
                        description: 'Crea una tira de pixel leds'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        SALIDA_DIGITAL: {
                            type: ArgumentType.STRING,
                            menu: 'salidas_digitales',
                            defaultValue: '1' 
                        },
                        COLOR: {
                            type: ArgumentType.COLOR
                        }                    
                    }
                },
                {
                    opcode: 'pixelColorPos',
                    text: formatMessage({
                        id: 'interfaz.pixelColorPos',
                        default: 'Pixel Led [SALIDA_DIGITAL] led [POSICION] [COLOR] ',
                        description: 'Crea una tira de pixel leds'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        SALIDA_DIGITAL: {
                            type: ArgumentType.STRING,
                            menu: 'salidas_digitales',
                            defaultValue: '1' 
                        },
                        POSICION: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        COLOR: {
                            type: ArgumentType.COLOR
                        }                    
                    }
                },
                '---',
                {
                    opcode: 'lcdAccion',
                    text: formatMessage({
                        id: 'interfaz.lcdAccion',
                        default: 'LCD [LCD_OP]',
                        description: '[enciende/apaga/silencia] el display LCD incorporado'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        LCD_OP: {
                            type: ArgumentType.STRING,
                            menu: 'lcd_op',
                            defaultValue: 'encender' 
                        }                    
                    }
                }
            ],
            menus: {
                salidas: ['1','2','3','4'],
                salidas_digitales: ['1','2'],
                salidas_op: ['encender', 'apagar', 'invertir'],
                salidas_digitales_op: ['encender', 'apagar'],
                leds_op: ['encender A', 'encender B', 'apagar', 'cambiar'],
                leds_op_time: ['encender A', 'encender B'],
                entradas: ['1','2','3','4'],
                entradas_op: [
                    {value: 'encender', text: 'reportar'},
                    {value:'apagar', text:'apagar'}
                ],
                entradas_tipo: [
                    {value: 'analog', text: 'analógicas'},
                    {value:'digital', text:'digitales'}
                ],
                servos: ['1','2'],
                direccion: ['a','b'],
                estados: ['alto','bajo'],
                operadores: ['>','<', '='],
                lcd_op: ['encender','apagar', 'silenciar'],
            }
        };
    }

    salidas (args, util) {
        if(args.SALIDAS_PARAM > MAX_SALIDAS) return;
        var s = this.interfaz.salidas[args.SALIDAS_PARAM - 1];
        switch(args.SALIDAS_OP_PARAM) {
            case 'encender': case 1: s.on(); break;
            case 'apagar': case 2: s.off(); break;
            case 'invertir': case 3: s.inverse(); break;
            case 'frenar': case 4: s.brake(); break;
            default: s.off();
        }
    };

    salidasDireccion (args, util) {
        if(args.SALIDAS_PARAM > MAX_SALIDAS) return;
        var s = this.interfaz.salidas[args.SALIDAS_PARAM - 1];
        switch(args.SALIDAS_DIR_PARAM) {
            case 'a': case 1: s.direction(0); break;
            case 'b': case 2: s.direction(1); break;
        }
    };

    salidasPotencia (args, util) {
        if(args.SALIDAS_PARAM > MAX_SALIDAS) return;
        var s = this.interfaz.salidas[args.SALIDAS_PARAM - 1];
        var p = MathUtil.clamp(255*Cast.toNumber(args.SALIDAS_POT_PARAM)/100, 0, 255);
        s.power(p);        
    };

    salidasByTime (args, util) {
        if(args.SALIDAS_PARAM > MAX_SALIDAS) return;
        var s = this.interfaz.salidas[args.SALIDAS_PARAM - 1];
        let time = Cast.toNumber(args.LEDS_TIME) * 1000;
        time = MathUtil.clamp(time, 0, 30000);
        
        if (time === 0) {
            return; // don't send a beep time of 0
        }
        
        return new Promise(resolve => {
            s.on();
            setTimeout(() => s.off(), time);
            setTimeout(resolve, time);
        });

    };

    ledAccion (args, util) {
        if(args.SALIDAS_PARAM > MAX_SALIDAS) return;
        var s = this.interfaz.salidas[args.SALIDAS_PARAM - 1];
        s.power(128);
        switch(args.SALIDAS_LED_OP) {
            case 'encender A': case 1: s.power(128); s.direction(0); s.on(); break;
            case 'encender B': case 2: s.power(128); s.direction(1); s.on(); break;
            case 'apagar': case 3: s.off(); break;
            case 'cambiar': case 4: s.inverse(); break;
            default: s.off();
        }
    };

    ledsByTime (args, util) {
        if(args.SALIDAS_PARAM > MAX_SALIDAS) return;
        var s = this.interfaz.salidas[args.SALIDAS_PARAM - 1];
        let time = Cast.toNumber(args.LEDS_TIME) * 1000;
        time = MathUtil.clamp(time, 0, 30000);
        
        if (time === 0) {
            return; // don't send a beep time of 0
        }
        
        return new Promise(resolve => {
            s.power(128);
            switch(args.SALIDAS_LED_OP_TIME) {
                case 'encender A': case 1: s.power(128); s.direction(0); s.on(); break;
                case 'encender B': case 2: s.power(128); s.direction(1); s.on(); break;
                default: s.off();
            }
            setTimeout(() => s.off(), time);
            setTimeout(resolve, time);
        });

    };

    entradasTipo (args, util) {
        var j = this.interfaz;
        switch(args.ENTRADAS_TIPO_PARAM) {
            case 'analog': case 1: 
                for(i=0;i<MAX_ENTRADAS;i++) {
                    j.entradas[i].off();
                    j.entradas[i]  = new ANALOG(i+1);
                }
            break;
            case 'digital': case 2: 
                for(i=0;i<MAX_ENTRADAS;i++) {
                    j.entradas[i].off();
                    j.entradas[i]  = new DIGITAL(i+1);
                }
        break;
        }

    }

    entradas (args, util) {
        if(args.ENTRADAS_PARAM > MAX_ENTRADAS) return;
        var i = this.interfaz;
        i.entradaActiva = args.ENTRADAS_PARAM;
        switch(args.ENTRADAS_OP_PARAM) {
            case 'encender': case 1: 
                var s = i.entradas[args.ENTRADAS_PARAM - 1];
                if(s.status) return;
                if(s.type == "digital") {
                    s.on(function(data){
                        i.digitalValues[data.index -1 ] = data.value;
                    }); 
               } else {
                   s.on(function(data){
                       i.analogValues[data.index -1 ] = data.value;
                       i.analogHIGH[data.index -1] = data.value > THRESHOLD_HIGH;
                       i.analogLOW[data.index -1] = data.value < THRESHOLD_LOW;
                   }); 
               }
            break;
            case 'apagar': case 2: 
                var s = i.entradas[args.ENTRADAS_PARAM - 1];
                s.off(); 
                if(s.type == "analog") {
                    i.analogValues[args.ENTRADAS_PARAM -1 ] = 0;
                    i.analogHIGH[args.ENTRADAS_PARAM -1] = false;
                    i.analogLOW[args.ENTRADAS_PARAM -1] = false;
                }
                if(s.type == "digital") {
                    i.digitalValues[args.ENTRADAS_PARAM -1 ] = 0;
                }
                break;
            default: s.off();
        }
    };


    checkEntradaStatus(index, util) {
            this.entradas({'ENTRADAS_PARAM': index, 'ENTRADAS_OP_PARAM': 1}, util);
    }
    
    entradaValor (args, util) {
        if(args.ENTRADAS_PARAM > MAX_ENTRADAS) return;
        var i = this.interfaz;
        i.entradaActiva = args.ENTRADAS_PARAM;
        this.checkEntradaStatus(args.ENTRADAS_PARAM, util);
        return i.analogValues[args.ENTRADAS_PARAM - 1];
    }
    
    entradaValor1 (args, util) {
        var i = this.interfaz;
        var index = 0;
        this.checkEntradaStatus(1, util);
        var s = i.entradas[index];
        return s.type == "analog" ? i.analogValues[index] : i.digitalValues[index];
    }
    entradaValor2 (args, util) {
        var i = this.interfaz;
        var index = 1;
        this.checkEntradaStatus(2, util);
        var s = i.entradas[index];
        return s.type == "analog" ? i.analogValues[index] : i.digitalValues[index];
    }
    entradaValor3 (args, util) {
        var i = this.interfaz;
        var index = 2;
        this.checkEntradaStatus(3, util);
        var s = i.entradas[index];
        return s.type == "analog" ? i.analogValues[index] : i.digitalValues[index];
    }
    entradaValor4 (args, util) {
        var i = this.interfaz;
        var index = 3;
        this.checkEntradaStatus(4, util);
        var s = i.entradas[index];
        return s.type == "analog" ? i.analogValues[index] : i.digitalValues[index];
    }


    entradaEstado (args, util) {
        if(args.ENTRADAS_PARAM > MAX_ENTRADAS) return;
        var i = this.interfaz;
        i.entradaActiva = args.ENTRADAS_PARAM;
        var s = i.entradas[args.ENTRADAS_PARAM - 1];
        var v = false;
        this.checkEntradaStatus(args.ENTRADAS_PARAM, util);
        switch(args.ENTRADA_ESTADO) {
            case 'alto': case 1:  
                v = (s.type == "analog")  ? i.analogHIGH[args.ENTRADAS_PARAM - 1]  : i.digitalValues[args.ENTRADAS_PARAM - 1] == 1;
            break;
            case 'bajo': case 0:  
                v = (s.type == "analog")  ? i.analogLOW[args.ENTRADAS_PARAM - 1]  : i.digitalValues[args.ENTRADAS_PARAM - 1] == 0;
            break;
        }
        return v;
    }
    
    cuandoEntradaEstado (args, util) {
        if(args.ENTRADAS_PARAM > MAX_ENTRADAS) return;
        var i = this.interfaz;
        var s = i.entradas[args.ENTRADAS_PARAM - 1];
        var v = false;
        this.checkEntradaStatus(args.ENTRADAS_PARAM, util);
        switch(args.ENTRADA_ESTADO) {
            case 'alto': case 1:  
                v = (s.type == "analog")  ? i.analogHIGH[args.ENTRADAS_PARAM - 1]  : i.digitalValues[args.ENTRADAS_PARAM - 1] == 1;
            break;
            case 'bajo': case 0:  
                v = (s.type == "analog")  ? i.analogLOW[args.ENTRADAS_PARAM - 1]  : i.digitalValues[args.ENTRADAS_PARAM - 1] == 0;
            break;
        }
        return v;
    }

    cuandoEntradaValor (args, util) {
        if(args.ENTRADAS_PARAM > MAX_ENTRADAS) return;
        var i = this.interfaz;
        var s = i.entradas[args.ENTRADAS_PARAM - 1];
        var v = false;
        if(s.type == "digital") return false;
        this.checkEntradaStatus(args.ENTRADAS_PARAM, util);
        switch(args.ENTRADA_OPERADOR) {
            case '>':   v =  i.analogValues[args.ENTRADAS_PARAM - 1] > Cast.toNumber(args.ENTRADA_VALOR) ; break;
            case '<':   v =  i.analogValues[args.ENTRADAS_PARAM - 1] < Cast.toNumber(args.ENTRADA_VALOR) ; break;
            case '=':   v =  i.analogValues[args.ENTRADAS_PARAM - 1] = Cast.toNumber(args.ENTRADA_VALOR) ; break;
        }
        return v;
    }

    entradaActiva (args, util) {
        if(args.ENTRADAS_PARAM > MAX_ENTRADAS) return;
        var i = this.interfaz;
        if(i.entradaActiva === 0) return 0;
        return i.analogValues[i.entradaActiva - 1];
    }

    entradaUmbral (args, util) {
        if(args.ENTRADAS_PARAM > MAX_ENTRADAS) return;
        var i = this.interfaz;
         i.analogThreshold[args.ENTRADAS_PARAM - 1] = MathUtil.clamp(args.ENTRADA_UMBRAL,0,1023);
    }

    servoPosicion (args, util) {
        if(args.SERVOS_PARAM > MAX_SERVOS) return;
        var s = this.interfaz.servos[args.SERVOS_PARAM - 1];
        console.log(args.SERVOS_POSICION);
        s.position( MathUtil.clamp(Math.abs(args.SERVOS_POSICION),0,180));
    };
    
    lcdAccion (args, util) {
        switch(args.LCD_OP) {
            case 'encender': case 1:  this.interfaz.lcd.encender(); break;
            case 'apagar': case 3: this.interfaz.lcd.apagar(); break;
            case 'silenciar': case 4: this.interfaz.lcd.silenciar(); break;
            default: s.off();
        }
    };
    

    ultrasonido (args, util) {
        if(args.ENTRADAS_PARAM > MAX_ENTRADAS) return;
        var i = this.interfaz;
        var index = args.ENTRADAS_PARAM - 1;
        switch(args.ENTRADAS_OP_PARAM) {
            case 'encender': case 1: 
                i.pings[index] = new PING(index);
                i.pings[index].on();
            break;
            case 'apagar': case 2: 
                if(typeof i.pings[index] != "undefined")
                    i.pings[index].off();
            break;
        }
    }

    ultrasonidoValor (args, util) {
        if(args.ENTRADAS_PARAM > MAX_ENTRADAS) return;
        var i = this.interfaz;
        var index = args.ENTRADAS_PARAM - 1;
        console.log(i.pings[index]);
        if(typeof i.pings[index] != "undefined")
            return i.pings[index].cm;
    }

    cuandoUltrasonidoValor (args, util) {
        if(args.ENTRADAS_PARAM > MAX_ENTRADAS) return;
        var i = this.interfaz;
        var s = i.pings[args.ENTRADAS_PARAM - 1];
        var v = false;
        switch(args.ENTRADA_OPERADOR) {
            case '>':   v =  s.cm > Cast.toNumber(args.ENTRADA_VALOR) ; break;
            case '<':   v =  s.cm < Cast.toNumber(args.ENTRADA_VALOR) ; break;
            case '=':   v =  s.cm = Cast.toNumber(args.ENTRADA_VALOR) ; break;
        }
        return v;
    }

    pixelCreate(args, util) {
        if(args.SALIDAS_DIGITALES > MAX_SALIDAS_DIGITALES) return;
        var i = this.interfaz;
        var index = args.SALIDAS_DIGITALES - 1;
        i.pixels[index] = new PIXEL(index);
        var length = args.CANTIDAD < 1 ? 1 : args.CANTIDAD;
        i.pixels[index].create(length);
    }

    pixelColor(args, util) {
        if(args.SALIDAS_DIGITALES > MAX_SALIDAS_DIGITALES) return;
        var i = this.interfaz;
        var index = args.SALIDAS_DIGITALES - 1;
        if(typeof i.pixels[index] != "undefined" && i.pixels[index].type == "pixel") {
            var n = (args.POSICION) ? args.POSICION : false;
            i.pixels[index].color(args.COLOR, n);
        }
    }
    
    pixelColorPos(args, util) {
        this.pixelColor(args, util);
    }
    
    pixelAccion(args, util) {
        if(args.SALIDAS_DIGITALES > MAX_SALIDAS_DIGITALES) return;
        var i = this.interfaz;
        var index = args.SALIDAS_DIGITALES - 1;
        if(typeof i.pixels[index] != "undefined" && i.pixels[index].type == "pixel") {
            var n = (args.POSICION) ? args.POSICION : false;
            switch(args.SALIDA_DIGITAL_OP) {
                case 'encender': case 1: 
                    i.pixels[index].encender(n);
                break
                case 'apagar': case 2: 
                    i.pixels[index].apagar(n);
                break
            }
        }
    }

    pixelAccionPos(args, util) {
        this.pixelAccion(args, util);
    }
    
}

module.exports = Scratch3Interfaz;
