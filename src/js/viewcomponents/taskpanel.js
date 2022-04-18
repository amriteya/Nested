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
      console.log(window.GLOBALDATA.imgMap.task)
      let taskKeys = Object.keys(window.GLOBALDATA.imgMap.task);
      let taskImageMap = window.GLOBALDATA.imgMap.task;

      let taskIconContainerDiv = `<div id="taskIcons" class="taskPanelContainer container row"> </div>`
      $("#taskPanelBody").append(taskIconContainerDiv);

      for (key of taskKeys)
      {
        let fileLoc =
        "../../assets/" +
        taskImageMap[key]["relativePath"] +
        taskImageMap[key]["fileName"];
          let taskDiv = `<div id=${key} class="taskIconElement col-4"> 
          <div class="taskImageContainer">
          <img  class="taskImgView" src=${fileLoc}>
          </div>
          <div class="taskLabelContainer">
          <span class="taskPanelLabel"> ${taskImageMap[key]["label"]}: <span class="additionalInformation"> ${taskImageMap[key]["definition"]} </span> </span>
          </div>
          </div>`
          $("#taskIcons").append(taskDiv);
      }
  }
})();
