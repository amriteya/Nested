(function(){
indentedList = {};

indentedList.createIndentedList = function (data,{
    path, // as an alternative to id and parentId, returns an array identifier, imputing internal nodes
    id = Array.isArray(data) ? (d) => d.id : null, // if tabular data, given a d in data, returns a unique identifier (string)
    parentId = Array.isArray(data) ? (d) => d.parentId : null, // if tabular data, given a node d, returns its parent’s identifier
    children, // if hierarchical data, given a d in data, returns its children
    width = 1152, // outer width, in pixels
    height = 1000, // outer height, in pixels
    nodeSize = 17, // size of node 
    fontSize = 12, // set font size
    fontFamily = "sans-serif",// font style
    fill = "none", // fill for nodes
    fillOpacity, // fill opacity for nodes
    stroke = "#555", // stroke for links
}){
    
    root = d3.hierarchy(data).eachBefore((d,i) => d.index = i++);
    const nodes = root.descendants();
    console.log(root.descendants());
    console.log(root.leaves());
    root.each((d,i) =>{
        console.log(d.children);
    })

    const svg = d3.create("svg")
        .attr("viewBox", [-nodeSize / 2, -nodeSize * 3 / 2, width, (nodes.length + 1) * nodeSize])
        .attr("font-family", fontFamily)
        .attr("font-size", fontSize)
        .style("overflow", "visible");
  
    const link = svg.append("g")
        .attr("fill", fill)
        .attr("stroke", stroke)
      .selectAll("path")
      .data(root.links())
      .join("path")
        .attr("d", d => `
          M${d.source.depth * nodeSize},${d.source.index * nodeSize}
          V${d.target.index * nodeSize}
          h${nodeSize}
        `);
  
    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
        .attr("transform", d => `translate(0,${d.index * nodeSize})`);
  
    node.append("circle")
        .attr("cx", d => d.depth * nodeSize)
        .attr("r", 2.5)
        .attr("fill", d => d.children ? null : "#999");
  
    node.append("text")
        .attr("dy", "0.32em")
        .attr("x", d => d.depth * nodeSize + 6)
        .text(d => d.data.name);
  
    node.append("title")
        .text(d => d.ancestors().reverse().map(d => d.data.name).join("/"));
  
        // let columns = [
    //     {
    //       label: "Count", 
    //       value: d => d.children ? 0 : 1, 
    //       format: (value, d) => d.children ? format(value) : "-", 
    //       x: 340
    //     }
    //   ]
    // for (const {label, value, format, x} of columns) {
    //   svg.append("text")
    //       .attr("dy", "0.32em")
    //       .attr("y", -nodeSize)
    //       .attr("x", x)
    //       .attr("text-anchor", "end")
    //       .attr("font-weight", "bold")
    //       .text(label);
  
    //   node.append("text")
    //       .attr("dy", "0.32em")
    //       .attr("x", x)
    //       .attr("text-anchor", "end")
    //       .attr("fill", d => d.children ? null : "#555")
    //     .data(root.copy().sum(value).descendants())
    //       .text(d => format(d.value, d));
    // }
  
    return svg.node();
}

}());