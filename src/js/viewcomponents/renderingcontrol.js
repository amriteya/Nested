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
    }

    renderingControl.visUpdate = function ()
    {
        recPanelUI.recommendationInformation();
        recPanelUI.visualizationNavBar();
        recPanelUI.renderRecommendation("nodelink");
        dataPanelUI.attrSelectionBtn();
        dataPanelUI.treeSummaryPanel();
    }


}());