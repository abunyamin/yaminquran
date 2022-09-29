import React, { useState, useEffect, useCallback } from 'react'
import Kota from './Kota'
import useForceUpdate from "use-force-update";

const Shalat = () => {

  const [idKota, setIdKota] = useState(1301);
  const [submit, setSubmit] = useState(false)
  const [loading, setLoading] = useState(true)
  const [jadwal, setJadwal] = useState(false)
  const [lokasi, setLokasi] = useState([])
  let dataLokasi = localStorage.getItem('location')

  const fulldate = new Date()
  const date = fulldate.getDate()
  const month = fulldate.getMonth()
  const year = fulldate.getFullYear()

  const [, updatestate] = useState();
const forceUpdate = useCallback(() => updatestate({}), []);

  useEffect(function () {

 
    async function getData() {
      const url = `https://api.myquran.com/v1/sholat/jadwal/${idKota ? idKota : 1301}/${year}/${month}/${date}`
      const request = await fetch(url);
      const response = await request.json();

      setJadwal(response.data.jadwal);
      setLokasi(response.data)
      setLoading(false)
    }

    getData();

    setIdKota(dataLokasi)
    console.log(lokasi)
    console.log(jadwal)

  }, [loading, idKota]);

    let jadwalList = []
    for (const [nama, waktu] of Object.entries(jadwal)) {
      jadwalList.push(<div className="jadwalItem"><span className="namaWaktu">{nama}</span> <span className="waktu">{waktu}</span></div>)
    }
  
  return(<>
<div className="card">
  <div className="cardIn">
    <div className="cardHead">
{lokasi.daerah} - {lokasi.lokasi}</div></div>
</div>
    <span onClick={()=> {
    console.log('di click')
    // forceUpdate()
    }}>{idKota} && {dataLokasi}</span>
    <div className="jadwal">
{jadwalList}
    </div>
  </>)
}

export default Shalat;