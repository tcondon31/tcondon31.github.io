import Plotly from 'plotly.js-dist-min'
import Plot from 'react-plotly.js';
import useWindowDimensions from '../useWindowDimensions';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

export const TerrorDensityMap = ({data}) => {
    const { height, width } = useWindowDimensions();
    return (
        <Plot
            onBeforeHover={console.log}
            data={data}
            layout={ {
                title: 'Terrorist Attacks Around The World (1970-2019)',
                font: { color: 'white'},
                dragmode: 'zoom',
                mapbox: {
                    center: {
                        lat: 38.03697222,
                        lon: -90.70916722
                      },
                      domain: {
                        x: [0, 1],
                        y: [0, 1]
                      },
                      style: 'dark',
                      zoom: 1
                },
                automargin: true,
                paper_bgcolor: '#191A1A',
                plot_bgcolor: '#191A1A',
                showlegend: true,
                legend: { title:
                    { text: 'Type of Attack' }
                },
                height: height,
                width: width,
            } }
            config = {{responsive: true, mapboxAccessToken: process.env.REACT_APP_MAPBOX_TOKEN}}>
        </Plot>
        /*
        <Plot
            data={[{
                lon: longitude,
                lat: latitude,
                type: "scattergeo",
                locations: 'iso-alpha',
                color: 'continent',
                hoverinfo: 'skip',
                marker: {
                    colorscale: 'Reds',
                    size: kills,
                    line: {
                        color: 'black',
                    },
                },
            }]}
            layout={{
                geo: {
                    scope: 'world',
                    resolution: 50
                }
            }}
            //config = { {mapboxAccessToken: process.env.REACT_APP_MAPBOX_TOKEN} }
            >
        </Plot>
        */
    )
}