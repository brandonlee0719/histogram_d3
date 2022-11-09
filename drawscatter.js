
function scatterPlot(id,url,givenTopic,givenclass) {
    const titles = {    
        "temporal":["mean_time","max_time"],
        "sentiment":["positive","negative"],
        "pysholingustic":["WC","Clout","Tone","WPS","Dic","Analytic","Authentic","Linguistic","label"],
        "emotion":["sadness","fear","anger","disgust","anticipation","joy","surprise","trust","label"],
        "lexical":["i","we","you","shehe","they","ipron","det","article","label"]};

    var checkboxesHtml="<select name=\"features\" id=\"features\" onchange=\"callcontin('"+id+"','"+url+"','"+givenTopic+"','"+givenclass+"',this)\"><option value=\"\" checked>Plese select</option>"
    for(feature of titles[givenTopic]){
        checkboxesHtml+="<option value=\""+feature+"\">"+feature+"</option>"
    }
    checkboxesHtml+="</select>"
    document.querySelector(id).innerHTML=checkboxesHtml
}

function callcontin(id,url,givenTopic,givenclass,givenfeature){
    console.log(givenfeature.value,givenfeature)
    document.querySelector(id).innerHTML="<div id='legend'></div>"
    const title = [givenfeature.value]
    console.log("helloscatter")
    

    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 40 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select(id)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
        `translate(${margin.left},${margin.top})`);

        

    // get the data
    d3.csv(url).then(function (data) {
        console.log(data);

        const valuesWithFeatures0 = {}

        
        
    for (dataIterate of data) {

        if(dataIterate.label==givenclass){

                //feature==  max_time,mean_time 
            for(featurekey of title){
                const feattureValue=dataIterate[featurekey]
                if(valuesWithFeatures0[featurekey]){
                    //varsa değeri
                    valuesWithFeatures0[featurekey].push(feattureValue)

                }
                else{
                    //yoksa değeri
                    valuesWithFeatures0[featurekey]=[feattureValue]
                }
                
            }

        }


    }
    var cLass
    function transform(givcals){
        if(givcals=="0"){
            cLass="BD"

        }
        if(givcals=="1"){
            cLass="SZ"

        }
        if(givcals=="2"){
            cLass="HC"

        }
        return cLass

    }
    
    //console.log(valuesWithFeatures0);//max and minin ortalamsını verir.
    for (valuesIndex in valuesWithFeatures0) {
    const avg = valuesWithFeatures0[valuesIndex].reduce((a,b) => parseInt(a)+parseInt(b), 0) / valuesWithFeatures0[valuesIndex].length;
    const min = Math.min(...valuesWithFeatures0[valuesIndex])
    const max=Math.max(...valuesWithFeatures0[valuesIndex])
    valuesWithFeatures0[valuesIndex] = {"avg": avg, "min": min, "max": max};
    }
    //console.log(valuesWithFeatures0)
    //console.log(valuesWithTopics);

    const values = Object.values(valuesWithFeatures0);
    const max = values.reduce((a, b) => Math.max(a, b.min, b.max, b.avg), 0);
    const min = values.reduce((a, b) => Math.min(a, b.min, b.max, b.avg), 0);

    console.log(values, min, max);
    // X axis: scale and draw:
    const x = d3.scaleBand()
    .range([0, width])
    .domain(title)     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
    .padding(1);
    svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

    // Y axis: scale and draw:
    const y = d3.scaleLinear()
    .range([height, 0]);
    y.domain([min == 0 ? min - (max-min)*1/10 : min-min*1/10, max+max*1/5]);   // d3.hist has to be called before the Y axis obviously
    svg.append("g")
    .call(d3.axisLeft(y));
    //console.log(valuesWithFeatures0);
const data1 = [];
    for (topicKey of Object.keys(valuesWithFeatures0)) {
    data1.push({
        key: topicKey,
        value: valuesWithFeatures0[topicKey]
        
    });
    }
    // append the bar rectangles to the svg element
    console.log(data1)//1. 20 ->55 55 ->90 2 115
    const selection=svg.selectAll("whatever")
        .data(data1)
        .enter();

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

    //circle ekliyor ve renklendiriyor
    var selectionelement
    selection.append("circle")
    
    .on("mouseover", function(d){ return tooltip2.style("visibility", "visible");})
    .on("mousemove", function(d){return (tooltip2.html("class:"+transform(givenclass)+"<br>Feature:"+d.path[0]["__data__"].key+"<br>min value:"+d.path[0]["__data__"].value.min)).style("top", (event.pageY-150)+"px").style("left",(event.pageX-150)+"px");})
    .on("mouseout", function(d){return tooltip2.style("visibility", "hidden");})

    .attr("cx", function(d){ return x(d.key) })
    .attr("cy", function(d){ return y(d.value.min) })
    .attr("r", 15)
    .style("fill", "blue")

    selection.append("circle")
    //selectionelement="class:"+transform(givenclass)+"\n max value:"+d.path[0]["__data__"].value.max+"\n min value:"+d.path[0]["__data__"].value.min+"\n avg value:"+d.path[0]["__data__"].value.avg
    .on("mouseover", function(d){ return tooltip2.style("visibility", "visible");})
    .on("mousemove", function(d){ return (tooltip2.html("class:"+transform(givenclass)+"<br>Feature:"+ d.path[0]["__data__"].key+"<br>max value:"+d.path[0]["__data__"].value.max)).style("top", (event.pageY-150)+"px").style("left",(event.pageX-150)+"px");})
    .on("mouseout", function(d){return tooltip2.style("visibility", "hidden");})

    .attr("cx", function(d){ return x(d.key) })
    .attr("cy", function(d){console.log(d.value.max); return y(d.value.max) })
    .attr("r", 15)
    .style("fill", "red")

    selection.append("circle")
    .on("mouseover", function(d){ return tooltip2.style("visibility", "visible");})
    .on("mousemove", function(d){return (tooltip2.html("class:"+transform(givenclass)+"<br>Feature:"+d.path[0]["__data__"].key+"<br>avg value:"+d.path[0]["__data__"].value.avg)).style("top", (event.pageY-150)+"px").style("left",(event.pageX-150)+"px");})
    .on("mouseout", function(d){return tooltip2.style("visibility", "hidden");})

    .attr("cx", function(d){ return x(d.key) })
    .attr("cy", function(d){ console.log(d.value.avg); return y(parseInt(d.value.avg)) })
    .attr("r", 15)
    .style("fill", "green")
    //console.log(data1[1].value.min)
    
    
    var chartData = [
        {name: "Max Value", color: "#af6d00"},
        {name: "Avarage Value", color: "#007f00"},
        {name: "Min Value", color: "#0000a8"},
   
       ];


     //Initialize legend
    var legendItemSize = 12;
    var legendSpacing = 4;
    var xOffset = 50;
    var yOffset = 0;
    var legend = d3
    .select('#legend')
    .append('svg')
        .attr('style', 'position:absolute;z-index:-9999999;')
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

    });
}

