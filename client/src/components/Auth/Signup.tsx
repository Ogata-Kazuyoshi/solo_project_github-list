import React, { ChangeEvent, useEffect, useState } from 'react';
import '../../styles/Auth/login.css';
import { IsAuthChange } from '../../interface/functionInterface';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useNavigate } from 'react-router-dom';
import authApi from '../../api/auth';

const Signup: React.FC<IsAuthChange> = (props) => {
  const { isAuth, setIsAuth, checkAuth } = props;
  const [userName, setUserName] = useState<string>('');
  const [userPass, setUserPass] = useState<string>('');
  const [userConfirmPass, setUserConfirmPass] = useState<string>('');

  const navigate = useNavigate();

  const changeUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const changeUserPass = (event: ChangeEvent<HTMLInputElement>) => {
    setUserPass(event.target.value);
  };

  const changeUserConfirmPass = (event: ChangeEvent<HTMLInputElement>) => {
    setUserConfirmPass(event.target.value);
  };

  const clickSignup = async () => {
    if (userName === '' || userPass === '' || userConfirmPass === '') {
      window.alert(
        'ユーザー名、パスワード、確認用パスワードを入力してください'
      );
      return;
    }
    if (userPass !== userConfirmPass) {
      window.alert('パスワードと確認用のパスワードが違います');
      return;
    }

    //https://api.github.com/users/Gattaku
    try {
      // const res = authApi.checkGithubAccount(userName);
      const res = await fetch(`https://api.github.com/users/${userName}`);
      console.log('res :', typeof res.status);
      if (res.status === 200) {
        const sendData = { username: userName, password: userPass };
        try {
          setUserName('');
          setUserPass('');
          setUserConfirmPass('');
          const res = await authApi.signup(sendData);
          console.log('res : ', res);
          if (res.data.message) {
            console.log('新規作成成功');
            setIsAuth(true);
            setUserConfirmPass('');
            checkAuth!();
          }
        } catch (err) {
          window.alert(
            `認証に失敗しました すでに存在するユーザー名です : ${err}`
          );
        }
      } else {
        window.alert(`Githubに存在しないユーザー名は登録できません`);
      }
    } catch (err) {
      window.alert(`err : ${err}`);
    }
  };

  const changePath = () => {
    navigate('/auth/login');
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
        <div className="auth__container">
          <div className="auth__content">
            <label htmlFor="">パスワード（確認）</label>
          </div>
          <div className="auth__input">
            <input
              type="password"
              value={userConfirmPass}
              onChange={changeUserConfirmPass}
            />
          </div>
        </div>
        <div className="auth_btn_container">
          <button className="auth_btn" onClick={clickSignup}>
            新規登録
          </button>
        </div>
        <div className="auth_btn_container auth_labl_container">
          <label className="auth_label" onClick={changePath}>
            ログインはこちら
          </label>
        </div>
      </div>
    </div>
  );
};

export default Signup;
