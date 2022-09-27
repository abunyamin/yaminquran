import React from 'react'


function BookmarkDelete(props, {setIsNotif}) {

  const {detail} = props
  
  let datas = JSON.parse(localStorage.getItem('bookmark')) || [];
  console.log(detail)
    return(<>
  {detail.map((ayat)=> 
    <>
  
      <div className="notifDelete">
        <div className="notifDeleteBody">
      <div className="notifHead">
        Are you sure want delete ?
        </div>
        <div className="notifDetail">{ayat.nama_latin} ({ayat.surah}) - ayat {ayat.nomor}</div>
      <div className="notifFooter">
      <button class="buttonDelete"
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
  
                    }}>YES</button>
      <button class="buttonClose" onClick={() => props.setIsNotif(false)}>NO</button>
      </div>
    </div>
    </div>
    </>
  )}
  
    </>)
  }

  export default BookmarkDelete;