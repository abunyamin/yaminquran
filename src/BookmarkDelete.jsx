import React from 'react'


function BookmarkDelete(props, {setIsNotif}) {

  const {detail} = props
  
  let datas = JSON.parse(localStorage.getItem('bookmark')) || [];

    return(<>
  {detail.map((ayat)=> 
    <>
  
      <div className="notifDelete">
        <div className="notifDeleteBody">
      <div className="notifHead">
        Apakah anda ingin menghapus ?
        </div>
        <div className="notifDetail">{ayat.nama_latin} ({ayat.surah}) - ayat {ayat.nomor}</div>
      <div className="notifFooter">
      <button className="buttonDelete"
                    onClick={() => {
                      localStorage.setItem(
                        'bookmark',
                        JSON.stringify(
                          datas.filter(
                            (item) =>
                              item.ayat != ayat.nomor ||
                              item.noSurat != ayat.surah
                          )
                        )
                      );
                    
                      props.setIsNotif(false)
  
                    }}>IYA</button>
      <button className="buttonClose" onClick={() => props.setIsNotif(false)}>TIDAK</button>
      </div>
    </div>
    </div>
    </>
  )}
  
    </>)
  }

  export default BookmarkDelete;