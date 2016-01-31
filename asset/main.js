/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

  // The base Class implementation (does nothing)
  this.Class = function(){};

  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;

            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];

            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);
            this._super = tmp;

            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }

    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;

    return Class;
  };
})();

//c = console.log = function(){};
var c = console.log;

/*/
var mapData = {
  "height": 20,
  "layers": [
    {
	  "data":[6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 29, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 32, 6, 6, 30, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 31, 6, 6, 6, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 6, 6, 6, 6, 6, 41, 42, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 43, 44, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
      "height": 20,
      "name": "Tile Layer 1",
      "opacity": 1,
      "type": "tilelayer",
      "visible": true,
      "width": 20,
      "x": 0,
      "y": 0
    },
    {
      "height": 20,
      "name": "Object Layer 1",
      "objects": [
        {
          "height": 0,
          "name": "Character",
          "properties": {},
          "type": "Character",
          "visible": true,
          "width": 0,
          "x": 1151,
          "y": 2179
        }
      ],
      "opacity": 1,
      "type": "objectgroup",
      "visible": true,
      "width": 20,
      "x": 0,
      "y": 0
    }
  ],
  "orientation": "orthogonal",
  "properties": {},
  "tileheight": 128,
  "tilesets": [
    {
      "firstgid": 1,
      "image": "../Sonic/testTiles.png",
      "imageheight": 1536,
      "imagewidth": 512,
      "margin": 0,
      "name": "Solids",
      "properties": {},
      "spacing": 0,
      "tileheight": 128,
      "tilewidth": 128
    }
  ],
  "tilewidth": 128,
  "version": 1,
};
  "width": 20
/*/
var mapData = 
{ "height":50,
 "layers":[
        {
         "data":[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 14, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 19, 18, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 17, 2, 2, 2, 2, 2, 2, 2, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 17, 2, 2, 2, 2, 2, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 17, 2, 2, 2, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 21, 2, 2, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 20, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 26, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 25, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 26, 2, 2, 2, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 25, 2, 2, 2, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 24, 2, 2, 2, 2, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 24, 2, 2, 2, 2, 2, 2, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 24, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 27, 28, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 27, 28, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
         "height":50,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":50,
         "x":0,
         "y":0
        }],
 "orientation":"orthogonal",
 "properties":
    {

    },
 "renderorder":"right-down",
 "tileheight":32,
 "tilesets":[
        {
         "firstgid":1,
         "image":"..\/Sonic\/testTiles2.png",
         "imageheight":128,
         "imagewidth":224,
         "margin":0,
         "name":"Shapes",
         "properties":
            {

            },
         "spacing":0,
         "tileheight":32,
         "tilewidth":32
        }],
 "tilewidth":32,
 "version":1,
 "width":50
};
//*/

function sign(x)
{
	if(x < 0)
	{
		return -1;
	}
	else if(x == 0)
	{
		return 0;
	}

	return 1;
}

function roundAngle(angle, segments)
{
	angle = Math.round(angle * (180/Math.PI));
	//segments /= 2;

	var rAngle = Math.round(
		angle / (360/segments)
	) * 360/segments;

	/*
	var rAngle = Math.round(
		angle / (Math.PI/segments)
	) * Math.PI/segments;
	*/

	return (rAngle * (Math.PI/180));
}

/*
Need to extend the number prototype to support acc, dec and sign operations
*/

function logObject(object)
{
	var string = '';
	for(var i in object)
	{
		string += '(' + i + ',' + object[i] + '), ';
	}

	console.log(string);
};

var Actor = Class.extend({
	x: 0
	, y: 0
	, angle: 0
	, world: null
	, gSpeed: 0
	, xSpeed: 0
	, ySpeed: 0
	, gravity: 0
	, maxGravity: 24*2
	, slopeFactor:0.01
	, falling: false
	, width: 64
	, height: 64
	, boxWidth: 64
	, boxHeight: 64
	, directions: 16
	, state: 'standing'
	, objects: null
	, sprites: null
	, currentClasses: null
	, animationClasses: {}
	, htmlObject: null
	, sensors: {
		top: false
		, bottom: false
		, left: false
		, right: false
	}
	, mode: 0
	, modes: {
		floor: 0
		, rightWall: 1
		, ceiling: 2
		, leftWall: 3
	}
	, init: function(x, y, world)
	{
		this.x			= x;
		this.y			= y;
		this.world		= world;
		this.id			= this.world.addActor(this);
		this.sprites = [];
		this.objects = [];
		this.currentClasses = [];
	}
	, destroy: function()
	{
		this.world.removeActor(this.id);
		this.objects.map(function(x){
			x.remove();
		});

		return true;
	}
	, getObject: function()
	{
		if(this.htmlObject)
		{
			return this.htmlObject;
		}

		var object = $('<div>')
			.addClass('actor')
			.addClass('actor-' + this.id);

		var sprite = $('<div>').addClass('sprite');

		object.append(sprite);

		this.objects.push(object);
		this.sprites.push(sprite);

		this.htmlObject = object;

		return object;
	}
	, update: function()
	{
		this.falling = true;

		var center
			, map = this.world.map
			, testX
			, testY
			, tileTestX
			, tileTestX2
			, tileTestY
			, tileTestY2
			, testTile
			, isSolid
			, sensors
			, spread
			, spreads
			, initDrop
			, maxDrop
			, underground
			, stretch
			, pushing;

		// Wall detection...

		center = this.center();
		stretch = (this.width/4);

		var mode = this.modes;

		if(!this.direction)
		{
			this.direction = 0;
		}

		for(var wallTest = 0; wallTest < stretch; null)
		{
			isSolid = false;

			if(this.mode == this.modes.floor || this.mode == mode.ceiling)
			{
				testYPoint = this.top();

				testX = Math.floor(
					(center[0] + wallTest)/this.world.blockSize()
				);

				testX2 = Math.floor(
					(center[0] - wallTest)/this.world.blockSize()
				);

				testY = Math.floor(testYPoint/this.world.blockSize());
				tileTestX = (center[0] + wallTest) % this.world.blockSize();
				tileTestX2 = (center[0] - wallTest) % this.world.blockSize();

				if(tileTestX < 0)
				{
					tileTestX += this.world.blockSize();
				}

				if(tileTestX2 < 0)
				{
					tileTestX2 += this.world.blockSize();;
				}

				tileTestY = Math.floor(testYPoint % this.world.blockSize());

				if(tileTestY < 0)
				{
					tileTestY += this.world.blockSize();;
				}

				tileTestY2 = tileTestY;

				testTile = map.getTileNumber(testX, testY);
				testTile2 = map.getTileNumber(testX2, testY);
			}
			else if(this.mode == mode.rightWall || this.mode == mode.leftWall)
			{
				testXPoint = this.left();

				testXPoint = this.right();

				testY = Math.floor(
					(center[1] - wallTest)/this.world.blockSize()
				);

				testY2 = Math.floor(
					(center[1] + wallTest)/this.world.blockSize()
				);

				testX = Math.floor(testXPoint/this.world.blockSize());
				tileTestY = (center[1] + wallTest) % this.world.blockSize();
				tileTestY2 = (center[1] - wallTest) % this.world.blockSize();

				if(tileTestY < 0)
				{
					tileTestY += this.world.blockSize();;
				}

				if(tileTestY2 < 0)
				{
					tileTestY2 += this.world.blockSize();;
				}

				tileTestX = Math.floor(testXPoint % this.world.blockSize());

				if(tileTestX < 0)
				{
					tileTestX += this.world.blockSize();;
				}

				tileTestX2 = tileTestX;

				testTile = map.getTileNumber(testX, testY);
				testTile2 = map.getTileNumber(testX, testY2);
			}

			if(this.direction == 1)
			{
				isSolid = map.getSolid(testTile, tileTestX, tileTestY);
				
			}
			else
			{
				isSolid = map.getSolid(testTile2, tileTestX2, tileTestY2);
			}

			if(wallTest <= stretch && isSolid)
			{
				// this.gSpeed = 0;
				this.x -= (this.width - wallTest - 1) * this.direction;
				pushing = true;

				break;
			}

			wallTest++;
		}

		// Slope Detection
		halfSpread = Math.ceil(this.width/4);
		fullSpread = halfSpread * 2;

		spreads =  [-halfSpread, halfSpread];
		sensors = [null, null];

		if(this.mode == this.modes.ceiling)
		{
			spreads = [spreads[1], spreads[0]];
		}

		initDrop = -this.height;
		maxDrop = this.height;

		var angleChanged = false;
		
		do
		{
			underground = true;

			for(var drop = initDrop; drop < maxDrop; null)
			{
				center = this.center();

				if(this.mode == mode.floor)
				{
					testY = Math.floor(
						(this.bottom()+drop)/this.world.blockSize()
					);

					tileTestY = ((this.bottom()+drop) % this.world.blockSize());

					if(tileTestY < 0)
					{
						tileTestY += this.world.blockSize();;
					}
				}
				if(this.mode == mode.ceiling)
				{
					testY = Math.floor(
						(this.bottom()-drop)/this.world.blockSize()
					);

					tileTestY = ((this.bottom()-drop) % this.world.blockSize());

					if(tileTestY < 0)
					{
						tileTestY -= this.world.blockSize();;
					}
				}
				else if(this.mode == mode.leftWall)
				{
					testX = Math.floor(
						(this.bottom()-drop)/this.world.blockSize()
					);

					tileTestX = ((this.bottom()-drop) % this.world.blockSize());	

					if(tileTestX < 0)
					{
						tileTestX -= this.world.blockSize();
					}
				}
				else if(this.mode == mode.rightWall)
				{
					testX = Math.floor(
						(this.bottom()+drop)/this.world.blockSize()
					);

					tileTestX = ((this.bottom()+drop) % this.world.blockSize());		

					if(tileTestX < 0)
					{
						tileTestX += this.world.blockSize();
					}
				}

				for(var i in spreads)
				{
					if(sensors[i] !== null)
					{
						continue;
					}

					if(this.mode == mode.floor)
					{
						testX = Math.floor(
							(center[0] + spreads[i])/this.world.blockSize()
						);

						tileTestX = (center[0] + spreads[i]) % this.world.blockSize();

						if(tileTestX < 0)
						{
							tileTestX += this.world.blockSize();
						}

						testTile = map.getTileNumber(testX, testY);
					}
					else if(this.mode == mode.ceiling)
					{
						testX = Math.floor(
							(center[0] - spreads[i])/this.world.blockSize()
						);

						tileTestX = (center[0] - spreads[i]) % this.world.blockSize();

						if(tileTestX < 0)
						{
							tileTestX -= this.world.blockSize();
						}

						testTile = map.getTileNumber(testX, testY);
					}
					else if(this.mode == mode.rightWall)
					{
						testY = Math.floor(
							(center[1] + spreads[i])/this.world.blockSize()
						);

						tileTestY = (center[1] + spreads[i]) % this.world.blockSize();

						if(tileTestY < 0)
						{
							tileTestY += this.world.blockSize();
						}

						testTile = map.getTileNumber(testX, testY);
					}
					else if(this.mode == mode.leftWall)
					{
						testY = Math.floor(
							(center[1] + spreads[i])/this.world.blockSize()
						);

						tileTestY = (center[1] + spreads[i]) % this.world.blockSize();

						if(tileTestY < 0)
						{
							tileTestY += this.world.blockSize();
						}

						testTile = map.getTileNumber(testX, testY);
					}

					isSolid = map.getSolid(testTile, tileTestX, tileTestY);

					if(!isSolid)
					{
						underground = false;
					}

					if(isSolid)
					{
						sensors[i] = drop;
					}
				}

				//console.log(sensors);

				var sens = sensors[0] || sensors[1];

				if(underground)
				{
					if(this.mode == mode.floor)
					{
						this.ySpeed = 0;
						this.y += sens;
					}
					else if(this.mode == mode.rightWall)
					{
						this.xSpeed = 0;
						this.x += (sens);
					}
					else if(this.mode == mode.leftWall)
					{
						this.xSpeed = 0;
						this.x -= (sens);
					}
					if(this.mode == mode.ceiling)
					{
						this.ySpeed = 0;
						this.y -= sens;
					}

					sensors = [null, null];
				}

				drop++;
			}

			if(sensors[0] == null
				&& sensors[1] == null
			){
				//this.angle = 0;

				if(this.mode !== this.modes.floor)
				{
					// angleChanged = true
				}

				this.mode = this.modes.floor;

				break;
			}
			else if(
				sensors[0] !== null
				&& sensors[1] !== null
			){
				var height = sensors[0];
				var diff = sensors[1] - height;

				if(sensors[1] < sensors[0])
				{
					height = sensors[1];
					var diff = height - sensors[0];
				}

				if(this.mode == mode.rightWall)
				{
					diff *=-1;
				}

				if(this.mode == mode.ceiling)
				{
					height = sensors[1];
					diff = sensors[0] - height;

					if(sensors[0] < sensors[1])
					{
						height = sensors[0];
						var diff = height - sensors[1];
					}
					// diff *=-1;
				}

				this.falling = false;
				this.airJump = 0;

				var aaagle = this.angle;

				if(diff)
				{
					this.angle = Math.atan(diff/fullSpread);

					if(this.mode == mode.rightWall)
					{
						this.angle -= Math.PI/2;
					}
					else if(this.mode == mode.leftWall)
					{
						this.angle += Math.PI/2;
					}
					else if(this.mode == mode.ceiling)
					{
						this.angle -= Math.PI;
					}

					this.angle = roundAngle(this.angle, this.directions);

					if(aaagle !== this.angle)
					{
						angleChanged = true;
					}
				}
				else
				{
					if(this.mode == mode.floor)
					{
						this.angle = 0;	
					}
					else if(this.mode == mode.rightWall)
					{
						this.angle = -Math.PI/2;
					}
					else if(this.mode == mode.leftWall)
					{
						this.angle = +Math.PI/2;
					}
					else if(this.mode == mode.ceiling)
					{
						this.angle = -Math.PI;
					}
				}

				if(this.mode == mode.floor && !this.jumping)
				{
					this.y += height;
				}
				else if(this.mode == mode.rightWall)
				{
					this.x += (height);
				}
				else if(this.mode == mode.leftWall)
				{
					this.x -= (height);
				}
				else if(this.mode == mode.ceiling)
				{
					this.y -= height;
				}

				var mmmode = this.mode;

				if(angleChanged && !this.jumping)
				{
					var deg = Math.round( 
						this.angle * (180/Math.PI) * 10
					) / 10;

					if(deg < -225)
					{
						this.mode = mode.leftWall;
					}
					else if(deg > 45 && deg < 135)
					{
						this.mode = mode.leftWall;
					}
					else if(deg < -45 && deg > -135)
					{
						this.mode = mode.rightWall;
					}
					else if(deg <= -135 || deg >= 135)
					{
						this.mode = mode.ceiling;
					}
					else
					{
						this.mode = mode.floor;
					}

					console.log(this.mode, height, deg, sensors);
				}

				break;
			}
		} while(underground);

		// More slope stuff...
		var slopeDrag = (Math.sin(this.angle) * this.slopeFactor);

		if(this.rolling)
		{
			slopeDrag *= 8;
		}

		//this.gSpeed += slopeDrag;

		// Air code
		if(this.falling || this.jumping)
		{
			if(this.mode == mode.floor)
			{
				this.ySpeed += this.gravity;

				if(angleChanged)
				{
					// this.gSpeed = 0;
				}

				this.xSpeed = this.gSpeed;

				if(this.ySpeed > this.maxGravity)
				{
					this.ySpeed = this.maxGravity;
				}
			}
			else if(this.mode == mode.rightWall)
			{
				this.xSpeed += this.gravity;

				if(this.xSpeed > this.maxGravity)
				{
					this.xSpeed = this.maxGravity;
				}
			}
			else if(this.mode == mode.leftWall)
			{
				this.xSpeed -= this.gravity;

				if(this.xSpeed < -this.maxGravity)
				{
					this.xSpeed = this.maxGravity;
				}
			}
			if(this.mode == mode.ceiling)
			{
				this.ySpeed -= this.gravity;

				if(this.ySpeed < -this.maxGravity)
				{
					this.ySpeed = this.maxGravity;
				}
			}
		}
		else
		{
			this.xSpeed = Math.round(
				this.gSpeed * Math.cos(this.angle)
			);

			this.ySpeed = Math.round(
				this.gSpeed * Math.sin(this.angle)
			);
		}

		if(this.sensors.top.bump && this.falling)
		{
			this.ySpeed *= -1;
		}

		if(this.sensors.bottom.damage && this.falling)
		{
			this.ySpeed *= -1;

			if(this.ySpeed > -10)
			{
				this.ySpeed = -10;
			}
		}

		this.x += this.xSpeed;
		this.y += this.ySpeed;

		for(var s in this.sensors)
		{
			this.sensors[s] = false;
		}
	}
	, draw: function(){}
	, center: function()
	{
		//console.log(this.x);

		return [
			Math.floor(this.x+this.boxWidth/2)
			, Math.floor(this.y+this.boxHeight/2)
		];
	}
	, left: function()
	{
		if(this.mode == this.modes.floor)
		{
			return this.center()[0] - Math.floor(this.width/2);	
		}
		else if(this.mode == this.modes.ceiling)
		{
			return this.center()[0] + Math.floor(this.width/2);		
		}
		else if(this.mode == this.modes.leftWall)
		{
			return this.center()[1] - Math.floor(this.width/2);
		}
		else if(this.mode == this.modes.rightWall)
		{
			return this.center()[1] + Math.floor(this.width/2);
		}
		
	}
	, right: function()
	{
		if(this.mode == this.modes.floor)
		{
			return this.center()[0] + Math.floor(this.width/2);	
		}
		else if(this.mode == this.modes.ceiling)
		{
			return this.center()[0] - Math.floor(this.width/2);		
		}
		else if(this.mode == this.modes.leftWall)
		{
			return this.center()[1] + Math.floor(this.width/2);
		}
		else if(this.mode == this.modes.rightWall)
		{
			return this.center()[1] - Math.floor(this.width/2);
		}
	}
	, top: function()
	{
		if(this.mode == this.modes.floor)
		{
			return this.center()[1] - Math.floor(this.height/2);
		}
		else if(this.mode == this.modes.ceiling)
		{
			return this.center()[1] + Math.floor(this.height/2);	
		}
		else if(this.mode == this.modes.leftWall)
		{
			return this.center()[0] + Math.floor(this.height/2);
		}
		else if(this.mode == this.modes.rightWall)
		{
			return this.center()[0] - Math.floor(this.height/2);
		}
	}
	, bottom: function()
	{
		if(this.mode == this.modes.floor)
		{
			return this.center()[1] + Math.floor(this.height/2);
		}
		else if(this.mode == this.modes.ceiling)
		{
			return this.center()[1] - Math.floor(this.height/2);	
		}
		else if(this.mode == this.modes.leftWall)
		{
			return this.center()[0] - Math.floor(this.height/2);
		}
		else if(this.mode == this.modes.rightWall)
		{
			return this.center()[0] + Math.floor(this.height/2);
		}
	}
	, collide: function(actor)
	{

	}
	, collidee: function(actor)
	{

	}
	, isColliding:function (actor)
	{
		var xMaskStart = actor.left() < this.left()
			? actor.left()
			: this.left();

		var xMaskLength = Math.abs(
			actor.left() < this.right()
				? actor.left() - this.right()
				: this.left() - actor.right()
		);

		var xMax = actor.width + this.width;
		var yMax = actor.height + this.height;

		if(xMax < xMaskLength || yMax < yMaskLength)
		{
			return false;
		}

		var yMaskStart = actor.top() < this.top()
			? actor.top()
			: this.top();

		var yMaskLength = Math.abs(
			actor.top() < this.bottom()
				? actor.top() - this.bottom()
				: this.top() - actor.bottom()
		);

		var xMask = [];
		var yMask = [];
		var i = 0;

		while(i <= xMaskLength)
		{
			xMask[i] = 0;

			if(((xMaskStart + i >= this.left()
				&& xMaskStart + i <= this.right()))
				||
				(xMaskStart + i >= actor.left()
				&& xMaskStart + i <= actor.right()))
			{
				xMask[i] = 1;
			}

			i++;
		}

		var j = 0;

		while(j <= yMaskLength)
		{
			yMask[j] = 0;

			if(((yMaskStart + j >= this.top()
				&& yMaskStart + j <= this.bottom()))
				||
				(yMaskStart + j >= actor.top()
				&& yMaskStart + j <= actor.bottom()))
			{
				yMask[j] = 1;
			}

			j++;
		}

		var xChanges = 0;
		var yChanges = 0;

		var xLast = null;

		for(var ii in xMask)
		{
			if(xLast !== xMask[ii])
			{
				xChanges++;
			}

			xLast = xMask[ii];
		}

		var yLast = null;

		for(var jj in yMask)
		{
			if(yLast !== yMask[jj])
			{
				yChanges++;
			}

			yLast = yMask[jj];
		}

		if(xChanges < 3 && yChanges < 3)
		{
			return true;
		}

		return false;
	}
	, animate: function(animation)
	{
		var actor = this;

		if(!this.animationClasses[animation])
		{
			return;
		}

		if(this.currentClasses == this.animationClasses[animation])
		{
			return;
		}

		this.currentClasses.map(function(remClass){
			actor.sprites.map(function(sprite){
				sprite.removeClass(remClass);
			});
		});

		this.animationClasses[animation].map(function(newClass){
			actor.sprites.map(function(sprite){
				sprite.addClass(newClass);
			});
		});

		this.currentClasses = this.animationClasses[animation];
	}
	, impulseX: function(power)
	{
		var result = this.gSpeed + power;

		if(sign(this.gSpeed)
			&& sign(power)
			&& sign(this.gSpeed) !== sign(result)
		){
			this.gSpeed = 0;
		}
		else
		{
			this.gSpeed = result;
		}
	}
});

var Ring = Actor.extend({
	width:16
	, height:16
	, init: function(x, y, world)
	{
		this._super(x, y, world);
	}
	, getObject: function()
	{
		var object = this._super();

		object.addClass('ring');

		return object;
	}
	, collectCollide: function(actor)
	{
		this.destroy();
		return {
			rings: 1
		}
	}
});


var Explosion = Actor.extend({
	width:16
	, height:16
	, init: function(x, y, world)
	{
		this._super(x, y, world);

		var _this = this;

		setTimeout(
			function()
			{
				_this.destroy();
			}
			, 500
		);
	}
	, getObject: function()
	{
		var object = this._super();

		object.addClass('explosion');

		return object;
	}
});

var BrokenMonitor = Actor.extend({
	width:16
	, height:32
	, gravity: 0.62
	, init: function(x, y, world)
	{
		this._super(x, y, world);
	}
	, getObject: function()
	{
		var object = this._super();

		object.addClass('brokenMonitor');

		return object;
	}
});

var RingMonitor = Actor.extend({
	width:16
	, height:32
	, solid: true
	, friction: 0.8
	, corpse: BrokenMonitor
	//, gravity: 0.62
	, init: function(x, y, world)
	{
		this._super(x, y, world);
	}
	, getObject: function()
	{
		var object = this._super();

		object.addClass('ringMonitor');

		return object;
	}
	, damage: function(actor)
	{
		console.dir(this);
		console.dir(actor.sensors.top);
		console.dir(this == actor.sensors.top);

		if(this == actor.sensors.top)
		{
			this.bump();
		}
		else if(
			this == actor.sensors.bottom
			|| this == actor.sensors.left
			|| this == actor.sensors.right
		){
			corspe = new this.corpse(this.x, this.y, this.world);

			corspe.gSpeed = this.gSpeed;
			corspe.xSpeed = this.xSpeed;
			corspe.ySpeed = this.ySpeed;
			
			new Explosion(this.x, this.y, this.world);

			return this.destroy();
		}

		return false;
	}
	, collectDamage: function(actor)
	{
		return {
			rings: 10
		}
	}
	, damage: function()
	{
		new this.corpse(this.x, this.y, this.world);
		new Explosion(this.x, this.y, this.world);

		return this.destroy();
	}
	, bump: function()
	{
		this.ySpeed = this.gravity = 0.62;
		this.falling = true;
	}
});

var Walker = Actor.extend({
	width: 16
	, height: 32
	, acc: 0.3
	, dec: 4.5 * 10
	, friction: 0.05
	, jumping: false
	, gravity: 0.62
	, airDrag: 0
	, topSpeed: 4
	, topRollingSpeed: 24
	, jumpStrn: -10
	, airJump: 0
	, unjumpStrn:-4
	, maxAirJump: 2
	, solid: true
	, rolling:false
	, goLeft: function()
	{
		this.moving = true;
		this.direction = -1;
	}
	, goRight: function()
	{
		this.moving = true;
		this.direction = 1;
	}
	, jump: function()
	{
		if(this.falling && this.airJump >= this.maxAirJump)
		{
			return false;
		}

		this.airJump++;
		this.falling = true;
		this.jumping = true;
		this.mode = this.modes.floor;
		this.ySpeed = this.jumpStrn;

		return true;
	}
	, unjump: function()
	{
		if(this.falling && this.ySpeed < this.unjumpStrn)
		{
			this.ySpeed = this.unjumpStrn;
		}
	}
	, update: function()
	{
		var center = this.center();
		var map = this.world.map;

		this._super();

		if(this.moving && !this.rolling)
		{
			var impulse = this.acc * this.direction;

			this.gSpeed += impulse;

			if(sign(this.gSpeed) == sign(impulse))
			{
				if(this.falling && this.ySpeed > 0)
				{
					this.gSpeed += sign(this.gSpeed) * this.acc;
				}

				if(this.falling && this.ySpeed > 0)
				{
					this.gSpeed -= this.acc/2;
				}
			}
			else
			{
				var impulse = this.friction * sign(this.gSpeed);

				this.impulseX(-impulse);
			}

			this.moving = false;
		}
		else if(this.rolling)
		{
			this.gSpeed -= sign(this.gSpeed) * (this.friction/8);
			if(Math.abs(this.gSpeed) < 1)
			{
				this.gSpeed = 0;
				this.moving = false;
				this.rolling = false;
			}
		}
		else if(this.gSpeed)
		{
			if(!this.falling && !this.moving)
			{
				var impulse = this.dec * sign(this.gSpeed);

				this.impulseX(-impulse);
			}

			if(this.gSpeed)
			{
				this.moving = true;
			}
		}
		else
		{
			this.gSpeed = 0;
			this.moving = false;
			this.rolling = false;
		}

		if((this.moving || this.gSpeed) && !this.falling)
		{
			if(Math.abs(this.gSpeed) < (this.topSpeed/3)*2)
			{
				this.animate('walking');
			}
			else
			{
				this.animate('running');
			}
		}

		if(this.jumping || this.rolling || this.spinDashPwr)
		{
			this.animate('jumping');
		}
		else if(!this.gSpeed && !this.ySpeed)
		{
			this.animate('standing');
		}

		if(this.rolling && Math.abs(this.gSpeed) > this.topRollingSpeed)
		{
			this.gSpeed = this.topRollingSpeed * sign(this.gSpeed);
		}
		else if(!this.rolling && Math.abs(this.gSpeed) > this.topSpeed)
		{
			this.gSpeed = this.topSpeed * sign(this.gSpeed);
		}

		if(this.direction < 0)
		{
			this.sprites.map(function(object){
				object.addClass('flipX');
			});
		}
		else
		{
			this.sprites.map(function(object){
				object.removeClass('flipX');
			});
		}

		if(!this.falling)
		{
			this.jumping = false;
		}
	}
})

var Badnick = Walker.extend({
	aiTimer: 0
	, currentAiState :null
	, initAiState: null
	, aiStates:{}
	, update: function()
	{
		this._super();

		if(!this.currentAiState)
		{
			if(!this.initAiState)
			{
				return;
			}

			this.currentAiState = this.initAiState;
			this.aiTimer = this.aiStates[this.currentAiState][0];
		}
		else
		{
			this.aiTimer--;
		}

		if(this.aiTimer <= 0)
		{
			var nextState = this.aiStates[this.currentAiState][1];

			if(!nextState)
			{
				nextState = this.currentAiState;
			}

			this.currentAiState = nextState;
			this.aiTimer = this.aiStates[nextState][0];
		}
	}
});

var CrabMeat = Badnick.extend({
	width:32
	, height:32
	, animationClasses: {
		'standing':['standing']
		, 'walking':['walking']
		, 'running':['walking']
		, 'jumping':['jumping']
	}
	, initAiState: 'bomb1'
	, aiStates:{
		walkLeft :[200, 'bomb1']
		, walkRight :[200, 'bomb2']
		, bomb1: [100, 'walkRight']
		, bomb2: [100, 'walkLeft']
	}
	, init: function(x, y, world)
	{
		this._super(x, y, world);
	}
	, update: function()
	{
		this._super();

		switch(this.currentAiState)
		{
			case 'walkLeft':
				this.goLeft();
				break;
			case 'walkRight':
				this.goRight();
				if(this.aiTimer > 90)
				{
					//this.jump();
				}
				break;
			default:
				if(this.aiTimer % 30 == 0)
				{
					this.direction *= -1;
				}

		}
	}
	, getObject: function()
	{
		var object = this._super();

		object.addClass('crabMeat');

		return object;
	}
	, damage: function(actor)
	{
		new Explosion(this.x, this.y, this.world);
		return this.destroy(actor);
	}
});

var Character = Walker.extend({
	acc:0.046875 * 8 * 2
	, dec: 1.5
	, friction: 0.046875 * 4
	, airDrag: 0.046875 * 3
	, topSpeed: 48
	, topRollingSpeed: 48
	, jumpStrn:-32
	, airJump: 0
	, maxAirJump: 9
	, unjumpStrn:-4
	, gravity: 0.21875 * 4
	, maxGravity: 24
	, rolling: false
	, direction:1
	, moving: false
	, spinDashing: false
	, maxSpinDash: 32
	, spinDashInc: 16
	, spinDashPwr: 0
	, width:16
	, height:32
	, rings: 0
	, animationClasses: {
		'standing':['standing']
		, 'walking':['walking']
		, 'running':['running']
		, 'rolling':['jumping']
		, 'jumping':['jumping']
	}
	, init: function(x, y, world)
	{
		this._super(x, y, world);
	}
	, getObject: function()
	{
		var object = this._super();

		object.addClass('knuckles');

		return object;
	}
	, jump: function()
	{
		if(!this._super())
		{
			return false;
		}

		this.rolling = false;

		if(this.spinDashing)
		{
			this.spinDashPwr += this.spinDashInc;
			this.ySpeed = 0;
			this.gSpeed = 0;
			return false;
		}

		return true;
	}
	, spinDash: function()
	{
		this.spinDashing = true;
	}
	, unspinDash: function()
	{
		this.spinDashing = false;
	}
	, roll: function()
	{
		if(this.gSpeed)
		{
			this.rolling = true;
		}
	}
	, update: function()
	{
		if(this.spinDashing && this.spinDashPwr > 0)
		{
			this.spinDashPwr -= 0.5;
		}
		else if(!this.spinDashing && this.spinDashPwr > 0)
		{
			this.gSpeed += this.direction * this.spinDashPwr;
			this.rolling = true;
			this.spinDashPwr = 0;
		}

		this._super();
	}
	, collide: function(actor)
	{
		if(actor.collectCollide)
		{
			var prize = actor.collectCollide(this);

			if(prize.rings)
			{
				this.rings += prize.rings;

				this.world.updateGlobals({rings: this.rings});
			}

			console.log(this.rings);
		}

		var gSpeedBefore = this.gSpeed;
		var ySpeedBefore = this.ySpeed;

		// Hitting a solid actor while going up
		if(actor.solid
			&& actor.ySpeed <= 0
			&& this.ySpeed < 0
			&& this.top() < actor.bottom()
			&& this.top() > actor.top()
		){
			this.y -= actor.bottom() - this.top();

			this.sensors.top = actor;
			this.ySpeed *= -1;
		}
		// Hitting a solid actor while going down
		else if(actor.solid
			&& actor.ySpeed <= 0
			&& this.ySpeed > 0
			&& this.bottom() > actor.top()
			&& this.bottom() < actor.bottom()
		){
			//this.y += actor.top() - this.bottom();

			this.sensors.bottom = actor;

			this.ySpeed *= -1;

			if(this.ySpeed > -8)
			{
				this.ySpeed = -8;
			}
		}
		// Hitting a solid actor while going right
		else if(actor.solid
			&& this.gSpeed > 0
			&& this.right() > actor.left()
			&& this.left() < actor.left()
		){
			//this.x -= this.right() - actor.left();

			this.sensors.right = actor;

			gSpeedBefore = this.gSpeed;
			this.gSpeed = 0;
		}
		// Hitting a solid actor while going left
		else if(actor.solid
			&& this.gSpeed < 0
			&& this.left() < actor.right()
			&& this.right() > actor.right()
		){
			this.x += actor.right() - this.left();

			this.sensors.left = actor;

			gSpeedBefore = this.gSpeed;
			this.gSpeed = 0;
		}

		if(actor.damage)
		{
			if(actor.bump && this.jumping && this.sensors.top == actor)
			{
				actor.bump(this);
			}
			else if(this.jumping && this.sensors.bottom == actor)
			{
				if(actor.damage(this) && actor.collectDamage)
				{
					var prize = actor.collectDamage();

					if(prize.rings)
					{
						this.rings += prize.rings;

						this.world.updateGlobals({rings: this.rings});
					}
				}
			}
			else if(this.rolling && (this.sensors.left == actor || this.sensors.right == actor))
			{
				if(actor.damage(this))
				{
					this.gSpeed = gSpeedBefore;

					if(actor.collectDamage)
					{
						var prize = actor.collectDamage();

						if(prize.rings)
						{
							this.rings += prize.rings;

							this.world.updateGlobals({rings: this.rings});
						}
					}
				}	
			}
		}
	}
});

var Viewport = Class.extend({
	init: function(selector)
	{
		this.element	= $(selector);
		this.camera		= new Camera(this);
		this.hud		= new Hud(this);
		this.x			= 0;
		this.y			= 0;
		this.width		= parseInt(this.element.css('width'));
		this.height		= parseInt(this.element.css('height'));
		this.world		= null;
		this.sprites	= {};
	}
	, focus: function(x, y)
	{
		this.x = x;
		this.y = y;
	}
	, screenBox: function()
	{
		return [
			this.camera.position[0] - Math.floor(this.width/2)
			, this.camera.position[1]  - Math.floor(this.height/2)
			, this.camera.position[0] + Math.ceil(this.width/2)
			, this.camera.position[1] + Math.ceil(this.height/2)
		];
	}
	, update: function(controller)
	{
		this.camera.update();
		this.hud.update(this.world.globals);
	}
	, draw: function()
	{
		var actors = this.world.onScreenObjects(12800);

		for(var i in actors)
		{
			if(!actors[i])
			{
				continue;
			}

			var actor = actors[i];
			var actorId = actor.id;

			if(!this.sprites[actorId])
			{
				var actorSprite = actor.getObject();
				this.sprites[actorId] = actorSprite;
				this.camera.element.append(actorSprite);
			}

			var trans = 'translate('
				+ (
					actor.x
					- this.camera.position[0]
					+ this.camera.offset[0]
				)
				+ 'px, '
				+ (
					actor.y
					- this.camera.position[1]
					+ this.camera.offset[1]
				)
				+ 'px)';

			if(!actor.rolling)
			{
				trans += ' rotate(' + (
					actor.angle * (180 / Math.PI)
				) + 'deg)';
			}
			else
			{
				trans += ' rotate(0deg)';
			}

			this.sprites[actorId].css({
				transform: trans
			});
		}
	}
});

var Hud = Class.extend({
	element: null
	, viewport : null
	, content : {}
	, init: function(viewport)
	{
		this.viewport	= viewport;
		this.element	= viewport.element.find('.hud');
	}
	, update: function(content)
	{
		for(var i in content)
		{
			this.content[i] = content[i];
		}

		var rings = 0;

		if(this.content.rings)
		{
			rings = this.content.rings;
		}

		this.element.html('Rings: ' + rings);
	}
});

var Camera = Class.extend({
	actor: null
	, viewport: null
	, offset: [0,0]
	, position: [0,0]
	, blocks: null
	, init: function(viewport)
	{
		this.viewport	= viewport;
		this.element	= viewport.element.find('.camera');
		console.log(viewport);
	}
	, focus: function(actor)
	{
		this.actor = actor;
	}
	, update: function()
	{
		this.position = this.offset;

		if(this.actor)
		{
			this.position = [
				this.actor.x
				, this.actor.y
			];
		}

		var blocksWide	= this.viewport.width / this.viewport.world.blockSize();
		var blocksHigh	= this.viewport.height / this.viewport.world.blockSize();

		var offsetX = 0;
		var offsetY = 0;

		if(this.actor.x)
		{
			offsetX = parseInt(this.actor.x/this.viewport.world.blockSize());
		}

		if(this.actor.y)
		{
			offsetY = parseInt(this.actor.y/this.viewport.world.blockSize());
		}

		var map = this.viewport.world.map;

		blocksWide = Math.ceil(blocksWide/2);
		blocksHigh = Math.ceil(blocksHigh/2);

		for(var i = -blocksWide-1; i <= blocksWide+1; i++)
		{
			for(var j = -blocksHigh-1; j <= blocksHigh+1; j++)
			{
				if(!this.blocks)
				{
					this.blocks = {};
				}

				if(!this.blocks[i])
				{
					this.blocks[i] = {};
				}

				if(!this.blocks[i][j])
				{
					var block = new Block();
					block.element.css({
						width: this.viewport.world.blockSize()
						, height: this.viewport.world.blockSize()
					});
					this.element.append(block.element);
					this.blocks[i][j] = block;
				}

				block = this.blocks[i][j];

				var blockId = map.getTileNumber(offsetX + i, offsetY + j);

				map.setBlock(block, blockId);

				var transX =  this.viewport.world.blockSize() * i
					+ (offsetX * this.viewport.world.blockSize())
					+ (-1*this.position[0]+this.offset[0]);

				var transY = this.viewport.world.blockSize() * j
					+ (offsetY * this.viewport.world.blockSize())
					+ (-1*this.position[1]+this.offset[1]);

				block.element.css({
					//*/
					transform: 'translate('
						+ transX + 'px,'
						+ transY + 'px)'
					/*/
					position: 'absolute'
					, left: transX
					, top: transY
					//*/
				});

				block.element.attr({'data-x': offsetX + i});
				block.element.attr({'data-y': offsetY + j});
				block.element.attr({'data-blockId': blockId});
			}
		}
	}
});

var Block = Class.extend({
	init: function()
	{
		this.element = $('<div>')
			.addClass('block');
	}
});

var Map = Class.extend({
	heightMasks: {}
	, heightMasksCache: {}
	, magData: null
	, init: function()
	{
		this.width = 512;
		this.height = 512;
		this.mapData = mapData;

		var img = new Image()
			, _this = this;

		img.onload = function()
		{
			_this.width = this.width;
			_this.height = this.height;

			_this.heightMasks[0] = $('<canvas>')[0];

			_this.heightMasks[0].width = this.width;
			_this.heightMasks[0].height = this.height;

			_this.heightMasks[0].getContext('2d').drawImage(
				this, 0, 0, this.width, this.height
			);

			console.log(_this.heightMasks[0].getContext('2d'));
		};

		img.src = '/SeanMorris/MovingBoxes/Sonic/testTiles2.png';
	}
	, getTileNumber: function(x, y)
	{
		if(x >= this.mapData.width || y >= this.mapData.height
			|| x < 0 || y < 0
		){
			return 0;
		}

		var tileIndex = (y * this.mapData.width) + x;

		if(this.mapData.layers[0].data[tileIndex] !== undefined)
		{
			return this.mapData.layers[0].data[tileIndex] - 1;
		}

		return 1;
	}
	, getTile: function(tileNumber)
	{
		var x = 0;
		var y = 0;

		if(tileNumber)
		{
			var blocksWide = Math.ceil(this.width/this.blockSize());

			x = tileNumber % blocksWide;
			y = Math.floor(tileNumber/blocksWide);
		}

		return [x,y];
	}
	, getSolid: function(tileNumber, x, y)
	{
		var _this = this;

		var tilePos = this.getTile(tileNumber).map(function(coord){
			return coord * _this.blockSize()
		});

		x = parseInt(x);
		y = parseInt(y);

		if(
			this.heightMasksCache[0] !== undefined
			&& this.heightMasksCache[0][tileNumber] !== undefined
			&& this.heightMasksCache[0][tileNumber][tilePos[0] + x] !== undefined
			&& this.heightMasksCache[0][tileNumber][tilePos[0] + x][tilePos[1] + y] !== undefined
		){
			//return this.heightMasksCache[0][tileNumber][tilePos[0] + x][tilePos[1] + y];
		}

		var pixel;

		if(this.heightMasks[0])
		{
			xPixel = tilePos[0] + x;
			yPixel = tilePos[1] + y;

			pixel = this.heightMasks[0].getContext('2d').getImageData(
				xPixel, yPixel, 1, 1
			).data;

			if(!this.heightMasksCache[0])
			{
				this.heightMasksCache[0] = {};
			}

			if(!this.heightMasksCache[0][tileNumber])
			{
				this.heightMasksCache[0][tileNumber] = {};
			}

			if(!this.heightMasksCache[0][tileNumber][xPixel])
			{
				this.heightMasksCache[0][tileNumber][xPixel] = {};
			}
			
			this.heightMasksCache[0][tileNumber][xPixel][yPixel] = false;

			if(pixel[0] == 0)
			{
				this.heightMasksCache[0][tileNumber][xPixel][yPixel] = true;
			}

			return this.heightMasksCache[0][tileNumber][xPixel][yPixel];
		}

		return false;
	}
	, setBlock: function(block, tileNumber)
	{
		var tile = this.getTile(tileNumber);
		var blockSize = this.blockSize();

		block.element.css({
			'background-position': -1*(tile[0]*blockSize)
			+ 'px '
			+ -1*(tile[1]*blockSize)
			+ 'px'
		});

		return block;
	}
	, blockSize: function()
	{
		return this.mapData.tilewidth;
	}
});

var World = Class.extend({
	actorId:0
	, globals: {}
	, init: function()
	{
		this.viewports	= [];
		this.actors		= {};
		this.map = new Map();
	}
	, addActor: function(actor)
	{
		this.actorId++;

		this.actors[this.actorId] = actor;

		//console.log(this.actors);

		return this.actorId;
	}
	, removeActor: function(i)
	{
		for(var j in this.viewports)
		{
			if(!this.actors[i])
			{
				continue;
			}

			delete this.viewports[j].sprites[i];
		}

		delete this.actors[i];

	}
	, addViewport: function(viewport)
	{
		this.viewports.push(viewport);
		viewport.world = this;
	}
	, onScreenObjects: function(tolerance)
	{
		tolerance = tolerance || 0;
		var objects = [];

		for(var j in this.viewports)
		{
			var vpScreen = this.viewports[j].screenBox();

			vpScreen = vpScreen.map(Math.round);

			for(var i in this.actors)
			{
				if(!this.actors[i])
				{
					continue;
				}

				if(this.actors[i].x > (vpScreen[0]-tolerance)
				&& this.actors[i].y > (vpScreen[1]-tolerance)
				&& this.actors[i].x < (vpScreen[2]+tolerance)
				&& this.actors[i].y < (vpScreen[3]+tolerance)
				){
					objects.push(this.actors[i]);
				}
			}

			return objects;
		}
	}
	, update: function()
	{
		var actors = this.onScreenObjects(512);

		for(var i in actors)
		{
			if(!actors[i])
			{
				continue;
			}

			actors[i].objects.map(function(object){
				object.removeClass('colliding');
			});
		}

		for(var i in actors)
		{
			if(!actors[i])
			{
				continue;
			}

			for(var j in actors)
			{
				if(!actors[j])
				{
					continue;
				}

				if(actors[i] !== actors[j])
				{
					if(actors[i] && actors[i].isColliding(actors[j]))
					{
						if(actors[i].collide)
						{
							actors[i].collide(actors[j]);
						}

						if(actors[j] && actors[j].collide)
						{
							actors[j].collide(actors[i]);
						}

						if(actors[i] && actors[i].objects)
						{
							actors[i].objects.map(function(object){
								object.addClass('colliding');
							});
						}

						if(actors[j] && actors[j].objects)
						{
							actors[j].objects.map(function(object){
								object.addClass('colliding');
							});
						}
					}
				}
			}

			if(actors[i])
			{
				actors[i].update();
			}
		}

		for(var k in this.viewports)
		{
			this.viewports[k].update();
			this.viewports[k].draw();
		}
	}
	, updateGlobals: function(vars)
	{
		for(var i in vars)
		{
			this.globals[i] = vars[i];
		}
	}
	, blockSize: function()
	{
		return this.map.blockSize();
	}
});

var Controller = Class.extend({
	init: function()
	{
		this.buttons			= {}
		this.buttonStates		= {};
		this.keyStates			= {};
		this.mouseStates		= {};
		this.pressCallbacks		= {};
		this.holdCallbacks		= {};
		this.releaseCallbacks	= {};

		var controller	= this;

		$(document).on('keydown', function(e){
			return controller.keyDown(e);
		});

		$(document).on('keyup', function(e){
			return controller.keyUp(e);
		});
	}
	, keyDown: function(e){
		e.preventDefault();
		if(!this.keyStates[e.which])
		{
			this.keyStates[e.which] = true;
		}
	}
	, keyUp: function(e){
		e.preventDefault();
		this.keyStates[e.which] = false;
	}
	, register: function(code, name)
	{
		this.buttons[code] = name;
	}
	, update: function()
	{
		var keyString = '';

		for(var i in this.keyStates)
		{
			var button = this.buttons[i];

			if(this.keyStates[i] === true)
			{
				this.keyStates[i] = 1;

				if(this.pressCallbacks[button])
				{
					this.pressCallbacks[button]();
				}
			}
			else if(this.keyStates[i] === -1)
			{
				delete this.keyStates[i];
			}
			else if(this.keyStates[i] === false)
			{
				this.keyStates[i] = -1;

				if(this.releaseCallbacks[button])
				{
					this.releaseCallbacks[button]();
				}
			}
			else if(this.keyStates[i])
			{
				if(this.holdCallbacks[button])
				{
					this.holdCallbacks[button](this.keyStates[i]);
				}

				this.keyStates[i]++;
			}

			this.buttonStates[button] = this.keyStates[i];

			//console.log(button, this.keyStates[i], i);
		}
	}
	, press: function(name, callback)
	{
		this.pressCallbacks[name] = callback;
	}
	, hold: function(name,  callback)
	{
		this.holdCallbacks[name] = callback;
	}
	, release: function(name, callback)
	{
		this.releaseCallbacks[name] = callback;
	
}});

var pause = false;

var Game = Class.extend({
	main: function()
	{
		var controller	= new Controller();
		var world		= new World();
		var character	= new Character(32*40, 32*44, world);
		//var crab 		= new CrabMeat(-128,-512,world);

		var actor = character;

		controller.register(32, 'space');
		controller.register(38, 'up');
		controller.register(40, 'down');
		controller.register(37, 'left');
		controller.register(39, 'right');
		controller.register(39, 'right');
		controller.register(82, 'r');
		controller.register(80, 'p');
		controller.register(77, 'm');
		controller.register(81, 'q');

		var viewports = [];

		$('.movingBoxesMain').each(function(i, element){
			var viewport= new Viewport('.movingBoxesMain');
			world.addViewport(viewport);
			viewport.camera.focus(actor);
			viewport.camera.offset = [
				(viewport.width/2)-32
				, (viewport.height/2)-32
			];

			viewports.push(viewport);
		});

		var makeRings = function(actor)
		{
			var ring;

			for(var i =0; i <= 2; i++)
			{
				ring = new Ring(actor.x + (i*48) + 128, actor.y, world);
			}
		};

		controller.release('r', function(){
			makeRings(actor);
		});

		controller.release('m', function(){
			console.log('!!!');
			new RingMonitor(
				(actor.x)
				, (actor.y - 64)
				, world
			);
		});

		// makeRings(actor);

		this.fps		= Game.fps;

		controller.press('space', function(){
			actor.jump()
		});

		controller.release('space', function(){
			actor.unjump()
		});

		controller.hold('left', function(){
			actor.goLeft();
		});

		controller.hold('right', function(){
			actor.goRight();
		});

		controller.hold('down', function(){
			if(actor.gSpeed)
			{
				actor.roll();
				return;
			}
			actor.spinDash();
		});

		controller.release('down', function(){
			actor.unspinDash();
		});

		controller.press('p', function(){
			pause = !pause;
			console.log(pause);
		});

		controller.press('q', function(){

			if(this.qTimer)
			{
				location.reload(true);
			}
			

			this.qTimer = true;
			var _this = this;

			setTimeout(
				function()
				{
					_this.qTimer = false;
				}
				, 1500
			);
		});

		var game = this;

		var gameLoop = function(){
			controller.update();
			if(!pause)
			{
				Game.frame++;
				world.update();
			}
			setTimeout(gameLoop, 1000/this.fps);
		};

		gameLoop();
	}
});

Game.fps = 90;
Game.frame = 0;
$(function(){
	var game = new Game();
	game.main();
});
