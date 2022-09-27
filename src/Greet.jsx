import React, { Component, useState, useEffect } from 'react';

const Greet = () => {
  new Intl.DateTimeFormat('fr-TN-u-ca-islamic', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
    year: 'numeric',
  }).format(Date.now());

  const [dateState, setDateState] = useState(new Date());
  const [dateHijri, setDateHijri] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);
    setInterval(() => setDateHijri(new Date()), 1000);
  }, []);

  return (
    <>
      <div className="greet">
        <h2>
        {dateState.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
          })}
        </h2>
      </div>
    </>
  );
};

export default Greet;
