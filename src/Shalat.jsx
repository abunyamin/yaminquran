import React, { useState, useEffect, useCallback } from 'react';
import Kota from './Kota';
import { RiSettings4Fill } from 'react-icons/ri';
import HijrahDate from 'hijrah-date';
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

  let dateH = new Date(1998, 7, 24);
  let hijrahDate = new HijrahDate(dateH);

  const [, updatestate] = useState();
  const forceUpdate = useCallback(() => updatestate({}), []);

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

  let jadwalList = [];
  for (const [nama, waktu] of Object.entries(jadwal)) {
    jadwalList.push(
      <div className="jadwalItem">
        <span className="namaWaktu">{nama}</span>{' '}
        <span className="waktu">{waktu}</span>
      </div>
    );
  }

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
          <span></span>
          <span>
            {date} - {month} - {year}
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
      <div className="jadwal">{jadwalList}</div>
    </>
  );
};

export default Shalat;
