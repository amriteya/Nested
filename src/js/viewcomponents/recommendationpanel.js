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
    $("#" + divId).remove();
  };

  //This is temporary recommendation output panel
  //This panel should be mapped to the recommendation object
  recPanelUI.recommendationInformation = function () {
    recPanelUI.clearVisOutput("recInformationPanel");
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

    // //Adding a container for visualization
    // $("#recPanelBody").append(`<div class="visOutputElement" id='visOutput'> </div>`);

    //Events
    $(".recInformationItemContainer").click(function () {
      var elemId = $(this).attr("id");
      recPanelUI.visualizationNavBar();
      recPanelUI.renderRecommendation(elemId);
      $(".recInformationItemContainer.selectedItem").toggleClass(
        "selectedItem"
      );
      $(this).toggleClass("selectedItem");
    });
  };

  //Navigation bar for visualization
  recPanelUI.visualizationNavBar = function () {
    recPanelUI.clearVisOutput("visNavBar");
    $("#recPanelBody").append(
      `<div class="visOutputNavContainer" id='visNavBar'> 
        <div class="visNavBarItem" id="fileName">
        <span class=""> ${
          window.GLOBALDATA.files[window.GLOBALDATA.currentFile]["label"]
        } </span>
        </div>
        <div class="visNavBarItem" id="searchInput">
            <div class="input-group rounded">
            <input id="searchBox" type="search" class="form-control rounded" placeholder="Search Node" aria-label="Search" aria-describedby="search-addon" />
            <span class="input-group-text border-0" id="search-addon">
                <i class="fas fa-search"></i>
            </span>
            </div>
          </div>  
          <div class="visNavBarItem" id="visSetting">
          <span class=""> <i class="btn fas fa-cog" title="Configure the visualization"></i> <i class="btn fas fa-file-export" title="Export the visualization"></i> </span>
         </div>
      </div>`
    );

    //Event
    $("#searchBox").on("change", function () {
      dendrogram.searchLabelInteraction($(this).val());
    });
  };

  //Params: recommendation: Object that is returned by recommendation system.
  recPanelUI.renderRecommendation = function (recommendation) {
    recPanelUI.clearVisOutput("visOutput");
    var data = window.GLOBALDATA.data["data"];
    var attr = window.GLOBALDATA.data["nodeSizeMappingAttribute"];
    //Check if selected attr is different than "Degree"
    if(attr!=="Degree")
    {

    }


    //Adding a container for visualization
    $("#recPanelBody").append(
      `<div class="visOutputElement" id='visOutput'> </div>`
    );
    let chart;
    if (recommendation === "nodelink") {
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
      chart = icicle.createIcicle(data, {
        label: (d) => d.name,
        title: (d, n) =>
          `${n
            .ancestors()
            .reverse()
            .map((d) => d.data.name)
            .join(".")}`, // hover text
        value: (d) => d["value"],
        width: 1152,
        height: 1000,
      });
    }
    if (recommendation === "enclosure") {
      chart = treemap.createTreeamap(data, {
        label: (d) => d.name,
        group: (d) => d.name.split(".")[1], // e.g., "animate" in "flare.animate.Easing"; for color
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
      chart = indentedList.createIndentedList(data, {});
    }
    $("#visOutput").append(chart);
  };
})();
