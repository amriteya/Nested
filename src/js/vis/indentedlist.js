(function () {
  indentedList = {};

  indentedList.createIndentedList = function (
    data,
    {
      path, // as an alternative to id and parentId, returns an array identifier, imputing internal nodes
      id = Array.isArray(data) ? (d) => d.id : null, // if tabular data, given a d in data, returns a unique identifier (string)
      parentId = Array.isArray(data) ? (d) => d.parentId : null, // if tabular data, given a node d, returns its parent’s identifier
      children, // if hierarchical data, given a d in data, returns its children
      width = 1152, // outer width, in pixels
      height = 1000, // outer height, in pixels
      nodeSize = 17, // size of node
      fontSize = 12, // set font size
      fontFamily = "sans-serif", // font style
      fill = "none", // fill for nodes
      fillOpacity, // fill opacity for nodes
      stroke = "#555", // stroke for links
      highlightAncestors = true,
      highlightDescendants = true, //Test if a node has ancestors
      highlightSiblings = false, //Enable siblings interaction
      highlightChildNodes = true, //Enable child node interaction
      options = {
        ancestors: true,
        nodeValue: { status: true },
        size: true,
        height: true,
        depth: true,
        degree: true,
      },
    }
  ) {
    root = d3.hierarchy(data).eachBefore((d, i) => (d.index = i++));
    const nodes = root.descendants();

    const svg = d3
      .create("svg")
      .attr("viewBox", [
        -nodeSize / 2,
        (-nodeSize * 3) / 2,
        width,
        (nodes.length + 1) * nodeSize,
      ])
      .attr("font-family", fontFamily)
      .attr("font-size", fontSize)
      .style("overflow", "visible");

    const link = svg
      .append("g")
      .attr("fill", fill)
      .attr("stroke", stroke)
      .selectAll("path")
      .data(root.links())
      .join("path")
      .attr("class", "link")
      .attr("id", (d) => {
        return `node_${d.source.index}-node_${d.target.index}`;
      })
      .attr(
        "d",
        (d) => `
          M${d.source.depth * nodeSize},${d.source.index * nodeSize}
          V${d.target.index * nodeSize}
          h${nodeSize}
        `
      );

    const node = svg
      .append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("transform", (d) => `translate(0,${d.index * nodeSize})`);

    node
      .append("circle")
      .attr("cx", (d) => d.depth * nodeSize)
      .attr("r", 2.5)
      .attr("fill", (d) => (d.children ? null : "#999"))
      .attr("id", (d) => "node_" + d.index)
      .attr("class", "node");

    node
      .append("text")
      .attr("dy", "0.32em")
      .attr("x", (d) => d.depth * nodeSize + 6)
      .attr("id", (d) => "node_" + d.index)
      .attr("class", "node")
      .text((d) => d.data.name)
      .on("mouseover", (e, d) => {
        //indentedList.highlightNode("node_"+d.index, "select");
        // if (highlightAncestors) {
        //   let ancestors = d.ancestors();
        //   indentedList.highlightAncestors(
        //     "node_" + d.index,
        //     ancestors,
        //     "select"
        //   );
        // }
        // if (highlightDescendants) {
        //     let descendants = d.descendants();
        //     interaction.highlightDescendantsWithLinks(descendants, "select");
        //   }
        if (highlightSiblings) {
          let parent = d.parent;
          let parentDescendants = d.parent.descendants();
          let siblingNodes = parentDescendants.filter(
            (d) => d.parent === parent
          );
          interaction.highlightSiblingsWithLinks(siblingNodes, "select");
        }
        if (highlightChildNodes) {
          let descendants = d.descendants();
          let nodeName = d.data.name;
          let childNodes = descendants.filter((d) => {
            if (d.parent !== null) {
              return (
                d.parent.data.name === nodeName || d.data.name === nodeName
              );
            } else {
              return d;
            }
          });
          interaction.highlightDescendantsWithLinks(childNodes, "select");
        }
      })
      .on("mouseout", function (e, d) {
        //indentedList.highlightNode("node_"+d.index, "deselect");
        // if (highlightAncestors) {
        //     indentedList.highlightAncestors(
        //     "node_" + d.index,
        //     [],
        //     "deselect"
        //   );
        // }
        // if (highlightDescendants) {
        //     interaction.highlightDescendantsWithLinks([], "deselect");
        //   }
        if (highlightSiblings) {
          interaction.highlightSiblingsWithLinks([], "deselect");
        }
        if (highlightChildNodes) {
          interaction.highlightDescendantsWithLinks([], "deselect");
        }
      });

    node.append("title").text((d) => interaction.appendTitle(d, options));

    //     let columns = [
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
  };

  indentedList.highlightNode = function (id, event) {
    if (event === "select") {
      d3.selectAll(".node").style("opacity", "0.2");
      d3.selectAll(".link").style("opacity", "0.2");
      d3.selectAll("#" + id).style("opacity", "1");
      // var top = $("#" + id).position().top - 400;
      // console.log(top);
      // $("#visOutput").animate({ scrollTop: top + "px" }, 1000);
    } else {
      d3.selectAll(".node").style("opacity", "1");
      d3.selectAll(".link").style("opacity", "1");
    }
  };

  indentedList.highlightAncestors = function (id, ancestors, event) {
    if (event === "select") {
      d3.selectAll(".node").transition().duration("50").style("opacity", ".3");
      d3.selectAll(".link").transition().duration("50").style("opacity", ".1");
      d3.select("#" + id)
        .transition()
        .duration("100")
        .style("opacity", "1");
      ancestors.forEach((val) => {
        d3.selectAll("#node_" + val.index)
          .transition()
          .duration("100")
          .style("opacity", "1");
      });
      for (var i = 0; i < ancestors.length - 1; i++) {
        d3.selectAll(
          `#node_${ancestors[i + 1].index}-node_${ancestors[i].index}`
        )
          .transition()
          .duration("100")
          .style("opacity", "1");
      }
    } else {
      d3.selectAll(".node").transition().duration("50").style("opacity", "1");
      d3.selectAll(".link").transition().duration("50").style("opacity", "1");
    }
  };
})();
