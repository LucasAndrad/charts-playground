import React, {useEffect} from 'react';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import boostModule from 'highcharts/modules/boost';

import './Chart.css';

boostModule(Highcharts);

const defaultOptions = {
  chart: {
    zoomType: 'x',
  },
  boost: {
    useGPUTranslations: true
  },
  xAxis: {
    type: 'datetime',
    scrollbar: {
      enabled: true,
      buttonsEnabled: true,
      height: 25,
    },
  },
  subtitle: {
      text: 'Using the Boost module'
  },
  accessibility: {
      screenReaderSection: {
          beforeChartFormat: '<{headingTagName}>{chartTitle}</{headingTagName}><div>{chartSubtitle}</div><div>{chartLongdesc}</div><div>{xAxisDescription}</div><div>{yAxisDescription}</div>'
      }
  },
  tooltip: {
      valueDecimals: 2
  }
};

export const Chart = () => {
  const getData = (n: number) => {
    let arr = [];
    let i = 0
    let x = 0
    let a = 0
    let b = 0
    let c = 0
    let spike = 0;

    for (
      i = 0, x = Date.UTC(new Date().getUTCFullYear(), 0, 1) - n * 36e5;
      i < n;
      i = i + 1, x = x + 36e5
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
      arr.push([
        x,
        2 * Math.sin(i / 100) + a + b + c + spike + Math.random()
      ]);
    }
    return arr;
  }

  // const buildChart = () => {
  //   const n = 500000;
  //   const data = getData(n);

  //   console.time('line');
  //   Highcharts.chart('chart-example', {
  //     ...defaultOptions,
  //     series: [{
  //         data: data,
  //         lineWidth: 0.5,
  //         name: 'Hourly data points'
  //     }]
  //   });
  //   console.timeEnd('line');
  // }

  // useEffect(() => {
  //   buildChart();
  // }, []);

  const getOptions = () => {
    const n = 500000;
    const data = getData(n);
    const options = {
      ...defaultOptions,
      series: [{
        data: data,
        lineWidth: 0.5,
        name: 'Hourly data points'
      }],
      title: {
        text: 'Highcharts drawing ' + n + ' points'
      }
    };

    return options;
  }


  return (
    <div className="main-container">
      <div className="container">
        <div>Chart Playground</div>
        <HighchartsReact
          highcharts={Highcharts}
          options={getOptions()}
        />
      </div>
    </div>
  )
};
