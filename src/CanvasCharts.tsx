import React, { useEffect, useState } from "react";
import CanvasJS from '@canvasjs/charts';
import { chartSize } from "./constants";

const getData = (n: number, scale = 0) => {
  let arr = [];
  let i = 0
  let x = 0
  let a = 0
  let b = 0
  let c = 0
  let spike = 0;

  for (
    i = 0;
    i < n;
    i = i + 1, x = x + 1
  ) {
    if (i % 100 === 0) {
      a = 2 * Math.random();
    }
    if (i % 1000 === 0) {
      b = 2 * Math.random();
    }
    if (i % 10000 === 0) {
      c = 2 * Math.random();
    }
    if (i % 50000 === 0) {
      spike = 10;
    } else {
      spike = 0;
    }
    arr.push({
      x,
      y: 2 * Math.sin(i / 100) + a + b + c + spike + Math.random() + scale,
    });
  }
  return arr;
}

export const CanvasCharts = () => {
  const [chart, setChart] = useState<any | null>(null);
  const [chart2, setChart2] = useState<any | null>(null);
  const [scrollStartPosition, setScrollStartPosition] = useState(0);

  const getChartOptions = () => {
    const dataSeries: any = { type: "line", dataPoints: undefined };
    dataSeries.dataPoints = getData(chartSize);
    const data = [dataSeries];

    const options = {
      zoomEnabled: true,
      animationEnabled: true,
      title: {
        text: "Try Zooming - Panning"
      },
      axisY: {
        lineThickness: 1
      },
      data
    };

    return options;
  };

  const handleScrollRight = () => {
    const finalScrollPosition = scrollStartPosition + (100);
    chart.axisX[0].set("viewportMinimum", scrollStartPosition);
    chart.axisX[0].set("viewportMaximum", finalScrollPosition);

    chart2.axisX[0].set("viewportMinimum", scrollStartPosition);
    chart2.axisX[0].set("viewportMaximum", finalScrollPosition);

    setScrollStartPosition(finalScrollPosition);
  }

  const handleResetZoom = () => {
    chart.axisX[0].set("viewportMinimum", 0);
    chart.axisX[0].set("viewportMaximum", chartSize - 1);

    chart2.axisX[0].set("viewportMinimum", 0);
    chart2.axisX[0].set("viewportMaximum", chartSize - 1);

    setScrollStartPosition(0);
  }

  useEffect(() => {
    const newChart = new CanvasJS.Chart("chartContainer", getChartOptions());
    newChart.render();
    setChart(newChart);

    const newChart2 = new CanvasJS.Chart("chartContainer2", getChartOptions());
    newChart2.render();
    setChart2(newChart2);
  }, []);

  return (
    <div>
      <button onClick={handleScrollRight}>Scroll Right</button>
      <button onClick={handleResetZoom}>Reset Zoom</button>

      {/* <CanvasJS.Chart options={getChartOptions()} /> */}
      <div id="chartContainer" />
      <div style={{ width: '100%', height: '100px', marginTop: '500px' }}>
        <div id="chartContainer2" />
      </div>
    </div>
  )
};
