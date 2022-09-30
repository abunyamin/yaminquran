import React, { useState, useEffect, useCallback } from 'react';

const notifShalat = () => {

  const [loading, setLoading] = useState(true);
  const [jadwal, setJadwal] = useState(false);

let dataLokasi = localStorage.getItem('location') || 1301;
const fulldate = new Date();
const date = fulldate.getDate();
const month = fulldate.getMonth();
const year = fulldate.getFullYear();

const [, updatestate] = useState();
const forceUpdate = useCallback(() => updatestate(

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

    console.log(jadwal);
  },[]);

return (<>
  <span></span>
  </>)
}

export default notifShalat;