
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './HOC/Layout';
import BookingTicket from './Page/BookingTicket/BookingTicket';
import DetailPage from './Page/DetailPage/DetailPage';
import HomePage from './Page/HomePage/HomePage';
import LoginPage from './Page/LoginPage/LoginPage';
import Register from './Page/LoginPage/Register';
import NotFoundPage from './Page/NotFoundPage/NotFoundPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Layout><HomePage/></Layout>}/>
          <Route path='/login' element = {<LoginPage />} />
          <Route path='/dangki' element = {<Register />} />
          <Route path='/detail/:id' element = {<Layout><DetailPage/></Layout>} />
          <Route path='*' element = {<NotFoundPage />} />
          <Route path='/booking/:maLichChieu' element = {<Layout><BookingTicket/></Layout>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
