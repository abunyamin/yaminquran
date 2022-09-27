import React, { useState, useEffect } from 'react';

const Greet = () => {

  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);
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
