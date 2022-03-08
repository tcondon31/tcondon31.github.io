import logo from './logo.svg';
import './App.css';
import * as dfd from "danfojs";
import { useState, useEffect } from 'react'
import { RevolvingDot } from  'react-loader-spinner'
import { TerrorDensityMap } from './components/TerrorDensityMap'

const processData = async () => {
  let df = await dfd.readCSV('https://s3.us-east-2.amazonaws.com/misc.rajp33.com/globalterrorismdb_0221dist.csv');
  return scatterData(df);
}

const scatterData = (df) => {
  const grouped = df.groupby(['attacktype1_txt']);

  const lat = Object.entries(grouped.colDict).map(([key, value]) => {
    return value.latitude;
  })

  const long = Object.entries(grouped.colDict).map(([key, value]) => {
    return value.longitude;
  })

  let attackType = Object.entries(grouped.keyToValue).map(([key, value]) => {
    return value;
  })

  attackType = attackType.map((a) => { return a[0] })

  const nkills = Object.entries(grouped.colDict).map(([key, value]) => {
    return value.nkill;
  })

  const year = Object.entries(grouped.colDict).map(([key, value]) => {
    return value.iyear;
  })

  const month = Object.entries(grouped.colDict).map(([key, value]) => {
    return value.imonth;
  })

  const day = Object.entries(grouped.colDict).map(([key, value]) => {
    return value.iday;
  })

  const wounded = Object.entries(grouped.colDict).map(([key, value]) => {
    return value.nwound;
  })

  const weapon = Object.entries(grouped.colDict).map(([key, value]) => {
    return value.weaptype1_txt;
  })

  const target = Object.entries(grouped.colDict).map(([key, value]) => {
    return value.targtype1_txt;
  })

  const group = Object.entries(grouped.colDict).map(([key, value]) => {
    return value.gname;
  })

  const output = attackType.map((attackType, index) => {
    return {
      type: 'scattermapbox',
      name: attackType,
      lat: lat[index],
      lon: long[index],
      // customdata: [year[index], month[index], day[index], nkills[index]],
      customdata: year[index].map((y, i) => `<b>Date:</b> ${month[index][i]}/${day[index][i]}/${y}<br>
<b>Fatalities:</b> ${nkills[index][i]}<br>
<b>Wounded:</b> ${wounded[index][i]}<br>
<b>Weapon Used:</b> ${weapon[index][i]}<br>
<b>Target:</b> ${target[index][i]}<br>
<b>Terrorist Group:</b> ${group[index][i]}<br>`),
      hovertemplate: '%{customdata}',
   };
  });
  return output;
}

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    processData().then(setData);
  },[]);

  return data ? (
    <div
    style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
      <TerrorDensityMap 
        data={data}>
      </TerrorDensityMap>
    </div>
  ) : <div
    style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
      <RevolvingDot color="#00BFFF" height={200} width={200} />
    </div>;
}

export default App;
