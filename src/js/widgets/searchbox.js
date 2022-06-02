(function (){

    widgetSearchBox = {};
    widgetSearchBox.createSearchBox = function(){
        return `
        <div id="searchInput">
            <div class="input-group rounded">
            <input id="searchBox" type="search" class="form-control rounded" placeholder="Search Node" aria-label="Search" aria-describedby="search-addon" />
            <span class="input-group-text border-0" id="search-addon">
                <i class="fas fa-search"></i>
            </span>
            </div>
        </div>`;
    }
    


})();