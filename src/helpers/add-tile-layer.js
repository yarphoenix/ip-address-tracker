import L from "leaflet";

const ATTRIBUTION =
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

export function buildTileUrl(theme = 'light') {
    const variant = theme === 'dark' ? 'dark_all' : 'light_all';
    return `https://{s}.basemaps.cartocdn.com/${variant}/{z}/{x}/{y}{r}.png`;
}

export function AddTileLayer(map, theme = 'light', maxZoom = 19) {
    return L.tileLayer(buildTileUrl(theme), {
        maxZoom,
        subdomains: 'abcd',
        attribution: ATTRIBUTION,
    }).addTo(map);
}
