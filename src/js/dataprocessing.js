(function () {
  dataProcessing = {};

  class DataSummary {
    size;
    leaves;
    maxDegree;
    minDegree;
    height;
    hierarchy;

    constructor(size, leaves, maxDegree, minDegree, height, hierarchy) {
      this.size = size;
      this.leaves = leaves;
      this.maxDegree = maxDegree;
      this.minDegree = minDegree;
      this.height = height;
      this.hierarchy = hierarchy;
    }
  }

  //read a file and render vis
  dataProcessing.readFileSetupView = function (fileKey) {
    window.GLOBALDATA.currentFile = fileKey;
    let fileName = window.GLOBALDATA.files[fileKey]["fileName"];
    let isHierarchy = window.GLOBALDATA.files[fileKey]["isHierarchy"];
    //If input data is already in hierarchy then parse as is

    d3.json("../assets/data/" + fileName).then((data) => {
      if (isHierarchy) {
        window.GLOBALDATA.files[fileKey]["data"] = data;
        createDataObject(data);
        renderingControl.visUpdate();
      } else {
        let hierarchyOrder = window.GLOBALDATA.files[fileKey]["hierarchy"];
        let values = window.GLOBALDATA.files[fileKey]["values"];
        var obj = {
          name: "Superstore",
          children: mapToObject(
            d3.rollup(
              data,
              (v) => {
                return {
                  value: {
                    ...values.map((val) => {
                      let tempObj = {};
                      tempObj[val] = d3.sum(v, (d) => d[val]);
                      return tempObj;
                    }),
                  },
                };
              },
              ...hierarchyOrder.map((a) => (d) => d[a])
            )
          ),
        };
        window.GLOBALDATA.files[fileKey]["data"] = obj;
        createDataObject(obj);
        renderingControl.visUpdate();
      }
    });
  };

  const mapToObject = (map = new Map()) =>
    Array.from(map.entries(), ([k, v]) => {
      if (v instanceof Map) {
        return {
          name: k,
          children: v instanceof Map ? mapToObject(v) : v,
        };
      } else {
        return {
          name: k,
          value: Object.keys(v["value"])
            .map((val) => (v[val] = v["value"][val]))
            .reduce((current, next) => {
              return { ...current, ...next };
            }, {}),
        };
      }
    });

  createDataObject = function (data) {
    //console.log(data);
    var root = d3.hierarchy(data);
    let height = root.height;
    let size = root.descendants().length;
    let leafNodes = root.leaves().length;

    let maxDegree = -1;
    let maxDegreeNodeLabel = "";
    root.each((d, i) => {
      if (d.children !== undefined) {
        if (d.children.length > maxDegree) {
          maxDegree = d.children.length;
          maxDegreeNodeLabel = d.data.name;
        }
      }
    });

    let minDegree = 1000;
    let minDegreeNodeLabel = "";
    root.each((d, i) => {
      if (d.children !== undefined) {
        if (d.children.length < minDegree) {
          minDegree = d.children.length;
          minDegreeNodeLabel = d.data.name;
        }
      }
    });

    var dataObj = new DataSummary(
      size,
      leafNodes,
      { maxDegree, maxDegreeNodeLabel },
      { minDegree, minDegreeNodeLabel },
      height,
      root
    );
    window.GLOBALDATA.dataSummary = dataObj;
  };
})();
