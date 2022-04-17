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

      let taskIconContainerDiv = `<div id="taskIcons" class="taskPanelContainer row container"> </div>`
      $("#taskPanelBody").append(taskIconContainerDiv);

      for (key of taskKeys)
      {
        let fileLoc =
        "../../assets/" +
        taskImageMap[key]["relativePath"] +
        taskImageMap[key]["fileName"];
          let taskDiv = `<div id=${key} class="taskIconElement col-3"> 
          <img  class="imgView" src=${fileLoc}>
          <br>
          <p class="recTreeImgLabel"> ${taskImageMap[key]["label"]} </p>
          </div>`
          $("#taskIcons").append(taskDiv);
      }
  }
})();
