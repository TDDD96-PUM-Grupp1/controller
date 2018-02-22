import React from 'react';
import './components/css/App.css';
import SensorOutput from './components/SensorOutput';
import SessionList from './components/SessionList';
import UsernameInput from './components/UsernameInput';
import WelcomeScreen from './components/WelcomeScreen';

const testSessions = [
  {
    IP: '192.168.0.1',
    code: 'ABCD',
    currentlyPlaying: '5'
  },
  {
    IP: '58.123.5.1',
    code: 'ASDF',
    currentlyPlaying: '17'
  },
  {
    IP: '192.168.1.1',
    code: 'QWER',
    currentlyPlaying: '0'
  },
  {
    IP: '192.168.44.2',
    code: 'ZXCV',
    currentlyPlaying: '8'
  },
  {
    IP: '192.168.44.2',
    code: 'ZXCV',
    currentlyPlaying: '8'
  },
  {
    IP: '192.168.44.2',
    code: 'ZXCV',
    currentlyPlaying: '8'
  },
  {
    IP: '192.168.44.2',
    code: 'ZXCV',
    currentlyPlaying: '8'
  },
  {
    IP: '192.168.44.2',
    code: 'ZXCV',
    currentlyPlaying: '8'
  },
  {
    IP: '192.168.44.2',
    code: 'ZXCV',
    currentlyPlaying: '8'
  },
  {
    IP: '192.168.44.2',
    code: 'ZXCV',
    currentlyPlaying: '8'
  },
  {
    IP: '192.168.44.2',
    code: 'ZXCV',
    currentlyPlaying: '8'
  }
];

const App = () => (
  <div className="App">
    <WelcomeScreen />
    <UsernameInput />
    <SessionList activeSessions={testSessions} />
    <SensorOutput />
  </div>
);
export default App;
