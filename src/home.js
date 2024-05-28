import React from 'react';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import { useNavigate,Navigate } from 'react-router-dom';
import { useAuthContext } from './authcontext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("ログアウトしました。");
        navigate('/login');
      })
      .catch((error) => {
        console.log("ログアウトに失敗しました。", error);
      });
  };

  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div>
        <h1>ホームページ</h1>
        <button onClick={handleLogout}>ログアウト</button>
      </div>
    );
  }
};

export default Home;
