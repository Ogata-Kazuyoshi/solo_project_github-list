import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import TOP from './TOP';
import AuthLayout from './components/Auth/AuthLayout';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import { useEffect, useState } from 'react';
import authApi from './api/auth';
import Rooting from './Rooting';
import { UserInfo } from './interface/functionInterface';

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<UserInfo>({
    id: NaN,
    username: '',
  });

  const checkAuth = async () => {
    try {
      const res = await authApi.checkAuth();
      // console.log('res : ', res);
      if (res.data.authenticated) {
        setIsAuth(true);
        // console.log('res.data.user : ', res.data.user);
        setUser(res.data.user);
      } else {
        setIsAuth(false);
        setUser({
          id: NaN,
          username: '',
        });
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
          <Route path="/" element={<Rooting />} />
          <Route path="/auth" element={<AuthLayout />}>
            <Route
              path="/auth/login"
              element={
                <Login
                  isAuth={isAuth}
                  setIsAuth={setIsAuth}
                  checkAuth={checkAuth}
                  user={user}
                />
              }
            />
            <Route
              path="/auth/signup"
              element={
                <Signup
                  isAuth={isAuth}
                  setIsAuth={setIsAuth}
                  checkAuth={checkAuth}
                  user={user}
                />
              }
            />
          </Route>
          <Route>
            <Route
              path="/main"
              element={
                <TOP isAuth={isAuth} setIsAuth={setIsAuth} user={user} />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
