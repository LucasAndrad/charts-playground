import React, { useEffect, memo } from 'react';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import boostModule from 'highcharts/modules/boost';
import xrange from 'highcharts/modules/xrange';
import { chartSize } from './constants';

import './Chart.css';
import { getMockMarkers, getRandomColor } from './mock';

xrange(Highcharts);
boostModule(Highcharts);

type OptionsProps = {
  showXaxis?: boolean;
};

export const Chart = memo(function Chart() {
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
      arr.push([
        x,
        2 * Math.sin(i / 100) + a + b + c + spike + Math.random() + scale,
      ]);
    }
    return arr;
  }

  const getOptions = ({ showXaxis = false }: OptionsProps) => {
    const data = getData(chartSize);
    const markers = getMockMarkers();

    const options = {
      tooltip: { enabled: false },
      scrollbar: {
        enabled: false,
      },
      chart: {
          zoomType: 'x',
          height: 120,
      },

      boost: {
          useGPUTranslations: true
      },
      navigator: {
        enabled: false
      },

      title: {
          text: ''
      },
      series: [
        {
          data: data,
          lineWidth: 2,
          color: getRandomColor(),
          showInLegend: true,
        },
        ...markers,
      ],
      plotOptions: {
        series: {
          enableMouseTracking: false,
          states: {
            hover: {
                enabled: false
            }
          }
        },
        line: {
          dataGrouping: {
            enabled: true,
            groupPixelWidth: 2,
          },
        },
      },
      rangeSelector:{
        enabled:false
      },
      xAxis: {
        type: 'datetime',
        animation: false,
        visible: showXaxis,
        scrollbar: {
          enabled: false,
        },
      }
  }
    return options;
  }

  useEffect(() => {
    console.log('=== charts len',Highcharts.charts.length);
  });

  return (
    <div className="main-container">
      <div className="container">
        <div>Chart Playground</div>
        {[1,2,3,4,5,6].map((item) => (
          <HighchartsReact
            key={`chart-n${item}`}
            highcharts={Highcharts}
            options={getOptions({})}
          />
        ))}
        <HighchartsReact
          highcharts={Highcharts}
          options={getOptions({ showXaxis: true })}
        />
      </div>
    </div>
  )
});
