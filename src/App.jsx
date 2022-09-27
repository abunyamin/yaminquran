import React, { useState } from "react";
import "./style.css";
import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";

//component
import Top from './Top'
import Greet from './Greet'
import LastRead from './LastRead'
import ListSurah from './ListSurah'
import ListAyat from './ListAyat'
import Footer from './Footer'
import Card from './Card'
import Bookmark from './Bookmark'

export default function App() {
  
  const location = useLocation();
  const [suratApi, setSuratApi] = useState();
  const pathName = location.pathname.replace('/','')
  return (
    <>
    <div className="container">
    <Top />
    {location.pathname == '/' && <Greet />}
    {pathName >= 1 && pathName <= 114 ? <Card/> : <LastRead/>}

    <Routes> 
      <Route path="/" element={<ListSurah />} />
      <Route path="/" element={<LastRead />} />
      <Route path="/:ayat" element={<ListAyat setSuratApi={setSuratApi}/>} />
      <Route path="/bookmark" element={<Bookmark />} />
    </Routes>
    </div> 
    {location.pathname === "/" && <Footer />}
    </>
  );
}