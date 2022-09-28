import React, { useState } from 'react'
import Kota from './Kota'

const Shalat = () => {

  const [idKota, setIdKota] = useState(false);
  const [submit, setSubmit] = useState(false)
console.log('idkota', idKota)

const submitHandler = async(event) => {    
    setSubmit(true)
    event.preventDefault()

    if(idKota){
    console.log(submit)
    }
  }

  return(<>
  <form onSubmit={submitHandler}>
    <Kota setIdKota={setIdKota} submit={submit} setSubmit={setSubmit} idKota={idKota} />
    <button>LOKASI</button>
    </form>
    <span>{idKota}</span>
  </>)
}

export default Shalat;