var GLOBALDATA = {
  panelWidth: {
    dataPanel: 12.5,
    taskPanel: 42.5,
    recommendationPanel: 45,
  },
  files: {
    flare: {
      fileName: "flare.json",
      label: "Flare",
      isVal: true,
      values:["Value"],
      isHierarchy: true,
      additionalAttr: false,
      data: [],
    },
    royalFamily: {
      fileName: "british_royal_family.json",
      label: "British Royal Family",
      isVal: false,
      isHierarchy: true,
      additionalAttr: true,
      data: [],
    },
    superstore: {
        fileName: "superstoreFlorida.json",
        label: "Superstore",
        isVal: true,
        values:["Sales","Quantity","Profit"],
        isHierarchy: false,
        hierarchy:["Segment","Category","Sub-Category"],
        additionalAttr: true,
        data: [],
    }
  },
  visContainer: {
    width: 600,
    height: 600,
  },
  currentFile: "",
  imgMap: {
    tree: {
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
      hybrid: {
        fileName: "HD.png",
        label: "Hybrid Diagram",
        relativePath: "treeimg/",
      },
      symbolic: {
        fileName: "SD.png",
        label: "Symbolic Diagram",
        relativePath: "treeimg/",
      },
    },
  },
};
