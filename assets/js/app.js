var svgWidth=640;
var svgHeight=480;
var margin = {top:20, right:40, bottom:60, left:100};
var width = svgWidth-margin.left-margin.right;
var height = svgHeight-margin.top-margin.bottom;

var svg = d3.select("body").append("svg").attr("width", svgWidth).attr("height", svgHeight);
var chart = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv('./assets/data/data.csv').then(function (povertyData){
povertyData.forEach(data => {data.poverty = parseInt(data.poverty)
data.healthcare = parseInt(data.healthcare)})
var xLinearScale = d3.scaleLinear().domain([8, d3.max(povertyData, d => d.poverty)]).range([0, width])
var xAxis = d3.axisBottom(xLinearScale)
chart.append("g").attr("transform", `translate(0, ${height})`).call(xAxis)
var yLinearScale = d3.scaleLinear().domain([0, d3.max(povertyData, d => d.healthcare)]).range([height, 0])
var yAxis = d3.axisLeft(yLinearScale)
chart.append("g").call(yAxis)
var circleGroup = chart.selectAll("circle").data(povertyData).enter().append("circle")
  .attr("cx", d => xLinearScale(d.poverty)).attr("cy", d => yLinearScale(d.healthcare))
  .attr("r", "10").classed("stateCircle", true)
chart.selectAll(".stateText").data(povertyData).enter().append("text").classed("stateText", true)
  .attr('x', d => xLinearScale(d.poverty)).attr('y', d => yLinearScale(d.healthcare))
  .attr('dy', 3).attr('font-size', '10px').text(function(d){return d.abbr})
chart.append("text").attr("transform", "rotate(-90)").attr("y", 0 - margin.left + 50)
  .attr("x", 0 - (height / 1.75)).attr("dy", "1em").attr("class", "axisText").classed("aText", true)
  .text("Lacks Healthcare %");
chart.append("text").attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
  .attr("class", "axisText").classed("aText", true).text("In Poverty %")
});