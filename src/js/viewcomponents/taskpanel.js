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

  taskPanelUI.createTaskIcons = function ()
  {
      let taskKeys = Object.keys(window.GLOBALDATA.imgMap.task);
      let taskImageMap = window.GLOBALDATA.imgMap.task;

      let taskIconContainerDiv = `<div id="taskIcons" class="taskPanelContainer container row"> 
      <span class="headerText"> Task Target  
      <i title="Targets refer to the item that you are interested in identifying in the tree visualization." class="fas fa-info-circle"></i>
      </span>
      </div>`
      $("#taskPanelBody").append(taskIconContainerDiv);

      for (key of taskKeys)
      {
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
          <span class="taskPanelLabel"> ${taskImageMap[key]["label"]}: <span class="additionalInformation"> ${taskImageMap[key]["definition"]} </span> </span>
          </div>
          </div>`
          $("#taskIcons").append(taskDiv);
      }

      //Events
      $(".taskIconElement").click(function () {
        var elemId = $(this).attr("id");
        $('.taskIconElement.selectedItem').toggleClass("selectedItem")
        $(this).toggleClass("selectedItem");
      });
  }
})();
