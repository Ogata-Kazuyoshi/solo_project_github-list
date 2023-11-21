import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import TOP from './TOP';
import AuthLayout from './components/Auth/AuthLayout';
import Login from './components/Auth/Login';
import { useEffect, useState } from 'react';
import authApi from './api/auth';

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  // const [user, setUser] = useState<any>(null);

  const checkAuth = async () => {
    try {
      const res = await authApi.checkAuth();
      // console.log('res : ', res);
      if (res.data.authenticated) {
        setIsAuth(true);
        // setUser(res.data.user);
      } else {
        setIsAuth(false);
        // setUser(null);
      }
    } catch (err) {
      console.log(`Error : ${err}`);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route
              path="/login"
              element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />}
            />
            {/* <Route path="/resister" element={<Resister />} /> */}
          </Route>
          <Route>
            <Route
              path="/main"
              element={<TOP isAuth={isAuth} setIsAuth={setIsAuth} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
