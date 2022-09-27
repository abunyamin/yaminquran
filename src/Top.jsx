import React, { Component, useState, useEffect } from 'react';
import { RiSearchLine, RiMenu2Fill, RiArrowLeftLine } from 'react-icons/ri';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SurahApi from './SurahApi';

function Top(props) {
  const { surah, loading } = props;
  const lokasi = location.pathname;
  const pathName = location.pathname.replace('/', '');
  const [searchButton, setSearchButton] = useState(false);
  const [suratId, setSuratId] = useState(1);
  const [ayatId, setAyatId] = useState(1);
  const [selectSurat, setSelectSurat] = useState(false);

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

    if (pathName == suratId || pathName >= 1) {
      const ayat = ayatId > parseInt(jumlah) ? parseInt(jumlah) : ayatId;
      document
        .getElementById(ayat)
        .scrollIntoView({ behavior: 'smooth', block: 'center' });
      window.location.href.split('#')[0];
    } else if (searchButton) {
      navigate(`/${suratId}#search-${ayatId}`);
    }
  };

  const suratHandler = (event) => {
    const listOption = event.target.list.querySelector(
      '[value="' + event.target.value + '"]'
    );

    setSelectSurat(true);

    if (listOption) {
      setCountAyat(listOption.dataset.ayat);

      if (listOption.dataset.surat) {
        setSuratId(listOption.dataset.surat);
      } else {
        setSuratId(1);
      }
    } else if (listOption == null) {
      setCountAyat(jumlah_ayat);
    }
    console.log('list option', listOption);
  };

  const ayatHandler = (event) => {
    setAyatId(event.target.value);
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
          'display: none; position: fixed; left: 0; right: 0; top: 0; padding: 45px 24px 24px; height: 85px; z-index: 99; box-shadow: 0px 5px 15px -3px rgba(0,0,0,0.4);'
        );

        document.addEventListener('dblclick', (event) => {
          // event.preventDefault()
          div.style.display = 'flex';
        });
      } else {
        // div.style.position= 'relative'
        div.removeAttribute('style');
      }
    });
  }, []);

  console.log('Bookmark', pathName)

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
            <span>
              {pathName >= 1 ? nama_surat : !searchButton ? 'YaminQuran' : pathName == 'bookmark' && 'Bookmark'}
            </span>
          </div>
        </div>
        <div className="topSearch">
          <form>
            {!pathName >= 1 ? (
              searchButton ? (
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
                      <option
                        data-surat={surat.nomor}
                        data-ayat={surat.jumlah_ayat}
                        value={surat.nama_latin}
                      />
                    ))}
                  </datalist>
                </>
              ) : null
            ) : null}

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
            ) : pathName >= 1 ? (
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
            ) : null}

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
