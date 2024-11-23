import React from "react";
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
  const getChartOptions = () => {
    const options = {
      zoomEnabled: true,
      animationEnabled: true,
      title: {
        text: "Try Zooming - Panning"
      },
      axisY: {
        lineThickness: 1
      },
      data: getData(chartSize); // random data
    };
  };

  return (
    <div>

    </div>
  )
};
