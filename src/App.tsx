import React, { useState } from 'react';
import { css } from '@emotion/css';
import provinces from './provinces.json';

const generateStyles: any = {};
provinces.forEach((d, idx) => {
  const name = d.name;
  for (let i = 0; i < name.length; i++) {
    for (let j = i + 1; j <= name.length; j++) {
      const n = name.slice(i, j);
      const selector = `input[value*='${n}' i]:focus ~ #results #result-${idx}`;
      generateStyles[selector] = { display: 'block' };
    }
  }
});

const appStyle = css(generateStyles);

function App() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <div
      className={appStyle}
      style={{
        position: 'relative',
        borderRadius: 10,
        width: 250,
        height: 250,
        backgroundColor: '#f8f9fa',
        boxShadow: '20px 20px 0px #d3d4d5,-20px -20px 0px #ffffff',
        textAlign: 'center',
      }}
    >
      <input
        value={searchValue}
        list='provinceList'
        onChange={(e) => setSearchValue(e.target.value)}
        className={css({
          'border': 'none',
          'borderBottom': '3px solid',
          'outline': 'none',
          'background': 'transparent',
          'height': 40,
          'fontSize': 20,
          '&:focus': {
            borderBottom: '3px solid #fec7d7',
            transition: 'all 1s',
          },
        })}
      />
      <div id='results' style={{ position: 'absolute', marginTop: 5, width: '100%' }}>
        {provinces.map((v, i) => (
          <div
            id={`result-${i}`}
            key={`result-${i}`}
            className={css({
              display: 'none',
              // textAlign: 'center',
              cursor: 'pointer',
              width: '100%',
            })}
            onClick={(e) => {
              setSearchValue((e.target as any).innerText);
            }}
          >
            {v.name}
          </div>
        ))}
      </div>
      <ul style={{ position: 'absolute', left: '120%', width: 100, textAlign: 'left' }}>
        {provinces
          .filter((p) => p.name === searchValue)[0]
          ?.city.map((d) => (
            <li key={d.name}>{d.name}</li>
          ))}
      </ul>
    </div>
  );
}

export default App;
