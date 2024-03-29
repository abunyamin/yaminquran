import React, { useState, useEffect} from 'react'

const SurahApi = Original => {

  const Surah = () => {

    const [surah, setSurah] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(function () {
      async function getData() {
        const request = await fetch(`/api/surat.json`);
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
