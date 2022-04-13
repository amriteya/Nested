var GLOBALDATA = {
  panelWidth: {
    dataPanel: 10,
    taskPanel: 45,
    recommendationPanel: 45,
  },
  files: {
    flare: {
      fileName: "flare.json",
      label: "Flare",
      isVal: true,
      additionalAttr: false,
      data:[]
    },
    royalFamily: {
      fileName: "british_royal_family.json",
      label: "British Royal Family",
      isVal: false,
      additionalAttr: true,
      data:[]
    },
  },
  visContainer:{
      width:600,
      height:600
  },
  currentFile:"",
  imgMap:{
      tree:{
          enclosure:{fileName:"ED.png",relativePath:"treeimg/"},
          hybrid:{fileName:"HD.png",relativePath:"treeimg/"},
          indented:{fileName:"IL.png",relativePath:"treeimg/"},
          layered:{fileName:"LD.png",relativePath:"treeimg/"},
          nodelink:{fileName:"NL.png",relativePath:"treeimg/"},
          symbolic:{fileName:"SD.png",relativePath:"treeimg/"},
      }
  }
};
