import { fetchallusers } from './action/users';
import { fetchallquestion } from './action/question';
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Allroutes from './Allroutes';
import { useDispatch } from 'react-redux';
import Navbar from './Comnponent/Navbar/navbar'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';


function App() {
  const [slidein, setslidein] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchallusers());
    dispatch(fetchallquestion());
  }, [dispatch]);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setslidein(false);
    }
  }, []);

  const handleslidein = () => {
    if (window.innerWidth <= 768) {
      setslidein((state) => !state);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar handleslidein={handleslidein} />
        <Allroutes slidein={slidein} handleslidein={handleslidein} />
      </BrowserRouter>
    </div>
  );
}

export default App;
