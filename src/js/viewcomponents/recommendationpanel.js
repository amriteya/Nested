(function () {
  recPanelUI = {};

  recPanelUI.header = function () {
    var recPanel = $(`<div id="recPanelBody"> </div>`);
    $("#recommendationPanel")
      .width(window.GLOBALDATA.panelWidth.recommendationPanel + "%")
      .append(recPanel);
    $("#recPanelBody").append(
      `<div class="panelHeader p-1 bg-light text-dark"> Recommendation </div>`
    );
  };

  recPanelUI.renderRecommendation = function () {
    var data = window.GLOBALDATA.files[window.GLOBALDATA.currentFile]["data"];
    $("#recPanelBody").append("<div id='visOutput'> </div>");
    dendrogram.clear("visOutput");
    let chart = dendrogram.createDendrogram(data, {
      label: (d) => d.name,
      title: (d, n) =>
        `${n
          .ancestors()
          .reverse()
          .map((d) => d.data.name)
          .join(".")}`, // hover text
      width: 1152,
    });
    $("#visOutput").append(chart);
  };

  //This is temporary recommendation output panel
  //This panel should be mapped to the recommendation object
  recPanelUI.recommendationInformation = function () {
    let treeImageMap = window.GLOBALDATA.imgMap.tree;
    let recommendationInformationPanel = $(
      `<div id="recInformationPanel"> </div>`
    );
    $("#recPanelBody").append(recommendationInformationPanel);
    $("#recInformationPanel").append(
      `<div class="recInformationTitleText"> <span> Encoding </span> </div>`
    );

    for (imgKey in treeImageMap) {
      let fileLoc =
        "../../assets/" +
        treeImageMap[imgKey]["relativePath"] +
        treeImageMap[imgKey]["fileName"];
      var imgContainer = $(
        `<div class="recInformationItemContainer ${imgKey==="nodelink"? "selectedItem":""}" id=${imgKey}> 
            <img class="imgView" src=${fileLoc}> </img> 
            <br>
            <p class="recTreeImgLabel"> ${treeImageMap[imgKey]["label"]} </p>
        </div>`
      );
      $("#recInformationPanel").append(imgContainer);
    }
  };
})();
