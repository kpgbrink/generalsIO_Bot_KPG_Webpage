import React from 'react';

const styles = {
  introduction: {
    padding: '10px',
  },
  tab: {
    marginLeft: '1em',
  },
  algTab: {
    marginLeft: '1em',
  },
  over: {
    fontSize: '.4em',
  },
  intro: {
    padding: '5px 0px 20px 0px',
  },
  underLine: {
    borderBottom: '2px black solid',
  }
};

/*Home Page
*/
export default function Introduction() {
  return (
  <div style={styles.introduction}>
      <p style={styles.intro}> This is a website for a
        <a href='http://dev.generals.io/'> dev.generals.io bot </a>
        that
        <a href='https://github.com/kpgbrink'> kpgbrink </a>
        and
        <a href='https://github.com/binki'> binki </a>
        made.
        You can find the code for this website
        <a href='https://github.com/kpgbrink/generalsIO_Bot_KPG_Webpage'> here</a>
        , and the bot
        <a href='https://github.com/kpgbrink/generalsIO_Bot_KPG'> here</a>
        .
        May our win percentage be high and our generals be safe. <br/> <b> Website is still under work. </b>
      </p>
      <h3 style={styles.underLine}>Basic Algorithm <span style={styles.over}> (overly simplified) </span> </h3>
      <div style={styles.algTab}>
        <h5>Priority 1:</h5>
        <p style={styles.tab}>Save the base</p>
        <h5>Priority 2:</h5>
        <p style={styles.tab}>Attack the general</p>
        <h5>Priority 3:</h5>
        <p style={styles.tab}>Attack the enemy armies</p>
        <h5>Priority 4:</h5>
        <p style={styles.tab}>Snake spread</p>
      </div>
  </div>
  );
}
