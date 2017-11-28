import * as d3 from 'd3';
import Arc from './Arc';
import ToolTip from './ToolTip';
import React, { Component } from 'react';
import getColor from './getColor.js';

class PieChart extends Component {
    constructor() {
        super();
        this.pie = d3.pie()
                     .value((d) => d.count)
                     .sort(null);
        this.colors = d3.scaleOrdinal(d3.schemeCategory10);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.state = {
            showToolTip: "none",
            loc: {
                x: 0,
                y: 0
            },
            toolTipData: {
                item: "",
                count: 0
            }
        };
    }
     
    arcGenerator(d, i) {
        let width = this.props.size[0],
            height = this.props.size[1],
            radius = Math.min(width - 50, height - 50) / 2,
            innerRadius = this.props.size[0] / 10;
        return (
            <Arc key={`arc-${i}`}
                        data={d}
                        innerRadius={innerRadius}
                        outerRadius={radius}
                        color={getColor(i)}
                        onMouseOver={this.handleMouseOver}
                        onMouseOut={this.handleMouseOut}
                        />
        );
    }
    
            
    handleMouseOver(data, e) {
        this.setState({
            showToolTip: "block",
            loc: {
                x: e.clientX + 10,
                y: e.clientY - 35
            },
            toolTipData: {
                item: data.data.item,
                count: data.data.count
            }
        });
    }
    handleMouseOut() {
        this.setState({
            showToolTip: "none"
        });
    }
 
    render() {
        let pie = this.pie(this.props.data),
            translate = `translate(${this.props.size[0] / 2}, ${this.props.size[1] / 2})`;
 
        return (
            <div className="svg-container">
                <svg className="chart" width={this.props.size[0]} viewBox="0 0 300 300" preserveAspectRatio="xMinYMin meet">
                    <g transform={translate}>
                        {pie.map((d, i) => this.arcGenerator(d, i))}
                    </g>
                </svg>
                <ToolTip show={this.state.showToolTip} x={this.state.loc.x} y={this.state.loc.y} data={this.state.toolTipData} />
            </div>
        );
    }
}



/*
class PieChart extends Component {
   constructor(props){
      super(props)
      this.createPieChart = this.createPieChart.bind(this)
   }
   componentDidMount() {
      this.createPieChart()
   }
   componentDidUpdate() {
      this.createPieChart()
   }
   createPieChart() {
      const data = this.props.data,
            node = this.node,
            dataMax = d3.max(data, d => d.count),
            width = this.props.size[0],
            height = this.props.size[1],
            radius = Math.min(width - 100, height - 100) / 2,
            color = ["#f44336", "#42a5f5", "#43a047", "#ffeb3b", "#ff5722", "#00897b", "#ab47bc", "#607d8b", "#18ffff", "#ff4081"];
     
     var toolTip = d3.select("body").append("div").attr("class", "toolTip").style("opacity", 0);
     
     var pie = d3.pie()
      .sort(null)
      .value(d => d.count);
     
     var path = d3.arc()
      .outerRadius(radius)
      .innerRadius(50);

     var arc = d3.select(node)
             .append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
             .selectAll('.arc')
             .data(pie(data))
             .enter().append("g")
              .attr("class", "arc");
     
     arc.append("path")
      .attr("d", path)
      .attr("fill", (d, i) => color[i] )
      .on("mouseover", d => {
        var segment = d3.select(this);
        console.log("segment: " +segment);
        console.log(d.count)
        segment.attr("stroke", "green");
        toolTip.transition()
          .delay(100)
          .style("opacity", 0.9);
        toolTip
          .html("<span><strong>" + d.category + ": " + d.count + "</strong></span>");
        })
        .on("mousemove", function(){
         toolTip
          .style("left", event.clientX + 20 + "px")
          .style("top", event.clientY - 70 + "px");
       })
       .on("mouseout", function(){
          var segment = d3.select(this);
          segment.attr("stroke", segment.attr("fill"));
          toolTip.transition()
            .delay(125)
            .style("opacity", 0);
        });
   }
render() {
      return (
      <div className="chart-area">
            <div className="svg-container">
              <svg ref={node => this.node = node}
                width={500} height={500} viewBox="0 0 500 500" version="1.1" preserveAspectRatio="xMinYMin meet">
              </svg>
            </div>
        </div>
      );
   }
}
*/

export default PieChart;

     /*
     
     
     
     const yScale = d3.scaleLinear()
       .domain([0, dataMax])
       .range([0, this.props.size[1]]);
   d3.select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect');
   
   d3.select(node)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove();
   
   d3.select(node)
      .selectAll('rect')
      .data(this.props.data)
      .style('fill', '#fe9922')
      .attr('x', (d, i) => i * 25)
      .attr('y', d => this.props.size[1] - yScale(d.count))
      .attr('height', d => yScale(d.count))
      .attr('width', 25);*/