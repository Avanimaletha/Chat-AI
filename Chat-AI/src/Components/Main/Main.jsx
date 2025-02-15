import React, { useContext } from 'react'
import'./Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

const {onSent,recentPrompt,showResult,loading,resultData,setInput,input}= useContext(Context)

const startVoiceRecognition = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
    };

    recognition.onerror = (event) => {
        console.error("Voice recognition error:", event.error);
    };

    recognition.start();
};

return (
    <div className='main'>
        <div className="nav">
            <p>Chat-AI</p>
            <img src={assets.user_icon} alt=''/>
        </div>
    <div className="main-container">

    {!showResult
    ?<>
<div className="greet">
        <p><span>Hey there!</span></p>
        <p>How can I assist you today?</p>
     </div>
     <div className="cards">
        <div className="card">
            <p>Suggest beautiful places to see on an upcoming road trip</p>
       <img src={assets.compass_icon} alt=''/>
        </div>
        <div className="card">
            <p>summarize this concept</p>
       <img src={assets.bulb_icon} alt=''/>
        </div>
        <div className="card">
            <p>Travel Guide for Paris</p>
       <img src={assets.message_icon} alt=''/>
        </div>
        <div className="card">
            <p>Make a shopping list for me</p>
       <img src={assets.code_icon} alt=''/>
        </div>
     </div>

    </>
    :<div className='result'>
        <div className="result-title">
            <img src={assets.user_icon} alt="" />
            <p>{recentPrompt}</p>
        </div>
        <div className="result-data">
            <img src={assets.robot_icon} alt="" />
            {loading
            ?
        <div className='loader'>
            <hr />
            <hr />
            <hr />
        </div>
        :<p dangerouslySetInnerHTML={{__html:resultData}}></p>}
     </div>
     </div>
    }

    <div className="main-bottom">
    <div className="search-box">
    <input onChange={(e) => setInput(e.target.value)} value={input} type='text' placeholder='Enter a prompt here' />
    <div>
       
        <input 
            type="file" 
            id="fileInput" 
            style={{ display: 'none' }} 
            onChange={(e) => console.log(e.target.files[0])} 
        />
        <img src={assets.gallery_icon} alt="" onClick={() => document.getElementById('fileInput').click()} />

       
        <img src={assets.mic_icon} alt="" onClick={startVoiceRecognition} />

        {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
    </div>
</div>
    
        <p className="bottom-info">
           Chat-AI may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
        </p>
    </div>
    </div>
    </div>
  )
}

export default Main
