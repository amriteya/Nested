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
    let tempRec2 = {
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
    let isNodeValTaskSelected = window.GLOBALDATA.tasks.selectedTasks.indexOf("quantitative_value") !== -1 ? true:false;
    let isNodeAttribute = window.GLOBALDATA.data.nodeSizeMappingAttribute !== 'Degree' ? true:false;
    let visOrder = isNodeValTaskSelected || isNodeAttribute  ? tempRec2 : tempRec1;

    if(isNodeValTaskSelected || isNodeAttribute)
    {
        window.GLOBALDATA.currentVis = "icicle";

    }
    else{
        window.GLOBALDATA.currentVis = "nodelink";
    }
    let recommendationFinal = new Recommendation(visOrder,[],[])
    renderingControl.visUpdate(recommendationFinal);
}
}())