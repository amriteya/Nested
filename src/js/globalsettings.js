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
      values:[],
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
    },
    upload: {
        fileName: "",
        label: "",
        isVal: true,
        values:["Value"],
        isHierarchy: true,
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
    task:{
        categorical_value: {
            fileName: "categorical_value.png",
            label: "Node Label",
            relativePath: "taskimg/",
            definition: "The textual label of a node in the tree."
        },
        quantitative_value: {
            fileName: "quantitative_value.png",
            label: "Node Value",
            relativePath: "taskimg/",
            definition: "The quantitative value of a node."

        },
        size: {
            fileName: "size.png",
            label: "Tree Size",
            relativePath: "taskimg/",
            definition: "The size of a tree is the count of all the nodes in a tree."
        },
        degree: {
            fileName: "degree.png",
            label: "Node Degree",
            relativePath: "taskimg/",
            definition: "The degree of node is the count of immediate child nodes."

        },
        ancestors: {
            fileName: "ancestors.png",
            label: "Node Ancestors",
            relativePath: "taskimg/",
            definition:"All possible parent/ancestor nodes of a given node."
        },
        descendants: {
            fileName: "descendants.png",
            label: "Node Descendants",
            relativePath: "taskimg/",
            definition:"All possible parent/ancestor nodes of a given node."
        },
        height: {
            fileName: "height.png",
            label: "Tree Height",
            relativePath: "taskimg/",
            definition:"The height of a tree is the length of the longest path from the root."
        },
        balance: {
            fileName: "balanced.png",
            label: "Tree Balance",
            relativePath: "taskimg/",
            definition:"A tree is height-balanced if the depth of any two leaf nodes differs by at most 1."
        },
        path: {
            fileName: "length.png",
            label: "Path",
            relativePath: "taskimg/",
            definition:"Find all the nodes from the root of the tree to a given node."
        },
        depth:{
            fileName: "depth.png",
            label: "Depth",
            relativePath: "taskimg/",
            definition:"The depth of a node is the distance of the node from the root of the tree."
        },
        sibling:{
            fileName: "sibling.png",
            label: "Siblings",
            relativePath: "taskimg/",
            definition:"Nodes that have the same parent are known as siblings."
        },
        order:{
            fileName: "ordertree.png",
            label: "Order",
            relativePath: "taskimg/",
            definition:"An ordered tree is a rooted tree in which each node's children are assigned a fixed ordering."

        }
    }
  },
};
