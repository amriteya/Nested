(function () {
  //Events and Logic
  //Rendering
  taskPanelUI = {};

  taskPanelUI.header = function () {
    var taskpanelBody = $(`<div id="taskPanelBody"> </div>`);
    $("#taskPanel")
      .width(window.GLOBALDATA.panelWidth.taskPanel + "%")
      .append(taskpanelBody);
    $("#taskPanelBody").append(
      `<div class="panelHeader p-1 bg-light text-dark"> Tasks</div>`
    );
  };

  taskPanelUI.createTaskIcons = function () {
    let taskKeys = Object.keys(window.GLOBALDATA.imgMap.task);
    let taskImageMap = window.GLOBALDATA.imgMap.task;

    let taskIconContainerDiv = `<div id="taskIcons" class="taskPanelContainer container row"> 
      <span class="headerText"> Task Target  
      <i title="Targets refer to the item that you are interested in identifying in the tree visualization." class="fas fa-info-circle"></i>
      </span>
      </div>`;
    $("#taskPanelBody").append(taskIconContainerDiv);

    for (key of taskKeys) {
      let fileLoc =
        "../../assets/" +
        taskImageMap[key]["relativePath"] +
        taskImageMap[key]["fileName"];
      let taskDiv = `<div id=${key} class="taskIconElement ${
        key === "categorical_value" ? "selectedItem" : ""
      } col-4"> 
          <div class="taskImageContainer">
          <img  class="taskImgView" src=${fileLoc}>
          </div>
          <div class="taskLabelContainer">
          <span class="taskPanelLabel"> ${
            taskImageMap[key]["label"]
          }: <span class="additionalInformation"> ${
        taskImageMap[key]["definition"]
      } </span> </span>
          </div>
          </div>`;
      $("#taskIcons").append(taskDiv);
    }

    //Events
    $(".taskIconElement").click(function () {
      var elemId = $(this).attr("id");
      //$(".taskIconElement.selectedItem").toggleClass("selectedItem");
      $(this).toggleClass("selectedItem");
      if (window.GLOBALDATA.tasks.selectedTasks.indexOf(elemId) === -1) {
        window.GLOBALDATA.tasks.selectedTasks.push(elemId);
      } else {
        var index = window.GLOBALDATA.tasks.selectedTasks.indexOf(elemId);
        if (index !== -1) {
          window.GLOBALDATA.tasks.selectedTasks.splice(index, 1);
        }
      }
      recommendation.createRecommendation();
    });
  };

  taskPanelUI.createQueryIcons = function () {
    // console.log(window.GLOBALDATA.tasks);
    let queryKeys = Object.keys(window.GLOBALDATA.imgMap.query);
    let queryImageMap = window.GLOBALDATA.imgMap.query;

    let queryIconContainerDiv = `<div id="queryIcons" class="taskPanelContainer container row"> 
      <span class="headerText"> Query   
      <i title="Query" class="fas fa-info-circle"></i>
      </span>
      </div>`;
    $("#taskPanelBody").append(queryIconContainerDiv);

    for (key of queryKeys) {
      let fileLoc =
        "../../assets/" +
        queryImageMap[key]["relativePath"] +
        queryImageMap[key]["fileName"];
      let queryDiv = `<div id=${key} class="taskQueryIconElement ${
        key === "identify" ? "selectedItem" : ""
      } col-4"> 
            <div class="taskImageContainer">
            <img  class="taskImgView" src=${fileLoc}>
            </div>
            <div class="taskLabelContainer">
            <span class="taskPanelLabel"> ${
              queryImageMap[key]["label"]
            }: <span class="additionalInformation"> ${
        queryImageMap[key]["definition"]
      } </span> </span>
            </div>
            </div>`;
      $("#queryIcons").append(queryDiv);
    }
    $(".taskQueryIconElement").click(function () {
      var elemId = $(this).attr("id");
      $(".taskQueryIconElement.selectedItem").toggleClass("selectedItem");
      $(this).toggleClass("selectedItem");
      window.GLOBALDATA.tasks.selectedQuery = elemId;
      recommendation.createRecommendation();

    });
  };
})();
