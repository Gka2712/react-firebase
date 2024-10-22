import React, { useState,useEffect } from 'react';
import { db,auth } from './firebase';
import { signOut } from 'firebase/auth';
import {collection,getDocs} from 'firebase/firestore';
import { useNavigate,Navigate } from 'react-router-dom';
import { useAuthContext } from './authcontext';

const Home = () => {
  console.log(db);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [data,setData]=useState([]);
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
  const formatDate=(timestamp)=>{
    const date=new Date(timestamp.seconds*1000);
    const month=('0'+(date.getMonth()+1)).slice(-2);
    const day=('0'+date.getDate()).slice(-2);
    const hours=('0'+date.getHours()).slice(-2);
    const minutes=('0'+date.getMinutes()).slice(-2);
    const seconds=('0'+date.getSeconds()).slice(-2);
    return `${month}/${day} ${hours}:${minutes}:${seconds} `;
  };
  const eventadd=()=>{
    navigate('/eventadd');
  };
  useEffect(()=>{
    const fetchData=async()=>{
      if(user){
        try{
          const querySnapshot=await getDocs(collection(db,"event"));
          const items=querySnapshot.docs.map(doc=>({
            id:doc.id,
            ...doc.data()
          }));
          setData(items);
        }catch(error){
          console.error("データの取得に失敗しました",error);
        }
      }
    };
    fetchData();
  },[user]);
  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div>
        <h1>ホームページ</h1>
        <button onClick={handleLogout}>ログアウト</button>
        <button onClick={eventadd}>イベントの追加</button>
        <h4>イベント</h4>
        <div className='container'>
          {data.map(item=>(
            <div key={item.id} className="item">
              <div className='item1'>{item.name}</div>
              <div>開催日時:{formatDate(item.day)}</div>
              <img src={item.url} />
              <div>場所:{item.place}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default Home;
