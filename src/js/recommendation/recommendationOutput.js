(function () {
//This is just the class, the variables will be populated based on a function
recommendation = {};
class Recommendation {
    visOrder;
    widgets;
    interaction;

    constructor(visOrder,widgets,interaction)
    {
        this.visOrder = visOrder;
        this.widgets = widgets;
        this.interaction = interaction;
    }
}

recommendation.createRecommendation = function()
{
    let tempRec1 = {
        nodelink: {
          fileName: "NL.png",
          label: "Node-Link Diagram",
          relativePath: "treeimg/",
        },
        layered: {
          fileName: "LD.png",
          label: "Layered Diagram",
          relativePath: "treeimg/",
        },
        enclosure: {
          fileName: "ED.png",
          label: "Enclosure Diagram",
          relativePath: "treeimg/",
        },
        indented: {
          fileName: "IL.png",
          label: "Indented List",
          relativePath: "treeimg/",
        },
        radialNL: {
          fileName: "RNL.png",
          label: "Radial Node-Link Diagram",
          relativePath: "treeimg/",
        },
        radialED: {
          fileName: "RED.png",
          label: "Radial Enclosure Diagram",
          relativePath: "treeimg/",
        },
        radialLD: {
          fileName: "RLD.png",
          label: "Radial Layered Diagram",
          relativePath: "treeimg/",
        },
        Dendro: {
          fileName: "dendro.png",
          label: "Dendrogram",
          relativePath: "treeimg/",
        }
    }
    let tempRec2 = {
        layered: {
          fileName: "LD.png",
          label: "Layered Diagram",
          relativePath: "treeimg/",
        },
        enclosure: {
          fileName: "ED.png",
          label: "Enclosure Diagram",
          relativePath: "treeimg/",
        },
        nodelink: {
            fileName: "NL.png",
            label: "Node-Link Diagram",
            relativePath: "treeimg/",
          },
        indented: {
          fileName: "IL.png",
          label: "Indented List",
          relativePath: "treeimg/",
        },
        radialNL: {
          fileName: "RNL.png",
          label: "Radial Node-Link Diagram",
          relativePath: "treeimg/",
        },
        radialED: {
          fileName: "RED.png",
          label: "Radial Enclosure Diagram",
          relativePath: "treeimg/",
        },
        radialLD: {
          fileName: "RLD.png",
          label: "Radial Layered Diagram",
          relativePath: "treeimg/",
        },
        Dendro: {
          fileName: "dendro.png",
          label: "Dendrogram",
          relativePath: "treeimg/",
        }
    }
    let isNodeValTaskSelected = window.GLOBALDATA.tasks.selectedTasks.indexOf("quantitative_value") !== -1 ? true:false;
    let visOrder = isNodeValTaskSelected ? tempRec2 : tempRec1;
    if(isNodeValTaskSelected)
    {
        window.GLOBALDATA.currentVis = "layered";

    }
    else{
        window.GLOBALDATA.currentVis = "nodelink";

    }
    let recommendationFinal = new Recommendation(visOrder,[],[])
    renderingControl.visUpdate(recommendationFinal);

}



}())