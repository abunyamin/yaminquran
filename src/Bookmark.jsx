import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { RiLoginBoxLine, RiDeleteBin6Line, RiBookmarkLine } from 'react-icons/ri';
import GetApi from './GetApi';
import BookmarkDelete from './BookmarkDelete'
import Helmet from 'react-helmet'

function Bookmark() {

  // let datas = JSON.parse(localStorage.getItem('bookmark')) || false;

  let data = JSON.parse(localStorage.getItem('bookmark'))
  let datas = !data ? false : data == '' ? false : data;

  const [isNotif, setIsNotif] = useState(false);
  const [notifDetail, setNotifDetail] = useState([])

  return (
    <>
    
    <Helmet>
      <title>
        Bookmark
        </title>
      </Helmet>

      <div className="listAyat">
      {isNotif && <BookmarkDelete detail={...notifDetail} setIsNotif={setIsNotif} />}
      
        {datas ? datas.map((ayat) => (
          <div className="ayatItem" key={ayat.ayat}>
            <div className="headAyat">
              <div className="numbAyat">
                <span>{ayat.ayat}</span>
              </div>
              {ayat.namaSurat} ( {ayat.noSurat} )
              <div className="more">
                <span onClick={()=> {
                setIsNotif(true)
                setNotifDetail([
                  {surah: ayat.noSurat,
                  nama_latin: ayat.namaSurat,
                  nomor: ayat.ayat,
                  }
                ])
                }}><RiDeleteBin6Line /></span>

                <span>
                  <Link to={`/${ayat.noSurat}#search-${ayat.ayat}`}>
                    <RiLoginBoxLine />
                  </Link>
                </span>
              </div>
            </div>
            <div className="ayatRead">
              <div className="ayat">{ayat.arab}</div>
              <div className="tr">{ayat.idn}</div>
            </div>
          </div>
        )) : (<>
          <div className="notBookmark">
            <div className="headNotBookmark">Tidak ada Data Bookmark</div>
            <Link to="/"><div className="descNotBookmark">
           <RiBookmarkLine /> <span>Tambah Bookmark</span>
            </div></Link>
          </div>
          </>)}
      </div>
    </>
  );
}

export default GetApi(Bookmark);
