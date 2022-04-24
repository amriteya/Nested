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

    renderingControl.visUpdate = function (recommendation)
    {
        console.log(recommendation);
        recPanelUI.recommendationInformation(recommendation);
        recPanelUI.visualizationNavBar();
        recPanelUI.renderRecommendation();
        dataPanelUI.attrSelectionBtn();
        dataPanelUI.treeSummaryPanel();
    }


}());