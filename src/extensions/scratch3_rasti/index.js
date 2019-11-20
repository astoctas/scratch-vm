const ArgumentType = require('../../extension-support/argument-type');
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

const blockIconURI = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iMjI0LjAwMDAwMHB0IiBoZWlnaHQ9IjIyNC4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDIyNC4wMDAwMDAgMjI0LjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgoKPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsMjI0LjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSJub25lIj4KPHBhdGggZD0iTTkyNSAyMTU2IGMtMjE4IC01MCAtMzU5IC0xMjQgLTUxMyAtMjcwIC05MSAtODYgLTE0OCAtMTY1IC0yMDEKLTI3NyAtMTExIC0yMzMgLTEzMCAtNDgyIC01NSAtNzIwIDYxIC0xOTUgMTcyIC0zNjAgMzIzIC00ODEgNDA5IC0zMjggOTk0Ci0yOTcgMTM2MiA3MSAxMjggMTI4IDIxMCAyNzMgMjYxIDQ2MSAxOSA3MiAyMyAxMDkgMjMgMjQwIDAgMTM3IC00IDE2NiAtMjcKMjUyIC01MCAxODAgLTEzOSAzMjggLTI3NCA0NTkgLTEyMyAxMTggLTI3NCAyMDQgLTQzOSAyNDkgLTEwMiAyOCAtMzY1IDM3Ci00NjAgMTZ6IG0tMTg3IC03MjggYzE3IC0xNyAxNyAtMjM5IDAgLTI1NiAtNyAtNyAtMzEgLTEyIC01NSAtMTIgLTI0IDAgLTQzCi00IC00MyAtMTAgMCAtNSAzMiAtNjQgNzAgLTEzMSAzOSAtNjYgNzAgLTEyNSA3MCAtMTMwIDAgLTUgLTI0IC05IC01MiAtOQpsLTUzIDAgLTc2IDEzOCAtNzYgMTM3IC00NiAzIC00NyAzIDAgLTExMCAwIC0xMTEgLTUwIDAgLTUwIDAgMCAxMzcgYzAgMTgyCi05IDE3MyAxNzcgMTczIGwxNDMgMCAwIDM1IGMwIDE5IDEgMzggMyA0MyAxIDQgLTcwIDkgLTE1OCAxMiBsLTE2MCA1IC0zIDQ4Ci0zIDQ3IDE5OCAwIGMxNDIgMCAyMDIgLTMgMjExIC0xMnogbTEwMTYgLTQgYzkgLTggMTYgLTI5IDE2IC00NSAwIC0xNyA2IC0zMgoxNSAtMzUgMTAgLTQgMTUgLTIwIDE1IC01MCAwIC00MiAtMSAtNDQgLTMxIC00NCAtMjggMCAtMjkgLTEgLTE1IC0xNiAxMyAtMTIKMTYgLTQxIDE2IC0xNTUgbDAgLTEzOSAtNTAgMCAtNTAgMCAwIDE1NSAwIDE1NSAtMTg1IDAgYy0xMDIgMCAtMTg1IC0yIC0xODUKLTUgMCAtMiA1IC0xNiAxMiAtMzAgMTEgLTI1IDExIC0yNSAxNDUgLTI1IDE3MSAwIDE3MyAtMSAxNzMgLTEyOSAwIC02OCAtNAotOTMgLTE2IC0xMDUgLTEzIC0xMyAtNDYgLTE2IC0yMDAgLTE2IGwtMTg0IDAgMCA1MCAwIDUwIDE1MCAwIDE1MCAwIDAgMjUgMAoyNSAtMTMyIDAgYy0xNzAgMCAtMTY4IC0xIC0xNjggMTMwIDAgNjEgNCAxMDAgMTIgMTA4IDkgOSA3MiAxMiAyMjAgMTIgbDIwOAowIDAgNTAgMCA1MCAzNCAwIGMxOSAwIDQyIC03IDUwIC0xNnogbS01ODYgLTk2IGM4IC04IDEyIC02NyAxMiAtMjAwIGwwIC0xODgKLTE5MCAwIGMtMjIzIDAgLTIxMCAtNyAtMjEwIDEyNCAwIDEyNCAzIDEyNiAxNjkgMTI2IGwxMjkgMCA0IDI1IGMzIDEzIDMgMjcKMCAzMCAtMyAzIC02OCA1IC0xNDQgNSBsLTEzOCAwIDAgNDUgMCA0NSAxNzggMCBjMTI1IDAgMTgyIC00IDE5MCAtMTJ6IG03NDAKMCBjOCAtOCAxMiAtNjcgMTIgLTIwMCBsMCAtMTg4IC00NSAwIC00NSAwIDAgMjAwIDAgMjAwIDMzIDAgYzE4IDAgMzggLTUgNDUKLTEyeiIvPgo8cGF0aCBkPSJNODgwIDEwNjUgbDAgLTI1IDEwMCAwIDEwMCAwIDAgMjUgMCAyNSAtMTAwIDAgLTEwMCAwIDAgLTI1eiIvPgo8cGF0aCBkPSJNMjAyMCAyMDYwIGM2IC0xMSAxMyAtMjAgMTYgLTIwIDIgMCAwIDkgLTYgMjAgLTYgMTEgLTEzIDIwIC0xNiAyMAotMiAwIDAgLTkgNiAtMjB6Ii8+CjxwYXRoIGQ9Ik0xOTMxIDIwMzQgYzAgLTExIDMgLTE0IDYgLTYgMyA3IDIgMTYgLTEgMTkgLTMgNCAtNiAtMiAtNSAtMTN6Ii8+CjxwYXRoIGQ9Ik0xOTYwIDIwMzggYzAgLTUgNiAtOCAxNCAtOCA4IDAgMTYgLTYgMTggLTEyIDMgLTcgNyAtNCAxMCA3IDQgMTYgMAoyMCAtMTkgMjAgLTEyIDAgLTIzIC0zIC0yMyAtN3oiLz4KPHBhdGggZD0iTTE5NDcgMTk5OSBjNyAtNyAxNSAtMTAgMTggLTcgMyAzIC0yIDkgLTEyIDEyIC0xNCA2IC0xNSA1IC02IC01eiIvPgo8cGF0aCBkPSJNMTk5MCAxOTkwIGMtOSAtNiAtMTAgLTEwIC0zIC0xMCA2IDAgMTUgNSAxOCAxMCA4IDEyIDQgMTIgLTE1IDB6Ii8+CjwvZz4KPC9zdmc+Cg==";

