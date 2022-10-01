import React, { useState, useEffect, useCallback } from 'react';

const NotifShalat = () => {
  const [loading, setLoading] = useState(true);
  const [jadwal, setJadwal] = useState(false);
  const [dateState, setDateState] = useState(new Date());

  let dataLokasi = localStorage.getItem('location') || 1301;

  const fulldate = new Date();
  const date = fulldate.getDate();
  const month = fulldate.getMonth() + 1;
  const year = fulldate.getFullYear();

  let time = dateState.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  const [, updatestate] = useState();
  const forceUpdate = useCallback(() => updatestate({}), []);

  useEffect(function () {
    async function getData() {
      const url = `https://api.myquran.com/v1/sholat/jadwal/${dataLokasi}/${year}/${month}/${date}`;
      const request = await fetch(url);
      const response = await request.json();

      setJadwal(response.data.jadwal);
      setLoading(false);
    }

    getData();
    setInterval(() => setDateState(new Date()), 1000);
    if (jadwal) {
      console.log('jadwal notif', jadwal);
    }
  }, []);

  // Menghitung parameter waktu menjadi menit
  // ex: 04:08 mejadi 248

  const countTime = (params) => {
    let count = params.split(':');

    count = Number(count[0] * 60 + Number(count[1]));

    return count;
  };

  const shalatCount = (params, count, number) => {
    let shalat = jadwal[params] || '10:10';
    shalat = shalat.split(':');
    shalat = Number(shalat[0] * 60 + Number(shalat[1]));
    shalat = eval(shalat + count + number);
    return shalat;
  };

  const data = [
    'imsak',
    'subuh',
    'terbit',
    'dzuhur',
    'ashar',
    'maghrib',
    'isya',
  ];

  const jadwalNotif = () => {
    if (jadwal) {
      for (let i = 0; i <= data.length; i++) {
        if (
          countTime(time) >= shalatCount(data[i], '-', 10) &&
          countTime(time) < shalatCount(data[i])
        ) {
          return `${
            shalatCount(data[i]) - shalatCount(data[i], '-', 10)
          }m sebelum waktu ${data[i]}`;
        }

        if (countTime(time) >= shalatCount(data[i],'+', 0) && countTime(time) <= shalatCount(data[i],'+', 9)) {
          return `Sekarang waktunya ${data[i]}`;
        }
      }
    }
  };

  return (
    <>
      <span>{jadwalNotif() || 'Selamat Datang' + countTime(time) + ' dan ' + shalatCount('subuh','+', 15)}</span>
    </>
  );
};

export default NotifShalat;
