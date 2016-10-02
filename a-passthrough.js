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