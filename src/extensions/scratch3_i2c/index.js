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

const blockIconURI = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTcuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMyMy4zMyAzMjMuMzMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMyMy4zMyAzMjMuMzM7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgo8Zz4KCTxwYXRoIGQ9Ik0xNDMuNjY1LDIxOS44NDFoNjEuM2M0LjE0MywwLDcuNS0zLjM1Nyw3LjUtNy41di05Mi4xOTdjMC00LjE0My0zLjM1Ny03LjUtNy41LTcuNWgtOTIuMTk3Yy00LjE0MywwLTcuNSwzLjM1Ny03LjUsNy41ICAgdjkyLjE5N2MwLDQuMTQzLDMuMzU3LDcuNSw3LjUsNy41czcuNS0zLjM1Nyw3LjUtNy41di04NC42OTdoNzcuMTk3djc3LjE5N2gtNTMuOGMtNC4xNDMsMC03LjUsMy4zNTctNy41LDcuNSAgIFMxMzkuNTIyLDIxOS44NDEsMTQzLjY2NSwyMTkuODQxeiIgZmlsbD0iIzAwMDAwMCIvPgoJPHBhdGggZD0iTTE1OC44NjUsMTQ4Ljc0NWMxLjk3OSwwLDMuOTA5LTAuOCw1LjMtMi4yYzEuMzk5LTEuMzksMi4yLTMuMzMsMi4yLTUuM2MwLTEuOTcxLTAuODAxLTMuOS0yLjItNS4zICAgYy0xLjM5MS0xLjQtMy4zMy0yLjItNS4zLTIuMmMtMS45NzEsMC0zLjkxLDAuOC01LjMwMSwyLjJjLTEuMzk5LDEuMzktMi4xOTksMy4zMjktMi4xOTksNS4zYzAsMS45NzksMC44LDMuOTEsMi4xOTksNS4zICAgQzE1NC45NTUsMTQ3Ljk0NSwxNTYuODk1LDE0OC43NDUsMTU4Ljg2NSwxNDguNzQ1eiIgZmlsbD0iIzAwMDAwMCIvPgoJPHBhdGggZD0iTTE1My41NjQsMTcwLjg2NWMxLjM5MSwxLjM5OSwzLjMzLDIuMTk5LDUuMzAxLDIuMTk5YzEuOTc5LDAsMy45MDktMC44LDUuMy0yLjE5OWMxLjM5OS0xLjM5MSwyLjItMy4zMywyLjItNS4zMDEgICBjMC0xLjk3LTAuODAxLTMuODk5LTIuMi01LjNjLTEuMzkxLTEuMzk5LTMuMzItMi4yLTUuMy0yLjJjLTEuOTcxLDAtMy45MSwwLjgwMS01LjMwMSwyLjJjLTEuMzk5LDEuMzkxLTIuMTk5LDMuMzMtMi4xOTksNS4zICAgQzE1MS4zNjUsMTY3LjU0NSwxNTIuMTY1LDE2OS40NzUsMTUzLjU2NCwxNzAuODY1eiIgZmlsbD0iIzAwMDAwMCIvPgoJPHBhdGggZD0iTTE1My41NjQsMTk1LjE4NWMxLjM5MSwxLjQsMy4zMywyLjIsNS4zMDEsMi4yYzEuOTc5LDAsMy45MDktMC44LDUuMy0yLjJjMS4zOTktMS4zOSwyLjItMy4zMywyLjItNS4zICAgcy0wLjgwMS0zLjkxLTIuMi01LjNjLTEuMzkxLTEuNC0zLjMyLTIuMi01LjMtMi4yYy0xLjk3MSwwLTMuOTEsMC44LTUuMzAxLDIuMmMtMS4zOTksMS4zOS0yLjE5OSwzLjMzLTIuMTk5LDUuMyAgIEMxNTEuMzY1LDE5MS44NjUsMTUyLjE2NSwxOTMuNzk1LDE1My41NjQsMTk1LjE4NXoiIGZpbGw9IiMwMDAwMDAiLz4KCTxwYXRoIGQ9Ik0xMjkuMjQ1LDE5NS4xODVjMS4zOTksMS40LDMuMzMsMi4yLDUuMywyLjJjMS45NzksMCwzLjkxLTAuOCw1LjMxLTIuMmMxLjM5MS0xLjM5LDIuMTktMy4zMTksMi4xOS01LjMgICBjMC0xLjk3OS0wLjgtMy45MS0yLjE5LTUuM2MtMS4zOTktMS40LTMuMzMtMi4yLTUuMzEtMi4yYy0xLjk3LDAtMy45MSwwLjgtNS4zLDIuMmMtMS40LDEuMzktMi4yLDMuMzMtMi4yLDUuMyAgIFMxMjcuODQ1LDE5My43OTUsMTI5LjI0NSwxOTUuMTg1eiIgZmlsbD0iIzAwMDAwMCIvPgoJPHBhdGggZD0iTTE3Ny44ODUsMTcwLjg2NWMxLjM5LDEuMzk5LDMuMzMsMi4xOTksNS4zLDIuMTk5YzEuOTgsMCwzLjkxLTAuOCw1LjMtMi4xOTljMS40LTEuMzkxLDIuMi0zLjMzLDIuMi01LjMwMSAgIGMwLTEuOTctMC44LTMuODk5LTIuMi01LjNjLTEuMzktMS4zOTktMy4zMTktMi4yLTUuMy0yLjJjLTEuOTc5LDAtMy45MSwwLjgwMS01LjMsMi4yYy0xLjQsMS4zOTEtMi4yLDMuMzItMi4yLDUuMyAgIEMxNzUuNjg1LDE2Ny41NDUsMTc2LjQ4NCwxNjkuNDc1LDE3Ny44ODUsMTcwLjg2NXoiIGZpbGw9IiMwMDAwMDAiLz4KCTxwYXRoIGQ9Ik0xNzcuODg1LDE5NS4xODVjMS4zOSwxLjQsMy4zMywyLjIsNS4zLDIuMmMxLjk4LDAsMy45MS0wLjgsNS4zLTIuMmMxLjQtMS4zOSwyLjItMy4zMywyLjItNS4zcy0wLjgtMy45MS0yLjItNS4zICAgYy0xLjM5LTEuNC0zLjMxOS0yLjItNS4zLTIuMmMtMS45NzksMC0zLjkxLDAuOC01LjMsMi4yYy0xLjQsMS4zOS0yLjIsMy4zMi0yLjIsNS4zICAgQzE3NS42ODUsMTkxLjg2NSwxNzYuNDg0LDE5My43OTUsMTc3Ljg4NSwxOTUuMTg1eiIgZmlsbD0iIzAwMDAwMCIvPgoJPHBhdGggZD0iTTE4My4xODUsMTQ4Ljc0NWMxLjk3MSwwLDMuOTEtMC44LDUuMy0yLjE5YzEuNC0xLjM5OSwyLjItMy4zNCwyLjItNS4zMWMwLTEuOTcxLTAuOC0zLjktMi4yLTUuMyAgIGMtMS4zOS0xLjQtMy4zMTktMi4yLTUuMy0yLjJjLTEuOTc5LDAtMy45MSwwLjgtNS4zLDIuMmMtMS40LDEuMzktMi4yLDMuMzI5LTIuMiw1LjNjMCwxLjk3OSwwLjgsMy45MSwyLjIsNS4zMSAgIEMxNzkuMjc0LDE0Ny45NDUsMTgxLjIxNSwxNDguNzQ1LDE4My4xODUsMTQ4Ljc0NXoiIGZpbGw9IiMwMDAwMDAiLz4KCTxwYXRoIGQ9Ik0xMjkuMjQ1LDE3MC44NjVjMS4zOTksMS4zOTksMy4zMywyLjE5OSw1LjMsMi4xOTljMS45NzksMCwzLjkxLTAuOCw1LjMxLTIuMTk5YzEuMzkxLTEuMzkxLDIuMTktMy4zMiwyLjE5LTUuMzAxICAgYzAtMS45Ny0wLjgtMy45MDktMi4xOS01LjNjLTEuMzk5LTEuMzk5LTMuMzMtMi4yLTUuMzEtMi4yYy0xLjk3LDAtMy45MSwwLjgwMS01LjMsMi4yYy0xLjQsMS4zOTEtMi4yLDMuMzMtMi4yLDUuMyAgIEMxMjcuMDQ1LDE2Ny41MzUsMTI3Ljg0NSwxNjkuNDc1LDEyOS4yNDUsMTcwLjg2NXoiIGZpbGw9IiMwMDAwMDAiLz4KCTxwYXRoIGQ9Ik0xMzQuNTQ1LDE0OC43NDVjMS45NzksMCwzLjkxLTAuOCw1LjMxLTIuMTljMS4zOTEtMS4zOTksMi4xOS0zLjMzLDIuMTktNS4zMWMwLTEuOTgtMC44LTMuOTEtMi4xOS01LjMgICBjLTEuMzk5LTEuNC0zLjMzLTIuMi01LjMxLTIuMmMtMS45NywwLTMuOTEsMC44LTUuMywyLjJjLTEuNCwxLjM5LTIuMiwzLjMyOS0yLjIsNS4zYzAsMS45NzksMC44LDMuOTEsMi4yLDUuMzEgICBDMTMwLjY0NSwxNDcuOTQ1LDEzMi41NzUsMTQ4Ljc0NSwxMzQuNTQ1LDE0OC43NDV6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8cGF0aCBkPSJNMjMuMzk5LDE4Ni40NzhDMTAuNDk3LDE4Ni40NzgsMCwxOTYuOTc1LDAsMjA5Ljg3N3MxMC40OTcsMjMuMzk4LDIzLjM5OSwyMy4zOThzMjMuMzk4LTEwLjQ5NiwyMy4zOTgtMjMuMzk4ICAgUzM2LjMwMiwxODYuNDc4LDIzLjM5OSwxODYuNDc4eiBNMjMuMzk5LDIxOC4yNzVjLTQuNjMyLDAtOC4zOTktMy43NjgtOC4zOTktOC4zOThjMC00LjYzMiwzLjc2OC04LjM5OSw4LjM5OS04LjM5OSAgIGM0LjYzMSwwLDguMzk4LDMuNzY4LDguMzk4LDguMzk5QzMxLjc5OCwyMTQuNTA4LDI4LjAzLDIxOC4yNzUsMjMuMzk5LDIxOC4yNzV6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8cGF0aCBkPSJNMjk5LjkzMSwxNTAuNTg4Yy0xMi45MDIsMC0yMy4zOTgsMTAuNDk3LTIzLjM5OCwyMy4zOTlzMTAuNDk2LDIzLjM5OCwyMy4zOTgsMjMuMzk4czIzLjM5OS0xMC40OTYsMjMuMzk5LTIzLjM5OCAgIFMzMTIuODMzLDE1MC41ODgsMjk5LjkzMSwxNTAuNTg4eiBNMjk5LjkzMSwxODIuMzg2Yy00LjYzMSwwLTguMzk4LTMuNzY4LTguMzk4LTguMzk4YzAtNC42MzIsMy43NjgtOC4zOTksOC4zOTgtOC4zOTkgICBjNC42MzIsMCw4LjM5OSwzLjc2OCw4LjM5OSw4LjM5OUMzMDguMzMsMTc4LjYxOCwzMDQuNTYzLDE4Mi4zODYsMjk5LjkzMSwxODIuMzg2eiIgZmlsbD0iIzAwMDAwMCIvPgoJPHBhdGggZD0iTTI3Ni45NTMsMTM4LjYxNmwtMTIuODA0LTEyLjgwNWMtMS40MDctMS40MDctMy4zMTQtMi4xOTctNS4zMDQtMi4xOTdoLTIwLjI5OXYtMTUuNTQ1ICAgYzAtMTEuODU5LTkuNjQ4LTIxLjUwNy0yMS41MDgtMjEuNTA3aC0xNi44OTZWNTAuOTYxYzkuMjMzLTMuMTM0LDE1Ljg5OC0xMS44OCwxNS44OTgtMjIuMTU5ICAgYzAtMTIuOTAyLTEwLjQ5Ni0yMy4zOTgtMjMuMzk4LTIzLjM5OHMtMjMuMzk5LDEwLjQ5Ni0yMy4zOTksMjMuMzk4YzAsMTAuMjc5LDYuNjY2LDE5LjAyNSwxNS44OTksMjIuMTU5djM1LjYwMWgtNC44MTIgICBjLTQuMTQzLDAtNy41LDMuMzU3LTcuNSw3LjVzMy4zNTcsNy41LDcuNSw3LjVoMzYuNzA3YzMuNTg5LDAsNi41MDgsMi45MTksNi41MDgsNi41MDd2MTE2LjM0NWMwLDMuNTg5LTIuOTE5LDYuNTA4LTYuNTA4LDYuNTA4ICAgSDEwMC42OTRjLTMuNTg5LDAtNi41MDgtMi45MTktNi41MDgtNi41MDhWMTA4LjA2OWMwLTMuNTg4LDIuOTE5LTYuNTA3LDYuNTA4LTYuNTA3aDQ4Ljk3MWM0LjE0MywwLDcuNS0zLjM1Nyw3LjUtNy41ICAgcy0zLjM1Ny03LjUtNy41LTcuNWgtMTAuMzE5VjYzLjgxNGMwLTEuOTg5LTAuNzktMy44OTYtMi4xOTctNS4zMDRsLTI2Ljk2OS0yNi45NjljMC4xMDUtMC44OTksMC4xNjYtMS44MTMsMC4xNjYtMi43NCAgIGMwLTEyLjkwMi0xMC40OTYtMjMuMzk4LTIzLjM5OC0yMy4zOThTNjMuNTQ4LDE1Ljg5OSw2My41NDgsMjguODAyczEwLjQ5NiwyMy4zOTksMjMuMzk4LDIzLjM5OWM2LjI2OSwwLDExLjk2NC0yLjQ4MiwxNi4xNjktNi41MSAgIGwyMS4yMywyMS4yMjl2MTkuNjQyaC0yMy42NTFjLTExLjg1OSwwLTIxLjUwOCw5LjY0Ny0yMS41MDgsMjEuNTA3djk2Ljc3MUg2MS42NjVjLTQuMTQzLDAtNy41LDMuMzU3LTcuNSw3LjVzMy4zNTcsNy41LDcuNSw3LjUgICBoMTcuNTIxdjQuNTczYzAsMTEuODU5LDkuNjQ4LDIxLjUwOCwyMS41MDgsMjEuNTA4aDYyLjE1NnYyMC4xNDFjMCwxLjk4OSwwLjc5LDMuODk2LDIuMTk2LDUuMzA0bDEzLjA4NywxMy4wODcgICBjLTEuNDYzLDMuMDUzLTIuMjgzLDYuNDctMi4yODMsMTAuMDc1YzAsMTIuOTAyLDEwLjQ5NiwyMy4zOTgsMjMuMzk4LDIzLjM5OHMyMy4zOTktMTAuNDk2LDIzLjM5OS0yMy4zOTggICBzLTEwLjQ5Ny0yMy4zOTktMjMuMzk5LTIzLjM5OWMtMy44MzQsMC03LjQ1MywwLjkzMy0xMC42NSwyLjU3NWwtMTAuNzQ5LTEwLjc0OHYtMTcuMDM0aDM5LjE4OCAgIGMxMS44NTksMCwyMS41MDgtOS42NDgsMjEuNTA4LTIxLjUwOHYtODUuOGgxNy4xOTJsMTAuNjA2LDEwLjYwN2MxLjQ2NSwxLjQ2NSwzLjM4NCwyLjE5Nyw1LjMwNCwyLjE5NyAgIGMxLjkxOSwwLDMuODM5LTAuNzMyLDUuMzAzLTIuMTk2QzI3OS44ODIsMTQ2LjI5NCwyNzkuODgyLDE0MS41NDUsMjc2Ljk1MywxMzguNjE2eiBNMTkyLjY0NCwyMC40MDMgICBjNC42MzEsMCw4LjM5OCwzLjc2OCw4LjM5OCw4LjM5OGMwLDQuNjMyLTMuNzY4LDguMzk5LTguMzk4LDguMzk5Yy00LjYzMiwwLTguMzk5LTMuNzY4LTguMzk5LTguMzk5ICAgQzE4NC4yNDQsMjQuMTcxLDE4OC4wMTIsMjAuNDAzLDE5Mi42NDQsMjAuNDAzeiBNODYuOTQ2LDM3LjIwMWMtNC42MzEsMC04LjM5OC0zLjc2OC04LjM5OC04LjM5OWMwLTQuNjMxLDMuNzY4LTguMzk4LDguMzk4LTguMzk4ICAgczguMzk4LDMuNzY4LDguMzk4LDguMzk4Qzk1LjM0NSwzMy40MzQsOTEuNTc3LDM3LjIwMSw4Ni45NDYsMzcuMjAxeiBNMjA3LjY0OCwyOTQuNTI4YzAsNC42MzEtMy43NjgsOC4zOTgtOC4zOTksOC4zOTggICBjLTQuNjMxLDAtOC4zOTgtMy43NjgtOC4zOTgtOC4zOThjMC00LjYzMiwzLjc2OC04LjM5OSw4LjM5OC04LjM5OUMyMDMuODgxLDI4Ni4xMjksMjA3LjY0OCwyODkuODk2LDIwNy42NDgsMjk0LjUyOHoiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K";

