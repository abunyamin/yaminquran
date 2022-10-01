import React, { useState, useEffect, useCallback } from 'react';
import Kota from './Kota';
import { RiSettings4Fill } from 'react-icons/ri';
import moment from 'moment-hijri';
import Nshalat from './Nshalat';
import useForceUpdate from 'use-force-update';

const Shalat = () => {
  const [idKota, setIdKota] = useState(false);
  const [fixKota, setFixKota] = useState(1301);
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [jadwal, setJadwal] = useState(false);
  const [lokasi, setLokasi] = useState([]);
  const [close, setClose] = useState(true);
  
  const [dateState, setDateState] = useState(new Date());

  let dataLokasi = localStorage.getItem('location') || 1301;

  let time = dateState.toLocaleString('id', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const fulldate = new Date();
  const date = fulldate.getDate();
  const month = fulldate.getMonth()+1;
  const year = fulldate.getFullYear();

  const [, updatestate] = useState();
  const forceUpdate = useCallback(() => updatestate({}), []);

  let dateHijri = moment().format('iYYYY/iMM/iD');
  let iDate = dateHijri.split('/');

  const hijriMonth = ['Muharram', 'Safar', 'Rabiul awal', 'Rabiul akhi', 'Jumadil awal', 'Jumadil akhir', 'Rajab', 'Syakban', 'Ramadhan', 'Syawal', 'Dzulkaidah', 'Dzulhijjah']

  const iMonth = hijriMonth[parseInt(iDate[1]-1)]

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
        
        let jadwalDesc = document.getElementById('jadwalDesc')

        if(jadwalDesc){
          jadwalDesc.setAttribute('style', 'animation: bounce 2s ease;')
        }
      }

      getData();

      setFixKota(lokasi.lokasi);

    },
    [loading, idKota, fixKota]
  );

  const data = ['imsak', 'subuh', 'terbit', 'dzuhur', 'ashar', 'maghrib', 'isya']

    let jadwalList = [];
    for(let i = 0; i <= data.length-1; i++){
      jadwalList.push(<div className="jadwalItem"> <span className="namaWaktu">{data[i]}</span>
      <span className="waktu">{jadwal[data[i]]}</span></div>)
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

      <div className="jadwalDesc" id="jadwalDesc">
        <div className="jadwalDescHead">
          <span>{iDate[2]} {iMonth} {iDate[0]}</span>
          <span>{time}</span>
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
        {jadwalList}
      </div>
    </>
  );
};

export default Shalat;
