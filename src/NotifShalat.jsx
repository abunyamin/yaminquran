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

const timeNow = dateState.toLocaleString('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true,
})

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

  const jadwalNotif = (params) => {

    switch(i >= params){
      case params:
        return 'Aku';
      case params:
        return 'Aku 2';
      default:
       return 'Selamat Datang'
    }
  }

return (<>
  <span>{jadwalNotif(21)}</span>
  </>)
}

export default NotifShalat;