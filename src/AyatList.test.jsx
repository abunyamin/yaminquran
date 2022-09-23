import React, { Component } from 'react';
import { RiShareLine, RiBookmarkLine } from "react-icons/ri";
import useParams from 'react-router-dom'

class AyatList extends Component {
  constructor(props) {
    super(props);
    const { ayatId } = this.useParams;
    this.state = {
      ayats: [],
      ayatSurah: [],
      loading: true,
    };
  }

  params = useParams();

  async componentDidMount() {
    const request = await fetch('https://equran.id/api/surat/67');
    const response = await request.json();

    this.setState({
      ayats: response.ayat,
      ayatSurah: response,
    })

    console.log('ini adalah', param)
  }

  render() {
    return (<>
    <div className="listAyat">
    {this.state.ayats.map((ayat) => (
    <div className="ayatItem" key={ayat.nomor}>
    <div className="headAyat">
      <div className="numbAyat"><span>{ayat.nomor}</span></div>
      <div className="more">
        <span><RiShareLine /></span>
        <span><RiBookmarkLine /></span>
      </div>
    </div>
    <div className="ayatRead">
      <div className="ayat">{ayat.ar}</div>
      <div className="tr">{ayat.idn}</div>
    </div>
    </div>))}
    </div>
    </>);
  }
}

export default AyatList;
