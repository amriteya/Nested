(function(){

    renderingControl = {};

    renderingControl.onInitialLoad = function ()
    {
        dataPanelUI.header();
        dataPanelUI.selectDropDown();  
        dataPanelUI.uploadFile();
        taskPanelUI.header();
        taskPanelUI.createTaskIcons();
        taskPanelUI.createQueryIcons();
        recPanelUI.header();  
        recPanelUI.recommendationInformation();
    }

    renderingControl.visUpdate = function ()
    {
        recPanelUI.visualizationNavBar();
        recPanelUI.renderRecommendation("nodelink");
        dataPanelUI.attrSelectionBtn();
        dataPanelUI.treeSummaryPanel();
    }


}());