import { easeOut, linear } from 'ol/easing'

export function rotateMap (map, rotation, duration = 350) {
  map.getView().animate({
    rotation,
    duration,
    easing: easeOut
  })
}

export function zoomDelta (map, delta, duration, easing = linear) {
  const newDuration = typeof duration === 'number' ? duration : 350
  const newEasing = typeof duration === 'function' ? duration : easing
  const view = map.getView()
  const currentResolution = view.getResolution()

  if (currentResolution && typeof view.animate === 'function') {
    view.animate({
      zoom: view.getZoom() + delta,
      duration: newDuration,
      easing: newEasing
    })
  }
}
