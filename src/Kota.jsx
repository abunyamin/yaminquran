import React, { useState, useEffect} from 'react'
import { RiMapPin2Line } from 'react-icons/ri'

  const Kota = ({setIdKota, submit, idKota, setSubmit, setFixKota, close, setClose, lokasi}) => {

    const [kota, setKota] = useState([]);
    const [loading, setLoading] = useState(true)
    let dataLokasi = localStorage.getItem('location')

    useEffect(function () {
      async function getData() {
        const request = await fetch(`https://api.myquran.com/v1/sholat/kota/semua`);
        const response = await request.json();

        setKota(response);
        setLoading(false)
      }

console.log('idKota', idKota)
      getData();
    }, [loading, idKota]);

    const submitHandler = (event) => {
      event.preventDefault();
    if(idKota){
        setSubmit(true)
        localStorage.setItem('location', idKota)
        setFixKota(idKota)
        console.log('Submit handler', submit)
    }else{
      document.getElementById('inputkota').focus()
    }
  }

    const kotaHandler = (event) => {
      const listOption = event.target.list.querySelector(
        '[value="' + event.target.value + '"]'
      );
      setSubmit(false)

      if(listOption){
        setIdKota(listOption.dataset.id)
        console.log('kota terpilih', listOption.dataset.id)
    }
  }

    return (<>
{!loading && 
 (<>
 <div className="location">
 <div className="changeLocation">
   <div className="locationHead">
     <RiMapPin2Line /> LOKASI : {lokasi.lokasi} {idKota ? idKota : dataLokasi} - submit : {submit ? 'true' : 'false'}
   </div>
          <form>
              <input
                  type="text"
                  list="namakota"
                  id="inputkota"
                  onChange={kotaHandler}
                /> 
                <datalist id="namakota">
                {kota.map((kota) =>
                <option key={kota.id} data-id={kota.id} value={kota.lokasi} />
                )}
                </datalist>
            <div className="changeButton">
            <button className="buttonChange" onClick={submitHandler}>{submit ? 'BERHASIL' : 'UBAH'}</button>
            <button className="buttonClose" onClick={(event) => { 
              event.preventDefault();
              setClose(true)}}>KELUAR</button>
            </div>
           </form>
  </div>
  </div>
</>)
}
  </>)
}

export default Kota