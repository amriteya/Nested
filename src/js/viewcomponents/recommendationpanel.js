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

  recPanelUI.clearVisOutput = function (divId) {
    $("#" + divId).empty();
  };

  //Params: recommendation: Object that is returned by recommendation system.
  recPanelUI.renderRecommendation = function (recommendation) {
    var data = window.GLOBALDATA.files[window.GLOBALDATA.currentFile]["data"];
    let chart;
    if (recommendation === "nodelink") {
      recPanelUI.clearVisOutput("visOutput");
      chart = dendrogram.createDendrogram(data, {
        label: (d) => d.name,
        title: (d, n) =>
          `${n
            .ancestors()
            .reverse()
            .map((d) => d.data.name)
            .join(".")}`, // hover text
        width: 1152,
      });
    }
    if (recommendation === "layered") {
      recPanelUI.clearVisOutput("visOutput");
      chart = icicle.createIcicle(data, {
        label: (d) => d.name,
        title: (d, n) =>
          `${n
            .ancestors()
            .reverse()
            .map((d) => d.data.name)
            .join(".")}`, // hover text
        width: 1152,
        height: 1000,
      });
    }
    if (recommendation === "enclosure") {
        recPanelUI.clearVisOutput("visOutput");
        chart = treemap.createTreeamap(data, {
            label: (d) => d.name,
            group: d => d.name.split(".")[1], // e.g., "animate" in "flare.animate.Easing"; for color
            title: (d, n) =>
              `${n
                .ancestors()
                .reverse()
                .map((d) => d.data.name)
                .join(".")}`, // hover text
            width: 1152,
            height: 1152,
          });

    }
    if (recommendation === "indented") {
        recPanelUI.clearVisOutput("visOutput");
        chart = indentedList.createIndentedList(data,{});
    }
    $("#visOutput").append(chart);
  };

  //This is temporary recommendation output panel
  //This panel should be mapped to the recommendation object
  recPanelUI.recommendationInformation = function () {
    // Views
    let treeImageMap = window.GLOBALDATA.imgMap.tree;
    let recommendationInformationPanel = $(
      `<div id="recInformationPanel"> </div>`
    );
    $("#recPanelBody").append(recommendationInformationPanel);
    $("#recInformationPanel").append(
      `<div class="recInformationTitleText"> <span class="headerText"> Encoding </span> </div>`
    );

    for (imgKey in treeImageMap) {
      let fileLoc =
        "../../assets/" +
        treeImageMap[imgKey]["relativePath"] +
        treeImageMap[imgKey]["fileName"];
      var imgContainer = $(
        `<div class="recInformationItemContainer ${
          imgKey === "nodelink" ? "selectedItem" : ""
        }" id=${imgKey}> 
            <img class="imgView" src=${fileLoc}> </img> 
            <br>
            <p class="recTreeImgLabel"> ${treeImageMap[imgKey]["label"]} </p>
            <p class="recTreeImgLabel"> Score:0.8 </p>
        </div>`
      );
      $("#recInformationPanel").append(imgContainer);
    }

    //Adding a container for visualization
    $("#recPanelBody").append("<div id='visOutput'> </div>");

    //Events
    $(".recInformationItemContainer").click(function () {
      var elemId = $(this).attr("id");
      recPanelUI.renderRecommendation(elemId);
      $(".recInformationItemContainer.selectedItem").toggleClass("selectedItem");
      $(this).toggleClass("selectedItem");
    });
  };
})();
