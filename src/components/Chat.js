import React, {useRef, useState} from 'react';
import './styles/chat.css'
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

if (!firebase.apps.length) {
   firebase.initializeApp({
      //  apiKey: "AIzaSyAntyf9Hh-IGO4tPmA9mn5NpqkqvveB0do",
      //  authDomain: "chatsexto.firebaseapp.com",
      //  projectId: "chatsexto",
      //  storageBucket: "chatsexto.appspot.com",
      //  messagingSenderId: "214956267493",
      //  appId: "1:214956267493:web:cae8c47ca40c8c29db010c"
      apiKey: "AIzaSyCM_6EBeIn2Qmr31yWAXBEu4UL8kjfQCsE",
      authDomain: "modelo-d5e9b.firebaseapp.com",
      projectId: "modelo-d5e9b",
      storageBucket: "modelo-d5e9b.appspot.com",
      messagingSenderId: "844773683059",
      appId: "1:844773683059:web:a7c51486894ecf256c1f06"
   })
}else {
   firebase.app(); // if already initialized, use that one
}


const auth = firebase.auth()
const firestore = firebase.firestore()
const analytics = firebase.analytics()

export const Chat = () => (
  

     <div class="chat-container">
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        {/*---- Include the above in your HEAD tag --------*/}
        <title>Chat</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossOrigin="anonymous" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.min.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script defer src="/js/chat-button.js"></script>
        {/*Coded With Love By Mutiullah Samim*/}
        <div className="container-fluid h-100">
          <div className="row justify-content-center h-100">
            <div className="col-md-4 col-xl-3 chat"><div className="card mb-sm-3 mb-md-0 contacts_card">
                <div className="card-header">
                  <div className="input-group">
                    <input type="text" placeholder="Search..." name className="form-control search" />
                    <div className="input-group-prepend">
                      <span className="input-group-text search_btn"><i className="fas fa-search" /></span>
                    </div>
                  </div>
                </div>
                <div className="card-body contacts_body">
                  <ul className="contacts">
                    <li className="active">
                      <div className="d-flex bd-highlight">
                        <div className="img_cont">
                          <img src="./sophia1.png" className="rounded-circle user_img" />
                          <span className="online_icon" />
                        </div>
                        <div className="user_info">
                          <span>Sophia</span>
                          <p>Sophia is online</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex bd-highlight">
                        <div className="img_cont">
                          <img src="./hanna1.png" className="rounded-circle user_img" />
                          <span className="online_icon offline" />
                        </div>
                        <div className="user_info">
                          <span>Hanna</span>
                          <p>Hanna left 7 mins ago</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex bd-highlight">
                        <div className="img_cont">
                          <img src="./jade1.png" className="rounded-circle user_img" />
                          <span className="online_icon" />
                        </div>
                        <div className="user_info">
                          <span>Jade Bañuelos</span>
                          <p>Jade is online</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex bd-highlight">
                        <div className="img_cont">
                          <img src="./chris1.png" className="rounded-circle user_img" />
                          <span className="online_icon offline" />
                        </div>
                        <div className="user_info">
                          <span>Christian</span>
                          <p>Christian left 30 mins ago</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex bd-highlight">
                        <div className="img_cont">
                          <img src="./hannita1.png" className="rounded-circle user_img" />
                          <span className="online_icon offline" />
                        </div>
                        <div className="user_info">
                          <span>Hanna Romero</span>
                          <p>Hanna left 50 mins ago</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="card-footer" />
              </div></div>
            <div className="col-md-8 col-xl-6 chat">
              

            
            <ChatContainer/>


            </div>
          </div>
        </div>
      </div>
    );

  function ChatMessage(props){

    const {text,uid,photoURL} = props.message
    const messageClass = uid === auth.currentUser.uid ? 'msg_cotainer_send' : 'msg_cotainer'
    const positionClass = uid === auth.currentUser.uid ? 'justify-content-end' : 'justify-content-start'
    var leftIcon = null
    var rightIcon = null

    if(uid === auth.currentUser.uid) {
      rightIcon = <div className="img_cont_msg">
            <img src={photoURL} className="rounded-circle user_img_msg" />
          </div>
    } else {
      leftIcon = <div className="img_cont_msg">
            <img src={photoURL} className="rounded-circle user_img_msg" />
          </div>
    }

    return(<>
    
      <div className={`d-flex ${positionClass} mb-4`}>
          
          {leftIcon}
          <div className={messageClass}>
            {text}
            <span className="msg_time">8:40 AM, Today</span>
          </div>
          {rightIcon}
        </div>

    </>)
}

  function ChatContainer(){

  const dummy = useRef()
  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt').limit(25)

  const [messages] = useCollectionData(query, {idField: 'id' })
    console.log(messages);
  const [formValue, setFormValue] = useState('')
  
  const sendMessage = async (e) =>{

    e.preventDefault()
    const {uid, photoURL} = auth.currentUser

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('')
    dummy.current.scrollIntoView({behavior: 'smooth'})

  }

  return(<>
    <div className="card">
      <div className="card-header msg_head">
        <div className="d-flex bd-highlight">
          <div className="img_cont">
            <img src="./herpetario1.png" className="rounded-circle user_img" />
            <span className="online_icon" />
          </div>
          <div className="user_info">
            <span>Chat with Herpetario</span>
            <p>1767 Messages</p>
          </div>
          <div className="video_cam">
            <span><i className="fas fa-video" /></span>
            <span><i className="fas fa-phone" /></span>
          </div>
        </div>
        <span id="action_menu_btn"><i className="fas fa-ellipsis-v" /></span>
        <div className="action_menu">
          <ul>
            <li><i className="fas fa-user-circle" /> View profile</li>
            <li><i className="fas fa-users" /> Add to close friends</li>
            <li><i className="fas fa-plus" /> Add to group</li>
            <li><i className="fas fa-ban" /> Block</li>
          </ul>
        </div>
      </div>
      <div className="card-body msg_card_body">
        
        <div className="d-flex justify-content-end mb-4">
          <div className="msg_cotainer_send">
            Hi Atun i am good tnx how about you?
            <span className="msg_time_send">8:55 AM, Today</span>
          </div>
          <div className="img_cont_msg">
            <img src="./said1.png" className="rounded-circle user_img_msg" />
          </div>
        </div>
        <div className="d-flex justify-content-start mb-4">
          <div className="img_cont_msg">
            <img src="./mama1.png" className="rounded-circle user_img_msg" />
          </div>
          <div className="msg_cotainer">
            I am good too, thank you for the dinner last night
            <span className="msg_time">9:00 AM, Today</span>
          </div>
        </div>
        <div className="d-flex justify-content-end mb-4">
          <div className="msg_cotainer_send">
            You are welcome
            <span className="msg_time_send">9:05 AM, Today</span>
          </div>
          <div className="img_cont_msg">
            <img src="./leo1.png" className="rounded-circle user_img_msg" />
          </div>
        </div>
        <div className="d-flex justify-content-start mb-4">
          <div className="img_cont_msg">
            <img src="./mama1.png" className="rounded-circle user_img_msg" />
          </div>
          <div className="msg_cotainer">
            I am looking for a new laptop
            <span className="msg_time">9:07 AM, Today</span>
          </div>
        </div>
        <div className="d-flex justify-content-end mb-4">
          <div className="msg_cotainer_send">
            Ok, thank you have a good day
            <span className="msg_time_send">9:10 AM, Today</span>
          </div>
          <div className="img_cont_msg">
            <img src="./aguero1.png" className="rounded-circle user_img_msg" />
          </div>
        </div>
        <div className="d-flex justify-content-start mb-4">
          <div className="img_cont_msg">
            <img src="./mama1.png" className="rounded-circle user_img_msg" />
          </div>
          <div className="msg_cotainer">
            Bye, see you
            <span className="msg_time">9:12 AM, Today</span>
          </div>
        </div>
        {messages && messages.map(msg => <ChatMessage key = {msg.id} message = {msg} />)}
        <span ref = {dummy}></span>
      </div>
      <div className="card-footer">
        <form onSubmit = {sendMessage}>
          <div className="input-group">
            <div className="input-group-append">
              <span className="input-group-text attach_btn"><i className="fas fa-paperclip" /></span>
            </div>
            <textarea value = {formValue} onChange={(e) => setFormValue(e.target.value)} className="form-control type_msg" placeholder="Type your message..." />
            <div className="input-group-append">
              <button type="submit" className="input-group-text send_btn"><i className="fas fa-location-arrow" /></button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </>)
}
  