const LOW = 0;
const HIGH = 1;
const MAX_SALIDAS = 2; 
const MAX_ENTRADAS = 5; 
const MAX_DIGITALES = 4; 
const MAX_SALIDAS_PWM = 3; 
const MAX_SALIDAS_DIGITALES = 4; 
const MAX_SERVOS =4; 
const MAX_PINES =4; 
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

  var PIN = class {
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
      socket.emit('PIN', { index: this.index, method: 'on' });
    }
    /**
   * Off(): Turns ouput off
   *
   */
    off() {
      socket.emit('PIN', { index: this.index, method: 'off' });
    }
    /**
   * Power(): Sets pwm power
   *
   * @param pow {Integer} power: 0 to 255
   * 
   */
  power(pow) {
    socket.emit('PIN', { index: this.index, method: 'write', param: pow });
  }    
}

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
      socket.emit('DIGITAL', { index: this.index, method: 'on' });
      if (typeof callback == "function")
      this.callback = callback;
    }
    /**
   * Off(): Turns reporting off
   *
   */       
    off() { 
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

class Scratch3Rasti {
    constructor (runtime) {
        this.runtime = runtime;
        //this.runtime.emit(this.runtime.constructor.PERIPHERAL_CONNECTED);

        this.rasti = {
            lcd: new LCD,
            salidas: [new OUTPUT(1),new OUTPUT(2)],
            salidasdigitales: [new PIN(1),new PIN(2),new PIN(3), new PIN(4)],
            entradas: [new ANALOG(1),new ANALOG(2),new ANALOG(3),new ANALOG(4),new ANALOG(5)],
            digitales: [new DIGITAL(1),new DIGITAL(2),new DIGITAL(3),new DIGITAL(4)],
            servos: [new SERVO(1),new SERVO(2),new SERVO(3),new SERVO(4)],
            digitalValues: [0,0,0,0,0],
            analogValues: [0,0,0,0,0],
            analogThreshold: [512,512,512,512,512],
            analogHIGH: [false, false, false, false,false],
            analogLOW: [false, false, false, false, false],
            entradaActiva: 0
        }
    }

    getInfo () {
        return {
            id: 'rasti',
            name: 'Rasti Robótica',
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
                        id: 'rasti.motores',
                        default: 'motor [MOTORES_PARAM] [SALIDAS_OP_PARAM]',
                        description: 'Acción sobre las salidas de motores'
                    }),
                    arguments: {
                        MOTORES_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'salidas',
                            defaultValue: '2' 
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
                        id: 'rasti.salidasDireccion',
                        default: 'motor [MOTORES_PARAM] dirección [SALIDAS_DIR_PARAM]',
                        description: 'Establece la polaridad de la salida [A-B]'
                    }),
                    arguments: {
                        MOTORES_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'salidas',
                            defaultValue: '2' 
                        },                    
                        SALIDAS_DIR_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'direccion',
                            defaultValue: 'a' 
                        }                    
                    } 
                },
                /*
                {
                    opcode: 'salidasPotencia',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'rasti.salidasPotencia',
                        default: 'salida [MOTORES_PARAM] potencia [SALIDAS_POT_PARAM] %',
                        description: 'Establece la potencia de la salida [0-100]%'
                    }),
                    arguments: {
                        MOTORES_PARAM: {
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
                */
                {
                    opcode: 'salidasByTime',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'rasti.salidasByTime',
                        default: 'motor [MOTORES_PARAM] encender  [LEDS_TIME] segundos',
                        description: 'Enciende salidas por un tiempo en [segundos]'
                    }),
                    arguments: {
                        MOTORES_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'salidas',
                            defaultValue: '2' 
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
                        id: 'rasti.ledAccion',
                        default: 'led [MOTORES_PARAM]  [SALIDAS_LED_OP] ',
                        description: 'Enciende/apaga leds'
                    }),
                    arguments: {
                        MOTORES_PARAM: {
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
                        id: 'rasti.ledsByTime',
                        default: 'led [MOTORES_PARAM]  [SALIDAS_LED_OP_TIME]  [LEDS_TIME] segundos',
                        description: 'Enciende leds por un tiempo en [segundos]'
                    }),
                    arguments: {
                        MOTORES_PARAM: {
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
                        id: 'rasti.servoPosicion',
                        default: 'servo [SERVOS_PARAM] posición [SERVOS_POSICION]',
                        description: 'Posiciona el servomotor'
                    }),
                    arguments: {
                        SERVOS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'servos',
                            defaultValue: '3' 
                        },                    
                        SERVOS_POSICION: {
                            type: ArgumentType.ANGLE,
                            defaultValue: 90 
                        }                    
                    } 
                },'---',
                {
                    opcode: 'salidasDigitales',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'rasti.salidasDigitales',
                        default: 'salida [SALIDASDIGITALES_PARAM] [SALIDASDIGITALES_OP_PARAM]',
                        description: 'Acción sobre las salidas digitales'
                    }),
                    arguments: {
                        SALIDASDIGITALES_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'digitales',
                            defaultValue: '3' 
                        },                    
                        SALIDASDIGITALES_OP_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'salidas_digitales_op',
                            defaultValue: 'encender' 
                        }                    
                    } 
                },
                {
                    opcode: 'salidasDigitalesPotencia',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'rasti.salidasDigitalesPotencia',
                        default: 'salida [SALIDASDIGITALES_PARAM] potencia [SALIDAS_POT_PARAM] %',
                        description: 'Establece la potencia de la salida [0-100]%'
                    }),
                    arguments: {
                        SALIDASDIGITALES_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'pwm',
                            defaultValue: '3' 
                        },                    
                        SALIDAS_POT_PARAM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100 
                        }                    
                    } 
                }
                ,'---',                
                {
                    opcode: 'entradaValor4',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'rasti.entradaValor4',
                        default: 'entrada analógica A',
                        description: 'Reporta el valor de la entrada analógica A'
                    })
                },
                {
                    opcode: 'entradaValor3',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'rasti.entradaValor3',
                        default: 'entrada analógica B',
                        description: 'Reporta el valor de la entrada analógica B'
                    })
                },
                {
                    opcode: 'entradaValor1',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'rasti.entradaValor1',
                        default: 'entrada analógica C',
                        description: 'Reporta el valor de la entrada analógica C'
                    })
                },
                {
                    opcode: 'entradaValor2',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'rasti.entradaValor2',
                        default: 'entrada analógica F',
                        description: 'Reporta el valor de la entrada analógica F'
                    })
                },
                {
                    opcode: 'entradaValor',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'rasti.entradaValor',
                        default: 'entrada analógica [ENTRADAS_PARAM]',
                        description: 'Reporta el valor de la entrada analógica'
                    }),
                    arguments: {
                        ENTRADAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'entradas',
                            defaultValue: '4' 
                        }                    
                    } 
                },
                {
                    opcode: 'entradaEstado',
                    blockType: BlockType.BOOLEAN,
                    text: formatMessage({
                        id: 'rasti.entradaEstado',
                        default: 'entrada analógica [ENTRADAS_PARAM] estado [ENTRADA_ESTADO]',
                        description: 'Reporta el estado de la entrada [alto-bajo]'
                    }),
                    arguments: {
                        ENTRADAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'entradas',
                            defaultValue: '4' 
                        },                    
                        ENTRADA_ESTADO: {
                            type: ArgumentType.STRING,
                            menu: 'estados',
                            defaultValue: 'alto' 
                        }                    
                    } 
                },
                {
                    opcode: 'entradaDigitalValor3',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'rasti.entradaDigitalValor3',
                        default: 'entrada digital A',
                        description: 'Reporta el valor de la entrada digital A'
                    })
                },                
                {
                    opcode: 'entradaDigitalValor4',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'rasti.entradaDigitalValor4',
                        default: 'entrada digital B',
                        description: 'Reporta el valor de la entrada digital B'
                    })
                },                
                {
                    opcode: 'entradaDigitalValor2',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'rasti.entradaDigitalValor2',
                        default: 'entrada digital C',
                        description: 'Reporta el valor de la entrada digital C'
                    })
                },                
                {
                    opcode: 'entradaDigitalValor1',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'rasti.entradaDigitalValor1',
                        default: 'entrada digital F',
                        description: 'Reporta el valor de la entrada digital F'
                    })
                },    
                {
                    opcode: 'entradaDigitalEstado',
                    blockType: BlockType.BOOLEAN,
                    text: formatMessage({
                        id: 'rasti.entradaDigitalEstado',
                        default: 'entrada digital [DIGITALES_PARAM] ',
                        description: 'Reporta el estado de la entrada digital [alto-bajo]'
                    }),
                    arguments: {
                        DIGITALES_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'digitales',
                            defaultValue: '3' 
                        }
                    } 
                },                           
                /*
                {
                    opcode: 'entradaUmbral',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'rasti.entradaUmbral',
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
                        id: 'rasti.entradaActiva',
                        default: 'valor entrada activa',
                        description: 'Reporta el valor de la última entrada activada'
                    }),
                },*/
                '---',
                {
                    opcode: 'cuandoEntradaValor',
                    text: formatMessage({
                        id: 'rasti.cuandoEntradaValor',
                        default: 'cuando entrada [ENTRADAS_PARAM] [ENTRADA_OPERADOR] [ENTRADA_VALOR]',
                        description: 'Cuando el valor de la entrada es  [mayor-menor-igual] que el [valor]'
                    }),
                    blockType: BlockType.HAT,
                    arguments: {
                        ENTRADAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'entradas',
                            defaultValue: '4' 
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
                        id: 'rasti.cuandoEntradaEstado',
                        default: 'cuando entrada [ENTRADAS_PARAM]  [ENTRADA_ESTADO]',
                        description: 'Cuando la entrada esta en estado [alto-bajo]'
                    }),
                    blockType: BlockType.HAT,
                    arguments: {
                        ENTRADAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'entradas',
                            defaultValue: '4' 
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
                        id: 'rasti.entradasAccion',
                        default: 'entrada [ENTRADAS_PARAM] [ENTRADAS_OP_PARAM]',
                        description: 'Enciende/apaga el reporte de entradas'
                    }),
                    arguments: {
                        ENTRADAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'entradas',
                            defaultValue: '4' 
                        },                    
                        ENTRADAS_OP_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'entradas_op',
                            defaultValue: 'encender' 
                        }                    
                    } 
                }
                /*
                ,'---',
                {
                    opcode: 'lcdAccion',
                    text: formatMessage({
                        id: 'rasti.lcdAccion',
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
                ,{
                    opcode: 'example-conditional',
                blockType: BlockType.CONDITIONAL,
                branchCount: 4,
                isTerminal: true,
                blockAllThreads: false,
                text: 'choose [BRANCH]',
                arguments: {
                    BRANCH: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 1
                    }
                },
                func: 'noop'
            }               
          */
            ],
            menus: {
                salidas: [
                    {value: 2, text: 'G'},
                    {value:1, text:'H'}
                ],
                salidas_op: ['encender', 'apagar', 'invertir'],
                salidas_digitales_op: ['encender', 'apagar'],
                leds_op: ['encender A', 'encender B', 'apagar', 'cambiar'],
                leds_op_time: ['encender A', 'encender B'],
                entradas: [
                    {value: 4, text: 'A'},
                    {value:3, text:'B'},
                    {value:1, text:'C'},
                    {value:5, text:'D'},
                    {value:2, text:'F'}
                ],
                entradas_op: ['encender', 'apagar'],
                pwm: [
                    {value: 3, text: 'A'},
                    {value:2, text:'C'},
                    {value:1, text:'F'}
                ],
                digitales: [
                    {value: 3, text: 'A'},
                    {value:4, text:'B'},
                    {value:2, text:'C'},
                    {value:1, text:'F'}
                ],
                servos: [
                    {value: 3, text: 'A'},
                    {value:4, text:'B'},
                    {value:2, text:'C'},
                    {value:1, text:'F'}
                ],
                direccion: ['a','b'],
                estados: ['alto','bajo'],
                operadores: ['>','<', '='],
                lcd_op: ['encender','apagar', 'silenciar'],
            }
        };
    }

    salidas (args, util) {
        if(args.MOTORES_PARAM > MAX_SALIDAS) return;
        var s = this.rasti.salidas[args.MOTORES_PARAM - 1];
        console.log(args)
        switch(args.SALIDAS_OP_PARAM) {
            case 'encender': case 1: s.on(); break;
            case 'apagar': case 2: s.off(); break;
            case 'invertir': case 3: s.inverse(); break;
            case 'frenar': case 4: s.brake(); break;
            default: s.off();
        }
    };

    salidasDigitales (args, util) {
        if(args.SALIDASDIGITALES_PARAM > MAX_SALIDAS_DIGITALES) return;
        var s = this.rasti.salidasdigitales[args.SALIDASDIGITALES_PARAM - 1];
        switch(args.SALIDASDIGITALES_OP_PARAM) {
            case 'encender': case 1: s.on(); break;
            case 'apagar': case 2: s.off(); break;
            default: s.off();
        }
    };

    salidasDigitalesPotencia (args, util) {
        if(args.SALIDASDIGITALES_PARAM > MAX_SALIDAS_PWM) return;
        var s = this.rasti.salidasdigitales[args.SALIDASDIGITALES_PARAM - 1];
        var p = MathUtil.clamp(255*Cast.toNumber(args.SALIDAS_POT_PARAM)/100, 0, 255);
        s.power(p);        
    };

    salidasDireccion (args, util) {
        if(args.MOTORES_PARAM > MAX_SALIDAS) return;
        var s = this.rasti.salidas[args.MOTORES_PARAM - 1];
        switch(args.SALIDAS_DIR_PARAM) {
            case 'a': case 1: s.direction(0); break;
            case 'b': case 2: s.direction(1); break;
        }
    };

    salidasPotencia (args, util) {
        if(args.MOTORES_PARAM > MAX_SALIDAS) return;
        var s = this.rasti.salidas[args.MOTORES_PARAM - 1];
        var p = MathUtil.clamp(255*Cast.toNumber(args.SALIDAS_POT_PARAM)/100, 0, 255);
        s.power(p);        
    };

    salidasByTime (args, util) {
        if(args.MOTORES_PARAM > MAX_SALIDAS) return;
        var s = this.rasti.salidas[args.MOTORES_PARAM - 1];
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
        if(args.MOTORES_PARAM > MAX_SALIDAS) return;
        var s = this.rasti.salidas[args.MOTORES_PARAM - 1];
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
        if(args.MOTORES_PARAM > MAX_SALIDAS) return;
        var s = this.rasti.salidas[args.MOTORES_PARAM - 1];
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

    entradas (args, util) {
        if(args.ENTRADAS_PARAM > MAX_ENTRADAS) return;
        var i = this.rasti;
        i.entradaActiva = args.ENTRADAS_PARAM;
        var s = i.entradas[args.ENTRADAS_PARAM - 1];
        switch(args.ENTRADAS_OP_PARAM) {
            case 'encender': case 1: 
                s.on(function(data){
                i.analogValues[data.index -1 ] = data.value;
                i.analogHIGH[data.index -1] = data.value > THRESHOLD_HIGH;
                i.analogLOW[data.index -1] = data.value < THRESHOLD_LOW;
            }); break;
            case 'apagar': case 2: 
                s.off(); 
                i.analogValues[args.ENTRADAS_PARAM -1 ] = 0;
                i.analogHIGH[args.ENTRADAS_PARAM -1] = false;
                i.analogLOW[args.ENTRADAS_PARAM -1] = false;
                break;
            default: s.off();
        }
    };
    
    entradasDigitales (args, util) {
        if(args.DIGITALES_PARAM > MAX_DIGITALES) return;
        var i = this.rasti;
        var s = i.digitales[args.DIGITALES_PARAM - 1];
        switch(args.ENTRADAS_OP_PARAM) {
            case 'encender': case 1: 
                s.on(function(data){
                i.digitalValues[data.index -1 ] = data.value;
            }); break;
            case 'apagar': case 2: 
                s.off(); 
                i.analogValues[args.DIGITALES_PARAM -1 ] = 0;
                break;
            default: s.off();
        }
    };

    checkDigitalStatus(index, util) {
        var i = this.rasti;
        var s = i.digitales[index - 1];
        if(!s.status) {
            this.entradasDigitales({'DIGITALES_PARAM': index, 'ENTRADAS_OP_PARAM': 1}, util);
        }
    }

    checkAnalogStatus(index, util) {
        var i = this.rasti;
        var s = i.entradas[index - 1];
        if(!s.status) {
            this.entradas({'ENTRADAS_PARAM': index, 'ENTRADAS_OP_PARAM': 1}, util);
        }
    }
    
    
    entradaValor (args, util) {
        if(args.ENTRADAS_PARAM > MAX_ENTRADAS) return;
        var i = this.rasti;
        i.entradaActiva = args.ENTRADAS_PARAM;
        this.checkAnalogStatus(args.ENTRADAS_PARAM, util);
        return i.analogValues[args.ENTRADAS_PARAM - 1];
    }
    
    entradaDigitalValor1 (args, util) {
        var i = this.rasti;
        this.checkDigitalStatus(1, util);
        return i.digitalValues[0]? true : false;
    }
    entradaDigitalValor2 (args, util) {
        var i = this.rasti;
        this.checkDigitalStatus(2, util);
        return i.digitalValues[1]? true : false;
    }
    entradaDigitalValor3 (args, util) {
        var i = this.rasti;
        this.checkDigitalStatus(3, util);
        return i.digitalValues[2]? true : false;
    }
    entradaDigitalValor4 (args, util) {
        var i = this.rasti;
        this.checkDigitalStatus(4, util);
        return i.digitalValues[3]? true : false;
    }

    entradaValor1 (args, util) {
        var i = this.rasti;
        this.checkAnalogStatus(1, util);
        return i.analogValues[0];
    }
    entradaValor2 (args, util) {
        var i = this.rasti;
        this.checkAnalogStatus(2, util);
        return i.analogValues[1];
    }
    entradaValor3 (args, util) {
        var i = this.rasti;
        this.checkAnalogStatus(3, util);
        return i.analogValues[2];
    }
    entradaValor4 (args, util) {
        var i = this.rasti;
        this.checkAnalogStatus(4, util);
        return i.analogValues[3];
    }

    entradaEstado (args, util) {
        if(args.ENTRADAS_PARAM > MAX_ENTRADAS) return;
        var i = this.rasti;
        i.entradaActiva = args.ENTRADAS_PARAM;
        var v = false;
        this.checkAnalogStatus(args.ENTRADAS_PARAM, util);
        switch(args.ENTRADA_ESTADO) {
            case 'alto': case 1:  v =  i.analogHIGH[args.ENTRADAS_PARAM - 1] ; break;
            case 'bajo': case 0:  v =  i.analogLOW[args.ENTRADAS_PARAM - 1] ; break;
        }
        return v;
    }
    
    entradaDigitalEstado (args, util) {
        if(args.DIGITALES_PARAM > MAX_DIGITALES) return;
        var i = this.rasti;
        var v = false;
        this.checkDigitalStatus(args.DIGITALES_PARAM, util);
        return (i.digitalValues[args.DIGITALES_PARAM - 1]) ? true : false;
    }
    
    cuandoEntradaEstado (args, util) {
        if(args.ENTRADAS_PARAM > MAX_ENTRADAS) return;
        var i = this.rasti;
        var v = false;
        this.checkAnalogStatus(args.ENTRADAS_PARAM, util);
        switch(args.ENTRADA_ESTADO) {
            case 'alto': case 1:  v =  i.analogHIGH[args.ENTRADAS_PARAM - 1]  ; break;
            case 'bajo': case 0:  v =  i.analogLOW[args.ENTRADAS_PARAM - 1] ; break;
        }
        return v;
    }

    cuandoEntradaValor (args, util) {
        if(args.ENTRADAS_PARAM > MAX_ENTRADAS) return;
        var i = this.rasti;
        var v = false;
        this.checkAnalogStatus(args.ENTRADAS_PARAM, util);
        switch(args.ENTRADA_OPERADOR) {
            case '>':   v =  i.analogValues[args.ENTRADAS_PARAM - 1] > Cast.toNumber(args.ENTRADA_VALOR) ; break;
            case '<':   v =  i.analogValues[args.ENTRADAS_PARAM - 1] < Cast.toNumber(args.ENTRADA_VALOR) ; break;
            case '=':   v =  i.analogValues[args.ENTRADAS_PARAM - 1] = Cast.toNumber(args.ENTRADA_VALOR) ; break;
        }
        return v;
    }

    entradaActiva (args, util) {
        if(args.ENTRADAS_PARAM > MAX_ENTRADAS) return;
        var i = this.rasti;
        if(i.entradaActiva === 0) return 0;
        return i.analogValues[i.entradaActiva - 1];
    }

    entradaUmbral (args, util) {
        if(args.ENTRADAS_PARAM > MAX_ENTRADAS) return;
        var i = this.rasti;
         i.analogThreshold[args.ENTRADAS_PARAM - 1] = MathUtil.clamp(args.ENTRADA_UMBRAL,0,1023);
    }

    servoPosicion (args, util) {
        if(args.SERVOS_PARAM > MAX_SERVOS) return;
        var s = this.rasti.servos[args.SERVOS_PARAM - 1];
        console.log(args.SERVOS_POSICION);
        s.position( MathUtil.clamp(Math.abs(args.SERVOS_POSICION),0,180));
    };

    lcdAccion (args, util) {
        switch(args.LCD_OP) {
            case 'encender': case 1:  this.rasti.lcd.encender(); break;
            case 'apagar': case 3: this.rasti.lcd.apagar(); break;
            case 'silenciar': case 4: this.rasti.lcd.silenciar(); break;
            default: s.off();
        }
    };
}

module.exports = Scratch3Rasti;
