import React, { ChangeEvent, useEffect, useState } from 'react';
import '../../styles/Auth/login.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import authApi from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { IsAuthChange } from '../../interface/functionInterface';

const Login: React.FC<IsAuthChange> = (props) => {
  const { isAuth, setIsAuth } = props;
  const [userName, setUserName] = useState<string>('');
  const [userPass, setUserPass] = useState<string>('');

  const navigate = useNavigate();

  const changeUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const changeUserPass = (event: ChangeEvent<HTMLInputElement>) => {
    setUserPass(event.target.value);
  };

  const clickLogin = async () => {
    if (userName === '' || userPass === '') {
      window.alert('ユーザー名とパスワードを入力してください');
      return;
    }
    const sendData = { username: userName, password: userPass };
    try {
      const res = await authApi.login(sendData);
      // console.log('res : ', res);
      if (res.data.message) {
        // console.log('認証成功');
        setIsAuth(true);
        navigate('/main');
      }
      setUserName('');
      setUserPass('');
    } catch (err) {
      window.alert(`認証に失敗しました : ${err}`);
    }
  };

  useEffect(() => {
    if (isAuth) navigate('/main');
  }, [isAuth]);

  return (
    <div className="authWrap">
      <div className="auth">
        <GitHubIcon className="neko" />
        <div className="auth__container">
          <div className="auth__content">
            <label htmlFor="">ユーザー名</label>
          </div>
          <div className="auth__input">
            <input type="text" value={userName} onChange={changeUserName} />
          </div>
        </div>
        <div className="auth__container">
          <div className="auth__content">
            <label htmlFor="">パスワード</label>
          </div>
          <div className="auth__input">
            <input type="password" value={userPass} onChange={changeUserPass} />
          </div>
        </div>
        <div className="auth_btn_container">
          <button className="auth_btn" onClick={clickLogin}>
            ログイン
          </button>
        </div>
        <div className="auth_btn_container">
          <button className="auth_btn">新規登録</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
