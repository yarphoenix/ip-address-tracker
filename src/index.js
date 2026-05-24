import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
    validateIp,
    AddTileLayer,
    getAddress,
    addOffset,
} from './helpers'
import icon from '../images/icon-location.svg';

const myIcon = L.icon({
    iconUrl: icon,
    iconSize: [50, 60],
    iconAnchor: [25, 60],
});

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

const preloader = document.querySelector('#preloader');

const mapArea = document.querySelector('#map');
const map = L.map(mapArea, {
    center: [-27.46794, 153.02809],
    zoom: 12,
    zoomControl: false,
})

const tileLayer = AddTileLayer(map);

showPreloader();
waitForTiles().then(hidePreloader);

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleEnter);

function showPreloader() {
    preloader.classList.remove('is-hidden');
}

function hidePreloader() {
    preloader.classList.add('is-hidden');
}

// Fallback timeout covers the case when setView keeps the same viewport
// and no new tiles need to load — the `load` event would never fire then.
function waitForTiles(timeoutMs = 4000) {
    return new Promise((resolve) => {
        let done = false;
        const finish = () => {
            if (done) return;
            done = true;
            tileLayer.off('load', finish);
            resolve();
        };
        tileLayer.once('load', finish);
        setTimeout(finish, timeoutMs);
    });
}

function getData() {
    const ip = ipInput.value;

    if (!validateIp(ip)) {
        alert('Invalid IP address');
        return;
    }

    showPreloader();

    getAddress(ip)
        .then(setMapView)
        .then(() => waitForTiles())
        .then(hidePreloader)
        .catch((err) => {
            console.error(err);
            hidePreloader();
            alert('Failed to fetch IP data');
        });
}

function handleEnter(e) {
    if (e.key === 'Enter') {
        getData();
    }
}

let currentMarker = null;

function setMapView(mapData) {
    const { country, region, city, timezone } = mapData.location;
    const { lat, lng } = mapData.location;

    console.log(mapData);

    map.setView([lat, lng], 13);

    if (currentMarker) currentMarker.remove();
    currentMarker = L.marker([lat, lng], { icon: myIcon }).addTo(map);

    ipInfo.textContent = mapData.ip;
    locationInfo.textContent = `${country}, ${region}, ${city}`;
    timezoneInfo.textContent = `${timezone}`;
    ispInfo.textContent = `${mapData.isp}` || 'Unknown';

    if (matchMedia('(max-width: 1024px)').matches) {
        addOffset(map);
    }
}
