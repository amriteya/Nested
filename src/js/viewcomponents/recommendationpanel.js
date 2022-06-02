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
  //To make a scrollable div https://jsfiddle.net/ydchauh/1ck7fhuq/2/
  recPanelUI.recommendationInformation = function (recommendation) {
    recPanelUI.clearVisOutput("recInformationPanel");
    // Views
    //let treeImageMap = window.GLOBALDATA.imgMap.tree;
    let treeImageMap = recommendation.visOrder;
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
          imgKey === window.GLOBALDATA.currentVis ? "selectedItem" : ""
        }" id=${imgKey}> 
            <img class="imgView" src=${fileLoc}> </img> 
            <br>
            <p class="recTreeImgLabel"> ${treeImageMap[imgKey]["label"]} </p>
            <p class="recTreeImgLabel"> Score:${
              treeImageMap[imgKey]["score"]
            } </p>
        </div>
        `
      );
      $("#recInformationPanel").append(imgContainer);
    }

    // //Adding a container for visualization
    // $("#recPanelBody").append(`<div class="visOutputElement" id='visOutput'> </div>`);

    //Events
    $(".recInformationItemContainer").click(function () {
      var elemId = $(this).attr("id");
      window.GLOBALDATA.currentVis = elemId;
      recPanelUI.visualizationNavBar();
      recPanelUI.visualizationSettingsBar();
      recPanelUI.renderRecommendation();
      $(".recInformationItemContainer.selectedItem").toggleClass(
        "selectedItem"
      );
      $(this).toggleClass("selectedItem");
    });
  };

  //Navigation bar for visualization
  recPanelUI.visualizationNavBar = function (recommendation) {
    recPanelUI.clearVisOutput("visNavBar");
    let tasks = window.GLOBALDATA.tasks.selectedTasks;

    $("#recPanelBody").append(
      `
      <div class="visOutputNavContainer">
      <div  id='visNavBar'> 
        <div class="visNavBarItem" id="fileName">
        <span class="headerText"> ${
          window.GLOBALDATA.files[window.GLOBALDATA.currentFile]["label"]
        } </span>
        </div>
          <div class="visNavBarItem" id="visSetting">
          <span class="settingsIcon"> <i class="btn fas fa-cog" title="Configure the visualization"></i> </span>
         </div>
         <br/>
      </div>
      ${recPanelUI.visualizationSettingsBar(recommendation)}
      </div>
      `
      //<i class="btn fas fa-file-export" title="Export the visualization"></i>
    );

    //Event
    $("#searchBox").on("change", function () {
      dendrogram.searchLabelInteraction($(this).val());
    });
    $("#visSetting").on("click", function () {
      $(this).toggleClass("underline");
      $(".visSettingsPanel").toggle("slow");
    });

    //Event handler for checkbox
    $(".interactionCheckbox").on("change", function () {
      values = [];
      $("#interactionOption input[type='checkbox']:checked").each(
        (_, { value }) => {
          values.push(value);
        }
      );
      console.log(values);
    });


  };

  //Settings Panel
  recPanelUI.visualizationSettingsBar = function (recommendation) {
    let interactionCheckBoxOptions = recommendation.interaction.map((val) => {
      return `<div class="form-check-inline">
              <label class="form-check-label">
                <input type="checkbox" class="form-check-input interactionCheckbox" value=${
                  val.label
                } ${val.active ? "checked" : ""}> ${val.label}
              </label>
              </div>`;
    });
    let checkBoxHTML = interactionCheckBoxOptions.join("");

    let tooltipCheckBoxOptions = recommendation.tooltip.map((val) => {
      return `<div class="form-check-inline">
              <label class="form-check-label">
                <input type="checkbox" class="form-check-input interactionCheckbox" value=${
                  val.label
                } ${val.active ? "checked" : ""}> ${val.label}
              </label>
              </div>`;
    });
    let tooltipcheckBoxHTML = tooltipCheckBoxOptions.join("");

    return `
    <div class="visSettingsPanel visNavBarItem">
          <div id="interactionOption" class="visSettingElement form-group">
            <label class="bold">Highlight: </label>
             ${checkBoxHTML}
          </div>
          <div id="tooltipOption" class="visSettingElement form-group">
          <label class="bold">Tooltip: </label>
           ${tooltipcheckBoxHTML}
        </div>
      </div>`;
  };

  recPanelUI.createWidgets = function (tasks) {
    if (tasks.length !== 0) {
      for (val of tasks) {
        let widget;
        let query = window.GLOBALDATA.tasks.selectedQuery;
        if (window.GLOBALDATA.taskPropertyMap[val][query].widgets.length > 0) {
          let widgets = window.GLOBALDATA.taskPropertyMap[val][query].widgets;
          for (widget of widgets) {
            if (widget === "search") {
              return `
                    <div class="input-group rounded">
                    <input id="searchBox" type="search" class="form-control rounded" placeholder="Search Node" aria-label="Search" aria-describedby="search-addon" />
                    <span class="input-group-text border-0" id="search-addon">
                        <i class="fas fa-search"></i>
                    </span>
                    </div>`;
            }
            if (widget === "range") {
              let div = `<div id="sliderContainer">
                    <span>
                    <label for="amount">Degree:</label>
                    <input type="text" id="amount" readonly style="border:0; color:#f6931f; font-weight:bold;">
                    </span>
                    <div id="slider-range"></div>
                    </div>`;
              $(function () {
                $("#slider-range").slider({
                  range: true,
                  min: 0,
                  max: 32,
                  values: [0, 32],
                  slide: function (event, ui) {
                    $("#amount").val(ui.values[0] + " - " + ui.values[1]);
                  },
                });
                $("#amount").val(
                  $("#slider-range").slider("values", 0) +
                    " - " +
                    $("#slider-range").slider("values", 1)
                );
              });
              return div;
            }
          }
        } else {
          return ``;
        }
      }
    } else {
      return ``;
    }
  };

  recPanelUI.renderWidgets = function(){
    $("#recPanelBody").append(
      ` <div class="col-4" id="widgetContainer">
          ${widgetRangeFilter.createRangeFilter()}
        </div>`  
    );
    widgetRangeFilter.setupRangeFilter();
  }

  //Params: recommendation: Object that is returned by recommendation system.
  recPanelUI.renderRecommendation = function () {
    recPanelUI.clearVisOutput("visOutput");
    let recommendation =
      window.GLOBALDATA.currentVis === ""
        ? "nodelink"
        : window.GLOBALDATA.currentVis;
    var data = window.GLOBALDATA.data["data"];
    var attr = window.GLOBALDATA.data["nodeSizeMappingAttribute"];
    let defaultAttr = true;
    //Check if selected attr is different than "Degree"
    if (attr !== "Degree") {
      defaultAttr = false;
    }
    //Checking ancestor interaction
    let tasks = window.GLOBALDATA.tasks.selectedTasks;
    let isHighLightAncestor = false;
    let query = window.GLOBALDATA.tasks.selectedQuery;
    for (val of tasks) {
      if (
        window.GLOBALDATA.taskPropertyMap[val][query]["interaction"].indexOf(
          "highlight ancestors"
        ) !== -1
      ) {
        isHighLightAncestor = true;
      }
    }

    //Adding a container for visualization
    $("#recPanelBody").append(
      `<div class="visOutputElement" id='visOutput'> </div>`
    );
    let chart;
    if (recommendation === "nodelink") {
      chart = dendrogram.createDendrogram(data, {
        label: (d) => d.name,
        // title: (d, n) =>
        //   `${n
        //     .ancestors()
        //     .reverse()
        //     .map((d) => d.data.name)
        //     .join(".")}`, // hover text
        width: 850,
        value: defaultAttr ? null : (d) => d[attr],
        // highlightAncestors: isHighLightAncestor,
      });
    }
    if (recommendation === "icicle") {
      chart = icicle.createIcicle(data, {
        label: (d) => d.name,
        // title: (d, n) =>
        //   `${n
        //     .ancestors()
        //     .reverse()
        //     .map((d) => d.data.name)
        //     .join(".")}`, // hover text
        value: defaultAttr ? null : (d) => d[attr],
        width: 1152,
        height: 1000,
      });
    }
    if (recommendation === "treemap") {
      chart = nestedTreemap.createChart(data, {
        width: 1152,
        height: 1152,
        value: defaultAttr ? null : (d) => d[attr],
      });
      // chart = treemap.createTreemap(data, {
      //   label: (d) => d.name,
      //   group: (d) => d.name.split(".")[1], // e.g., "animate" in "flare.animate.Easing"; for color
      //   title: (d, n) =>
      //     `${n
      //       .ancestors()
      //       .reverse()
      //       .map((d) => d.data.name)
      //       .join(".")}`, // hover text
      //   value: defaultAttr ? null : (d) => d[attr],
      //   width: 1152,
      //   height: 1152,
      // });
    }
    if (recommendation === "indented") {
      chart = indentedList.createIndentedList(data, {});
    }
    if (recommendation === "radialNL") {
      chart = radialNodeLink.createChart(data, {
        label: (d) => d.name,
        // title: (d, n) => `${n.ancestors().reverse().map(d => d.data.name).join(".")}`, // hover text
        value: defaultAttr ? null : (d) => d[attr],
        width: 1000,
        height: 1152,
      });
    }
    if (recommendation === "radialLD") {
      chart = sunburst.createChart(data, {
        label: (d) => d.name,
        // title: (d, n) =>
        //   `${n
        //     .ancestors()
        //     .reverse()
        //     .map((d) => d.data.name)
        //     .join(".")}`, // hover text
        value: defaultAttr ? null : (d) => d[attr],
        width: 1152,
        height: 1152,
      });
    }
    if (recommendation === "radialED") {
      chart = nestedBubble.createChart(data, {
        value: defaultAttr ? null : (d) => d[attr],
        label: (d, n) => d.name.split(/(?=[A-Z][a-z])/g),
        // title: (d, n) => `${n.ancestors().reverse().map(({data: d}) => d.name).join(".")}\n${n.value.toLocaleString("en")}`,
        width: 1152,
        height: 1152,
      });
    }
    $("#visOutput").append(chart);
  };
})();
