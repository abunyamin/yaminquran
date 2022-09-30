import React, { useState, useEffect, useCallback } from 'react';

const notifShalat = () => {

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

    console.log(jadwal);
  },[]);

  const jadwal = () => {
    console.log('jadwal sekarang')
  }

return (<>
  <span></span>
  </>)
}

export default notifShalat;