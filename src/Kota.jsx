import React, { useState, useEffect} from 'react'

  const Kota = ({setIdKota, submit, idKota, setSubmit}) => {

    const [kota, setKota] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(function () {
      async function getData() {
        const request = await fetch(`https://api.myquran.com/v1/sholat/kota/semua`);
        const response = await request.json();

        setKota(response);
        setLoading(false)
      }

      getData();
    }, [loading]);

    const kotaHandler = (event) => {
      const listOption = event.target.list.querySelector(
        '[value="' + event.target.value + '"]'
      );

      if(listOption){
        setIdKota(listOption.dataset.id)
        console.log('kota terpilih', listOption.dataset.id)
    }
  }

    return (<>
{!loading && 
 (<>
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
</>)
}
  </>)
}

export default Kota