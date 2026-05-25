import L from 'leaflet';
import blackIconUrl from '../../images/icon-location-black.svg';
import whiteIconUrl from '../../images/icon-location-white.svg';

const ICON_OPTIONS = {
    iconSize: [50, 60],
    iconAnchor: [25, 60],
};

const icons = {
    light: L.icon({ iconUrl: blackIconUrl, ...ICON_OPTIONS }),
    dark:  L.icon({ iconUrl: whiteIconUrl, ...ICON_OPTIONS }),
};

export function getMarkerIcon(theme = 'light') {
    return icons[theme] ?? icons.light;
}
