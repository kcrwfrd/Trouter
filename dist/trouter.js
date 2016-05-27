(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["_"], factory);
	else if(typeof exports === 'object')
		exports["trouter"] = factory(require("lodash"));
	else
		root["trouter"] = factory(root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_43__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign = __webpack_require__(1);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _classCallCheck2 = __webpack_require__(38);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(39);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _lodash = __webpack_require__(43);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _common = __webpack_require__(44);
	
	var _Current = __webpack_require__(93);
	
	var _Current2 = _interopRequireDefault(_Current);
	
	var _Registry = __webpack_require__(94);
	
	var _Registry2 = _interopRequireDefault(_Registry);
	
	var _Transition = __webpack_require__(107);
	
	var _Transition2 = _interopRequireDefault(_Transition);
	
	var _Transitions = __webpack_require__(111);
	
	var _Transitions2 = _interopRequireDefault(_Transitions);
	
	var _UrlRouter = __webpack_require__(109);
	
	var _UrlRouter2 = _interopRequireDefault(_UrlRouter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Router = function () {
	  function Router() {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var prefix = _ref.prefix;
	    (0, _classCallCheck3.default)(this, Router);
	
	    this.prefix = prefix || '#!';
	
	    this.urlRouter = new _UrlRouter2.default(prefix);
	    this.registry = new _Registry2.default(this, this.urlRouter);
	    this.transitions = new _Transitions2.default();
	
	    this.current = new _Current2.default(this, this.registry.root);
	  }
	
	  /**
	   * @method route
	   * @description
	   * Registers a route.
	   *
	   * @param {[String]} name
	   * @param {Object} definition
	   * @param {Boolean} definition.abstract
	   * @param {String} definition.url
	   * @param {String} definition.name
	   * @param {String} definition.label - For page title, breadcrumbs, etc.
	   * @param {String} definition.parent
	   * @param {Function} definition.controller
	   * @param {Object|Array|*} definition.resolve
	   */
	
	  (0, _createClass3.default)(Router, [{
	    key: 'route',
	    value: function route(name) {
	      var definition = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      if ((0, _common.isObject)(name)) {
	        definition = name;
	      } else {
	        definition.name = name;
	      }
	
	      this.registry.register(definition);
	
	      return this;
	    }
	
	    /**
	     * @method listen
	     * @description
	     * Starts listening for hash changes to route to.
	     */
	
	  }, {
	    key: 'listen',
	    value: function listen() {
	      this.urlRouter.listen();
	    }
	
	    /**
	     * @method href
	     * @description
	     * Returns the URL for a given route with given params.
	     * Params inherit defaults from current params.
	     *
	     * @param {String|Route} route - Route name or instance
	     * @param {Object} [params]
	     *
	     * @returns {String}
	     */
	
	  }, {
	    key: 'href',
	    value: function href(route) {
	      var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      var destination = (0, _common.isString)(route) ? this.registry.get(route) : route;
	
	      if (!destination) {
	        console.error('No match found for route \'' + route + '\'');
	
	        return this.prefix;
	      }
	
	      params = (0, _assign2.default)({}, this.current.params, params);
	
	      return this.prefix + destination.href(params);
	    }
	
	    /**
	     * @method go
	     * @description
	     * Programmatically navigate to a route by name, updating URL.
	     */
	
	  }, {
	    key: 'go',
	    value: function go(name) {
	      var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      var destination = this.registry.get(name);
	
	      if (!destination) {
	        throw new Error('Route \'' + name + '\' not found.');
	      }
	
	      return this.transitionTo(destination, params, { location: true });
	    }
	
	    /**
	     * @method pushState
	     * @description
	     * Wraps window.history.pushState.
	     *
	     * @param {Object} state
	     * @param {String} title
	     * @param {String} url
	     */
	
	  }, {
	    key: 'pushState',
	    value: function pushState() {
	      var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      var title = arguments[1];
	      var url = arguments[2];
	
	      if (window && window.history && window.history.pushState) {
	        window.history.pushState(state, title, url);
	      }
	    }
	
	    /**
	     * @name reload
	     * @description
	     * Reloads current route with new params, optionally with
	     * a hard browser refresh.
	     *
	     * @param {Object} params
	     * @param {Boolean} hardRefresh
	     */
	
	  }, {
	    key: 'reload',
	    value: function reload() {
	      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      var hardRefresh = arguments[1];
	
	      var route = this.current.route;
	
	      if (hardRefresh) {
	        this.pushState({}, route.title, this.href(route, params));
	
	        window.location.reload();
	
	        return;
	      }
	
	      return this.transitionTo(route, params, { location: true });
	    }
	
	    /**
	     * @method transitionTo
	     * @description
	     * Lower-level method for transitioning to a route.
	     *
	     * @param {Route} route
	     * @param {Object} params
	     */
	
	  }, {
	    key: 'transitionTo',
	    value: function transitionTo(route) {
	      var _this = this;
	
	      var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	      // @TODO: refactor into transition manager
	      var nearestCommonAncestor = _lodash2.default.findLast(this.current.path(), function (ancestor) {
	        return route.path.indexOf(ancestor) > -1;
	      });
	
	      var exitPath = route === this.current.route ? [route] : this.current.path().slice(this.current.path().indexOf(nearestCommonAncestor) + 1).reverse();
	
	      var enterPath = route === this.current.route ? [route] : route.path.slice(route.path.indexOf(nearestCommonAncestor) + 1);
	
	      // Default params to current
	      params = (0, _assign2.default)({}, this.current.params, params);
	
	      var transition = this.transitions.create(exitPath, enterPath, params);
	
	      if (options.location) {
	        this.pushState({}, route.title, this.href(route, params));
	      }
	
	      var previous = this.current.route;
	
	      // @TODO: should current only be set after successful route change?
	      this.current.put(route, params);
	
	      var promise = transition.run();
	
	      // @TODO: do transitions need to be queued as well? See test
	      // 'Router: go(name): Should not invoke parent controller a
	      // second time when go is called synchronously.'
	
	      promise.then(function () {
	        // this.current.put(route, params)
	      }).catch(function (error) {
	        // @TODO: handle errors
	        console.error(error);
	
	        _this.current.put(previous);
	        _this.pushState({}, _this.current.route.title, _this.current.url());
	      });
	
	      return promise;
	    }
	  }]);
	  return Router;
	}();
	
	exports.default = Router;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(2), __esModule: true };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	module.exports = __webpack_require__(6).Object.assign;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(4);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(19)});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(5)
	  , core      = __webpack_require__(6)
	  , ctx       = __webpack_require__(7)
	  , hide      = __webpack_require__(9)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 5 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 6 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.2.2'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(8);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(10)
	  , createDesc = __webpack_require__(18);
	module.exports = __webpack_require__(14) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(11)
	  , IE8_DOM_DEFINE = __webpack_require__(13)
	  , toPrimitive    = __webpack_require__(17)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(14) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(12);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(14) && !__webpack_require__(15)(function(){
	  return Object.defineProperty(__webpack_require__(16)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(15)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(12)
	  , document = __webpack_require__(5).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(12);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(20)
	  , gOPS     = __webpack_require__(35)
	  , pIE      = __webpack_require__(36)
	  , toObject = __webpack_require__(37)
	  , IObject  = __webpack_require__(24)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(15)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(21)
	  , enumBugKeys = __webpack_require__(34);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(22)
	  , toIObject    = __webpack_require__(23)
	  , arrayIndexOf = __webpack_require__(27)(false)
	  , IE_PROTO     = __webpack_require__(31)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(24)
	  , defined = __webpack_require__(26);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(25);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(23)
	  , toLength  = __webpack_require__(28)
	  , toIndex   = __webpack_require__(30);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(29)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(29)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(32)('keys')
	  , uid    = __webpack_require__(33);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(5)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 35 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 36 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(26);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(40);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(41), __esModule: true };

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(42);
	var $Object = __webpack_require__(6).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(4);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(14), 'Object', {defineProperty: __webpack_require__(10).f});

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_43__;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isString = exports.isObject = undefined;
	
	var _promise = __webpack_require__(45);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _typeof2 = __webpack_require__(81);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	exports.defer = defer;
	exports.last = last;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var isObject = exports.isObject = function isObject(x) {
	  return x !== null && (typeof x === 'undefined' ? 'undefined' : (0, _typeof3.default)(x)) === 'object';
	};
	var isString = exports.isString = function isString(x) {
	  return typeof x === 'string';
	};
	
	function defer() {
	  var resolve = void 0,
	      reject = void 0;
	
	  var promise = new _promise2.default(function (resolveFn, rejectFn) {
	    resolve = resolveFn;
	    reject = rejectFn;
	  });
	
	  return { resolve: resolve, reject: reject, promise: promise };
	}
	
	function last(arr) {
	  return arr[arr.length - 1];
	}

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(46), __esModule: true };

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(47);
	__webpack_require__(48);
	__webpack_require__(61);
	__webpack_require__(65);
	module.exports = __webpack_require__(6).Promise;

