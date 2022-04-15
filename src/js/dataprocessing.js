(function () {
  dataProcessing = {};

  //read a file and render vis
  dataProcessing.readFileSetupView = function (fileKey) {
    window.GLOBALDATA.currentFile = fileKey;
    let fileName = window.GLOBALDATA.files[fileKey]["fileName"];
    let isHierarchy = window.GLOBALDATA.files[fileKey]["isHierarchy"];
    //If input data is already in hierarchy then parse as is
    if (isHierarchy) {
      d3.json("../assets/data/" + fileName).then((data) => {
        window.GLOBALDATA.files[fileKey]["data"] = data;
        renderingControl.visUpdate();
      });
    } else {
      //group by the hierarchy provided
      let hierarchyOrder = window.GLOBALDATA.files[fileKey]["hierarchy"];
      let values = window.GLOBALDATA.files[fileKey]["values"];
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
      // console.log(...hierarchy.map((a) => ))
      d3.json("../assets/data/" + fileName).then((data) => {
        var obj = {
          name: "superstore",
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
        renderingControl.visUpdate();
      });
    }
  };
})();
