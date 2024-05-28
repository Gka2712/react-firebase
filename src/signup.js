import {useState} from 'react'
import {auth}from './firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuthContext } from './authcontext';
import {Link} from 'react-router-dom';
const SignUp=()=>{
    const {user}=useAuthContext();
    const handleSubmit=async(event)=>{
        event.preventDefault();
        const{email,password}=event.target.elements;
        try{
            await createUserWithEmailAndPassword(auth,email.value,password.value);
            console.log('ユーザが正常に作成されました。')

        }catch(error){
            console.error(error)
        }
        
    };
    return(
       <div>
        <h1>ユーザ登録</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>メールアドレス</label>
                <input name="email" type="email" placeholder='email'  />
            </div>
            <div>
                <label>パスワード</label>
                <input name="password" type="password" placeholder="password" />
            </div>
            <div>
                <button>登録</button>
            </div>
            <div>
                新規登録は<Link to="/login">こちら</Link>から
            </div>
        </form>
       </div> 
    )
};
export default SignUp;