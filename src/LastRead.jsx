import React, { useEffect } from 'react'
import { RiBookOpenLine } from "react-icons/ri";
import { Link } from 'react-router-dom'

function LastRead (props) {

  const data = JSON.parse(localStorage.getItem('lastread')) || null;

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
      </Link></>) : <div class="lastReadStar"> <div className="lastReadStarHead">Keutamaan membaca Al-Quran</div> <div className="lastReadStarContain">“Seorang yang lancar membaca Al Quran akan bersama para malaikat yang mulia dan senantiasa selalu taat kepada Allah, adapun yang membaca Al Quran dan terbata-bata di dalamnya dan sulit atasnya bacaan tersebut maka baginya dua pahala.” </div>
      (HR: Muslim)
      </div>
    }
    </div>
    </>)
  }


export default LastRead;