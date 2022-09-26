import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { RiLoginBoxLine, RiDeleteBin6Line } from 'react-icons/ri';
import GetApi from './GetApi';

function Notif(props, {setIsNotif}) {

const {detail} = props

let datas = JSON.parse(localStorage.getItem('bookmark')) || [];

  return(<>
{detail.map((ayat)=> 
  <>

    <div className="notifDelete">
      <div className="notifDeleteBody">
    <div className="notifHead">
      Are you sure want delete ?
      </div>
      <div className="notifDetail">{ayat.nama_surat} ({ayat.no_surat}) - ayat {ayat.ayat}</div>
    <div className="notifFooter">
    <button class="buttonDelete"
                  onClick={() => {
                    localStorage.setItem(
                      'bookmark',
                      JSON.stringify(
                        datas.filter(
                          (item) =>
                            item.ayat != ayat.ayat ||
                            item.noSurat != ayat.no_surat
                        )
                      )
                    );
                  
                    props.setIsNotif(false)

                  }}>YES</button>
    <button class="buttonClose" onClick={() => props.setIsNotif(false)}>NO</button>
    </div>
  </div>
  </div>
  </>
)}

  </>)
}

function Bookmark() {

  let datas = JSON.parse(localStorage.getItem('bookmark')) || [
    { ayat: 'kosong', surat: 'kosong' },
  ];

  const [ayat, setAyat] = useState([]);
  const [surat, setSurat] = useState([]);
  const [isNotif, setIsNotif] = useState(false);
  const [notifDetail, setNotifDetail] = useState([])

  return (
    <>
      <div className="listAyat">
      {isNotif && <Notif notif={!isNotif} detail={...notifDetail} setIsNotif={setIsNotif} />}
        {datas !== [] ? datas.map((ayat) => (
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
                  {no_surat: ayat.noSurat,
                  nama_surat: ayat.namaSurat,
                  ayat: ayat.ayat,
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
