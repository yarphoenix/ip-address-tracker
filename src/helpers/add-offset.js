import L from 'leaflet';

export function addOffset(map, ratio = 0.15) {
    const offsetY = map.getSize().y * ratio;
    map.panBy(L.point(0, -offsetY), { animate: true });
}