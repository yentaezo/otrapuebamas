import "./lib/d3.v7.js";
import "./lib/topojson-client.js";

const CANVAS = {
    w: 1000,
    h: 1000
};

const data = await d3
    .json(`./one_bedroom.json`)
    .catch(e => console.error(e.name));

// Create an empty object for storing data
const geoData = {};

// Get the array of ["apartment", "areas", "entrances"]
const arrOfKeys = Object.keys(topoData.objects);

// Loop through arrOfKeys and create a key for geoData to store the geojson info for that key
arrOfKeys.forEach(key => {
    geoData[key] = topojson.feature(topoData, key);
})