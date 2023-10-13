import React, { useRef } from 'react';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import boostModule from 'highcharts/modules/boost';
import xrange from 'highcharts/modules/xrange';

import './Chart.css';
import { getMockMarkers } from './mock';

xrange(Highcharts);
boostModule(Highcharts);

const defaultOptions = {
  chart: {
    zoomType: 'x',
  },
  boost: {
    useGPUTranslations: true
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
  const chart = useRef(null);

  const getData = (n: number) => {
    let arr = [];
    let i = 0
    let x = 0
    let a = 0
    let b = 0
    let c = 0
    let spike = 0;

    for (
      // i = 0, x = Date.UTC(new Date().getUTCFullYear(), 0, 1) - n * 36e5;
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
        2 * Math.sin(i / 100) + a + b + c + spike + Math.random()
      ]);
    }
    return arr;
  }

  const getOptions = () => {
    const n = 500000;
    const data = getData(n);
    const markers = getMockMarkers();
    const options = {
      ...defaultOptions,
      series: [
        {
          data: data,
          lineWidth: 0.5,
          name: 'Hourly data points',
        },
        ...markers,
      // {
      //   "name": "marker",
      //   "type": "xrange",
      //   "markerId": "HQLrYLi7Hl1",
      //   "id": "HQLrYLi7Hl1",
      //   "pointWidth": 20,
      //   "pointPlacement": "between",
      //   "allowPointSelect": true,
      //   "states": {
      //     "select": {
      //       "color": "rgba(252, 0, 0, 0.7)",
      //       "borderColor": "transparent",
      //       "borderWidth": 0
      //     }
      //   },
      //   "data": [
      //     {
      //       "x": 1,
      //       "x2": 100,
      //       "y": -2,
      //       "name": "marker",
      //       "pointWidth": 20,
      //       "id": "HQLrYLi7Hl1",
      //       "markerName": "CentralApnea_3 (A)",
      //       "color": "rgba(252, 0, 0, 0.5)",
      //       "dataLabels": {
      //         "align": "center",
      //         "inside": false,
      //         "style": {
      //           "fontSize": "11px",
      //           "fontWeight": "normal",
      //           "textOutline": "1px contrast",
      //           "cursor": "move"
      //         },
      //         "borderWidth": 0,
      //         "color": "#000",
      //         "x": 2
      //       }
      //     }
      //   ],
      //   "events": {},
      //   "point": {
      //     "events": {}
      //   },
      //   "customEvents": {
      //     "series": {},
      //     "point": {}
      //   }
      // },
      ],
      title: {
        text: 'Highcharts drawing ' + n + ' points'
      },
      xAxis: {
        type: 'datetime',
        scrollbar: {
          enabled: true,
          buttonsEnabled: true,
          height: 25,
        },
        events: {
          setExtremes: (event: any) => console.log(event),
        }
      },
    };

    return options;
  }


  return (
    <div className="main-container">
      <div className="container">
        <div>Chart Playground</div>
        <HighchartsReact
          ref={chart}
          highcharts={Highcharts}
          options={getOptions()}
        />
      </div>
    </div>
  )
};
