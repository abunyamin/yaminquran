import React, { useState, useEffect } from 'react';
import { RiSearchLine, RiHome3Line, RiArrowLeftLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import SurahApi from './SurahApi';

function Top(props) {
  const { surah } = props;
  const lokasi = location.pathname;
  const pathName = location.pathname.replace('/', '');
  const [searchButton, setSearchButton] = useState(false);
  const [suratId, setSuratId] = useState(1);
  const [ayatId, setAyatId] = useState(1);
  const [selectSurat, setSelectSurat] = useState(false);
  const [selectAyat, setSelectAyat] = useState(false);

  const navigate = useNavigate();

  const jumlah_ayat = surah
    .filter((suratid) => suratid.nomor == pathName)
    .map((surat) => surat.jumlah_ayat);

  const nama_surat = surah
    .filter((suratid) => suratid.nomor == pathName)
    .map((surat) => surat.nama_latin);

  const jumlah = JSON.stringify(jumlah_ayat).replace('[', '').replace(']', '');

  const [countAyat, setCountAyat] = useState(parseInt(jumlah));

  const submitHandler = (event) => {
    event.preventDefault();
    setSearchButton(true);

    const ayat = ayatId > parseInt(jumlah) ? parseInt(jumlah) : ayatId < 1 ? 1 : ayatId;

    if (pathName == suratId || pathName >= 1) {     
      document
        .getElementById(ayat)
        .scrollIntoView({ behavior: 'smooth', block: 'center' });
      window.location.href.split('#')[0];
      setSearchButton(false);

    }else{
      if (selectSurat && !selectAyat) {
      document.getElementById('inputAyat').focus()
    }else if (searchButton && !selectSurat){
      document.getElementById('inputSurat').focus()
    }else if (selectSurat && selectAyat){
      navigate(`/${suratId}#search-${ayat}`);
      setSearchButton(false);
      setSelectSurat(false);
      setSelectAyat(false)
    }
  }
  };

  const suratHandler = (event) => {
    const listOption = event.target.list.querySelector(
      '[value="' + event.target.value + '"]'
    );

    if (listOption) {
      setCountAyat(listOption.dataset.ayat);

      setSelectSurat(true);

      if (listOption.dataset.surat) {
        setSuratId(listOption.dataset.surat);
      } else {
        setSuratId(1);
      }
    } else if (!listOption) {
      setSelectSurat(false);
      setCountAyat(jumlah_ayat);
    }

  };

  const ayatHandler = (event) => {
    setAyatId(event.target.value);

    if(event.target.value){
      setSelectAyat(true);
    }else{
      setSelectAyat(false);
    }
  };

  let ayatids = [];
  for (let i = 1; i <= countAyat; i++) {
    ayatids.push(<option key={i} value={i} />);
  }

  let ayatids2 = [];
  for (let i = 1; i <= jumlah_ayat; i++) {
    ayatids2.push(<option key={i} value={i} />);
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      let div = document.querySelector('header');

      if (document.documentElement.scrollTop > 150) {
        div.setAttribute(
          'style',
          'display: none; position: fixed; left: 0; right: 0; top: 0; padding: 24px 24px 24px; height: 85px; z-index: 99; box-shadow: 0px 5px 15px -3px rgba(0,0,0,0.4);'
        );

        document.addEventListener('dblclick', (event) => {

          div.style.display = 'flex';
        });
      } else {
        div.removeAttribute('style');
      }
    });
  }, []);

  return (
    <>
      <header>
        <div className="navRight">
          {lokasi === '/' ? (
            <>
              <div className="topIcon">
                <RiHome3Line />
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
            <span>
              {pathName >= 1 ? nama_surat : pathName == 'bookmark' ? 'Penanda Buku' : pathName == 'shalat' ? 'Jadwal Shalat' : !searchButton && 'YaminQuran' }
            </span>
          </div>
        </div>
        <div className="topSearch">
          <form>
            {!pathName >= 1 && (
              searchButton && (
                <>
                  <input
                    list="suratSearch"
                    type="text"
                    id="inputSurat"
                    placeholder="Surat..."
                    onChange={suratHandler}
                  />

                  <datalist id="suratSearch">
                    {surah.map((surat) => (
                      <option key={surat.nomor}
                        data-surat={surat.nomor}
                        data-ayat={surat.jumlah_ayat}
                        value={surat.nama_latin}
                      />
                    ))}
                  </datalist>
                </>
              )
            )}

            {selectSurat ? (
              <>
                <input
                  type="number"
                  list="suratSearchId"
                  id="inputAyat"
                  placeholder="Ayat..."
                  onChange={ayatHandler}
                />
                <datalist id="suratSearchId">
                  {pathName >= 1 ? ayatids2 : ayatids}
                </datalist>
              </>
            ) : pathName >= 1 && (
              <>
                <input
                  type="number"
                  list="suratSearchId"
                  id="inputAyat"
                  onChange={ayatHandler}
                /> 
                <datalist id="suratSearchId">
                  {pathName >= 1 ? ayatids2 : ayatids}
                </datalist>
              </>
            )}
{pathName != 'bookmark' && pathName != 'shalat' && <button className="searchIcon" onClick={submitHandler}>
              <RiSearchLine />
            </button> }
          </form>
        </div>
      </header>
    </>
  );
}

export default SurahApi(Top);
