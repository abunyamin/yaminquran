import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

const SurahApi = Original => {

  const Surah = () => {

    const [ayats, setAyats] = useState([]);
    const [surah, setSurah] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(function () {
      async function getData() {
        const request = await fetch(`https://equran.id/api/surat`);
        const response = await request.json();

        setSurah(response);
        setLoading(false)
      }

      getData();

    }, [loading]);  

    return (<>
    <Original surah={surah} loading={loading} />
    </>)
    }
    return Surah

}

export default SurahApi