import React, { useRef, useState, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { RiPlayCircleLine, RiPauseCircleLine } from 'react-icons/ri'
import GetApi from './GetApi'

function Card (props){

  const playAudio = useRef(null);
  const [play, setPlay] = useState(false)
  const [pause, setPause] = useState(false)

  const {surat, loading} = props
  const [mp3, setMp3] = useState('')

const audioHandler = () => {
  setPlay(true)
  setPause(false)
  playAudio.current.audio.current.play()
}

const audioPause = () => {
  setPause(true)
  playAudio.current.audio.current.pause()
}

const clickPlay = () => {
  setMp3(surat.audio)
}


return (
      <>
      <div className="mp3">     <AudioPlayer
  src={mp3} volume="0.3" autoPlay showDownloadProgress="true" ref={playAudio}
/></div>

{!loading && 
        <div className="card" id="card">

          <div className="cardIn">
          <div className="cardHead">
            <div className="surahTitle"> 
              <h2>{surat.nama_latin}</h2>
              <span>{surat.arti}</span>

              {mp3 == '' ? <div className="audio" onClick={clickPlay}><RiPlayCircleLine /></div> :
              
              !pause ? <div className="audio" onClick={audioPause}><RiPauseCircleLine /></div> :

              <div className="audio" onClick={audioHandler}><RiPlayCircleLine /></div>
              }
            
            </div>
            <span>{surat.tempat_turun} - {surat.jumlah_ayat} Ayat</span>
            
          <div className="first">
            <img src="https://i.ibb.co/HTBsmgr/bismillah.png" />
          </div>
          </div>
          </div>
        </div>
      }
      </>
    );
}

export default GetApi(Card);
