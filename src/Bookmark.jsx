import React, { useState, useEffect } from 'react'
import { RiShareLine, RiBookmarkLine } from 'react-icons/ri';
import GetApi from './GetApi'
import useForceUpdate from 'use-force-update';

function Bookmark (){

  let data = localStorage.getItem('bookmark');
  let datas = JSON.parse(localStorage.getItem('bookmark')) || [{ayat: 'kosong', surat: 'kosong'}];
  
  const forceUpdate = useForceUpdate()
  const [ayat, setAyat] = useState([])
  const [surat, setSurat] = useState([])
  
  useEffect(function () {
    async function getData() {
      const request = await fetch(`https://equran.id/api/surat`);
      const response = await request.json();

      setSurat(response);

    }

    getData();

  }, []);  

const ob = [{
  noSurat: 1,
  namaSurat: 'Al Fatihah',
  ayat: 3,
}]

  function clearData() {
  localStorage.removeItem('bookmark');
  console.log('clear bookmark', JSON.parse(localStorage.getItem('bookmark')))
  console.info('berhasil dihapus')
  forceUpdate()
 }

 function lastRead() {
  localStorage.removeItem('lastread');
  console.info('berhasil dihapus')
 }

 function buatData(){
  localStorage.setItem('bookmark', JSON.stringify(ob))
  console.log('dibuat bookmark', JSON.parse(localStorage.getItem('bookmark')))
  console.log('data dibuat')
  forceUpdate()
 }


  return (<>
  
  <div className="listAyat">

    <button onClick={clearData}>Clear</button>
    <button onClick={lastRead}>Hapus LastRead</button>
    <button onClick={buatData}>Buat</button>
  {datas.map((ayat) => (
    <div className="ayatItem" key={ayat.ayat}>
      <div className="headAyat">
        <div className="numbAyat">
          <span>{ayat.noSurat}</span>
        </div> {ayat.namaSurat}
        <div className="more">ayat {ayat.ayat}
        </div>
      </div>
      <div className="ayatRead">
        <div className="ayat"></div>
        <div className="tr"></div>
      </div>
    </div>
  ))}
</div>
</>
);

}

export default Bookmark;