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

// An identity to implement d3.projection methods
const d3Identity = d3.geoIdentity();

// This method sets the projection's scale to fit the object in the center of the given size.
const d3Projection = d3Identity
    .fitSize([canvas.w, canvas.h], geoData["apartment"]);

// Pass the projection to the generator
const d3Path = d3.geoPath(d3Projection);

// Create the SVG element
const svgContainer = d3
    .select("#svg_container")
    .append("svg")
    .attr("viewBox", `0 0 ${CANVAS.w} ${CANVAS.h}`)
    .classed("floormap", true)

// Create 3 g elements based on the keys of the "objects"
const groups = svgContainer
    .selectAll("g")
    .data(arrOfKeys)
    .enter()
    .append("g")
    .attr("class", (d)=>d)

// Create all paths for the separate g element
const assets = groups
    .selectAll("path")
    .data(d=> geoData[d]?.features)
    .enter()
    .append("path")
    .attr("d", d3Path)
