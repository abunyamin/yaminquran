import React, { useState, useEffect, useCallback } from 'react';

const NotifShalat = () => {

  const [loading, setLoading] = useState(true);
  const [jadwal, setJadwal] = useState(false);
  const [dateState, setDateState] = useState(new Date());

let dataLokasi = localStorage.getItem('location') || 1301;
const fulldate = new Date();
const date = fulldate.getDate();
const month = fulldate.getMonth();
const year = fulldate.getFullYear();

let time = dateState.toLocaleString('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
})

let timeNow = time.split(':')

timeNow = Number(timeNow[0]*60+Number(timeNow[1]))

const [, updatestate] = useState();
const forceUpdate = useCallback(() => updatestate({}), []);

useEffect(
  function () {
    async function getData() {
      const url = `https://api.myquran.com/v1/sholat/jadwal/${dataLokasi}/${year}/${month}/${date}`;
      const request = await fetch(url);
      const response = await request.json();

      setJadwal(response.data.jadwal);
      setLoading(false);
    }

    getData();
    setInterval(() => setDateState(new Date()), 1000);
    

  },[]);

  const i = 20;

  const shalatCount = (params, count, number) => {
    let shalat = jadwal[params] || '10:10';
    shalat = shalat.split(':')
    shalat = Number(shalat[0]*60+Number(shalat[1]))
    shalat = eval(shalat + count + number)
    return shalat
  }

  const jadwalNotif = () => {

    const data = ['imsak', 'subuh', 'terbit', 'dzuhur', 'ashar', 'maghrib', 'isya']
    
    for(let i = 0; i <= data.length; i++){
      if(timeNow >= shalatCount(data[i],'-',10) && timeNow < jadwal[data[i]]){
        return `${timeNow - jadwal.imsak}m sebelum waktu ${data[i]}`;
      }else if(timeNow <= shalatCount(data[i],'+',15)){
        return `Sekarang waktunya ${data[i]}`;
      }
    }

  }

return (<>
  <span>{jadwalNotif() || 'Selamat Datang'}</span>
  </>)
}

export default NotifShalat;