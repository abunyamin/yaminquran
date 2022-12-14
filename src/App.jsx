import React, { useState } from "react";
import "./style.css";
import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Helmet from 'react-helmet'

//component
import Top from './Top'
import Greet from './Greet'
import LastRead from './LastRead'
import ListSurah from './ListSurah'
import ListAyat from './ListAyat'
import Footer from './Footer'
import Card from './Card'
import Bookmark from './Bookmark'
import Shalat from './Shalat'

export default function App() {


  const location = useLocation();
  const [suratApi, setSuratApi] = useState();
  const pathName = location.pathname.replace('/','')
  return (
    <>
     <Helmet>
    <meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
      </Helmet>
    <div className="container">
    <Top />
    {location.pathname == '/' && <Greet />}
    {pathName >= 1 && pathName <= 114 ? <Card/> : pathName != 'shalat' && <LastRead/>}

    <Routes> 
      <Route path="/" element={<ListSurah />} />
      <Route path="/" element={<LastRead />} />
      <Route path="/:ayat" element={<ListAyat setSuratApi={setSuratApi}/>} />
      <Route path="/bookmark" element={<Bookmark />} />
      <Route path="/shalat" element={<Shalat />} />
    </Routes>
    </div> 
    {pathName >= 1 && !pathName <= 114 ? null : <Footer />}
    </>
  );
}