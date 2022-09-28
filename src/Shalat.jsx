import React, { useState, useEffect } from 'react'
import Kota from './Kota'


const Shalat = () => {

  const [idKota, setIdKota] = useState(1301);
  const [submit, setSubmit] = useState(false)
  const [loading, setLoading] = useState(true)
  const [jadwal, setJadwal] = useState(false)
  const [lokasi, setLokasi] = useState([])
  // const [tanggal, setTanggal] = useState(1)

  const fulldate = new Date()
  const date = fulldate.getDate()
  const month = fulldate.getMonth()
  const year = fulldate.getFullYear()
  const url = `https://api.myquran.com/v1/sholat/jadwal/${idKota}/${year}/${month}/${date}`

  useEffect(function () {
 
    async function getData() {
      const request = await fetch(url);
      const response = await request.json();

      setJadwal(response.data.jadwal);
      setLokasi(response.data)
      setLoading(false)
    }

    getData();
  }, [loading]);

const submitHandler = async(event) => {    
    event.preventDefault()
    setSubmit(true)
  }

  console.log('tanggal', url)
  console.log('jadwal', jadwal)
  console.log('jadwal', lokasi)

  
  return(<>
  <form onSubmit={submitHandler}>
    <Kota setIdKota={setIdKota} submit={submit} setSubmit={setSubmit} idKota={idKota} />
    <button>LOKASI</button>
    </form>
    <span>{submit && idKota}</span>
    <div className="jadwal">
      {/* {jadwal.map((jadwal)=> (<>
        <div className="jadwalName"></div>
      </>))} */}
    </div>
  </>)
}

export default Shalat;