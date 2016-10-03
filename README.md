## aframe-passthrough

Shows webcam or phone camera video feed inside an [A-Frame](https://aframe.io) Web-VR environment.

Demo: [https://flysonic10.github.io/aframe-passthrough/](https://flysonic10.github.io/aframe-passthrough/)

### Installation

Requires Aframe >= 0.3.0

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.3.0/aframe.min.js"></script>
  <script src="https://rawgit.com/flysonic10/aframe-passthrough/master/dist/aframe-passthrough-component.min.js"></script>
</head>

<body>
  <a-scene>
    <a-assets></a-assets>
    <a-passthrough width="16" height="9"></a-passthrough>
  </a-scene>
</body>
```

#### npm

Install via npm:

```bash
npm install aframe-passthrough-component
```

Then register and use.

```js
require('aframe');
require('aframe-passthrough-component');
```

### Notes   
The passthrough component will show the camera feed from a webcam when viewed on a desktop, and will attempt to use the back-facing camera when viewed on a mobile device.

### Roadmap  
Cool additions would be:

- Camera selector: to select between front and back facing cameras on mobile
- Mirror attribute: to flip the view to mirrored