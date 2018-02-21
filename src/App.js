import React from 'react';
import logo from './logo.svg';
import './App.css';
import SensorOutput from './components/SensorOutput';
import SessionList from './components/SessionList';
import UsernameInput from './components/UsernameInput';
import Session from './components/Session';

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
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    <SensorOutput />
    <UsernameInput />
    <SessionList activeSessions={testSessions} />
  </div>
);
export default App;
