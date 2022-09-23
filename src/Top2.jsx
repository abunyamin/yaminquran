import React, { Component, useState } from 'react';
import { RiSearchLine, RiMenu2Fill, RiArrowLeftLine } from 'react-icons/ri';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SurahApi from './SurahApi';

function Top(props) {

  const { surah, loading } = props;
  const lokasi = location.pathname;
  const pathName = location.pathname.replace('/','');
  const [ayat, setAyat] = useState();
  const [suratId, setSuratId] = useState(1);
  const [ayatId, setAyatId] = useState(1);

  const navigate = useNavigate();

  const jumlah_ayat = surah.filter(suratid => suratid.nomor == pathName).map(surat => surat.jumlah_ayat)

  const [countAyat, setCountAyat] = useState(jumlah_ayat);
 
  const submitHandler = (event) => {
     if( pathName == suratId){
       event.preventDefault()
      document
  .getElementById(ayatId).scrollIntoView({ behavior: "smooth" })
      }else{
        navigate(`/${suratId}#search-${ayatId}`)
      }
};

  const suratHandler = (event) => {
    const listOption = event.target.list.querySelector(
      '[value="' + event.target.value + '"]'
    );

    if(listOption){
    setCountAyat(listOption.dataset.ayat);

    if (listOption.dataset.surat) {
      setSuratId(listOption.dataset.surat);
    } else {
      setSuratId(1);
    }
  }else if(listOption == null){
    setCountAyat(jumlah_ayat);
  }
    console.log('list option',listOption)
  };

  const ayatHandler = (event) => {
      setAyatId(event.target.value);
  };

  let ayatids = [];
  for (let i = 1; i <= countAyat; i++) {
    ayatids.push(<option value={i} />);
  }

  return (
    <>
      <header>
        <div className="navRight">
          {lokasi === '/' ? (
            <>
              <div className="topIcon">
                <RiMenu2Fill />
              </div>
            </>
          ) : (
            <>
              <Link to="/">
                <div className="topIcon">
                  <RiArrowLeftLine />
                </div>
              </Link>
            </>
          )}
          <div className="topTitle">
          </div>
        </div>
        <div className="topSearch">
          <form>
            <input
              list="suratSearch"
              type="text"
              id="inputSurat"
              onChange={suratHandler}
            />

            <datalist id="suratSearch">
              {surah.map((surat) => (
                <option
                  data-surat={surat.nomor}
                  data-ayat={surat.jumlah_ayat}
                  value={surat.nama_latin}
                />
              ))}
            </datalist>

            <input
              type="number"
              list="suratSearchId"
              id="inputAyat"
              onChange={ayatHandler}
            />
            <datalist id="suratSearchId">{ayatids}</datalist>
            <button className="searchIcon" onClick={submitHandler}>
              <RiSearchLine />
            </button>
          </form>
        </div>
      </header>
    </>
  );
}

export default SurahApi(Top);
