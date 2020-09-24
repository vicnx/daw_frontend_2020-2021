/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/controlers/stopball.js":
/*!***********************************!*\
  !*** ./js/controlers/stopball.js ***!
  \***********************************/
/*! exports provided: stopball */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"stopball\", function() { return stopball; });\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main.js */ \"./js/main.js\");\n\n'use strict'\nfunction stopball(stateApp=false,interval){\n    document.body.onkeyup = function(e){\n        if(e.keyCode == 32){\n            if (stateApp==\"run\"){\n                stateApp=\"stop\";\n                clearInterval(interval);\n            }else{            \n                Object(_main_js__WEBPACK_IMPORTED_MODULE_0__[\"start\"])();\n            }\n        }\n    }\n}\n\n// export { stopball }; \n\n\n//# sourceURL=webpack:///./js/controlers/stopball.js?");

/***/ }),

/***/ "./js/core/core.js":
/*!*************************!*\
  !*** ./js/core/core.js ***!
  \*************************/
/*! exports provided: docReady */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"docReady\", function() { return docReady; });\n\nfunction docReady(fn) {\n    // see if DOM is already available\n    if (document.readyState === \"complete\" || document.readyState === \"interactive\") {\n        // call on next available tick\n        fn();\n        //setTimeout(fn, 1);\n    } else {\n        document.addEventListener(\"DOMContentLoaded\", fn);\n    }\n}   \n// export { docReady }; \n\n//# sourceURL=webpack:///./js/core/core.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! exports provided: start */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"start\", function() { return start; });\n/* harmony import */ var _core_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/core.js */ \"./js/core/core.js\");\n/* harmony import */ var _controlers_stopball_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controlers/stopball.js */ \"./js/controlers/stopball.js\");\n// let myApp\n\n\n\n\nlet inicia = function(el,incX,incY) {\n    let dw=function danceWorld(){\n    \n        let x =  el.style.left?parseInt(el.style.left,10):350;\n        let y =  el.style.top?parseInt(el.style.top,10):400;\n\n        el.style.left =  x + incX +\"px\";\n        el.style.top = y + incY+\"px\";\n    \n        //Detect if we reach X coordinates limits\n        if (((x+incX) > (window.innerWidth-40)) || ((x+incX)<=0))\n            incX = (-1)*incX;\n       \n        //Detect if we reach Y coordinates limits\n        if (((y+incY) > (window.innerHeight-40)) || ((y+incY) <= 0))\n            incY = (-1)*incY;\n    }\n    return dw;    \n};\n\n\n\nfunction start(){\n    let speed = 15; //1 to 100\n    let incX = speed * (Math.round(Math.random())?1:-1);\n    let incY = speed * (Math.round(Math.random())?1:-1);\n    let myApp=setInterval(inicia(document.getElementById(\"ball\"),incX,incY),50);\n    Object(_controlers_stopball_js__WEBPACK_IMPORTED_MODULE_1__[\"stopball\"])(\"run\",myApp);\n}\nObject(_core_core_js__WEBPACK_IMPORTED_MODULE_0__[\"docReady\"])(start);\n\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ })

/******/ });