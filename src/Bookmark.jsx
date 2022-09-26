import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { RiLoginBoxLine, RiDeleteBin6Line } from 'react-icons/ri';
import GetApi from './GetApi';
import BookmarkDelete from './BookmarkDelete'

function Bookmark() {

  let datas = JSON.parse(localStorage.getItem('bookmark')) || false;

  const [isNotif, setIsNotif] = useState(false);
  const [notifDetail, setNotifDetail] = useState([])

  return (
    <>
      <div className="listAyat">
      {isNotif && <BookmarkDelete notif={!isNotif} detail={...notifDetail} setIsNotif={setIsNotif} />}
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
                  <Link to={`/${ayat.noSurat}#bookmark-${ayat.ayat}`}>
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
        )) : 'Selamat Membaca'}
      </div>
    </>
  );
}

export default GetApi(Bookmark);
