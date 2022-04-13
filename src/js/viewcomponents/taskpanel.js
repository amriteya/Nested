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
})();
