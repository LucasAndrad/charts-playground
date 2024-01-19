import React from 'react';
import Highcharts from 'highcharts/highstock'

import { Chart } from './Chart';
import { chartSize } from './constants';

const scrollStep = 5 * 1000
const zoomRange = 5 * 1000
let initialMin = 0;

function scrollRight() {
  console.log('scrollRight was called');
  console.time('scroll-chart');
  let newExtremeMin = initialMin;
  let newExtremeMax = initialMin + zoomRange;
  console.log(Highcharts.charts.length);
  Highcharts.charts.forEach((chart) => {
    if (!chart) return;

    if (newExtremeMax > chartSize) return;
    chart.xAxis[0].setExtremes(
      newExtremeMin, newExtremeMax
    );
  });
  initialMin = initialMin + scrollStep;
  console.timeEnd('scroll-chart');
}


function App() {
  return (
    <div>
      <button onClick={scrollRight} style={{ margin: 20, padding: 10 }}>Scroll Right</button>
      <Chart />
    </div>
  );
}

export default App;
