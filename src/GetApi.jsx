import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

const GetApi = Original => {

  const Ayat = () => {

    const [ayats, setAyats] = useState([]);
    const [ayatSurah, setAyatSurah] = useState([]);
    const [loading, setLoading] = useState(true)
    const ayat = location.pathname

    useEffect(function () {
      async function getData() {
        const request = await fetch(`https://equran.id/api/surat/${ayat}`);
        const response = await request.json();
  
        setAyats(response.ayat);
        setAyatSurah(response);
        setLoading(false)
      }

      getData();

    }, [loading]);  

    return (<>
    <Original ayat={ayats} surat={ayatSurah} loading={loading} ayatid={...ayat} />
    </>)
    }
    return Ayat

}

export default GetApi