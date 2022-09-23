{localStorage.getItem("lastread") !== null ? 
                lastRead.surah == ayat.surah && lastRead.ayat == ayat.nomor) ? <span><RiBookOpenFill /></span> : 
                <span onClick={() => {
                  localStorage.setItem('lastread', JSON.stringify({
                    surah: ayat.surah,
                    namaSurah: ayatSurah.nama_latin,
                    ayat: ayat.nomor,
                  }))
                  console.log('Lastread disimpan')
                  console.log(lastRead)
                }}>

                <RiBookOpenLine />
                </span>)
                
                : 'Kosong'}