import React,{useState} from 'react';
import {auth} from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {useNavigate,Link} from 'react-router-dom';
import "./login.css"
const Login=()=>{
    const [message,setMessage]=useState(null);
    const navigate=useNavigate();
    const handleSubmit=async(event)=>{
        event.preventDefault();
        const{email,password}=event.target.elements;
        try{
            await signInWithEmailAndPassword(auth,email.value,password.value);
            console.log("ログインできました。");
            navigate('/');
        }catch(error){
            console.error("ログインができません。");
            setMessage("ログインに失敗しました");
        }
    }
    return(
        <div>
            <h1>ログイン</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>メールアドレス</label>
                    <input name="email" type="email" placeholder='email' />
                </div>
                <div>
                    <label>パスワード</label>
                    <input name="password" type="password" placeholder="password" />
                </div>
                <div>
                    <button>ログイン</button>
                </div>
                <div className="ermessage">{message}</div>
                <div>
                    ユーザ登録は<Link to={'/signup'}>こちら</Link>から
                </div>
            </form>
        </div>
    )
};
export default Login;