const LOW = 0;
const HIGH = 1;


var  HMC5883L = class {
    /**
     * class HMC5883
     * @constructor
     *
     * @param index {Integer} analog number
  * 
  */
 constructor() {
     this.id = "HMC5883L";
     this.status = 0;
     this.heading = 0;
     this.cardinal = "";
     var me = this;
     socket.on('DEVICE_MESSAGE', function (data) {
       if(data.id == me.id) {
           me.heading = data.attributes.bearing.heading;
           me.cardinal = data.attributes.bearing.abbr;
       }
     });   
     socket.emit("DEVICE", {"id": me.id,"device": "Compass", "options": {"controller": "HMC5883L"}}, function(res) {
         socket.emit("DEVICE_EVENT", {"id": me.id, "event": "data", "attributes": ["bearing"]});
    });
   }
}


var  SHT21D = class {
    /**
     * class HMC5883
     * @constructor
     *
     * @param index {Integer} analog number
  * 
  */
 constructor() {
     this.id = "HTU21D";
     this.status = 0;
     this.celsius = 0;
     this.kelvin = 0;
     this.relativeHumidity = 0;
     var me = this;
     socket.on('DEVICE_MESSAGE', function (data) {
       if(data.id == me.id) {
           me.celsius = data.attributes["thermometer.celsius"];
           me.kelvin = data.attributes["thermometer.kelvin"];
           me.relativeHumidity = data.attributes["hygrometer.relativeHumidity"];
       }
     });   
     socket.emit("DEVICE", {"id": me.id,"device": "Multi", "options": {"controller": "HTU21D"}}, function(res) {
         socket.emit("DEVICE_EVENT", {"id": me.id, "event": "data", "attributes": ["thermometer.celsius", "thermometer.kelvin", "hygrometer.relativeHumidity"]});
    });
   }
}

