import React, { useState, useEffect, useCallback } from 'react';


const Nshalat = () => {
  const [jadwal, setJadwal] = useState(false);
  const [url, setUrl] = useState('https://api.myquran.com/v1/sholat/jadwal/1301/2022/7/23');

  let dataLokasi = localStorage.getItem('location') || 1301;
  
  const fulldate = new Date();
  const date = fulldate.getDate();
  const month = fulldate.getMonth()+1;
  const year = fulldate.getFullYear();

  useEffect(
    function () {
      async function getData() {
        const request = await fetch(`https://api.myquran.com/v1/sholat/jadwal/1301/2022/07/23`);
        const response = await request.json();

        setJadwal(response.data.jadwal);

        }

      getData();

    },
    []
  );

  return(<>
  <span>jadwal {jadwal.imsak}</span>
  </>)
}

export default Nshalat;