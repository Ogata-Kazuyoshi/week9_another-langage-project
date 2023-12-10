import React from 'react';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SettingsIcon from '@mui/icons-material/Settings';
import '../../../App.css';

const MonthHeader = ({ user }) => {
  return (
    <div style={styles.headerwrap}>
      <div style={styles.vacant}></div>
      <div style={styles.navigation}>
        <div style={styles.navigation_previous_next}>
          <SkipPreviousIcon style={styles.navigate_icon} />
        </div>
        <div style={styles.navigation_month}>10月</div>
        <div style={styles.navigation_previous_next}>
          <SkipNextIcon style={styles.navigate_icon} />
        </div>
      </div>
      <div style={styles.personalsetting}>
        <div style={styles.personal_vacant}></div>
        <div style={styles.personal_name}>{user}</div>
        <div style={styles.personal_setting}>
          <SettingsIcon style={styles.personal_setting_icon} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  headerwrap: {
    display: 'flex',
    height: '100%',
  },
  vacant: {
    flex: '30%',
    // border: '2px solid red',
  },
  navigation: {
    flex: '40%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // border: '2px solid red',
  },
  navigation_previous_next: {
    display: 'flex',
    alignItems: 'center',
  },
  navigate_icon: {
    fontSize: '80px ',
  },
  navigation_month: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '60px',
  },
  personalsetting: {
    flex: '30%',
    // border: '2px solid red',
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  personal_vacant: {
    flex: '40%',
  },
  personal_name: {
    fontSize: '20px',
    textAlign: 'center',
    marginRight: '10px',
    // border: '2px solid red',
    flex: '40%',
  },
  personal_setting: {
    flex: '20%',
    textAlign: 'end',
    marginRight: '5px',
  },
  personal_setting_icon: {
    fontSize: '50px',
  },
};

export default MonthHeader;
