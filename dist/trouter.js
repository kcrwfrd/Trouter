(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["_"], factory);
	else if(typeof exports === 'object')
		exports["trouter"] = factory(require("lodash"));
	else
		root["trouter"] = factory(root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_65__) {
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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getIterator2 = __webpack_require__(1);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _assign = __webpack_require__(54);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _classCallCheck2 = __webpack_require__(60);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(61);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _lodash = __webpack_require__(65);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _common = __webpack_require__(66);
	
	var _Current = __webpack_require__(104);
	
	var _Current2 = _interopRequireDefault(_Current);
	
	var _Registry = __webpack_require__(105);
	
	var _Registry2 = _interopRequireDefault(_Registry);
	
	var _Transition = __webpack_require__(116);
	
	var _Transition2 = _interopRequireDefault(_Transition);
	
	var _Transitions = __webpack_require__(118);
	
	var _Transitions2 = _interopRequireDefault(_Transitions);
	
	var _UrlRouter = __webpack_require__(119);
	
	var _UrlRouter2 = _interopRequireDefault(_UrlRouter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Router = function () {
	  function Router() {
	    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	        prefix = _ref.prefix;
	
	    (0, _classCallCheck3.default)(this, Router);
	
	    this.prefix = prefix || '#!';
	
	    this.urlRouter = new _UrlRouter2.default(prefix);
	    this.registry = new _Registry2.default(this, this.urlRouter);
	    this.transitions = new _Transitions2.default();
	
	    // @TODO refactor current/previous into a full history stack
	    this.current = new _Current2.default(this, this.registry.root);
	    this.previous = new _Current2.default(this, null);
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
	      var definition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
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
	      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
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
	      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
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
	      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var title = arguments[1];
	      var url = arguments[2];
	
	      return this.urlRouter.pushState(state, title, url);
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
	      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
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
	
	      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	      // Params inherit current by default
	      params = (0, _assign2.default)({}, this.current.params, params);
	
	      var transition = this.transitions.create(this.current.route, route, this.current.params, params);
	
	      if (options.location) {
	        this.pushState({}, route.title, this.href(route, params));
	      }
	
	      var previous = this.current.route;
	      var previousParams = this.current.params;
	
	      // @TODO: should current only be set after successful route change?
	      this.current.put(route, params);
	
	      // @TODO: do transitions need to be queued as well? See test
	      // 'Router: go(name): Should not invoke parent controller a
	      // second time when go is called synchronously.'
	
	      return transition.run().then(function (result) {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	          for (var _iterator = (0, _getIterator3.default)(_this.transitions.onSuccessHandlers), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var handler = _step.value;
	
	            handler(_this.current);
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
	
	        _this.previous.put(previous, previousParams);
	
	        return _this.current;
	      }).catch(function (error) {
	        _this.current.put(previous, previousParams);
	
	        _this.pushState({}, _this.current.route.title, _this.current.url());
	
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;
	
	        try {
	          for (var _iterator2 = (0, _getIterator3.default)(_this.transitions.onErrorHandlers), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var handler = _step2.value;
	
	            handler(error);
	          }
	
	          // Continue propagating the error down the promise chain
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
	
	        throw error;
	      });
	    }
	  }]);
	  return Router;
	}();
	
	exports.default = Router;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(2), __esModule: true };

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	__webpack_require__(49);
	module.exports = __webpack_require__(51);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	var global = __webpack_require__(15);
	var hide = __webpack_require__(19);
	var Iterators = __webpack_require__(7);
	var TO_STRING_TAG = __webpack_require__(46)('toStringTag');
	
	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');
	
	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME = DOMIterables[i];
	  var Collection = global[NAME];
	  var proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(5);
	var step = __webpack_require__(6);
	var Iterators = __webpack_require__(7);
	var toIObject = __webpack_require__(8);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(12)(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step(1);
	  }
	  if (kind == 'keys') return step(0, index);
	  if (kind == 'values') return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = function () { /* empty */ };


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = function (done, value) {
	  return { value: value, done: !!done };
	};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = {};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(9);
	var defined = __webpack_require__(11);
	module.exports = function (it) {
	  return IObject(defined(it));
	};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(10);
	// eslint-disable-next-line no-prototype-builtins
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY = __webpack_require__(13);
	var $export = __webpack_require__(14);
	var redefine = __webpack_require__(30);
	var hide = __webpack_require__(19);
	var Iterators = __webpack_require__(7);
	var $iterCreate = __webpack_require__(31);
	var setToStringTag = __webpack_require__(45);
	var getPrototypeOf = __webpack_require__(47);
	var ITERATOR = __webpack_require__(46)('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';
	
	var returnThis = function () { return this; };
	
	module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = true;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(15);
	var core = __webpack_require__(16);
	var ctx = __webpack_require__(17);
	var hide = __webpack_require__(19);
	var has = __webpack_require__(29);
	var PROTOTYPE = 'prototype';
	
	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && has(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
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
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
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


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 16 */
/***/ (function(module, exports) {

	var core = module.exports = { version: '2.6.5' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(18);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(20);
	var createDesc = __webpack_require__(28);
	module.exports = __webpack_require__(24) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(21);
	var IE8_DOM_DEFINE = __webpack_require__(23);
	var toPrimitive = __webpack_require__(27);
	var dP = Object.defineProperty;
	
	exports.f = __webpack_require__(24) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(22);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(24) && !__webpack_require__(25)(function () {
	  return Object.defineProperty(__webpack_require__(26)('div'), 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(25)(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 25 */
/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(22);
	var document = __webpack_require__(15).document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(22);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(19);


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var create = __webpack_require__(32);
	var descriptor = __webpack_require__(28);
	var setToStringTag = __webpack_require__(45);
	var IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(19)(IteratorPrototype, __webpack_require__(46)('iterator'), function () { return this; });
	
	module.exports = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject = __webpack_require__(21);
	var dPs = __webpack_require__(33);
	var enumBugKeys = __webpack_require__(43);
	var IE_PROTO = __webpack_require__(40)('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(26)('iframe');
	  var i = enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(44).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(20);
	var anObject = __webpack_require__(21);
	var getKeys = __webpack_require__(34);
	
	module.exports = __webpack_require__(24) ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(35);
	var enumBugKeys = __webpack_require__(43);
	
	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	var has = __webpack_require__(29);
	var toIObject = __webpack_require__(8);
	var arrayIndexOf = __webpack_require__(36)(false);
	var IE_PROTO = __webpack_require__(40)('IE_PROTO');
	
	module.exports = function (object, names) {
	  var O = toIObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(8);
	var toLength = __webpack_require__(37);
	var toAbsoluteIndex = __webpack_require__(39);
	module.exports = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(38);
	var min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(38);
	var max = Math.max;
	var min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(41)('keys');
	var uid = __webpack_require__(42);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	var core = __webpack_require__(16);
	var global = __webpack_require__(15);
	var SHARED = '__core-js_shared__';
	var store = global[SHARED] || (global[SHARED] = {});
	
	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: core.version,
	  mode: __webpack_require__(13) ? 'pure' : 'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});


/***/ }),
/* 42 */
/***/ (function(module, exports) {

	var id = 0;
	var px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	var document = __webpack_require__(15).document;
	module.exports = document && document.documentElement;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	var def = __webpack_require__(20).f;
	var has = __webpack_require__(29);
	var TAG = __webpack_require__(46)('toStringTag');
	
	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	var store = __webpack_require__(41)('wks');
	var uid = __webpack_require__(42);
	var Symbol = __webpack_require__(15).Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has = __webpack_require__(29);
	var toObject = __webpack_require__(48);
	var IE_PROTO = __webpack_require__(40)('IE_PROTO');
	var ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(11);
	module.exports = function (it) {
	  return Object(defined(it));
	};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $at = __webpack_require__(50)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(12)(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(38);
	var defined = __webpack_require__(11);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that));
	    var i = toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(21);
	var get = __webpack_require__(52);
	module.exports = __webpack_require__(16).getIterator = function (it) {
	  var iterFn = get(it);
	  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	var classof = __webpack_require__(53);
	var ITERATOR = __webpack_require__(46)('iterator');
	var Iterators = __webpack_require__(7);
	module.exports = __webpack_require__(16).getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(10);
	var TAG = __webpack_require__(46)('toStringTag');
	// ES3 wrong here
	var ARG = cof(function () { return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};
	
	module.exports = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(55), __esModule: true };

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(56);
	module.exports = __webpack_require__(16).Object.assign;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(14);
	
	$export($export.S + $export.F, 'Object', { assign: __webpack_require__(57) });


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys = __webpack_require__(34);
	var gOPS = __webpack_require__(58);
	var pIE = __webpack_require__(59);
	var toObject = __webpack_require__(48);
	var IObject = __webpack_require__(9);
	var $assign = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(25)(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = gOPS.f;
	  var isEnum = pIE.f;
	  while (aLen > index) {
	    var S = IObject(arguments[index++]);
	    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;


/***/ }),
/* 58 */
/***/ (function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 59 */
/***/ (function(module, exports) {

	exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 60 */
/***/ (function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(62);
	
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

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(63), __esModule: true };

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(64);
	var $Object = __webpack_require__(16).Object;
	module.exports = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(14);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(24), 'Object', { defineProperty: __webpack_require__(20).f });


/***/ }),
/* 65 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_65__;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isString = exports.isObject = undefined;
	
	var _promise = __webpack_require__(67);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _typeof2 = __webpack_require__(88);
	
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

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(68), __esModule: true };

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(69);
	__webpack_require__(49);
	__webpack_require__(3);
	__webpack_require__(70);
	__webpack_require__(86);
	__webpack_require__(87);
	module.exports = __webpack_require__(16).Promise;


/***/ }),
/* 69 */
/***/ (function(module, exports) {



/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY = __webpack_require__(13);
	var global = __webpack_require__(15);
	var ctx = __webpack_require__(17);
	var classof = __webpack_require__(53);
	var $export = __webpack_require__(14);
	var isObject = __webpack_require__(22);
	var aFunction = __webpack_require__(18);
	var anInstance = __webpack_require__(71);
	var forOf = __webpack_require__(72);
	var speciesConstructor = __webpack_require__(75);
	var task = __webpack_require__(76).set;
	var microtask = __webpack_require__(78)();
	var newPromiseCapabilityModule = __webpack_require__(79);
	var perform = __webpack_require__(80);
	var userAgent = __webpack_require__(81);
	var promiseResolve = __webpack_require__(82);
	var PROMISE = 'Promise';
	var TypeError = global.TypeError;
	var process = global.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8 || '';
	var $Promise = global[PROMISE];
	var isNode = classof(process) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;
	
	var USE_NATIVE = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[__webpack_require__(46)('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function')
	      && promise.then(empty) instanceof FakePromise
	      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	      // we can't detect it synchronously, so just check versions
	      && v8.indexOf('6.6') !== 0
	      && userAgent.indexOf('Chrome/66') === -1;
	  } catch (e) { /* empty */ }
	}();
	
	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function (promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v;
	    var ok = promise._s == 1;
	    var i = 0;
	    var run = function (reaction) {
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // may throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        if (domain && !exited) domain.exit();
	        reject(e);
	      }
	    };
	    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function (promise) {
	  task.call(global, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = perform(function () {
	        if (isNode) {
	          process.emit('unhandledRejection', value, promise);
	        } else if (handler = global.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = global.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if (unhandled && result.e) throw result.v;
	  });
	};
	var isUnhandled = function (promise) {
	  return promise._h !== 1 && (promise._a || promise._c).length === 0;
	};
	var onHandleUnhandled = function (promise) {
	  task.call(global, function () {
	    var handler;
	    if (isNode) {
	      process.emit('rejectionHandled', promise);
	    } else if (handler = global.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function (value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function (value) {
	  var promise = this;
	  var then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};
	
	// constructor polyfill
	if (!USE_NATIVE) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(83)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject = ctx($reject, promise, 1);
	  };
	  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
	__webpack_require__(45)($Promise, PROMISE);
	__webpack_require__(84)(PROMISE);
	Wrapper = __webpack_require__(16)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(85)(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      forOf(iterable, false, function (promise) {
	        var $index = index++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  }
	});


/***/ }),
/* 71 */
/***/ (function(module, exports) {

	module.exports = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	var ctx = __webpack_require__(17);
	var call = __webpack_require__(73);
	var isArrayIter = __webpack_require__(74);
	var anObject = __webpack_require__(21);
	var toLength = __webpack_require__(37);
	var getIterFn = __webpack_require__(52);
	var BREAK = {};
	var RETURN = {};
	var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
	  var f = ctx(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = call(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	exports.BREAK = BREAK;
	exports.RETURN = RETURN;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(21);
	module.exports = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) anObject(ret.call(iterator));
	    throw e;
	  }
	};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators = __webpack_require__(7);
	var ITERATOR = __webpack_require__(46)('iterator');
	var ArrayProto = Array.prototype;
	
	module.exports = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject = __webpack_require__(21);
	var aFunction = __webpack_require__(18);
	var SPECIES = __webpack_require__(46)('species');
	module.exports = function (O, D) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	var ctx = __webpack_require__(17);
	var invoke = __webpack_require__(77);
	var html = __webpack_require__(44);
	var cel = __webpack_require__(26);
	var global = __webpack_require__(15);
	var process = global.process;
	var setTask = global.setImmediate;
	var clearTask = global.clearImmediate;
	var MessageChannel = global.MessageChannel;
	var Dispatch = global.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function () {
	  var id = +this;
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function (event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (__webpack_require__(10)(process) == 'process') {
	    defer = function (id) {
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
	    defer = function (id) {
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in cel('script')) {
	    defer = function (id) {
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set: setTask,
	  clear: clearTask
	};


/***/ }),
/* 77 */
/***/ (function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function (fn, args, that) {
	  var un = that === undefined;
	  switch (args.length) {
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
	  } return fn.apply(that, args);
	};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(15);
	var macrotask = __webpack_require__(76).set;
	var Observer = global.MutationObserver || global.WebKitMutationObserver;
	var process = global.process;
	var Promise = global.Promise;
	var isNode = __webpack_require__(10)(process) == 'process';
	
	module.exports = function () {
	  var head, last, notify;
	
	  var flush = function () {
	    var parent, fn;
	    if (isNode && (parent = process.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };
	
	  // Node.js
	  if (isNode) {
	    notify = function () {
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
	  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise && Promise.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    var promise = Promise.resolve(undefined);
	    notify = function () {
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }
	
	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    } last = task;
	  };
	};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// 25.4.1.5 NewPromiseCapability(C)
	var aFunction = __webpack_require__(18);
	
	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject = aFunction(reject);
	}
	
	module.exports.f = function (C) {
	  return new PromiseCapability(C);
	};


/***/ }),
/* 80 */
/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(15);
	var navigator = global.navigator;
	
	module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(21);
	var isObject = __webpack_require__(22);
	var newPromiseCapability = __webpack_require__(79);
	
	module.exports = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(19);
	module.exports = function (target, src, safe) {
	  for (var key in src) {
	    if (safe && target[key]) target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var global = __webpack_require__(15);
	var core = __webpack_require__(16);
	var dP = __webpack_require__(20);
	var DESCRIPTORS = __webpack_require__(24);
	var SPECIES = __webpack_require__(46)('species');
	
	module.exports = function (KEY) {
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	var ITERATOR = __webpack_require__(46)('iterator');
	var SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	  // eslint-disable-next-line no-throw-literal
	  Array.from(riter, function () { throw 2; });
	} catch (e) { /* empty */ }
	
	module.exports = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-promise-finally
	'use strict';
	var $export = __webpack_require__(14);
	var core = __webpack_require__(16);
	var global = __webpack_require__(15);
	var speciesConstructor = __webpack_require__(75);
	var promiseResolve = __webpack_require__(82);
	
	$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
	  var C = speciesConstructor(this, core.Promise || global.Promise);
	  var isFunction = typeof onFinally == 'function';
	  return this.then(
	    isFunction ? function (x) {
	      return promiseResolve(C, onFinally()).then(function () { return x; });
	    } : onFinally,
	    isFunction ? function (e) {
	      return promiseResolve(C, onFinally()).then(function () { throw e; });
	    } : onFinally
	  );
	} });


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/proposal-promise-try
	var $export = __webpack_require__(14);
	var newPromiseCapability = __webpack_require__(79);
	var perform = __webpack_require__(80);
	
	$export($export.S, 'Promise', { 'try': function (callbackfn) {
	  var promiseCapability = newPromiseCapability.f(this);
	  var result = perform(callbackfn);
	  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
	  return promiseCapability.promise;
	} });


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(89);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(92);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(90), __esModule: true };

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(49);
	__webpack_require__(3);
	module.exports = __webpack_require__(91).f('iterator');


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(46);


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(93), __esModule: true };

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(94);
	__webpack_require__(69);
	__webpack_require__(102);
	__webpack_require__(103);
	module.exports = __webpack_require__(16).Symbol;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global = __webpack_require__(15);
	var has = __webpack_require__(29);
	var DESCRIPTORS = __webpack_require__(24);
	var $export = __webpack_require__(14);
	var redefine = __webpack_require__(30);
	var META = __webpack_require__(95).KEY;
	var $fails = __webpack_require__(25);
	var shared = __webpack_require__(41);
	var setToStringTag = __webpack_require__(45);
	var uid = __webpack_require__(42);
	var wks = __webpack_require__(46);
	var wksExt = __webpack_require__(91);
	var wksDefine = __webpack_require__(96);
	var enumKeys = __webpack_require__(97);
	var isArray = __webpack_require__(98);
	var anObject = __webpack_require__(21);
	var isObject = __webpack_require__(22);
	var toIObject = __webpack_require__(8);
	var toPrimitive = __webpack_require__(27);
	var createDesc = __webpack_require__(28);
	var _create = __webpack_require__(32);
	var gOPNExt = __webpack_require__(99);
	var $GOPD = __webpack_require__(101);
	var $DP = __webpack_require__(20);
	var $keys = __webpack_require__(34);
	var gOPD = $GOPD.f;
	var dP = $DP.f;
	var gOPN = gOPNExt.f;
	var $Symbol = global.Symbol;
	var $JSON = global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE = 'prototype';
	var HIDDEN = wks('_hidden');
	var TO_PRIMITIVE = wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = shared('symbol-registry');
	var AllSymbols = shared('symbols');
	var OPSymbols = shared('op-symbols');
	var ObjectProto = Object[PROTOTYPE];
	var USE_NATIVE = typeof $Symbol == 'function';
	var QObject = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function () {
	  return _create(dP({}, 'a', {
	    get: function () { return dP(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  dP(it, key, D);
	  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if (has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _create(D, { enumerable: createDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = toIObject(it);
	  key = toPrimitive(key, true);
	  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
	  var D = gOPD(it, key);
	  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN(toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto;
	  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto) $set.call(OPSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f = $defineProperty;
	  __webpack_require__(100).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(59).f = $propertyIsEnumerable;
	  __webpack_require__(58).f = $getOwnPropertySymbols;
	
	  if (DESCRIPTORS && !__webpack_require__(13)) {
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function (name) {
	    return wrap(wks(name));
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });
	
	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);
	
	for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
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
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(19)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

	var META = __webpack_require__(42)('meta');
	var isObject = __webpack_require__(22);
	var has = __webpack_require__(29);
	var setDesc = __webpack_require__(20).f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !__webpack_require__(25)(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(15);
	var core = __webpack_require__(16);
	var LIBRARY = __webpack_require__(13);
	var wksExt = __webpack_require__(91);
	var defineProperty = __webpack_require__(20).f;
	module.exports = function (name) {
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(34);
	var gOPS = __webpack_require__(58);
	var pIE = __webpack_require__(59);
	module.exports = function (it) {
	  var result = getKeys(it);
	  var getSymbols = gOPS.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = pIE.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(10);
	module.exports = Array.isArray || function isArray(arg) {
	  return cof(arg) == 'Array';
	};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(8);
	var gOPN = __webpack_require__(100).f;
	var toString = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it) {
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys = __webpack_require__(35);
	var hiddenKeys = __webpack_require__(43).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys(O, hiddenKeys);
	};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

	var pIE = __webpack_require__(59);
	var createDesc = __webpack_require__(28);
	var toIObject = __webpack_require__(8);
	var toPrimitive = __webpack_require__(27);
	var has = __webpack_require__(29);
	var IE8_DOM_DEFINE = __webpack_require__(23);
	var gOPD = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(24) ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
	};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(96)('asyncIterator');


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(96)('observable');


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(60);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(61);
	
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
	      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
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

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign = __webpack_require__(54);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _classCallCheck2 = __webpack_require__(60);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(61);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _Route = __webpack_require__(106);
	
	var _Route2 = _interopRequireDefault(_Route);
	
	var _common = __webpack_require__(66);
	
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

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _keys = __webpack_require__(107);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _promise = __webpack_require__(67);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _getIterator2 = __webpack_require__(1);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _slicedToArray2 = __webpack_require__(111);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _classCallCheck2 = __webpack_require__(60);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(61);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _lodash = __webpack_require__(65);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _UrlMatcher = __webpack_require__(115);
	
	var _UrlMatcher2 = _interopRequireDefault(_UrlMatcher);
	
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
	    var abstract = definition.abstract,
	        controller = definition.controller,
	        name = definition.name,
	        parent = definition.parent,
	        path = definition.path,
	        resolve = definition.resolve,
	        title = definition.title,
	        url = definition.url;
	
	
	    url = url || '';
	
	    if (url) {
	      // @TODO abstract param parsing out from UrlMatcher.
	      // We parse this routes URL before prepending parents so
	      // we only have this route's params.
	      var urlMatcher = new _UrlMatcher2.default(url);
	    }
	
	    this.params = urlMatcher && urlMatcher.params || [];
	
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
	      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	      if (!this.url) {
	        return '';
	      }
	
	      var _url$split = this.url.split('?'),
	          _url$split2 = (0, _slicedToArray3.default)(_url$split, 2),
	          path = _url$split2[0],
	          query = _url$split2[1];
	
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
	     *
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'enter',
	    value: function enter() {
	      var _this = this;
	
	      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	      var promise = getResolve(this.resolve, params);
	
	      return promise.then(function (resolve) {
	        if (_this.Controller) {
	          _this.controller = new _this.Controller(params, resolve);
	        }
	
	        return resolve;
	      });
	    }
	
	    /**
	     * @method exit
	     * @description
	     * Route exits, calling controller.onExit and deleting its reference.
	     *
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'exit',
	    value: function exit() {
	      var _this2 = this;
	
	      var promise = this.controller && this.controller.onExit ? _promise2.default.resolve(this.controller.onExit()) : _promise2.default.resolve();
	
	      return promise.then(function (result) {
	        if (_this2.controller) {
	          _this2.controller = null;
	        }
	
	        return result;
	      });
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

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(108), __esModule: true };

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(109);
	module.exports = __webpack_require__(16).Object.keys;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(48);
	var $keys = __webpack_require__(34);
	
	__webpack_require__(110)('keys', function () {
	  return function keys(it) {
	    return $keys(toObject(it));
	  };
	});


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(14);
	var core = __webpack_require__(16);
	var fails = __webpack_require__(25);
	module.exports = function (KEY, exec) {
	  var fn = (core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
	};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _isIterable2 = __webpack_require__(112);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(1);
	
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

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(113), __esModule: true };

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	__webpack_require__(49);
	module.exports = __webpack_require__(114);


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

	var classof = __webpack_require__(53);
	var ITERATOR = __webpack_require__(46)('iterator');
	var Iterators = __webpack_require__(7);
	module.exports = __webpack_require__(16).isIterable = function (it) {
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    // eslint-disable-next-line no-prototype-builtins
	    || Iterators.hasOwnProperty(classof(O));
	};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getIterator2 = __webpack_require__(1);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _slicedToArray2 = __webpack_require__(111);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _classCallCheck2 = __webpack_require__(60);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(61);
	
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
	
	    var _urlPattern$split = urlPattern.split('?'),
	        _urlPattern$split2 = (0, _slicedToArray3.default)(_urlPattern$split, 2),
	        pathPattern = _urlPattern$split2[0],
	        queryPattern = _urlPattern$split2[1];
	
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
	
	          var _queryPattern = item + '=([\\w-.~:/?#[\\]@!$\'"()*+,:%]+)';
	
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
	          var _step3$value = (0, _slicedToArray3.default)(_step3.value, 2),
	              index = _step3$value[0],
	              param = _step3$value[1];
	
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
	          var _step4$value = (0, _slicedToArray3.default)(_step4.value, 2),
	              index = _step4$value[0],
	              param = _step4$value[1];
	
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

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(60);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(61);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _lodash = __webpack_require__(65);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _Queue = __webpack_require__(117);
	
	var _Queue2 = _interopRequireDefault(_Queue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @name Transition
	 * @description
	 * Manages route transitions
	 */
	
	var Transition = function () {
	
	  /**
	   * @param {Transitions} transitions
	   * @param {Route} current
	   * @param {Route} target
	   * @param {Object} [currentParams]
	   * @param {Object} [toParams]
	   */
	
	  function Transition(transitions, current, target) {
	    var currentParams = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	    var toParams = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
	    (0, _classCallCheck3.default)(this, Transition);
	
	    // If a parent param has changed, we'll need to reload from there
	    var changedParams = _lodash2.default.reduce(currentParams, function (memo, value, key) {
	      if (key in toParams && toParams[key] !== value) {
	        memo[key] = toParams[key];
	      }
	
	      return memo;
	    }, {});
	
	    // @TODO refactor path traversal into PathFactory
	
	    var nearestCommonAncestor = _lodash2.default.findLast(current.path, function (ancestor) {
	      return target.path.indexOf(ancestor) > -1;
	    });
	
	    // We'll need to reload starting from here if a param changed
	    var minStartIndex = target.path.findIndex(function (route, index) {
	      return route.params.some(function (param) {
	        return param in changedParams;
	      });
	    });
	
	    // Determine which node in the entering target's path to start from
	    var enterIndex = function () {
	      var fromAncestor = target.path.indexOf(nearestCommonAncestor) + 1;
	
	      if (current === target && minStartIndex < 0) {
	        return target.path.length - 1;
	      }
	
	      if (minStartIndex < 0 || fromAncestor < minStartIndex) {
	        return fromAncestor;
	      }
	
	      return minStartIndex;
	    }();
	
	    this.enterPath = target.path.slice(enterIndex);
	
	    // Determine last node in the exiting route's path to exit
	    var exitIndex = function () {
	      var enterStart = target.path[enterIndex];
	
	      var changedAncestorIndex = current.path.indexOf(enterStart);
	
	      if (changedAncestorIndex >= 0) {
	        return changedAncestorIndex;
	      }
	
	      return current.path.indexOf(nearestCommonAncestor) + 1;
	    }();
	
	    this.exitPath = current.path.slice(exitIndex).reverse();
	
	    this.onStartQueue = new _Queue2.default(transitions.onStartHandlers.map(function (handler) {
	      return handler.bind(handler, target);
	    }));
	
	    this.exitQueue = new _Queue2.default(this.exitPath.map(function (route) {
	      return route.exit.bind(route);
	    }));
	
	    this.enterQueue = new _Queue2.default(this.enterPath.map(function (route) {
	      return route.enter.bind(route, toParams);
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

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(67);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _classCallCheck2 = __webpack_require__(60);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(61);
	
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
	    var queue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
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

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof2 = __webpack_require__(88);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _classCallCheck2 = __webpack_require__(60);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(61);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _Transition = __webpack_require__(116);
	
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
	
	    this.onErrorHandlers = [];
	    this.onStartHandlers = [];
	    this.onSuccessHandlers = [];
	  }
	
	  (0, _createClass3.default)(Transitions, [{
	    key: 'onError',
	    value: function onError(handler) {
	      if (typeof handler !== 'function') {
	        throw new Error('Handler must be a function, was \'' + (typeof handler === 'undefined' ? 'undefined' : (0, _typeof3.default)(handler)) + '\' instead');
	      }
	
	      this.onErrorHandlers.push(handler);
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
	
	  }, {
	    key: 'onStart',
	    value: function onStart(handler) {
	      if (typeof handler !== 'function') {
	        throw new Error('Handler must be a function, was \'' + (typeof handler === 'undefined' ? 'undefined' : (0, _typeof3.default)(handler)) + '\' instead');
	      }
	
	      this.onStartHandlers.push(handler);
	    }
	  }, {
	    key: 'onSuccess',
	    value: function onSuccess(handler) {
	      if (typeof handler !== 'function') {
	        throw new Error('Handler must be a function, was \'' + (typeof handler === 'undefined' ? 'undefined' : (0, _typeof3.default)(handler)) + '\' instead');
	      }
	
	      this.onSuccessHandlers.push(handler);
	    }
	  }, {
	    key: 'create',
	    value: function create() {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      return new (Function.prototype.bind.apply(_Transition2.default, [null].concat([this], args)))();
	    }
	  }]);
	  return Transitions;
	}();
	
	exports.default = Transitions;

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getIterator2 = __webpack_require__(1);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _classCallCheck2 = __webpack_require__(60);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(61);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _UrlMatcher = __webpack_require__(115);
	
	var _UrlMatcher2 = _interopRequireDefault(_UrlMatcher);
	
	var _lodash = __webpack_require__(65);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _bowser = __webpack_require__(120);
	
	var _bowser2 = _interopRequireDefault(_bowser);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var browser = _bowser2.default.getParser(window.navigator.userAgent);
	
	var UrlRouter = function () {
	  function UrlRouter(prefix) {
	    (0, _classCallCheck3.default)(this, UrlRouter);
	
	    this.prefix = prefix || '#!';
	    this.rules = [];
	    this.default = null;
	
	    // IE <=11 and Edge < 14 don't support popstate on hash URL changes. See
	    // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/3740423/
	    this.usePushState = !!(window.history && window.history.pushState) && !browser.satisfies({ ie: '<=11', edge: '<14' });
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
	
	      window.addEventListener(this.usePushState ? 'popstate' : 'hashchange', function () {
	        return _this.onChange(window.location.hash);
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
	      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var title = arguments[1];
	      var url = arguments[2];
	
	      if (this.usePushState) {
	        window.history.pushState(state, title, url);
	      } else {
	        window.location.hash = url;
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
	      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var title = arguments[1];
	      var url = arguments[2];
	
	      if (this.usePushState) {
	        window.history.replaceState(state, title, url);
	      } else {
	        var href = window.location.href.replace(/(javascript:|#).*$/, '');
	        window.location.replace(href + url);
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

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

	!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.bowser=t():e.bowser=t()}(this,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=86)}({17:function(e,t,r){var n,i,s;i=[t,r(89)],void 0===(s="function"==typeof(n=function(r,n){"use strict";function i(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var s=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return t=e,s=[{key:"getFirstMatch",value:function(e,t){var r=t.match(e);return r&&r.length>0&&r[1]||""}},{key:"getSecondMatch",value:function(e,t){var r=t.match(e);return r&&r.length>1&&r[2]||""}},{key:"matchAndReturnConst",value:function(e,t,r){if(e.test(t))return r}},{key:"getWindowsVersionName",value:function(e){switch(e){case"NT":return"NT";case"XP":return"XP";case"NT 5.0":return"2000";case"NT 5.1":return"XP";case"NT 5.2":return"2003";case"NT 6.0":return"Vista";case"NT 6.1":return"7";case"NT 6.2":return"8";case"NT 6.3":return"8.1";case"NT 10.0":return"10";default:return}}},{key:"getAndroidVersionName",value:function(e){var t=e.split(".").splice(0,2).map(function(e){return parseInt(e,10)||0});if(t.push(0),!(1===t[0]&&t[1]<5))return 1===t[0]&&t[1]<6?"Cupcake":1===t[0]&&t[1]>=6?"Donut":2===t[0]&&t[1]<2?"Eclair":2===t[0]&&2===t[1]?"Froyo":2===t[0]&&t[1]>2?"Gingerbread":3===t[0]?"Honeycomb":4===t[0]&&t[1]<1?"Ice Cream Sandwich":4===t[0]&&t[1]<4?"Jelly Bean":4===t[0]&&t[1]>=4?"KitKat":5===t[0]?"Lollipop":6===t[0]?"Marshmallow":7===t[0]?"Nougat":8===t[0]?"Oreo":void 0}},{key:"getVersionPrecision",value:function(e){return e.split(".").length}},{key:"compareVersions",value:function(t,r){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=e.getVersionPrecision(t),s=e.getVersionPrecision(r),a=Math.max(i,s),o=0,u=e.map([t,r],function(t){var r=a-e.getVersionPrecision(t),n=t+new Array(r+1).join(".0");return e.map(n.split("."),function(e){return new Array(20-e.length).join("0")+e}).reverse()});for(n&&(o=a-Math.min(i,s)),a-=1;a>=o;){if(u[0][a]>u[1][a])return 1;if(u[0][a]===u[1][a]){if(a===o)return 0;a-=1}else if(u[0][a]<u[1][a])return-1}}},{key:"map",value:function(e,t){var r,n=[];if(Array.prototype.map)return Array.prototype.map.call(e,t);for(r=0;r<e.length;r+=1)n.push(t(e[r]));return n}},{key:"getBrowserAlias",value:function(e){return n.BROWSER_ALIASES_MAP[e]}}],(r=null)&&i(t.prototype,r),s&&i(t,s),e;var t,r,s}();r.default=s,e.exports=t.default})?n.apply(t,i):n)||(e.exports=s)},86:function(e,t,r){var n,i,s;i=[t,r(87)],void 0===(s="function"==typeof(n=function(r,n){"use strict";function i(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var s;Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0,n=(s=n)&&s.__esModule?s:{default:s};var a=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return t=e,s=[{key:"getParser",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if("string"!=typeof e)throw new Error("UserAgent should be a string");return new n.default(e,t)}},{key:"parse",value:function(e){return new n.default(e).getResult()}}],(r=null)&&i(t.prototype,r),s&&i(t,s),e;var t,r,s}();r.default=a,e.exports=t.default})?n.apply(t,i):n)||(e.exports=s)},87:function(e,t,r){var n,i,s;i=[t,r(88),r(90),r(91),r(92),r(17)],void 0===(s="function"==typeof(n=function(r,n,i,s,a,o){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0,n=u(n),i=u(i),s=u(s),a=u(a),o=u(o);var f=function(){function e(t){var r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),null==t||""===t)throw new Error("UserAgent parameter can't be empty");this._ua=t,this.parsedResult={},!0!==r&&this.parse()}return t=e,(r=[{key:"getUA",value:function(){return this._ua}},{key:"test",value:function(e){return e.test(this._ua)}},{key:"parseBrowser",value:function(){var e=this;this.parsedResult.browser={};var t=n.default.find(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some(function(t){return e.test(t)});throw new Error("Browser's test function is not valid")});return t&&(this.parsedResult.browser=t.describe(this.getUA())),this.parsedResult.browser}},{key:"getBrowser",value:function(){return this.parsedResult.browser?this.parsedResult.browser:this.parseBrowser()}},{key:"getBrowserName",value:function(e){return e?String(this.getBrowser().name).toLowerCase()||"":this.getBrowser().name||""}},{key:"getBrowserVersion",value:function(){return this.getBrowser().version}},{key:"getOS",value:function(){return this.parsedResult.os?this.parsedResult.os:this.parseOS()}},{key:"parseOS",value:function(){var e=this;this.parsedResult.os={};var t=i.default.find(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some(function(t){return e.test(t)});throw new Error("Browser's test function is not valid")});return t&&(this.parsedResult.os=t.describe(this.getUA())),this.parsedResult.os}},{key:"getOSName",value:function(e){var t=this.getOS(),r=t.name;return e?String(r).toLowerCase()||"":r||""}},{key:"getOSVersion",value:function(){return this.getOS().version}},{key:"getPlatform",value:function(){return this.parsedResult.platform?this.parsedResult.platform:this.parsePlatform()}},{key:"getPlatformType",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=this.getPlatform(),r=t.type;return e?String(r).toLowerCase()||"":r||""}},{key:"parsePlatform",value:function(){var e=this;this.parsedResult.platform={};var t=s.default.find(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some(function(t){return e.test(t)});throw new Error("Browser's test function is not valid")});return t&&(this.parsedResult.platform=t.describe(this.getUA())),this.parsedResult.platform}},{key:"getEngine",value:function(){return this.parsedResult.engine?this.parsedResult.engine:this.parseEngine()}},{key:"getEngineName",value:function(e){return e?String(this.getEngine().name).toLowerCase()||"":this.getEngine().name||""}},{key:"parseEngine",value:function(){var e=this;this.parsedResult.engine={};var t=a.default.find(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some(function(t){return e.test(t)});throw new Error("Browser's test function is not valid")});return t&&(this.parsedResult.engine=t.describe(this.getUA())),this.parsedResult.engine}},{key:"parse",value:function(){return this.parseBrowser(),this.parseOS(),this.parsePlatform(),this.parseEngine(),this}},{key:"getResult",value:function(){return Object.assign({},this.parsedResult)}},{key:"satisfies",value:function(e){var t=this,r={},n=0,i={},s=0,a=Object.keys(e);if(a.forEach(function(t){var a=e[t];"string"==typeof a?(i[t]=a,s+=1):"object"===d(a)&&(r[t]=a,n+=1)}),n>0){var o=Object.keys(r),u=o.find(function(e){return t.isOS(e)});if(u){var c=this.satisfies(r[u]);if(void 0!==c)return c}var f=o.find(function(e){return t.isPlatform(e)});if(f){var l=this.satisfies(r[f]);if(void 0!==l)return l}}if(s>0){var v=Object.keys(i),p=v.find(function(e){return t.isBrowser(e,!0)});if(void 0!==p)return this.compareVersion(i[p])}}},{key:"isBrowser",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=this.getBrowserName(),n=[r.toLowerCase()],i=o.default.getBrowserAlias(r);return t&&void 0!==i&&n.push(i.toLowerCase()),-1!==n.indexOf(e.toLowerCase())}},{key:"compareVersion",value:function(e){var t=[0],r=e,n=!1,i=this.getBrowserVersion();if("string"==typeof i)return">"===e[0]||"<"===e[0]?(r=e.substr(1),"="===e[1]?(n=!0,r=e.substr(2)):t=[],">"===e[0]?t.push(1):t.push(-1)):"="===e[0]?r=e.substr(1):"~"===e[0]&&(n=!0,r=e.substr(1)),t.indexOf(o.default.compareVersions(i,r,n))>-1}},{key:"isOS",value:function(e){return this.getOSName(!0)===String(e).toLowerCase()}},{key:"isPlatform",value:function(e){return this.getPlatformType(!0)===String(e).toLowerCase()}},{key:"isEngine",value:function(e){return this.getEngineName(!0)===String(e).toLowerCase()}},{key:"is",value:function(e){return this.isBrowser(e)||this.isOS(e)||this.isPlatform(e)}},{key:"some",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return t.some(function(t){return e.is(t)})}}])&&c(t.prototype,r),u&&c(t,u),e;var t,r,u}();r.default=f,e.exports=t.default})?n.apply(t,i):n)||(e.exports=s)},88:function(e,t,r){var n,i,s;i=[t,r(17)],void 0===(s="function"==typeof(n=function(r,n){"use strict";var i;Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0,n=(i=n)&&i.__esModule?i:{default:i};var s=/version\/(\d+(\.?_?\d+)+)/i,a=[{test:[/googlebot/i],describe:function(e){var t={name:"Googlebot"},r=n.default.getFirstMatch(/googlebot\/(\d+(\.\d+))/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/opera/i],describe:function(e){var t={name:"Opera"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:opera)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/opr\/|opios/i],describe:function(e){var t={name:"Opera"},r=n.default.getFirstMatch(/(?:opr|opios)[\s\/](\S+)/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/SamsungBrowser/i],describe:function(e){var t={name:"Samsung Internet for Android"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/Whale/i],describe:function(e){var t={name:"NAVER Whale Browser"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:whale)[\s\/](\d+(?:\.\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/MZBrowser/i],describe:function(e){var t={name:"MZ Browser"},r=n.default.getFirstMatch(/(?:MZBrowser)[\s\/](\d+(?:\.\d+)+)/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/focus/i],describe:function(e){var t={name:"Focus"},r=n.default.getFirstMatch(/(?:focus)[\s\/](\d+(?:\.\d+)+)/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/swing/i],describe:function(e){var t={name:"Swing"},r=n.default.getFirstMatch(/(?:swing)[\s\/](\d+(?:\.\d+)+)/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/coast/i],describe:function(e){var t={name:"Opera Coast"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:coast)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/yabrowser/i],describe:function(e){var t={name:"Yandex Browser"},r=n.default.getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.?_?\d+)+)/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/ucbrowser/i],describe:function(e){var t={name:"UC Browser"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:ucbrowser)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/Maxthon|mxios/i],describe:function(e){var t={name:"Maxthon"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:Maxthon|mxios)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/epiphany/i],describe:function(e){var t={name:"Epiphany"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:epiphany)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/puffin/i],describe:function(e){var t={name:"Puffin"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:puffin)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/sleipnir/i],describe:function(e){var t={name:"Sleipnir"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:sleipnir)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/k-meleon/i],describe:function(e){var t={name:"K-Meleon"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/(?:k-meleon)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/micromessenger/i],describe:function(e){var t={name:"WeChat"},r=n.default.getFirstMatch(/(?:micromessenger)[\s\/](\d+(\.?_?\d+)+)/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/msie|trident/i],describe:function(e){var t={name:"Internet Explorer"},r=n.default.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/\sedg\//i],describe:function(e){var t={name:"Microsoft Edge"},r=n.default.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/edg([ea]|ios)/i],describe:function(e){var t={name:"Microsoft Edge"},r=n.default.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/vivaldi/i],describe:function(e){var t={name:"Vivaldi"},r=n.default.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/seamonkey/i],describe:function(e){var t={name:"SeaMonkey"},r=n.default.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/sailfish/i],describe:function(e){var t={name:"Sailfish"},r=n.default.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i,e);return r&&(t.version=r),t}},{test:[/silk/i],describe:function(e){var t={name:"Amazon Silk"},r=n.default.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/phantom/i],describe:function(e){var t={name:"PhantomJS"},r=n.default.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/slimerjs/i],describe:function(e){var t={name:"SlimerJS"},r=n.default.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/blackberry|\bbb\d+/i,/rim\stablet/i],describe:function(e){var t={name:"BlackBerry"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/(web|hpw)[o0]s/i],describe:function(e){var t={name:"WebOS Browser"},r=n.default.getFirstMatch(s,e)||n.default.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/bada/i],describe:function(e){var t={name:"Bada"},r=n.default.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/tizen/i],describe:function(e){var t={name:"Tizen"},r=n.default.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/qupzilla/i],describe:function(e){var t={name:"QupZilla"},r=n.default.getFirstMatch(/(?:qupzilla)[\s\/](\d+(\.?_?\d+)+)/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/firefox|iceweasel|fxios/i],describe:function(e){var t={name:"Firefox"},r=n.default.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s\/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/chromium/i],describe:function(e){var t={name:"Chromium"},r=n.default.getFirstMatch(/(?:chromium)[\s\/](\d+(\.?_?\d+)+)/i,e)||n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/chrome|crios|crmo/i],describe:function(e){var t={name:"Chrome"},r=n.default.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:function(e){var t=!e.test(/like android/i),r=e.test(/android/i);return t&&r},describe:function(e){var t={name:"Android Browser"},r=n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/playstation 4/i],describe:function(e){var t={name:"PlayStation 4"},r=n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/safari|applewebkit/i],describe:function(e){var t={name:"Safari"},r=n.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/.*/i],describe:function(e){return{name:n.default.getFirstMatch(/^(.*)\/(.*) /,e),version:n.default.getSecondMatch(/^(.*)\/(.*) /,e)}}}];r.default=a,e.exports=t.default})?n.apply(t,i):n)||(e.exports=s)},89:function(e,t,r){var n,i,s;i=[],void 0===(s="function"==typeof(n=function(){"use strict";e.exports={BROWSER_ALIASES_MAP:{"Amazon Silk":"amazon_silk","Android Browser":"android",Bada:"bada",BlackBerry:"blackberry",Chrome:"chrome",Chromium:"chromium",Epiphany:"epiphany",Firefox:"firefox",Focus:"focus",Generic:"generic",Googlebot:"googlebot","Internet Explorer":"ie","K-Meleon":"k_meleon",Maxthon:"maxthon","Microsoft Edge":"edge","MZ Browser":"mz","NAVER Whale Browser":"naver",Opera:"opera","Opera Coast":"opera_coast",PhantomJS:"phantomjs",Puffin:"puffin",QupZilla:"qupzilla",Safari:"safari",Sailfish:"sailfish","Samsung Internet for Android":"samsung_internet",SeaMonkey:"seamonkey",Sleipnir:"sleipnir",Swing:"swing",Tizen:"tizen","UC Browser":"uc",Vivaldi:"vivaldi","WebOS Browser":"webos",WeChat:"wechat","Yandex Browser":"yandex"}}})?n.apply(t,i):n)||(e.exports=s)},90:function(e,t,r){var n,i,s;i=[t,r(17)],void 0===(s="function"==typeof(n=function(r,n){"use strict";var i;Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0,n=(i=n)&&i.__esModule?i:{default:i};var s=[{test:[/windows phone/i],describe:function(e){var t=n.default.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i,e);return{name:"Windows Phone",version:t}}},{test:[/windows/i],describe:function(e){var t=n.default.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i,e),r=n.default.getWindowsVersionName(t);return{name:"Windows",version:t,versionName:r}}},{test:[/macintosh/i],describe:function(e){var t=n.default.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i,e).replace(/[_\s]/g,".");return{name:"macOS",version:t}}},{test:[/(ipod|iphone|ipad)/i],describe:function(e){var t=n.default.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i,e).replace(/[_\s]/g,".");return{name:"iOS",version:t}}},{test:function(e){var t=!e.test(/like android/i),r=e.test(/android/i);return t&&r},describe:function(e){var t=n.default.getFirstMatch(/android[\s\/-](\d+(\.\d+)*)/i,e),r=n.default.getAndroidVersionName(t),i={name:"Android",version:t};return r&&(i.versionName=r),i}},{test:[/(web|hpw)[o0]s/i],describe:function(e){var t=n.default.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i,e),r={name:"WebOS"};return t&&t.length&&(r.version=t),r}},{test:[/blackberry|\bbb\d+/i,/rim\stablet/i],describe:function(e){var t=n.default.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i,e)||n.default.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i,e)||n.default.getFirstMatch(/\bbb(\d+)/i,e);return{name:"BlackBerry",version:t}}},{test:[/bada/i],describe:function(e){var t=n.default.getFirstMatch(/bada\/(\d+(\.\d+)*)/i,e);return{name:"Bada",version:t}}},{test:[/tizen/i],describe:function(e){var t=n.default.getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i,e);return{name:"Tizen",version:t}}},{test:[/linux/i],describe:function(){return{name:"Linux"}}},{test:[/CrOS/],describe:function(){return{name:"Chrome OS"}}},{test:[/PlayStation 4/],describe:function(e){var t=n.default.getFirstMatch(/PlayStation 4[\/\s](\d+(\.\d+)*)/i,e);return{name:"PlayStation 4",version:t}}}];r.default=s,e.exports=t.default})?n.apply(t,i):n)||(e.exports=s)},91:function(e,t,r){var n,i,s;i=[t,r(17)],void 0===(s="function"==typeof(n=function(r,n){"use strict";var i;Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0,n=(i=n)&&i.__esModule?i:{default:i};var s={tablet:"tablet",mobile:"mobile",desktop:"desktop",tv:"tv"},a=[{test:[/googlebot/i],describe:function(){return{type:"bot",vendor:"Google"}}},{test:[/huawei/i],describe:function(e){var t=n.default.getFirstMatch(/(can-l01)/i,e)&&"Nova",r={type:s.mobile,vendor:"Huawei"};return t&&(r.model=t),r}},{test:[/nexus\s*(?:7|8|9|10).*/i],describe:function(){return{type:s.tablet,vendor:"Nexus"}}},{test:[/ipad/i],describe:function(){return{type:s.tablet,vendor:"Apple",model:"iPad"}}},{test:[/kftt build/i],describe:function(){return{type:s.tablet,vendor:"Amazon",model:"Kindle Fire HD 7"}}},{test:[/silk/i],describe:function(){return{type:s.tablet,vendor:"Amazon"}}},{test:[/tablet/i],describe:function(){return{type:s.tablet}}},{test:function(e){var t=e.test(/ipod|iphone/i),r=e.test(/like (ipod|iphone)/i);return t&&!r},describe:function(e){var t=n.default.getFirstMatch(/(ipod|iphone)/i,e);return{type:s.mobile,vendor:"Apple",model:t}}},{test:[/nexus\s*[0-6].*/i,/galaxy nexus/i],describe:function(){return{type:s.mobile,vendor:"Nexus"}}},{test:[/[^-]mobi/i],describe:function(){return{type:s.mobile}}},{test:function(e){return"blackberry"===e.getBrowserName(!0)},describe:function(){return{type:s.mobile,vendor:"BlackBerry"}}},{test:function(e){return"bada"===e.getBrowserName(!0)},describe:function(){return{type:s.mobile}}},{test:function(e){return"windows phone"===e.getBrowserName()},describe:function(){return{type:s.mobile,vendor:"Microsoft"}}},{test:function(e){var t=Number(String(e.getOSVersion()).split(".")[0]);return"android"===e.getOSName(!0)&&t>=3},describe:function(){return{type:s.tablet}}},{test:function(e){return"android"===e.getOSName(!0)},describe:function(){return{type:s.mobile}}},{test:function(e){return"macos"===e.getOSName(!0)},describe:function(){return{type:s.desktop,vendor:"Apple"}}},{test:function(e){return"windows"===e.getOSName(!0)},describe:function(){return{type:s.desktop}}},{test:function(e){return"linux"===e.getOSName(!0)},describe:function(){return{type:s.desktop}}},{test:function(e){return"playstation 4"===e.getOSName(!0)},describe:function(){return{type:s.tv}}}];r.default=a,e.exports=t.default})?n.apply(t,i):n)||(e.exports=s)},92:function(e,t,r){var n,i,s;i=[t,r(17)],void 0===(s="function"==typeof(n=function(r,n){"use strict";var i;Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0,n=(i=n)&&i.__esModule?i:{default:i};var s=[{test:function(e){return"microsoft edge"===e.getBrowserName(!0)},describe:function(e){var t=/\sedg\//i.test(e);if(t)return{name:"Blink"};var r=n.default.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i,e);return{name:"EdgeHTML",version:r}}},{test:[/trident/i],describe:function(e){var t={name:"Trident"},r=n.default.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:function(e){return e.test(/presto/i)},describe:function(e){var t={name:"Presto"},r=n.default.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:function(e){var t=e.test(/gecko/i),r=e.test(/like gecko/i);return t&&!r},describe:function(e){var t={name:"Gecko"},r=n.default.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/(apple)?webkit\/537\.36/i],describe:function(){return{name:"Blink"}}},{test:[/(apple)?webkit/i],describe:function(e){var t={name:"WebKit"},r=n.default.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}}];r.default=s,e.exports=t.default})?n.apply(t,i):n)||(e.exports=s)}})});

/***/ })
/******/ ])
});
;
//# sourceMappingURL=trouter.js.map