import React, { useState, useEffect, useCallback } from 'react';
import Kota from './Kota';
import { RiSettings4Fill } from 'react-icons/ri';
import moment from 'moment-hijri';
import useForceUpdate from 'use-force-update';

const Shalat = () => {
  const [idKota, setIdKota] = useState(false);
  const [fixKota, setFixKota] = useState(1301);
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [jadwal, setJadwal] = useState(false);
  const [lokasi, setLokasi] = useState([]);
  const [close, setClose] = useState(true);

  let dataLokasi = localStorage.getItem('location') || 1301;

  const fulldate = new Date();
  const date = fulldate.getDate();
  const month = fulldate.getMonth();
  const year = fulldate.getFullYear();

  const [, updatestate] = useState();
  const forceUpdate = useCallback(() => updatestate({}), []);

  const dateHijri = moment().format('iYYYY/iMMMM/iD')

  useEffect(
    function () {
      async function getData() {
        const url = `https://api.myquran.com/v1/sholat/jadwal/${
          idKota ? fixKota : dataLokasi
        }/${year}/${month}/${date}`;
        const request = await fetch(url);
        const response = await request.json();

        setJadwal(response.data.jadwal);
        setLokasi(response.data);
        setLoading(false);
      }

      getData();

      setFixKota(lokasi.lokasi);

      console.log(lokasi);
      console.log(jadwal);
    },
    [loading, idKota, fixKota]
  );

  console.log('fixKota', fixKota);

  // let jadwalList = [];
  // for (const [nama, waktu] of Object.entries(jadwal)) {
  //   jadwalList.push(
  //     <div className="jadwalItem">
  //       <span className="namaWaktu">{nama}</span>{' '}
  //       <span className="waktu">{waktu}</span>
  //     </div>
  //   );
  // }

  return (
    <>
      {!close && (
        <Kota
          idKota={idKota}
          setIdKota={setIdKota}
          submit={submit}
          setSubmit={setSubmit}
          fixKota={fixKota}
          setFixKota={setFixKota}
          close={close}
          setClose={setClose}
          lokasi={lokasi}
        />
      )}

      <div className="jadwalDesc">
        <div className="jadwalDescHead">
          <span>{dateHijri}</span>
          <span>
            {date} / {month} / {year}
          </span>
        </div>
        <div className="jadwalDescBody">
          <span>
            {lokasi.daerah} - {lokasi.lokasi}
          </span>
          <span onClick={() => setClose(false)}>
            <RiSettings4Fill />
          </span>
        </div>
      </div>
      <div className="jadwal">
    <div className="jadwalItem"> <span className="namaWaktu">Imsak</span>
        <span className="waktu">{jadwal.imsak}</span></div>
        <div className="jadwalItem"> <span className="namaWaktu">Subuh</span>
        <span className="waktu">{jadwal.subuh}</span></div>
        <div className="jadwalItem"> <span className="namaWaktu">Terbit</span>
        <span className="waktu">{jadwal.terbit}</span></div>
        <div className="jadwalItem"> <span className="namaWaktu">Dhuha</span>
        <span className="waktu">{jadwal.dhuha}</span></div>
        <div className="jadwalItem"> <span className="namaWaktu">Dzuhur</span>
        <span className="waktu">{jadwal.dzuhur}</span></div>
        <div className="jadwalItem"> <span className="namaWaktu">Ashar</span>
        <span className="waktu">{jadwal.ashar}</span></div>
        <div className="jadwalItem"> <span className="namaWaktu">Maghrib</span>
        <span className="waktu">{jadwal.maghrib}</span></div>
        <div className="jadwalItem"> <span className="namaWaktu">Isya</span>
        <span className="waktu">{jadwal.isya}</span></div>
      </div>
    </>
  );
};

export default Shalat;
