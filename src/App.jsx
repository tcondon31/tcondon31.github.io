import logo from './logo.svg';
import './App.css';
import * as dfd from "danfojs";
import { useState, useEffect } from 'react'
import { TerrorDensityMap } from './components/TerrorDensityMap'

const processData = async () => {
    let df = await dfd.readCSV(process.env.PUBLIC_URL + '/globalterrorismdb_0221dist.csv');
    const lat = df.column('latitude');
    const long = df.column('longitude')
    const kills = df.column('nkill');
    console.log(long.data);
    return [long, lat, kills];
}

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    processData().then(setData);
  },[]);

  return data ? (
    <div>
      <TerrorDensityMap 
        longitude={  data[0].data } 
        latitude={  data[1].data }
        kills={ data[2].data }>
      </TerrorDensityMap>
    </div>
  ) : 'Loading...';
}

export default App;
