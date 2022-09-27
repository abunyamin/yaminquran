import React, { Component, useState, useEffect } from "react";
import {
  RiShareLine,
  RiBookmarkLine,
  RiBookmarkFill,
  RiBookOpenLine,
  RiBookOpenFill,
  RiArrowUpLine,
} from "react-icons/ri";
import { useLocation } from "react-router-dom";
import GetApi from "./GetApi";
import Loading from "./Loading";
import BookmarkDelete from './BookmarkDelete'
import useForceUpdate from "use-force-update";

function ListAyat(props) {
  const location = useLocation()
  const showData = JSON.parse(localStorage.getItem("bookmark")) || null;
  const lastRead = JSON.parse(localStorage.getItem("lastread")) || null;

  const { ayat, surat, loading } = props;
  const [isNotif, setIsNotif] = useState(false);
  const [notifDetail, setNotifDetail] = useState([])

  const forceUpdate = useForceUpdate();


  const handleAyat = () => {
    document.getElementById("1").scrollIntoView({ behavior: "smooth" });
  };

  const removeHash = () => {
    var uri = window.location.toString();
 
    if (uri.indexOf("#") > 0) {
        var clean_uri = uri.substring(0,
                        uri.indexOf("#"));

        window.history.replaceState({},
                document.title, clean_uri);
    }
  }

  useEffect(()=> {

    const handleLastRead = () => {
      document
        .getElementById(location.hash.replace("#lastread-", ""))
        .scrollIntoView({ behavior: "smooth" })
        removeHash()
    };
  
    const searchHandle = () => {
  let search = document
  .getElementById(location.hash.replace("#search-", ""));
  
  if( location.hash.replace("#search-", "") > surat.jumlah_ayat){
   
    document
    .getElementById(surat.jumlah_ayat).scrollIntoView({ behavior: "smooth" })
  
  }else{
      search.scrollIntoView({ behavior: "smooth" })
    }
    removeHash()
  }
  
    if (!loading && location.hash.includes('#lastread') == true) {
      setTimeout(() => handleLastRead(), 500);
    } else if (!loading && location.hash.includes('#search-') == true){
      setTimeout(() => searchHandle(), 500);
    }
  
  },[surat, removeHash()])

  console.log("data bookmark", showData);

  return (
    <>
      <div className="listAyat">
      {isNotif && <BookmarkDelete notif={!isNotif} detail={...notifDetail} setIsNotif={setIsNotif} />}
        {loading ? (
          <Loading />
        ) : (
          ayat.map((list) => (
            <div className="ayatItem" key={list.nomor} id={list.nomor}>
              <div className="headAyat">
                <div className="numbAyat">
                  <span>{list.nomor}</span>
                </div>
                <div className="more">
                  <span>
                    <RiShareLine />
                  </span>
                  {lastRead ? (
                    lastRead.noSurat == surat.nomor &&
                    lastRead.ayat == list.nomor ? (
                      <span
                        onClick={() => {
                          localStorage.removeItem("lastread");
                          console.log("Delete Last Read");
                          forceUpdate();
                        }}
                      >
                        <RiBookOpenFill />
                      </span>
                    ) : (
                      <span
                        onClick={() => {
                          localStorage.setItem(
                            "lastread",
                            JSON.stringify({
                              noSurat: list.surah,
                              namaSurat: surat.nama_latin,
                              ayat: list.nomor,
                            })
                          );
                          console.log(lastRead);

                          forceUpdate();
                        }}
                      >
                        <RiBookOpenLine />
                      </span>
                    )
                  ) : (
                    <span
                      onClick={() => {
                        localStorage.setItem(
                          "lastread",
                          JSON.stringify({
                            noSurat: list.surah,
                            namaSurat: surat.nama_latin,
                            ayat: list.nomor,
                          })
                        );
                        console.log(lastRead);

                        forceUpdate();
                      }}
                    >
                      <RiBookOpenLine />
                    </span>
                  )}

                  <span>
                    {showData ? (
                      showData.filter(
                        (value) =>
                          value.ayat === list.nomor &&
                          value.noSurat === list.surah
                      ).length > 0 ? (
                        // Button Saved & Delete Execution

                        <span onClick={()=> {
                          setIsNotif(true)
                          setNotifDetail([
                            {surah: list.surah,
                            nama_latin: surat.nama_latin,
                            nomor: list.nomor,
                            }
                          ])
                          }}
                        >
                          <RiBookmarkFill />
                        </span>
                      ) : (
                        // Button not Saved & Save Execution

                        <span
                          onClick={() => {
                            localStorage.setItem(
                              "bookmark",
                              JSON.stringify([
                                ...JSON.parse(
                                  localStorage.getItem("bookmark") || "[]"
                                ),
                                {
                                  noSurat: list.surah,
                                  namaSurat: surat.nama_latin,
                                  ayat: list.nomor,
                                  arab: list.ar,
                                  idn: list.idn
                                },
                              ])
                            );

                            console.table("Data", showData);

                            console.log("Berhasil dibookmark");
                            forceUpdate();
                          }}
                        >
                          <RiBookmarkLine />
                        </span>
                      )
                    ) : (
                      // Button not Saved & Save Execution

                      <span
                        onClick={() => {
                          localStorage.setItem(
                            "bookmark",
                            JSON.stringify([
                              ...JSON.parse(
                                localStorage.getItem("bookmark") || "[]"
                              ),
                              {
                                noSurat: list.surah,
                                namaSurat: surat.nama_latin,
                                ayat: list.nomor,
                                arab: list.ar,
                                idn: list.idn
                              },
                            ])
                          );

                          console.table("Data", showData);

                          console.log("Berhasil dibookmark");
                          forceUpdate();
                        }}
                      >
                        <RiBookmarkLine />
                      </span>
                    )}
                  </span>
                </div>
              </div>
              <div className="ayatRead">
                <div className="ayat">{list.ar}</div>
                <div className="tr">{list.idn}</div>
              </div>
            </div>
          ))
        )}

        <div className="up" onClick={handleAyat}>
          <RiArrowUpLine />
        </div>
      </div>
    </>
  );
}

export default GetApi(ListAyat);
