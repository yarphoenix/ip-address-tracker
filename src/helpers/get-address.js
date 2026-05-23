export async function getAddress(ip) {
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_OWAjS9tuchu5YTdUfd9EUGPsH28jb&ipAddress=${ip}`;
    const response = await fetch(url);
    return await response.json();
}