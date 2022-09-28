import React, { useState, useEffect } from 'react'
import Kota from './Kota'


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
  const url = `https://api.myquran.com/v1/sholat/jadwal/${idKota? idKota : 1301}/${year}/${month}/${date}`

  useEffect(function () {
 
    async function getData() {
      const request = await fetch(url);
      const response = await request.json();

      setJadwal(response.data.jadwal);
      setLokasi(response.data)
      setLoading(false)
    }

    getData();

    for (const [key, value] of Object.entries(jadwal)) {
      console.log(key, value);
    }

    setIdKota(dataLokasi)
  }, [loading, idKota]);

const submitHandler = async(event) => {    
    event.preventDefault()
    setSubmit(true)
  }

    let jadwalList = []
    for (const [nama, waktu] of Object.entries(jadwal)) {
      jadwalList.push(<div className="jadwalItem"><span>{nama}</span> <span>{waktu}</span></div>)
    }

  console.log('tanggal', url)
  console.table('jadwal', jadwal)
  console.log('jadwal', lokasi)
  
  return(<>
  {/* <form onSubmit={submitHandler}>
    <Kota setIdKota={setIdKota} submit={submit} setSubmit={setSubmit} idKota={idKota} />
    <button>LOKASI</button>
    </form> */}
    <span>{submit && idKota}</span>
    <div className="jadwal">
      {/* {Object.keys(jadwal).map((jadwal)=> (<>
        <div className="jadwalName"><span>Jadwal</span> <span>{jadwal}</span></div>

      </>))} */}

{jadwalList}
    </div>
  </>)
}

export default Shalat;