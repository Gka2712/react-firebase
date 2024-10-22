import React,{useState} from "react";
import {db,storage} from "./firebase";
import {ref,uploadBytes,getDownloadURL}from "firebase/storage";
import {collection,addDoc}from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";
function Eventadd(){
    const [file,setFile]=useState(null);
    const [name,setName]=useState(null);
    const [date,setDate]=useState(null);
    const [place,setplace]=useState(null);
    const [uploading,setUploading]=useState(false);
    const navigate=useNavigate();
    const handleFileChange=(event)=>{
        setFile(event.target.files[0]);
    }
    const handleback=async()=>{
        navigate("/");
    }
    const handleUpload=async()=>{
        if(!file){
            return;
        }
        const selectedDate=new Date(date);
        const timestamp=Timestamp.fromDate(selectedDate);
        setUploading(true);
        try{
            const storageRef=ref(storage,`images/${file.name}`);
            const snapshot=await uploadBytes(storageRef,file);
            const url=await getDownloadURL(snapshot.ref);
            const docRef=await addDoc(collection(db,"event"),{
                day:timestamp,
                place,
                name,
                url,
            });
            alert("アップロードが完了しました");
            navigate('/');
        }catch(error){
            console.error(error);
            alert("アップロードに失敗しました");
        };
        setUploading(false);
    }
    return(
        <div>
            <div>
                イベント
                <input type="text" value={name||''} onChange={(e)=>setName(e.target.value)}></input>
            </div>
            <div className="itempos">
                場所
                <input type="text" value={place||''} onChange={(e)=>setplace(e.target.value)}></input>
            </div>
            <div className="itempos">
                開催日時
                <input type="datetime-local" value={date||''} onChange={(e)=>setDate(e.target.value)}></input>
            </div>
            <div className="itempos">
                <input type="file" onChange={handleFileChange}/>
            </div>
            <div className="itempos">
                <button onClick={handleUpload} disabled={uploading}>
                    {uploading? "アップロード中":"アップロード"}
                </button>
            </div>
            <div className="itempos">
                <button onClick={handleback}>戻る</button>
            </div>
        </div>
    );
}
export default Eventadd;