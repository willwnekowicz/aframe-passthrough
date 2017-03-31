/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* global AFRAME */

	if (typeof AFRAME === 'undefined') {
	  throw new Error('Component attempted to register before AFRAME was available.');
	}

	__webpack_require__(1);

	/**
	 * Passthrough component for A-Frame.
	 */
	AFRAME.registerComponent('passthrough', {
	  schema: { },

	  /**
	   * Set if component needs multiple instancing.
	   */
	  multiple: false,

	  /**
	   * Called once when component is attached. Generally for initial setup.
	   */
	  init: function () {
	    var self = this;
	    var setupCanvas = function (videoSourceId) {
	      var video = document.createElement("video");
	      video.setAttribute('id', 'passthroughVideo');
	      video.setAttribute('autoplay', true);
	      video.setAttribute('width', '640');
	      video.setAttribute('height', '480');
	      video.setAttribute('src', '');

	      var assets = document.getElementsByTagName('a-assets')[0];
	      assets.appendChild(video);

	      var passthroughEl = self.el;
	      passthroughEl.setAttribute('src', '#passthroughVideo')

	      var phoneConfig = {
	        video: {
	          optional: [{
	            sourceId: videoSourceId
	          }]
	        }
	      }

	      var mediaConfig = videoSourceId ? phoneConfig : {video: true};
	      var errBack = function(e) {
	        console.log('An error has occurred!', e)
	      };

	      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	        navigator.mediaDevices.getUserMedia(mediaConfig).then(function(stream) {
	          video.src = window.URL.createObjectURL(stream);
	          video.play();
	        });
	      }
	      else if(navigator.getUserMedia) { // Standard
	        navigator.getUserMedia(mediaConfig, function(stream) {
	          video.src = stream;
	          video.play();
	        }, errBack);
	      } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
	        navigator.webkitGetUserMedia(mediaConfig, function(stream){
	          video.src = window.webkitURL.createObjectURL(stream);
	          video.play();
	        }, errBack);
	      } else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
	        navigator.mozGetUserMedia(mediaConfig, function(stream){
	          video.src = window.URL.createObjectURL(stream);
	          video.play();
	        }, errBack);
	      }
	    }

	    var withBackCamera = function (sourceInfos) {
	      var videoSourceId;
	      for (var i = 0; i != sourceInfos.length; ++i) {
	        var sourceInfo = sourceInfos[i];
	        if (sourceInfo.kind == "video" && sourceInfo.facing == "environment") {
	          videoSourceId = sourceInfo.id;
	        }
	      }
	      setupCanvas(videoSourceId);
	    }

	    if(MediaStreamTrack && MediaStreamTrack.getSources) {
	      MediaStreamTrack.getSources(withBackCamera);
	    } else {
	      setupCanvas(null);
	    }

	  }
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	var extendDeep = AFRAME.utils.extendDeep;
	var meshMixin = AFRAME.primitives.getMeshMixin();

	AFRAME.registerPrimitive('a-passthrough', extendDeep({}, meshMixin, {
	  defaultComponents: {
	    passthrough: {},
	    position: "0 0 -20",
	    geometry: {
	      primitive: 'plane'
	    },
	    material: {
	      color: '#FFF',
	      shader: 'flat',
	      side: 'double',
	      transparent: true,
	      width: 16,
	      height: 9
	    }
	  },

	  mappings: {
	    height: 'geometry.height',
	    width: 'geometry.width'
	  }
	}));

/***/ }
/******/ ]);