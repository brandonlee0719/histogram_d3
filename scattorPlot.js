function scatter(color0, color1, valuesWithTopics0, valuesWithTopics1, svg, x, y, height, url, class1, class2) {
  // var color0="#ff7400"
  // var color1="ff7400"

  console.log("class1=============>", class1)
  const data0 = [];
  for (topicKey of Object.keys(valuesWithTopics0)) {
    data0.push({
      key: topicKey,
      value: valuesWithTopics0[topicKey]
    });
  }
  // append the bar rectangles to the svg element
  //console.log(data0)//1. 20 ->55 55 ->90 2 115

  console.log("valuesWithTopics0", valuesWithTopics0);
  svg.selectAll("rect")

    .data(data0)
    .join("rect")

    .attr("id", function (d) { return "data0" + d.key })
    .attr("x", 1)
    .attr("transform", function (d) { d.value; return `translate(${x(d.key) - 20}, ${y(d.value)})` })
    .attr("width", function (d) { return 30 })
    .attr("height", function (d) { return height - y(d.value); })
    .style("fill", color0)




  const data1 = [];
  for (topicKey of Object.keys(valuesWithTopics1)) {
    data1.push({
      key: topicKey,
      value: valuesWithTopics1[topicKey]
    });
  }
  // append the bar rectangles to the svg element
  console.log(data1)//1. 20 ->55 55 ->90 2 115
  svg.selectAll("rect1")
    .data(data1)
    .join("rect")
    .attr("x", 1)

    .attr("id", function (d) { return "data1" + d.key })
    .attr("transform", function (d) { console.log(d.value); return `translate(${x(d.key) + 10}, ${y(d.value)})` })
    .attr("width", function (d) { return 30 })
    .attr("height", function (d) { return height - y(d.value); })
    .style("fill", color1)

  var tooltip2 = d3.select("#div_customContent")
    .append("div")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .html("<p>I'm a tooltip written in HTML</p><img src='https://github.com/holtzy/D3-graph-gallery/blob/master/img/section/ArcSmal.png?raw=true'></img><br>Fancy<br><span style='font-size: 40px;'>Isn't it?</span>");


  var chartData = [
    { name: "Max Value", color: "#af6d00" },
    { name: "Avarage Value", color: "#007f00" },
    { name: "Min Value", color: "#0000a8" },

  ];


  //Initialize legend
  var legendItemSize = 12;
  var legendSpacing = 4;
  var xOffset = 50;
  var yOffset = 0;
  var legend = d3
    .select('#legend')
    .append('svg')
    .attr('style', 'position:absolute')
    .selectAll('.legendItem')
    .data(chartData);

  //Create legend items
  legend
    .enter()
    .append('rect')
    .attr('class', 'legendItem')
    .attr('width', legendItemSize)
    .attr('height', legendItemSize)
    .style('fill', d => d.color)
    .attr('transform',
      (d, i) => {
        var x = xOffset;
        var y = yOffset + (legendItemSize + legendSpacing) * i;
        return `translate(${x}, ${y})`;
      });

  //Create legend labels
  legend
    .enter()
    .append('text')
    .attr('x', xOffset + legendItemSize + 5)
    .attr('y', (d, i) => yOffset + (legendItemSize + legendSpacing) * i + 12)
    .text(d => d.name);



  console.log(data1[0].value)

  var cLass
  function transform(givcals) {
      if (givcals == "0") {
          cLass = "HC"

      }
      if (givcals == "1") {
          cLass = "SZ"

      }
      if (givcals == "2") {
          cLass = "BD"

      }
      return cLass

  }

  d3.select("#data0temporal")

    .on("click", function () { scatterPlot(idscat, url, "temporal", class1); })
    .on("mouseover", function (d) { return tooltip2.style("visibility", "visible"); })
    .on("mousemove", function (d) { return tooltip2.html("class:" + transform(class1) + "<br>Feature:temporal" + "<br>No.of sub Features:2" + "<br>AVG:"+ d.path[0]["__data__"].value).style("top", (event.pageY - 450) + "px").style("left", (event.pageX - 450) + "px"); })
    .on("mouseout", function (d) { return tooltip2.style("visibility", "hidden"); });



  d3.select("#data1temporal")

    .on("click", function () { scatterPlot(idscat, url, "temporal", class2); })
    .on("mouseover", function (d) { return tooltip2.style("visibility", "visible"); })
    .on("mousemove", function (d) { return tooltip2.html("class:" + transform(class2) + "<br>Feature:temporal" + "<br>No.of sub Features:2" + "<br>AVG:"+ d.path[0]["__data__"].value).style("top", (event.pageY - 450) + "px").style("left", (event.pageX - 450) + "px"); })
    .on("mouseout", function (d) { return tooltip2.style("visibility", "hidden"); });

  d3.select("#data0sentiment")

    .on("click", function (d) { scatterPlot(idscat, url, "sentiment", class1); })
    .on("mouseover", function (d) { return tooltip2.style("visibility", "visible"); })
    .on("mousemove", function (d) { return tooltip2.html("class:" + transform(class1) + "<br>Feature:sentiment" + "<br>No.of sub Features:2" + "<br>AVG:"+ d.path[0]["__data__"].value).style("top", (event.pageY - 450) + "px").style("left", (event.pageX - 450) + "px"); })
    .on("mouseout", function (d) { return tooltip2.style("visibility", "hidden"); });

  d3.select("#data1sentiment")

    .on("click", function () { scatterPlot(idscat, url, "sentiment", class2); })
    .on("mouseover", function (d) { return tooltip2.style("visibility", "visible"); })
    .on("mousemove", function (d) { return tooltip2.html("class:" + transform(class2) + "<br>Feature:sentiment" + "<br>No.of sub Features:2" + "<br>AVG:"+ d.path[0]["__data__"].value).style("top", (event.pageY - 450) + "px").style("left", (event.pageX - 450) + "px"); })
    .on("mouseout", function (d) { return tooltip2.style("visibility", "hidden"); });



  d3.select("#data0pysholingustic")

    .on("click", function () { scatterPlot(idscat, url, "pysholingustic", class1); })
    .on("mouseover", function (d) { return tooltip2.style("visibility", "visible"); })
    .on("mousemove", function (d) { return tooltip2.html("class:" + transform(class1) + "<br>Feature:pysholingustic" + "<br>No.of sub Features:9" + "<br>AVG:"+ d.path[0]["__data__"].value).style("top", (event.pageY - 450) + "px").style("left", (event.pageX - 450) + "px"); })
    .on("mouseout", function (d) { return tooltip2.style("visibility", "hidden"); });

  d3.select("#data1pysholingustic")
    .on("click", function () { scatterPlot(idscat, url, "pysholingustic", class2); })
    .on("mouseover", function (d) { return tooltip2.style("visibility", "visible"); })
    .on("mousemove", function (d) { return tooltip2.html("class:" + transform(class2) + "<br>Feature:pysholingustic" + "<br>No.of sub Features:9" + "<br>AVG:"+ d.path[0]["__data__"].value).style("top", (event.pageY - 450) + "px").style("left", (event.pageX - 450) + "px"); })
    .on("mouseout", function (d) { return tooltip2.style("visibility", "hidden"); });



  d3.select("#data0emotion")
    .on("click", function () { scatterPlot(idscat, url, "emotion", class1); })
    .on("mouseover", function (d) { return tooltip2.style("visibility", "visible"); })
    .on("mousemove", function (d) { return tooltip2.html("class:" + transform(class1) + "<br>Feature:emotion" + "<br>No.of sub Features:9" + "<br>AVG:"+ d.path[0]["__data__"].value).style("top", (event.pageY - 450) + "px").style("left", (event.pageX - 450) + "px"); })
    .on("mouseout", function (d) { return tooltip2.style("visibility", "hidden"); });

  d3.select("#data1emotion")
    .on("click", function (d) { scatterPlot(idscat, url, "emotion", class2); })
    .on("mouseover", function (d) { return tooltip2.style("visibility", "visible"); })
    .on("mousemove", function (d) { return tooltip2.html("class:" + transform(class2) + "<br>Feature:emotion" + "<br>No.of sub Features:9" + "<br>AVG:"+ d.path[0]["__data__"].value).style("top", (event.pageY - 450) + "px").style("left", (event.pageX - 450) + "px"); })
    .on("mouseout", function (d) { return tooltip2.style("visibility", "hidden"); });



  d3.select("#data0lexical")
    .on("click", function () { scatterPlot(idscat, url, "lexical", class1); })
    .on("mouseover", function (d) { return tooltip2.style("visibility", "visible"); })
    .on("mousemove", function (d) { return tooltip2.html("class:" + transform(class1) + "<br>Feature:lexical" + "<br>No.of sub Features:9" + "<br>AVG:"+ d.path[0]["__data__"].value).style("top", (event.pageY - 450) + "px").style("left", (event.pageX - 450) + "px"); })
    .on("mouseout", function (d) { return tooltip2.style("visibility", "hidden"); });

  d3.select("#data1lexical")
    .on("click", function () { scatterPlot(idscat, url, "lexical", class2); })
    .on("mouseover", function (d) { return tooltip2.style("visibility", "visible"); })
    .on("mousemove", function (d) { return tooltip2.html("class:" + transform(class2) + "<br>Feature:lexical" + "<br>No.of sub Features:9" + "<br>AVG:"+ d.path[0]["__data__"].value).style("top", (event.pageY - 450) + "px").style("left", (event.pageX - 450) + "px"); })
    .on("mouseout", function (d) { return tooltip2.style("visibility", "hidden"); });




}