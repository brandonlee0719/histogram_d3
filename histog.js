function gethistogram(titles, color0, color1, class1, class2, idhist, idscat, url) {



  // set the dimensions and margins of the graph
  const margin = { top: 10, right: 30, bottom: 30, left: 40 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  document.querySelector(idhist).innerHTML = "<div id='histogramLegend'></div>"
  // append the svg object to the body of the page
  const svg = d3.select(idhist)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      `translate(${margin.left},${margin.top})`);

  // get the data
  d3.csv(url).then(function (data) {
    console.log(data);

    // sum up the features under topics
    const valuesWithTopics0 = {};//HZ
    const valuesWithTopics1 = {};//SZ
    const valuesWithTopics2 = {};//BP
    for (dataIterate of data) {
      if (dataIterate.label == "0") {


        for (dataFeatureKey of Object.keys(dataIterate)) {
          const dataFeatureValue = dataIterate[dataFeatureKey];
          //console.log(dataFeatureKey, dataFeatureValue)

          const topics = Object.keys(titles);
          for (topic of topics) {
            // console.log(topic)
            if (titles[topic].includes(dataFeatureKey)) {
              if (valuesWithTopics0[topic]) {
                valuesWithTopics0[topic].push(dataFeatureValue);
              } else {
                valuesWithTopics0[topic] = [dataFeatureValue]
              }
            }
          }
        }

      }
      if (dataIterate.label == "1") {


        for (dataFeatureKey of Object.keys(dataIterate)) {
          const dataFeatureValue = dataIterate[dataFeatureKey];
          //console.log(dataFeatureKey, dataFeatureValue)

          const topics = Object.keys(titles);
          for (topic of topics) {
            // console.log(topic)
            if (titles[topic].includes(dataFeatureKey)) {
              if (valuesWithTopics1[topic]) {
                valuesWithTopics1[topic].push(dataFeatureValue);
              } else {
                valuesWithTopics1[topic] = [dataFeatureValue]
              }
            }
          }
        }

      }
      if (dataIterate.label == "2") {


        for (dataFeatureKey of Object.keys(dataIterate)) {
          const dataFeatureValue = dataIterate[dataFeatureKey];
          //console.log(dataFeatureKey, dataFeatureValue)
          //console.log(Object.keys(titles))
          const topics = Object.keys(titles);
          for (topic of topics) {
            // console.log(topic)
            if (titles[topic].includes(dataFeatureKey)) {
              if (valuesWithTopics2[topic]) {
                valuesWithTopics2[topic].push(dataFeatureValue);
              } else {
                valuesWithTopics2[topic] = [dataFeatureValue]
              }
            }
          }
        }

      }

    }






    console.log(valuesWithTopics0, valuesWithTopics1, valuesWithTopics2);//max and minin ortalamsını verir.

    // get avg-max-min-sağlıklı insan-
    for (valuesIndex in valuesWithTopics0) {
      const avg = valuesWithTopics0[valuesIndex].reduce((a, b) => parseInt(a) + parseInt(b), 0) / valuesWithTopics0[valuesIndex].length;
      const min = Math.min(...valuesWithTopics0[valuesIndex])
      const max = Math.max(...valuesWithTopics0[valuesIndex])
      valuesWithTopics0[valuesIndex] = avg;
    }

    for (valuesIndex in valuesWithTopics1) {
      const avg = valuesWithTopics1[valuesIndex].reduce((a, b) => parseInt(a) + parseInt(b), 0) / valuesWithTopics1[valuesIndex].length;
      const min = Math.min(...valuesWithTopics1[valuesIndex])
      const max = Math.max(...valuesWithTopics1[valuesIndex])
      valuesWithTopics1[valuesIndex] = avg;
    }

    for (valuesIndex in valuesWithTopics2) {
      const avg = valuesWithTopics2[valuesIndex].reduce((a, b) => parseInt(a) + parseInt(b), 0) / valuesWithTopics2[valuesIndex].length;
      const min = Math.min(...valuesWithTopics2[valuesIndex])
      const max = Math.max(...valuesWithTopics2[valuesIndex])
      valuesWithTopics2[valuesIndex] = avg;
    }

    //console.log(valuesWithTopics);

    const values = Object.values(valuesWithTopics0);
    const max = values.reduce((a, b) => Math.max(a, b), 0);
    const min = values.reduce((a, b) => Math.min(a, b), 0);

    // X axis: scale and draw:
    const x = d3.scaleBand()
      .range([0, width])

      .domain(Object.keys(titles))     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .padding(0.5);
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Y axis: scale and draw:
    const y = d3.scaleLinear()
      .range([height, 0]);
    y.domain([min - min * 1 / 10, max + max * 1 / 10]);   // d3.hist has to be called before the Y axis obviously
    svg.append("g")
      .call(d3.axisLeft(y));

    console.log("class1>>>>>>>>>>>>", class1);


    scatter(color0, color1, eval("valuesWithTopics" + class1), eval("valuesWithTopics" + class2), svg, x, y, height, url, class1, class2)

    console.log(valuesWithTopics0)
    console.log(valuesWithTopics1)
    console.log(valuesWithTopics2)
    console.log(eval("valuesWithTopics" + class1), class1)
    console.log(eval("valuesWithTopics" + class2), class2)


    var histogramChartData = [];
    if (class1 === 2 || class2 === 2) {
      histogramChartData.push({ name: "Bipolar Disorder", color: "#af6d00" })
    }
    if (class1 === 1 || class2 === 1) {
      histogramChartData.push({ name: "Schizophrenic", color: "green" })
    }
    if (class1 === 0 || class2 === 0) {
      histogramChartData.push({ name: "Healthy Controls", color: "blue" })
    }


    //Initialize legend
    var legendItemSize = 12;
    var legendSpacing = 4;
    var xOffset = 350;
    var yOffset = 0;
    var legend = d3
      .select('#histogramLegend')
      .append('svg')
      .attr('style', 'position:absolute;z-index:9999999;width:550;top:-50;')
      .selectAll('.legendItem')
      .data(histogramChartData);

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

  });
}