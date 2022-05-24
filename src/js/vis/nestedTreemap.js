(function () {
  nestedTreemap = {};
  nestedTreemap.createChart = function (
    data,
    {
      width = 640, // outer width, in pixels
      height = 400, // outer height, in pixels
      value, // given a node d, returns a quantitative value (for area encoding; null for count)
      colorScale = d3.interpolateGreys, // color scheme, if any
      children,
      highlightAncestors = true,
    } = {}
  ) {
    let root = d3.hierarchy(data, children).eachBefore((d, i) => (d.index = i++));
    value == null ? root.count() : root.sum((d) => Math.max(0, value(d)));

    const hierarchy = d3
      .treemap()
      .size([width, height])
      .paddingOuter(3)
      .paddingTop(19)
      .paddingInner(1)
      .round(true)(root);


    const format = d3.format(",d");
    const color = d3.scaleSequential([0, 8], colorScale);

    const svg = d3
      .create("svg")
      .attr("viewBox", [0, 0, width, height])
      .style("font", "10px sans-serif");

    svg
      .append("filter")
      .attr("id", "shadow")
      .append("feDropShadow")
      .attr("flood-opacity", 0.3)
      .attr("dx", 0)
      .attr("stdDeviation", 3);

    const node = svg
      .selectAll("g")
      .data(d3.group(hierarchy, (d) => d.height))
      .join("g")
      // .attr("filter", shadow)
      .selectAll("g")
      .data((d) => d[1])
      .join("g")
      .attr("transform", (d) => `translate(${d.x0},${d.y0})`)
      .attr("class","node")
      .attr("id", (d) => `node_${d.index}_${d.depth}`)
      .on("mouseover", (e, d) => {
        //nestedTreemap.highlightNode(`node_${d.index}_${d.depth}`, "select");
        if (highlightAncestors) {
          let ancestors = d.ancestors();
          nestedTreemap.highlightAncestors(
            `node_${d.index}_${d.depth}`,
            ancestors,
            "select"
          );
        }
      })
      .on("mouseout", function (e, d) {
        //nestedTreemap.highlightNode(`node_${d.index}_${d.depth}`, "deselect");
        if (highlightAncestors) {
          nestedTreemap.highlightAncestors(
            `node_${d.index}_${d.depth}`,
            [],
            "deselect"
          );
        }
      });

    node.append("title").text(
      (d) =>
        `${d
          .ancestors()
          .reverse()
          .map((d) => d.data.name)
          .join("/")}\n${format(d.value)}`
    );

    const did = `O-${Math.random().toString(16).slice(2)}`;

    node
      .append("rect")
      .attr("id", (d, i) => `${did}-node-${i}`)
      .attr("fill", (d) => color(d.height))
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0);

    // node.append("clipPath").attr("id", "clipID");

    const uid = `O-${Math.random().toString(16).slice(2)}`;

    node
      .append("clipPath")
      .attr("id", (d, i) => `${uid}-clip-${i}`)
      .append("rect")
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0);

    node
      .append("text")
      .attr(
        "clip-path",
        (d, i) => `url(${new URL(`#${uid}-clip-${i}`, location)})`
      )
      .selectAll("tspan")
      .data((d) => d.data.name.split(/(?=[A-Z][^A-Z])/g))
      .join("tspan")
      .attr("fill-opacity", (d, i, nodes) =>
        i === nodes.length - 1 ? 0.7 : null
      )
      .attr("font-size", "10px")
      .text((d) => d);

    node
      .filter((d) => d.children)
      .selectAll("tspan")
      .attr("dx", 3)
      .attr("y", 13);

    node
      .filter((d) => !d.children)
      .selectAll("tspan")
      .attr("x", 3)
      .attr(
        "y",
        (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`
      );

    return svg.node();
  };

  nestedTreemap.highlightNode = function(id, event)
  {
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
  }
  nestedTreemap.highlightAncestors = function (id, ancestors, event) {
    if (event === "select") {
      d3.selectAll(".node").transition().duration("50").style("opacity", "0.05");
      // d3.selectAll(".link").transition().duration("50").style("opacity", ".1");

      d3.select("#" + id)
        .transition()
        .duration("100")
        .style("opacity", "1");
      ancestors.forEach((val) => {
        d3.select(`#node_${val.index}_${val.depth}`)
          .transition()
          .duration("100")
          .style("opacity", "1");
      });
    } else {
      d3.selectAll(".node").transition().duration("50").style("opacity", "1");
    }
  };
})();
