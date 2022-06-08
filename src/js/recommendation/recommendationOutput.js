(function () {
//This is just the class, the variables will be populated based on a function
recommendation = {};
class Recommendation {
    visOrder;
    widgets;
    interaction;

    constructor(visOrder,widgets,interaction,tooltip, visSetting)
    {
        this.visOrder = visOrder;
        this.widgets = widgets;
        this.interaction = interaction;
        this.tooltip = tooltip;
        this.visSetting = visSetting;
    }
}

recommendation.createRecommendation = function()
{
    let tempRec1 = {
        nodelink: {
          fileName: "NL.png",
          label: "Node-Link Plot",
          relativePath: "treeimg/",
          score:0.8
        },
        icicle: {
          fileName: "LD.png",
          label: "Icile Plot",
          relativePath: "treeimg/",
          score:0.7
        },
        treemap: {
          fileName: "ED.png",
          label: "Treemap",
          relativePath: "treeimg/",
          score:0.6
        },
        indented: {
          fileName: "IL.png",
          label: "Indented List",
          relativePath: "treeimg/",
          score:0.5
        },
        radialNL: {
          fileName: "RNL.png",
          label: "Radial Node-Link",
          relativePath: "treeimg/",
          score:0.4
        },
        radialED: {
          fileName: "RED.png",
          label: "Nested Bubble Chart",
          relativePath: "treeimg/",
          score:0.4
        },
        radialLD: {
          fileName: "RLD.png",
          label: "Sunburst Chart",
          relativePath: "treeimg/",
          score:0.4
        },
        // Dendro: {
        //   fileName: "dendro.png",
        //   label: "Dendrogram",
        //   relativePath: "treeimg/",
        //   score:0.4
        // }
    }
    let visOrder = tempRec1;
    window.GLOBALDATA.currentVis = "nodelink"; // Should be the top item of of visorder
    let recommendationFinal = new Recommendation(visOrder,["search"],window.GLOBALDATA.highlightSelectInteraction, window.GLOBALDATA.tooltipFields, window.GLOBALDATA.visSettings)
    renderingControl.visUpdate(recommendationFinal);
}
}())