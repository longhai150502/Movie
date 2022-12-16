
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './HOC/Layout';
import DetailPage from './Page/DetailPage/DetailPage';
import HomePage from './Page/HomePage/HomePage';
import LoginPage from './Page/LoginPage/LoginPage';
import NotFoundPage from './Page/NotFoundPage/NotFoundPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Layout Component={HomePage} />}/>
          <Route path='/login' element = {<LoginPage />} />
          <Route path='/detail/:id' element = {<Layout Component={DetailPage} />} />
          <Route path='*' element = {<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
