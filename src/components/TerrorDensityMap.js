import Plotly from 'plotly.js-dist-min'
import Plot from 'react-plotly.js';

export const TerrorDensityMap = ({longitude, latitude, kills}) => {
    console.log(process.env.REACT_APP_MAPBOX_TOKEN)
    return (
        <Plot
            data={[{
                lon: longitude,
                lat: latitude,
                z: kills,
                radius: 10,
                type: "densitymapbox",
                coloraxis: 'coloraxis',
                hoverinfo: 'skip',
            }]}
            layout={{
                mapbox: {center: {lon: 60, lat: 30}, style: "outdoors", zoom: 2},
                coloraxis: {colorscale: "Viridis"},
                title: {text: "Terror Density"},
                width: 600, height: 400, margin: {t: 30, b: 0},
            }}
            config = { {mapboxAccessToken: process.env.REACT_APP_MAPBOX_TOKEN} }
            >
        </Plot>
    )
}