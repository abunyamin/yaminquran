import React, { useEffect } from 'react'
import { RiBookOpenLine } from "react-icons/ri";
import { Link } from 'react-router-dom'

function LastRead (props) {

  const data = JSON.parse(localStorage.getItem('lastread')) || null;

  useEffect(() => {

  },[])
  
  console.log('Last Read', data)
    return(
    <>

    <div className="lastRead">
      
    {data ?
      (<><div className="lastReadHead">
        <RiBookOpenLine />
        <span>Last Read</span>
      </div>
      <Link to={`/${data.noSurat}#lastread-${data.ayat}`}>
      <h2>{data.namaSurat}</h2>
      <span>Ayat No : <b>{data.ayat}</b></span>
      </Link></>) : 'Kosong'
    }
    </div>
    </>)
  }


export default LastRead;