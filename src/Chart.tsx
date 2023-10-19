import React, { useState, useRef } from 'react';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import boostModule from 'highcharts/modules/boost';
import xrange from 'highcharts/modules/xrange';
import shortid from 'shortid';
import { chartSize } from './constants';

import './Chart.css';
import { getMockMarkers, getRandomColor } from './mock';

xrange(Highcharts);
boostModule(Highcharts);

export const Chart = () => {
  const updateChartsExtremes = (eventExtreme: any, chartId: any) => {
    if (!["zoom", "scrollbar"].includes(eventExtreme.trigger)) return;

    Highcharts.charts.forEach((chart: any) => {
      if (!chart) return;
      if (chart.userOptions.chartId === chartId) return;
      const updatedCharts = eventExtreme?.updatedCharts ?? [];
      if (updatedCharts.includes(chart.userOptions.chartId)) return;
      updatedCharts.push(chart.userOptions.chartId)
      chart.xAxis[0].setExtremes(eventExtreme.min, eventExtreme.max, true, false, { trigger: eventExtreme.trigger, updatedCharts: updatedCharts });
    });
  };

  const getData = (n: number, scale = 0) => {
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
        2 * Math.sin(i / 100) + a + b + c + spike + Math.random() + scale,
      ]);
    }
    return arr;
  }

  const getOptions = (showXaxis: boolean = false) => {
    const defaultOptions = {
      chart: {
        chartId: shortid.generate(),
        zoomType: 'x',
        height: 180,
      },
      boost: {
        useGPUTranslations: true
      },
      subtitle: {
          text: ''
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

    const data = getData(chartSize);
    const markers = getMockMarkers();
    const chartId = shortid.generate();
    const options = {
      ...defaultOptions,
      chartId,
      series: [
        {
          data: data,
          lineWidth: 2,
          color: getRandomColor(),
          showInLegend: true,
        },
        ...markers,
      ],
      title: {
        text: ''
      },
      xAxis: {
        type: 'datetime',
        animation: false,
        visible: showXaxis,
        scrollbar: {
          enabled: true,
          buttonsEnabled: true,
          height: 25,
        },
        labels: {
          formatter: function (label: any) {
            return label.value;
          }
        },
        events: {
          setExtremes: (event: any) => updateChartsExtremes(event, chartId),
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
          highcharts={Highcharts}
          options={getOptions()}
        />
        <HighchartsReact
          highcharts={Highcharts}
          options={getOptions()}
        />
        <HighchartsReact
          highcharts={Highcharts}
          options={getOptions()}
        />
        <HighchartsReact
          highcharts={Highcharts}
          options={getOptions()}
        />
        <HighchartsReact
          highcharts={Highcharts}
          options={getOptions(true)}
        />
      </div>
    </div>
  )
};
