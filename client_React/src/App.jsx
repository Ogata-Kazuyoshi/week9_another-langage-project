import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Top from './Top';
import PersonalTop from './components/personal/PersonalTop';
import PersonalMain from './components/personal/PersonalMain';

function App() {
  const [isAuth, setIsAuth] = useState(true);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top setIsAuth={setIsAuth} />}></Route>
          <Route path="/personal" element={<PersonalTop />}>
            <Route
              path="/personal/main"
              element={<PersonalMain isAuth={isAuth} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
