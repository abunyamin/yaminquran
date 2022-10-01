import React, {Component} from 'react'
import { Link } from "react-router-dom";
import Loading from './Loading'
import Helmet from 'react-helmet'

class ListSurah extends Component {
constructor(props){
  super(props)

  this.state = {
    surahs: [],
    loading: true,
  }
}

async componentDidMount() {
  const request = await fetch('https://equran.id/api/surat');

  const response = await request.json();

  this.setState({
    surahs: response,
    loading: false,
  })
}

  render(){

    return(
    <>
    
    <Helmet>
    <meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" rel="hoho" />
      <title>
        Selamat Datang di YaminQur'an
        </title>
      </Helmet>
    <div className="listSurah">
      <div className="headListSurah">
        <span className="active">Surah</span>
        <span></span>
        <span></span>
        <span></span>
      </div>

    <div className="surahList">

{this.state.loading ? <Loading /> :
this.state.surahs.map((surah, index) => 
       (
     <> 
     <Link to={`/${surah.nomor}`} key={index}>
      <div className="surah">
        <div className="surahIn">
<div className="numbSurah"><span>{surah.nomor}</span></div>
<div className="surahTitle">
  <h2>{surah.nama_latin}</h2>
  <span>{surah.tempat_turun} - {surah.jumlah_ayat} Ayat </span>
</div>
        </div>
        <span className="arabicTitle">{surah.nama}</span>
      </div>
      </Link>
      </>
      )
)}
    </div>
    </div>
    </>)
  }
}

export default ListSurah;