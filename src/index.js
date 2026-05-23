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

const mapArea = document.querySelector('#map');
const map = L.map(mapArea, {
    center: [-27.46794, 153.02809],
    zoom: 12,
    zoomControl: false,
})

AddTileLayer(map);

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleEnter);

function getData() {
    const ip = ipInput.value;
    
    if (!validateIp(ip)) {
        alert('Invalid IP address');
    }
    
    getAddress(ip).then(setMapView);
}

function handleEnter(e) {
    if (e.key === 'Enter') {
        getData();
    }
}

function setMapView(mapData) {
    const { country, region, city, timezone } = mapData.location;
    const { lat, lng } = mapData.location;

    map.setView([lat, lng], 13);
    ipInfo.textContent = mapData.ip;
    locationInfo.textContent = `${country}, ${region}, ${city}`;
    timezoneInfo.textContent = `${timezone}`;
    ispInfo.textContent = `${mapData.isp}`;

    L.marker([lat, lng], { icon: myIcon }).addTo(map);
    matchMedia('(max-media: 1024px)').matches && addOffset(map);
}
