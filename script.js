const svg = d3.select("#map");
const width = 600;
const height = 400;

// Cargar el archivo TopoJSON
d3.json("map.json").then(function(data) {
  // Convertir TopoJSON a GeoJSON
  const rooms = topojson.feature(data, data.objects.rooms);

  const projection = d3.geoIdentity().fitSize([width, height], rooms);
  const path = d3.geoPath().projection(projection);

  svg.selectAll("path")
    .data(rooms.features)
    .enter()
    .append("path")
    .attr("class", "room")
    .attr("d", path)
    .on("click", function(event, d) {
      alert("Diste click en: " + d.properties.name);
      // Para redirigir a otra página:
      // window.location.href = d.properties.link;
    });
});
