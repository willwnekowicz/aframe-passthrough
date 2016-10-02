/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

require('./a-passthrough.js');

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

    if(MediaStreamTrack) {
      MediaStreamTrack.getSources(withBackCamera);
    } else {
      setupCanvas(null);
    }

  }
});