/***/ },
/* 47 */
/***/ function(module, exports) {



/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(49)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(50)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(29)
	  , defined   = __webpack_require__(26);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(51)
	  , $export        = __webpack_require__(4)
	  , redefine       = __webpack_require__(52)
	  , hide           = __webpack_require__(9)
	  , has            = __webpack_require__(22)
	  , Iterators      = __webpack_require__(53)
	  , $iterCreate    = __webpack_require__(54)
	  , setToStringTag = __webpack_require__(58)
	  , getPrototypeOf = __webpack_require__(60)
	  , ITERATOR       = __webpack_require__(59)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9);

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(55)
	  , descriptor     = __webpack_require__(18)
	  , setToStringTag = __webpack_require__(58)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(9)(IteratorPrototype, __webpack_require__(59)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(11)
	  , dPs         = __webpack_require__(56)
	  , enumBugKeys = __webpack_require__(34)
	  , IE_PROTO    = __webpack_require__(31)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(16)('iframe')
	    , i      = enumBugKeys.length
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(57).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(10)
	  , anObject = __webpack_require__(11)
	  , getKeys  = __webpack_require__(20);
	
	module.exports = __webpack_require__(14) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(5).document && document.documentElement;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(10).f
	  , has = __webpack_require__(22)
	  , TAG = __webpack_require__(59)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(32)('wks')
	  , uid        = __webpack_require__(33)
	  , Symbol     = __webpack_require__(5).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(22)
	  , toObject    = __webpack_require__(37)
	  , IE_PROTO    = __webpack_require__(31)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(62);
	var global        = __webpack_require__(5)
	  , hide          = __webpack_require__(9)
	  , Iterators     = __webpack_require__(53)
	  , TO_STRING_TAG = __webpack_require__(59)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(63)
	  , step             = __webpack_require__(64)
	  , Iterators        = __webpack_require__(53)
	  , toIObject        = __webpack_require__(23);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(50)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(51)
	  , global             = __webpack_require__(5)
	  , ctx                = __webpack_require__(7)
	  , classof            = __webpack_require__(66)
	  , $export            = __webpack_require__(4)
	  , isObject           = __webpack_require__(12)
	  , anObject           = __webpack_require__(11)
	  , aFunction          = __webpack_require__(8)
	  , anInstance         = __webpack_require__(67)
	  , forOf              = __webpack_require__(68)
	  , setProto           = __webpack_require__(72).set
	  , speciesConstructor = __webpack_require__(74)
	  , task               = __webpack_require__(75).set
	  , microtask          = __webpack_require__(77)
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;
	
	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(59)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(78)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(58)($Promise, PROMISE);
	__webpack_require__(79)(PROMISE);
	Wrapper = __webpack_require__(6)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(80)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(25)
	  , TAG = __webpack_require__(59)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 67 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(7)
	  , call        = __webpack_require__(69)
	  , isArrayIter = __webpack_require__(70)
	  , anObject    = __webpack_require__(11)
	  , toLength    = __webpack_require__(28)
	  , getIterFn   = __webpack_require__(71);
	module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(11);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(53)
	  , ITERATOR   = __webpack_require__(59)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(66)
	  , ITERATOR  = __webpack_require__(59)('iterator')
	  , Iterators = __webpack_require__(53);
	module.exports = __webpack_require__(6).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(12)
	  , anObject = __webpack_require__(11);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(7)(Function.call, __webpack_require__(73).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(36)
	  , createDesc     = __webpack_require__(18)
	  , toIObject      = __webpack_require__(23)
	  , toPrimitive    = __webpack_require__(17)
	  , has            = __webpack_require__(22)
	  , IE8_DOM_DEFINE = __webpack_require__(13)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(14) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(11)
	  , aFunction = __webpack_require__(8)
	  , SPECIES   = __webpack_require__(59)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(7)
	  , invoke             = __webpack_require__(76)
	  , html               = __webpack_require__(57)
	  , cel                = __webpack_require__(16)
	  , global             = __webpack_require__(5)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(25)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 76 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(5)
	  , macrotask = __webpack_require__(75).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(25)(process) == 'process'
	  , head, last, notify;
	
	var flush = function(){
	  var parent, fn;
	  if(isNode && (parent = process.domain))parent.exit();
	  while(head){
	    fn = head.fn;
	    fn(); // <- currently we use it only for Promise - try / catch not required
	    head = head.next;
	  } last = undefined;
	  if(parent)parent.enter();
	};
	
	// Node.js
	if(isNode){
	  notify = function(){
	    process.nextTick(flush);
	  };
	// browsers with MutationObserver
	} else if(Observer){
	  var toggle = true
	    , node   = document.createTextNode('');
	  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	  notify = function(){
	    node.data = toggle = !toggle;
	  };
	// environments with maybe non-completely correct, but existent Promise
	} else if(Promise && Promise.resolve){
	  notify = function(){
	    Promise.resolve().then(flush);
	  };
	// for other environments - macrotask based on:
	// - setImmediate
	// - MessageChannel
	// - window.postMessag
	// - onreadystatechange
	// - setTimeout
	} else {
	  notify = function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    macrotask.call(global, flush);
	  };
	}
	
	module.exports = function(fn){
	  var task = {fn: fn, next: undefined};
	  if(last)last.next = task;
	  if(!head){
	    head = task;
	    notify();
	  } last = task;
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(9);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(5)
	  , core        = __webpack_require__(6)
	  , dP          = __webpack_require__(10)
	  , DESCRIPTORS = __webpack_require__(14)
	  , SPECIES     = __webpack_require__(59)('species');
	
	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(59)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(82);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(84);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(83), __esModule: true };

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(48);
	__webpack_require__(61);
	module.exports = __webpack_require__(59)('iterator');

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(85), __esModule: true };

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(86);
	__webpack_require__(47);
	module.exports = __webpack_require__(6).Symbol;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(5)
	  , core           = __webpack_require__(6)
	  , has            = __webpack_require__(22)
	  , DESCRIPTORS    = __webpack_require__(14)
	  , $export        = __webpack_require__(4)
	  , redefine       = __webpack_require__(52)
	  , META           = __webpack_require__(87).KEY
	  , $fails         = __webpack_require__(15)
	  , shared         = __webpack_require__(32)
	  , setToStringTag = __webpack_require__(58)
	  , uid            = __webpack_require__(33)
	  , wks            = __webpack_require__(59)
	  , keyOf          = __webpack_require__(88)
	  , enumKeys       = __webpack_require__(89)
	  , isArray        = __webpack_require__(90)
	  , anObject       = __webpack_require__(11)
	  , toIObject      = __webpack_require__(23)
	  , toPrimitive    = __webpack_require__(17)
	  , createDesc     = __webpack_require__(18)
	  , _create        = __webpack_require__(55)
	  , gOPNExt        = __webpack_require__(91)
	  , $GOPD          = __webpack_require__(73)
	  , $DP            = __webpack_require__(10)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = gOPD(it = toIObject(it), key = toPrimitive(key, true));
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , replacer, $replacer;
	  while(arguments.length > i)args.push(arguments[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var BUGGY_JSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(92).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(36).f  = $propertyIsEnumerable
	  __webpack_require__(35).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(51)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	for(var symbols = (
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; ){
	  var key     = symbols[i++]
	    , Wrapper = core.Symbol
	    , sym     = wks(key);
	  if(!(key in Wrapper))dP(Wrapper, key, {value: USE_NATIVE ? sym : wrap(sym)});
	};
	
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	if(!QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild)setter = true;
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || BUGGY_JSON), 'JSON', {stringify: $stringify});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(33)('meta')
	  , isObject = __webpack_require__(12)
	  , has      = __webpack_require__(22)
	  , setDesc  = __webpack_require__(10).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(15)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(20)
	  , toIObject = __webpack_require__(23);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(20)
	  , gOPS    = __webpack_require__(35)
	  , pIE     = __webpack_require__(36);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(25);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(23)
	  , gOPN      = __webpack_require__(92).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(21)
	  , hiddenKeys = __webpack_require__(34).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(38);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(39);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @name Current
	 * @description
	 * Maintains current router state (i.e. current route, URL, and params).
	 */
	
	var Current = function () {
	
	  /**
	   * @param {Router} router
	   * @param {Route} current
	   */
	
	  function Current(router, current) {
	    (0, _classCallCheck3.default)(this, Current);
	
	    this.router = router;
	
	    this.params = {};
	    this.route = null;
	
	    this.put(current);
	  }
	
	  /**
	   * @method put
	   * @description
	   * Updates current route.
	   *
	   * @param {Route} route
	   * @param {Object} [params]
	   */
	
	  (0, _createClass3.default)(Current, [{
	    key: "put",
	    value: function put(route) {
	      var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      this.params = params;
	      this.route = route;
	    }
	
	    /**
	     * @method path
	     * @description
	     * Returns path to current route.
	     *
	     * @returns {Array.<Route>}
	     */
	
	  }, {
	    key: "path",
	    value: function path() {
	      return this.route.path;
	    }
	
	    /**
	     * @method url
	     * @description
	     * Returns current URL
	     *
	     * @returns {String}
	     *
	     * @example
	     * this.url()
	     * -> /#!/foo/1/bar
	     */
	
	  }, {
	    key: "url",
	    value: function url() {
	      return this.router.href(this.route, this.params);
	    }
	  }]);
	  return Current;
	}();
	
	exports.default = Current;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign = __webpack_require__(1);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _classCallCheck2 = __webpack_require__(38);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(39);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _Route = __webpack_require__(95);
	
	var _Route2 = _interopRequireDefault(_Route);
	
	var _common = __webpack_require__(44);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Registry = function () {
	  function Registry(router, urlRouter) {
	    (0, _classCallCheck3.default)(this, Registry);
	
	    this.router = router;
	    this.urlRouter = urlRouter;
	
	    this.routes = {};
	
	    this.root = this.register({
	      name: '',
	      url: '',
	      abstract: true
	    });
	  }
	
	  (0, _createClass3.default)(Registry, [{
	    key: 'buildRoute',
	    value: function buildRoute(definition) {
	      var parentName = this.getParentName(definition);
	      var parent = isRoot(definition) ? null : this.get(parentName);
	
	      // There's a parent, but it hasn't been built yet
	      if (parentName && !parent) {
	        return null;
	      }
	
	      // The route's ancestors
	      var path = parent ? parent.path : [];
	
	      var route = new _Route2.default((0, _assign2.default)({}, definition, { parent: parent, path: path }));
	
	      return route;
	    }
	  }, {
	    key: 'register',
	    value: function register(definition) {
	      var _this = this;
	
	      if (this.routes.hasOwnProperty(definition.name)) {
	        throw new Error('Route \'' + definition.name + '\' is already defined');
	      }
	
	      var route = this.buildRoute(definition);
	
	      if (route) {
	        this.routes[route.name] = route;
	      }
	
	      if (route && route.navigable) {
	        this.urlRouter.when(route.url, function (params) {
	          return _this.router.transitionTo(route, params);
	        });
	      }
	
	      return route;
	    }
	  }, {
	    key: 'getParentName',
	    value: function getParentName(route) {
	      var name = route.name || "";
	
	      if (name.indexOf('.') > -1) {
	        return name.substring(0, name.lastIndexOf('.'));
	      }
	
	      if (!route.parent) return "";
	
	      return (0, _common.isString)(route.parent) ? route.parent : route.parent.name;
	    }
	
	    /**
	     * @method getName
	     * @description
	     * Returns a route's fully qualified name.
	     *
	     * @example
	     * let route = { name: 'child', parent: 'parent' }
	     * getName(route) -> 'parent.child'
	     */
	
	  }, {
	    key: 'getName',
	    value: function getName(route) {
	      var name = route.name;
	
	      if (name.indexOf('.') !== -1 || !route.parent) {
	        return name;
	      }
	
	      var parentName = (0, _common.isString)(route.parent) ? route.parent : route.parent.name;
	
	      return parentName ? parentName + '.' + name : name;
	    }
	
	    /**
	     * @method get
	     * @description
	     * Returns a registered route.
	     */
	
	  }, {
	    key: 'get',
	    value: function get(name) {
	      return this.routes[name] || null;
	    }
	  }]);
	  return Registry;
	}();
	
	function isRoot(route) {
	  return route.name === "";
	}
	
	exports.default = Registry;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _keys = __webpack_require__(96);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _promise = __webpack_require__(45);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _getIterator2 = __webpack_require__(100);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _slicedToArray2 = __webpack_require__(103);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _classCallCheck2 = __webpack_require__(38);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(39);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _lodash = __webpack_require__(43);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _common = __webpack_require__(44);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @class Route
	 * @description
	 * A fully-built route.
	 */
	
	// RegEx for matching URL params
	var PARAMS = /\:([A-Za-z0-9_-]+)/g;
	
	var Route = function () {
	  function Route(definition) {
	    (0, _classCallCheck3.default)(this, Route);
	    var abstract = definition.abstract;
	    var controller = definition.controller;
	    var name = definition.name;
	    var parent = definition.parent;
	    var path = definition.path;
	    var resolve = definition.resolve;
	    var title = definition.title;
	    var url = definition.url;
	
	
	    url = url || '';
	
	    // Prepend URL with parent's URL
	    // @TODO: should each route only be concerned with its section of the url?
	    // e.g. fullUrl = this.path.reduce(((url, route) => url + route.url), this.router.base)
	    url = parent && parent.url ? parent.url + url : url;
	
	    // Only 1 resolve definition allowed
	    if (controller && controller.resolve && resolve) {
	      throw new Error('Resolve cannot be defined on both controller and route.');
	    }
	
	    this.Controller = controller; // Controller definition
	    this.controller = null; // Controller instance
	    this.name = name;
	    this.navigable = !!url && !abstract;
	    this.parent = parent || null;
	    this.path = path.concat(this);
	    this.resolve = resolve || controller && controller.resolve || {};
	    this.title = title || name;
	    this.url = url;
	  }
	
	  (0, _createClass3.default)(Route, [{
	    key: 'getFqn',
	    value: function getFqn() {
	      if (!this.parent) {
	        return this.name;
	      }
	
	      var name = this.parent.getFqn();
	
	      return name ? name + '.' + this.name : this.name;
	    }
	
	    /**
	     * @method getRoot
	     * @description
	     * Returns the root node of this route's tree
	     */
	
	  }, {
	    key: 'getRoot',
	    value: function getRoot() {
	      return this.parent && this.parent.getRoot() || this;
	    }
	
	    /**
	     * @method href
	     * @description
	     * Returns route's URL with specified params.
	     *
	     * @param {Object} [params] - Required if route has params
	     *
	     * @example
	     * this.url
	     * -> /foo/:fooId
	     *
	     * this.href({fooId: 1})
	     * -> /foo/1
	     */
	
	  }, {
	    key: 'href',
	    value: function href() {
	      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      if (!this.url) {
	        return '';
	      }
	
	      var _url$split = this.url.split('?');
	
	      var _url$split2 = (0, _slicedToArray3.default)(_url$split, 2);
	
	      var path = _url$split2[0];
	      var query = _url$split2[1];
	
	
	      var url = path.replace(PARAMS, function (match, param) {
	        if (param in params) {
	          return params[param];
	        }
	
	        throw new Error('Missing required param \'' + param + '\'');
	      });
	
	      if (query) {
	        var isFirst = true;
	
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	          for (var _iterator = (0, _getIterator3.default)(query.split('&')), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var paramName = _step.value;
	
	            var paramValue = params[paramName];
	
	            if (paramValue) {
	              isFirst ? url += '?' : url += '&';
	
	              url += paramName + '=' + paramValue;
	
	              isFirst = false;
	            }
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	      }
	
	      return url;
	    }
	
	    /**
	     * @method enter
	     * @description
	     * Route becomes active, instantiating its controller
	     * if one is defined.
	     */
	
	  }, {
	    key: 'enter',
	    value: function enter() {
	      var _this = this;
	
	      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      var promise = getResolve(this.resolve, params);
	
	      promise.then(function (resolve) {
	        if (_this.Controller) {
	          _this.controller = new _this.Controller(params, resolve);
	        }
	
	        document.title = _this.title;
	      }).catch(function (error) {
	        // @TODO: handle errors
	        console.error(error);
	      });
	
	      return promise;
	    }
	  }, {
	    key: 'exit',
	    value: function exit() {
	      var _this2 = this;
	
	      var promise = this.controller && this.controller.onExit ? _promise2.default.resolve(this.controller.onExit()) : _promise2.default.resolve();
	
	      promise.then(function () {
	        if (_this2.controller) {
	          _this2.controller = null;
	        }
	      }).catch(function (error) {
	        // @TODO: handle errors
	        console.error(error);
	      });
	
	      return promise;
	    }
	  }]);
	  return Route;
	}();
	
	/**
	 * @method getResolve
	 * @private
	 * @description
	 * Invokes/normalizes resolve functions and values into promises.
	 *
	 * @param {*} value
	 *
	 * @returns {Promise}
	 */
	
	function getResolve(value, params) {
	  if (value instanceof _promise2.default) {
	    return value;
	  }
	
	  if (typeof value === 'function') {
	    return _promise2.default.resolve(value(params));
	  }
	
	  if (_lodash2.default.isPlainObject(value)) {
	    return resolveObject(value, params);
	  }
	
	  if (Array.isArray(value)) {
	    return _promise2.default.all(value.map(function (item) {
	      return typeof item === 'function' ? item(params) : item;
	    }));
	  }
	
	  return _promise2.default.resolve(value);
	}
	
	function resolveObject(obj, params) {
	  var keys = (0, _keys2.default)(obj);
	
	  // First invoke resolves and combine into single promise
	  var combinedPromise = _promise2.default.all(keys.map(function (key) {
	    var value = obj[key];
	
	    return typeof value === 'function' ? value(params) : value;
	  }));
	
	  // Then assign resolved values to their keys
	  return combinedPromise.then(function (values) {
	    return values.reduce(function (memo, value, index) {
	      var key = keys[index];
	
	      memo[key] = value;
	
	      return memo;
	    }, {});
	  });
	}
	
	exports.default = Route;

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(97), __esModule: true };

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(98);
	module.exports = __webpack_require__(6).Object.keys;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(37)
	  , $keys    = __webpack_require__(20);
	
	__webpack_require__(99)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(4)
	  , core    = __webpack_require__(6)
	  , fails   = __webpack_require__(15);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(101), __esModule: true };

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(61);
	__webpack_require__(48);
	module.exports = __webpack_require__(102);

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(11)
	  , get      = __webpack_require__(71);
	module.exports = __webpack_require__(6).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _isIterable2 = __webpack_require__(104);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(100);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;
	
	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);
	
	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }
	
	    return _arr;
	  }
	
	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(105), __esModule: true };

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(61);
	__webpack_require__(48);
	module.exports = __webpack_require__(106);

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(66)
	  , ITERATOR  = __webpack_require__(59)('iterator')
	  , Iterators = __webpack_require__(53);
	module.exports = __webpack_require__(6).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(38);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(39);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _common = __webpack_require__(44);
	
	var _Queue = __webpack_require__(108);
	
	var _Queue2 = _interopRequireDefault(_Queue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @name Transition
	 * @description
	 * Manages route transitions
	 */
	
	var Transition = function () {
	
	  /**
	   * @param {Array.<Route>} exitPath
	   * @param {Array.<Route>} enterPath
	   * @param {Object} params
	   * @param {Transitions} transitions
	   */
	
	  function Transition(exitPath, enterPath, params, transitions) {
	    (0, _classCallCheck3.default)(this, Transition);
	
	    var destination = (0, _common.last)(enterPath);
	
	    this.onStartQueue = new _Queue2.default(transitions.onStartHandlers.map(function (handler) {
	      return handler.bind(handler, destination);
	    }));
	
	    this.exitQueue = new _Queue2.default(exitPath.map(function (route) {
	      return route.exit.bind(route);
	    }));
	
	    this.enterQueue = new _Queue2.default(enterPath.map(function (route) {
	      return route.enter.bind(route, params);
	    }));
	  }
	
	  (0, _createClass3.default)(Transition, [{
	    key: 'run',
	    value: function run() {
	      var _this = this;
	
	      return this.onStartQueue.flush().then(function () {
	        return _this.exitQueue.flush();
	      }).then(function () {
	        return _this.enterQueue.flush();
	      });
	    }
	  }]);
	  return Transition;
	}();
	
	exports.default = Transition;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(45);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _classCallCheck2 = __webpack_require__(38);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(39);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @name Queue
	 * @description
	 * A promise queue. Sequentially invokes a queue of functions that
	 * each return a promise. The next function is called on successful
	 * resolution of the current function's promise.
	 */
	
	var Queue = function () {
	  function Queue() {
	    var queue = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    (0, _classCallCheck3.default)(this, Queue);
	
	    this.queue = queue;
	  }
	
	  (0, _createClass3.default)(Queue, [{
	    key: "flush",
	    value: function flush() {
	      if (this.queue.length === 0) {
	        return _promise2.default.resolve();
	      }
	
	      var first = this.queue.shift();
	
	      return this.queue.reduce(function (current, next) {
	        return current.then(function () {
	          return next();
	        });
	      }, first());
	    }
	  }]);
	  return Queue;
	}();
	
	exports.default = Queue;

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getIterator2 = __webpack_require__(100);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _classCallCheck2 = __webpack_require__(38);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(39);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _UrlMatcher = __webpack_require__(110);
	
	var _UrlMatcher2 = _interopRequireDefault(_UrlMatcher);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var UrlRouter = function () {
	  function UrlRouter(prefix) {
	    (0, _classCallCheck3.default)(this, UrlRouter);
	
	    this.prefix = prefix || '#!';
	    this.rules = [];
	    this.default = null;
	  }
	
	  (0, _createClass3.default)(UrlRouter, [{
	    key: 'onChange',
	    value: function onChange(hash) {
	      var path = hash.replace(this.prefix, '');
	
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = (0, _getIterator3.default)(this.rules), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var rule = _step.value;
	
	          if (rule(path)) {
	            return true;
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	
	      console.warn('No route handler found for \'' + path + '\'');
	
	      if (this.default && path !== this.default) {
	        var url = this.prefix + this.default;
	
	        this.replaceState({}, '', url);
	        this.onChange(url);
	      }
	    }
	  }, {
	    key: 'listen',
	    value: function listen() {
	      var _this = this;
	
	      // @TODO: normalize popstate/hashchange
	      window.addEventListener('hashchange', function (event) {
	        // this.onChange(window.location.hash)
	      });
	
	      window.addEventListener('popstate', function (event) {
	        _this.onChange(window.location.hash);
	      });
	
	      // Handle the current hash
	      this.onChange(window.location.hash);
	    }
	
	    /**
	     * @method pushState
	     * @description
	     * Wraps window.history.pushState.
	     *
	     * @param {Object} state
	     * @param {String} title
	     * @param {String} url
	     */
	
	  }, {
	    key: 'pushState',
	    value: function pushState() {
	      var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      var title = arguments[1];
	      var url = arguments[2];
	
	      if (window && window.history && window.history.pushState) {
	        window.history.pushState(state, title, url);
	      }
	    }
	
	    /**
	     * @method replaceState
	     * @description
	     * Wraps window.history.replaceState.
	     *
	     * @param {Object} state
	     * @param {String} title
	     * @param {String} url
	     */
	
	  }, {
	    key: 'replaceState',
	    value: function replaceState() {
	      var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      var title = arguments[1];
	      var url = arguments[2];
	
	      if (window && window.history && window.history.replaceState) {
	        window.history.replaceState(state, title, url);
	      }
	    }
	  }, {
	    key: 'when',
	    value: function when(url, handler) {
	      var matcher = new _UrlMatcher2.default(url);
	
	      this.rules.push(function (path) {
	        var result = matcher.exec(path);
	
	        if (!result) {
	          return false;
	        }
	
	        handler(result);
	
	        return true;
	      });
	    }
	  }, {
	    key: 'otherwise',
	    value: function otherwise(url) {
	      this.default = url;
	    }
	  }]);
	  return UrlRouter;
	}();
	
	exports.default = UrlRouter;

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getIterator2 = __webpack_require__(100);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _slicedToArray2 = __webpack_require__(103);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _classCallCheck2 = __webpack_require__(38);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(39);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var UrlMatcher = function () {
	  /**
	   * @constructor
	   * @description
	   * Takes a URL pattern with optional params denoted by ':'
	   *
	   * @param {String} urlPattern - e.g. /foo/:fooId/bar?bazId
	   */
	
	  function UrlMatcher(urlPattern) {
	    (0, _classCallCheck3.default)(this, UrlMatcher);
	
	    this.params = [];
	    this.pathParams = [];
	    this.queryParams = [];
	
	    // Query args are optional and can occur in any order, so we
	    // match for them separately from the path RegEx pattern.
	    this.queryPatterns = [];
	
	    // We'll build up the regex string
	    // as we iterate through the path.
	    var pattern = '';
	
	    var _urlPattern$split = urlPattern.split('?');
	
	    var _urlPattern$split2 = (0, _slicedToArray3.default)(_urlPattern$split, 2);
	
	    var pathPattern = _urlPattern$split2[0];
	    var queryPattern = _urlPattern$split2[1];
	
	    // @TODO: find a more elegant way
	
	    if (pathPattern === '/') {
	      pattern += '/';
	    }
	
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	      for (var _iterator = (0, _getIterator3.default)(pathPattern.split('/')), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var _item = _step.value;
	
	        if (_item === '') continue;
	
	        var isParam = _item.startsWith(':');
	
	        if (isParam) {
	          var _paramName = _item.slice(1);
	
	          this.pathParams.push(_paramName);
	
	          // Note: special characters in RegEx patterns written
	          // as strings need to be double-escaped.
	          pattern += '/([\\w-]+)';
	        } else {
	          pattern += '/' + _item;
	        }
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	
	    if (queryPattern) {
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;
	
	      try {
	        for (var _iterator2 = (0, _getIterator3.default)(queryPattern.split('&')), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var item = _step2.value;
	
	          this.queryParams.push(item);
	
	          var _queryPattern = item + '=([\\w-]+)';
	
	          this.queryPatterns.push(new RegExp(_queryPattern));
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	    }
	
	    this.params = this.pathParams.concat(this.queryParams);
	
	    // Pattern may optionally end with query args
	    this.pattern = new RegExp('^' + pattern + '(?:\\?.*)?$');
	  }
	
	  /**
	   * @method exec
	   * @description
	   * Tests a path, providing route params if match found.
	   * Returns null if not a match.
	   *
	   * @param {String} path
	   *
	   * @returns {Object|null}
	   *
	   * @example
	   * new UrlMatcher('/foo/:id').exec('/foo/1') -> { id: '1'}
	   */
	
	  (0, _createClass3.default)(UrlMatcher, [{
	    key: 'exec',
	    value: function exec(path) {
	      var match = this.pattern.exec(path);
	
	      if (!match) {
	        return null;
	      }
	
	      var result = {};
	
	      // Captured path params
	      match = match.slice(1);
	
	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;
	
	      try {
	        for (var _iterator3 = (0, _getIterator3.default)(this.pathParams.entries()), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var _step3$value = (0, _slicedToArray3.default)(_step3.value, 2);
	
	          var index = _step3$value[0];
	          var param = _step3$value[1];
	
	          // @TODO: throw error at route definition time for duplicate params
	          if (result[param]) {
	            console.warning('Warning: duplicate param \'' + paramName + '\'');
	          }
	
	          result[param] = match[index];
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }
	
	      var _iteratorNormalCompletion4 = true;
	      var _didIteratorError4 = false;
	      var _iteratorError4 = undefined;
	
	      try {
	        for (var _iterator4 = (0, _getIterator3.default)(this.queryParams.entries()), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	          var _step4$value = (0, _slicedToArray3.default)(_step4.value, 2);
	
	          var index = _step4$value[0];
	          var param = _step4$value[1];
	
	          // @TODO: throw error at route definition time for duplicate params
	          if (result[param]) {
	            console.warning('Warning: duplicate param \'' + paramName + '\'');
	          }
	
	          var _match = this.queryPatterns[index].exec(path);
	
	          result[param] = _match && _match[1] || null;
	        }
	      } catch (err) {
	        _didIteratorError4 = true;
	        _iteratorError4 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion4 && _iterator4.return) {
	            _iterator4.return();
	          }
	        } finally {
	          if (_didIteratorError4) {
	            throw _iteratorError4;
	          }
	        }
	      }
	
	      return result;
	    }
	
	    /**
	     * @method getParams
	     * @static
	     * @description
	     * Extract param names from a URL pattern.
	     *
	     * @param {String} urlPattern
	     * @param {Function} [callback] - Optional
	     *
	     * @example
	     * UrlMatcher.getParams('/foo/:fooId/bar/:barId')
	     * -> ['fooId', 'barId']
	     */
	
	  }], [{
	    key: 'getParams',
	    value: function getParams(urlPattern) {
	      var params = [];
	
	      var _iteratorNormalCompletion5 = true;
	      var _didIteratorError5 = false;
	      var _iteratorError5 = undefined;
	
	      try {
	        for (var _iterator5 = (0, _getIterator3.default)(urlPattern.split('/')), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	          var item = _step5.value;
	
	          if (item === '') continue;
	
	          if (item.startsWith(':')) {
	            params.push(item.slice(1));
	          }
	        }
	      } catch (err) {
	        _didIteratorError5 = true;
	        _iteratorError5 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion5 && _iterator5.return) {
	            _iterator5.return();
	          }
	        } finally {
	          if (_didIteratorError5) {
	            throw _iteratorError5;
	          }
	        }
	      }
	
	      return params;
	    }
	  }]);
	  return UrlMatcher;
	}();
	
	exports.default = UrlMatcher;

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof2 = __webpack_require__(81);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _classCallCheck2 = __webpack_require__(38);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(39);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _Transition = __webpack_require__(107);
	
	var _Transition2 = _interopRequireDefault(_Transition);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @name Transitions
	 * @description
	 * Registers global transition hooks.
	 *
	 * @TODO
	 * - Implement additional transition lifecycle hooks
	 * - Support handlers returning Boolean
	 * - Write tests
	 */
	
	var Transitions = function () {
	  function Transitions() {
	    (0, _classCallCheck3.default)(this, Transitions);
	
	    this.onStartHandlers = [];
	  }
	
	  /**
	   * @method onStart
	   * @description
	   * Registers a callback handler called on transition start.
	   * Handler may return a promise to cancel route transition.
	   *
	   * @TODO support returning Boolean to cancel or continue transition.
	   *
	   * @param {Function} handler
	   *
	   * @callback handler
	   * @param {Route} destination
	   */
	
	  (0, _createClass3.default)(Transitions, [{
	    key: 'onStart',
	    value: function onStart(handler) {
	      if (typeof handler !== 'function') {
	        throw new Error('Handler must be a function, was \'' + (typeof handler === 'undefined' ? 'undefined' : (0, _typeof3.default)(handler)) + '\' instead');
	      }
	
	      this.onStartHandlers.push(handler);
	    }
	  }, {
	    key: 'create',
	    value: function create(exitPath, enterPath, params) {
	      return new _Transition2.default(exitPath, enterPath, params, this);
	    }
	  }]);
	  return Transitions;
	}();
	
	exports.default = Transitions;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=trouter.js.map