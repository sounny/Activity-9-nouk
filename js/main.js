// Begin script when window loads
window.onload = setMap;

// Set up choropleth map
function setMap() {
    // Use Promise.all to parallelize asynchronous data loading
    var promises = [
        d3.csv("data/CountyData.csv"), // Load CSV data
        d3.json("data/tx_counties.topojson") // Load TopoJSON data
    ];

    // Call `callback` once data is loaded
    Promise.all(promises)
        .then(callback)
        .catch(function (error) {
            console.error("Error loading data: ", error);
        });
}

// Define callback function to process and visualize data
function callback(data) {
    var csvData = data[0]; // CountyData.csv
    var topojsonData = data[1]; // tx_counties.topojson

    // Set dimensions for the map
    var width = 960,
        height = 600;

    // Create an SVG element to hold the map
    var svg = d3.select("#map-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Convert TopoJSON to GeoJSON
    var counties = topojson.feature(topojsonData, topojsonData.objects.tx_counties).features;

    // Define a projection and path generator
    var projection = d3.geoAlbersUsa()
        .fitSize([width, height], topojson.feature(topojsonData, topojsonData.objects.tx_counties));

    var path = d3.geoPath().projection(projection);
    // Create a graticule and add it to the map
    var graticule = d3.geoGraticule();

    svg.append("path")
        .datum(graticule)
        .attr("class", "graticule") // Apply the graticule class from CSS
        .attr("d", path)
        .style("fill", "none")
        .style("stroke", "#ccc")
        .style("stroke-width", 0.5);

    // Define a color scale for the choropleth
    var colorScale = d3.scaleQuantize()
        .domain([0, d3.max(csvData, d => +d.MedianHomePrice)]) // Replace `MedianHomePrice` with the column name from your CSV
        .range(d3.schemeBlues[9]);

    // Join CSV data to GeoJSON based on county name
    counties.forEach(function (county) {
        var countyName = county.properties.COUNTY; // COUNTY property from TopoJSON
        var csvEntry = csvData.find(row => row.COUNTY === countyName); // COUNTY column from CSV
        county.properties.MedianHomePrice = csvEntry ? +csvEntry.MedianHomePrice : 0; // Replace `MedianHomePrice` with your column name in CSV
    });

    // Draw counties on the map
    svg.selectAll(".county")
        .data(counties)
        .enter()
        .append("path")
        .attr("class", "county")
        .attr("d", path)
        .style("fill", d => colorScale(d.properties.MedianHomePrice) || "#ccc") // Default fill color for missing data
        .style("stroke", "#fff");

    // Add a title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .style("font-size", "24px")
        .style("font-weight", "bold")
        .text("Texas County Choropleth Map");
}
