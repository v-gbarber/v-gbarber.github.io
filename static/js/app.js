function init() {
    //dropdown
    var select = d3.select("#selDataset");
    //Get sample names
    d3.json("samples.json").then(data=> {
        var sampleNames = data.names;
        console.log(data);

        sampleNames.forEach((element) => {
            select.append("option").text(element).property("value", element); 
        });
       
        buildPanel(sampleNames[0]);
        buildCharts(sampleNames[0]);
        


    });


}
//Display the sample metadata, i.e., an individual's demographic information
function buildPanel(sample) {
    d3.json("samples.json").then(data=> {
        var sampleMetadata = data.metadata;
        console.log(sampleMetadata);
        //filter id to match user id
        var metaArray = sampleMetadata.filter(x => x.id == sample);
        var result = metaArray[0];
        var PANEL = d3.select("#sample-metadata");
        PANEL.html("");
        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h5").text(`${key}: ${value}`)

        });
    });

}

function buildCharts(sampleid) {
    d3.json("samples.json").then(data => {
        var sampleSamples = data.samples;
        // console.log(sampleSamples);
        var sampleArray = sampleSamples.filter(sample => sample.id == sampleid);
        console.log(sampleArray);
        //selectFirstElement from filtered sample
        var result = sampleArray[0];
        // Use otu_ids as the labels for the bar chart.
        // const [otu_ids, otu_labels, sample_values] = [result.otu_ids.slice(0,10) .map((i) => "OTU" + i.toString()).reverse(),
        //     result.otu_labels.slice(0,10).reverse(),
        //     result.sample_values.slice(0,10).reverse(),
        
        // ];
        otuids1 = result.otu_ids
        sv1 = result.sample_values
        ol1 = result.otu_labels
        console.log(otuids1)
        otuids = result.otu_ids.map(i => `OTU ${i}`);
        otuLabels=result.otu_labels;
        sampleValues=result.sample_values;

        // var y = sampleArray.map(row => row.otu_ids);
        // var y1 = []

        // for(i=0; i<y[0].length; i++) {
        //     y1.push(`OTU ${y[0][i]}`);
        // }

        // Use otu_labels as the hovertext for the chart.
        // Use sample_values as the values for the bar chart.
        // Use otu_ids for the x values.
    



        // var x =sampleArray.map (row => (row.sample_values));
        // var content =sampleArray.map(row => (row.otu_labels));

    
// //Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
        let trace1 = {
             x: sampleValues.slice(0,10).reverse(),
             y: otuids.slice(0,10).reverse(),
            text: otuLabels.slice(0,10).reverse(),
            type:"bar",
            orientation:"h"
        };

        var info = [trace1];

        let layout = {
            title: "10 OTU",
            height: 500,
            width: 500
        };
        Plotly.newPlot("bar", info, layout);
        var trace2 = {
            x:otuids1,
            y:sv1,
            text:ol1,
            mode: "markers",
            marker: {
                color:otuids1,
                size:sv1,
            }

        };

        var bubbles = [trace2];

        var layout2 = {
            title:"chart",
            xaxis: {title: "OTU ID" }
            // color:
        };
        Plotly.newPlot("bubble", bubbles, layout2);
    });
 // Create a bubble chart that displays each sample.
       
    
    };

function optionChanged(newSelection) {
    buildPanel(newSelection);
    buildCharts(newSelection);

}

init();
