import shortid from 'shortid';
import { chartSize } from './constants';


const colors = [
  'rgb(255, 0, 0)',
  'rgb(128, 0, 0)',
  'rgb(255, 195, 0)',
  'rgb(128, 128, 0)',
  'rgb(0, 255, 0)',
  'rgb(0, 128, 0)',
  'rgb(0, 128, 128)',
  'rgb(0, 0, 128)',
  'rgb(255, 0, 255)',
  'rgb(128, 0, 128)',
];

export const getRandomColor  = () => {
  return colors[Math.floor((Math.random()*colors.length))];
}

export const getMockMarkers = () => {
  // return [];

  // const xRange = 500;
  const xRange = 770;

  const markers = [];
  let i = 1;
  for(i = 1; i < (chartSize - xRange); i = i + 2 * xRange) {
    const id = shortid.generate();
    const color = getRandomColor();

    markers.push(
      {
        name: "marker",
        type: "xrange",
        markerId: id,
        id: id,
        pointWidth: 20,
        pointPlacement: "between",
        allowPointSelect: true,
        showInLegend: false,
        states: {
          select: {
            color: color,
            borderColor: "transparent",
            borderWidth: 0
          }
        },
        data: [
          {
            x: i,
            x2: i + xRange,
            y: -2,
            name: "marker",
            pointWidth: 20,
            id: id,
            markerName: "CentralApnea_3 (A)",
            color: color,
            dataLabels: {
              align: "center",
              inside: false,
              style: {
                fontSize: "11px",
                fontWeight: "normal",
                textOutline: "1px contrast",
                cursor: "move"
              },
              borderWidth: 0,
              color: "#000",
              x: 2
            }
          }
        ],
        events: {},
        point: {
          events: {}
        },
        customEvents: {
          series: {},
          point: {}
        }
      }
    )
  }

  return markers;
}