class Scratch3I2c {
    constructor (runtime) {
        this.runtime = runtime;
        //this.runtime.emit(this.runtime.constructor.PERIPHERAL_CONNECTED);
        this.instances = [];

        var me = this;
        socket.on('DISCONNECTED_MESSAGE', function (data) {
            console.log("disconnected")
            me.instances = new Array();
        });        
        socket.on('INTERFAZ_CONNECTED', function (data) {
            console.log("connected")
            me.instances = new Array();
        });        

    }

    getInfo () {
        return {
            id: 'i2c',
            name: 'I2C',
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
                    opcode: 'HMC5883heading',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'i2c.HMC5883heading',
                        default: 'Brújula: Orientación',
                        description: 'Reporta la orientación del sensor HMC5883L'
                    })
                },
               {
                    opcode: 'HMC5883cardinal',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'i2c.HMC5883cardinal',
                        default: 'Brújula: Punto cardinal',
                        description: 'Reporta el punto cardinal de la orientación del sensor HMC5883L'
                    })
                },
                '---',
                {
                    opcode: 'SHT21D',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'i2c.SHT21D',
                        default: 'Temperatura: Grados celsius',
                        description: 'Reporta la temparatura en celsius del sensor HTU21D'
                    })
                },
                {
                    opcode: 'HTU21D',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'i2c.HTU21D',
                        default: 'Humedad %',
                        description: 'Reporta la humedad relativa del sensor HTU21D'
                    })
                },
                '---'


/*
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
                */
              ],
            menus: {
            }
        };
    }

    HMC5883heading (args, util) {
        var id = "HMC5883L";
        var ins = this.instances.filter(i => i.id == id).shift();
        if(ins) return ins.object.heading;
        this.instances.push({id:id, object: new HMC5883L() });
        return 0;
    };
    
    HMC5883cardinal (args, util) {
        var id = "HMC5883L";
        var ins = this.instances.filter(i => i.id == id).shift();
        if(ins) return ins.object.cardinal;
        this.instances.push({id:id, object: new HMC5883L() });
        return "";
    };
    
    HTU21D (args, util) {
        var id = "HTU21D";
        var ins = this.instances.filter(i => i.id == id).shift();
        if(ins) return ins.object.relativeHumidity;
        this.instances.push({id:id, object: new SHT21D() });
        return 0;
    };

    SHT21D (args, util) {
        var id = "SHT21D";
        var ins = this.instances.filter(i => i.id == id).shift();
        if(ins) return ins.object.celsius;
        this.instances.push({id:id, object: new SHT21D() });
        return 0;
    };

    
}

module.exports = Scratch3I2c;
