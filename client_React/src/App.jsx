import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Top from './Top';
import PersonalTop from './components/personal/PersonalTop';
import PersonalMain from './components/personal/PersonalMain';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />}></Route>
          <Route path="/personal" element={<PersonalTop />}>
            <Route path="/personal/main" element={<PersonalMain />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
