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

// let currentRoom = null;
// let setRoom = null;
let doc = this;

// firebase
//   .database()
//   .ref('users')
//   // .orderByChild('emailAddress')
//   // .equalTo(email)
//   .once('value', snap => console.log(snap.val()));

// const users = firestore.collection('Users').get().then((snapshot) => {
//   console.log(snapshot);
//   snapshot.forEach(doc => {
//     if (doc.exists) {
//       let user = doc.data();
//       // this.setState({ user: user});
//       console.log("user state updated: ",user)
//       console.log("user name: ",user);
//       this.setState(prevState => ({
//         users: [...prevState.users,doc.data()]
//       }));
//     }
//   });
// });
// console.log("users:");
// console.log(users);


export const Chat = () => {
  // class Chat extends Component {
  
    // render(){
      const usersRef = firestore.collection('users')
      const queryUsers = usersRef.orderBy('displayName').limit(25)
      const [users] = useCollectionData(queryUsers)

      
      let [currentRoom, setRoom] = useState(null);
      // let [currentMessages, setMessages] = useState(null);
      
      const messagesRef = firestore.collection('messages')
      const room_search = currentRoom ? currentRoom.id : null
      console.log(room_search)
      const queryMessages = messagesRef.where("roomId","==",room_search)
      // const queryMessages = messagesRef.where("roomId","=",null).orderBy('createdAt').limit(1000)
      // const queryMessages = messagesRef.orderBy('createdAt').limit(1000)
      const [messages] = useCollectionData(queryMessages, {idField: 'id' })
      // let messages = []
      // setCurrentMessages() 

      // setCurrentMessages()
      // console.log("current room: "+currentRoom)
      console.log(messages)
      // currentMessages = messages
      // setMessages(messages)
      // console.log(this)
      // console.log(users)
      // console.log("chat loaded")
      function UserChat(props) {
        let user = props.user
        let active = checkCurrentRoom(user) ? "active" : ""
        let image = user ? user.photoURL : "./herpetario1.png"
        let name = user ? user.displayName : "Global Chat"

        // console.log("user chat :"+active)
        return(<>
        <li className={active} onClick={() => setCurrentRoom(user)}>
          <div className="d-flex bd-highlight">
            <div className="img_cont">
              <img src={image} className="rounded-circle user_img" />
              <span className="online_icon" />
            </div>
            <div className="user_info">
              <span>{name}</span>
              <p></p>
            </div>
          </div>
        </li>
        </>)
      }

      function checkCurrentRoom(user) {
        // console.log("room")
        // console.log(currentRoom)
        // console.log("user")
        // console.log(user)

        if(!currentRoom && !user) {
          return true
        }

        
        if(currentRoom) {
          
          if(!user) {
            return false
          }

          const data = currentRoom.data()
          if((data.uid1 == user.uid && data.uid2 == auth.currentUser.uid) ||
          (data.uid1 == auth.currentUser.uid && data.uid2 == user.uid)) {
            return true
          }
        }
        return false
      }

      function setCurrentMessages() {
        const room_search = currentRoom ? currentRoom.id : null
        messagesRef.where("roomId", "==",room_search).get().then((e) => {
          console.log("docs")
          console.log(e.docs)
          // setMessages(e.docs)
          let messages_array = [];
          e.forEach((message) => {
            messages_array.push(message.data());
            // console.log(message.data())
          })
          // setMessages(messages)
          messages = messages_array
          console.log("messages: "+messages)
        })
        
      }

      // function setCurrentRoom(user) {
      const setCurrentRoom = async (user) => {
        
        if(user == null) {
          setRoom(null)
          // setCurrentMessages()
          return
        }
        
        const roomsRef = firestore.collection('rooms')

        roomsRef.where('uid1', '==', auth.currentUser.uid).where('uid2', '==', user.uid).get().
        then((e) => {
          if(e.size >= 1) {
            e.forEach((room) => {
              // console.log("room1")
              // console.log(room)
              setRoom(room)
              // setCurrentMessages()
            })
          } else {

            // checar room2 en caso de que el primero no tenga nada
            roomsRef.where('uid1', '==', user.uid).where('uid2', '==', auth.currentUser.uid).get().
            then((e)=>{
              console.log("room2")
              if(e.size >= 1) {
                e.forEach((room) => {
                  // console.log(room.id)
                  setRoom(room)
                  // setCurrentMessages()
                })
              } else {
                console.log("add room")
                currentRoom = roomsRef.add({ 
                  uid1: auth.currentUser.uid,
                  uid2: user.uid
                })
              }
            })
          }
        })


      // if(!currentRoom) {
      //   console.log("add room")
      //   currentRoom = roomsRef.add({ 
      //     uid1: auth.currentUser.uid,
      //     uid2: user.uid
      //   })
      // }
      }

      function ChatContainer() {

        const dummy = useRef()
        const [formValue, setFormValue] = useState('')
        
        const sendMessage = async (e) => {
      
          e.preventDefault()
          const {uid, photoURL} = auth.currentUser
      
          await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid: uid,
            photoURL: photoURL,
            roomId: currentRoom ? currentRoom.id : null
          })
      
          setFormValue('')

          // dummy.current.scrollIntoView({behavior: 'smooth'})
      
        }
      
        if(auth.currentUser) {
          Alta()
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
                  <span>Global chat</span>
                  <p></p>
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

      return (
        <div className="chat-container">
          <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
          
          <title>Chat</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossOrigin="anonymous" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.min.css" />
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
          <script defer src="/js/chat-button.js"></script>
          
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
                      {/* <li className="active">
                        <div className="d-flex bd-highlight">
                          <div className="img_cont">
                            <img src="./sophia1.png" className="rounded-circle user_img" />
                            <span className="online_icon" />
                          </div>
                          <div className="user_info">
                            <span>Global Chat</span>
                            <p></p>
                          </div>
                        </div>
                      </li> */}
                      <UserChat user = {null} />
                      {users && users.map(user => <UserChat user = {user} />)}
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
    // }

}
export default Chat;
  
  function ChatMessage(props){

    const {text,uid,photoURL} = props.message
    const messageClass = uid === auth.currentUser.uid ? 'msg_cotainer_send' : 'msg_cotainer'
    const positionClass = uid === auth.currentUser.uid ? 'justify-content-end' : 'justify-content-start'
    var leftIcon = null
    var rightIcon = null
    if(props.message && props.message.createdAt) {
      var date = new Date(props.message.createdAt.seconds * 1000);
  
      const months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
      }
  
      const year = date.getFullYear() // 2019
      const day = date.getDate() // 23
      const monthName = months[date.getMonth()]
      const hours = date.getHours()
      const minutes = date.getMinutes()
  
      var formattedDate = year+"/"+monthName+"/"+day+" "+hours+":"+minutes;
    } else {
      var formattedDate = "";
    }

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
            <span className="msg_time">{formattedDate}</span>
          </div>
          {rightIcon}
        </div>

    </>)
}

function Alta(){
  const Registro = async (e) => {
    const registro = firestore.collection('users')
    const {uid, photoURL, displayName, email} = auth.currentUser
    const time = firebase.firestore.FieldValue.serverTimestamp()

    await registro.add({
      uid,
      photoURL,
      displayName,
      email,
      login: time,
      lasttime: time
    })

  }

  firestore.collection('users').where('email', '==', auth.currentUser.email).get().then(async (e)=>{

    // console.log('TAM: ', e.size)

    if (e.size == 0) {
      Registro()
    }
    else if (e.size > 1) {
    var IdToBeDeleted = ''

    firestore.collection('users').where('email', '==', auth.currentUser.email).limit(1)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          IdToBeDeleted = doc.id
          console.log("ID TO BE DELETED: ", IdToBeDeleted)

          firestore.collection('users').doc(IdToBeDeleted).delete()
      })
    })
    .catch((error) => {
        console.log("Error: ", error)
    })

    }

  })

    /*const registro = firestore.collection('users')
    const {uid, photoURL, displayName, email} = auth.currentUser
    const hora = firebase.firestore.FieldValue.serverTimestamp()

    var aux = registro.where('email', '==', auth.currentUser.email).get()

    console.log(firestore.collection('users').where('email', '==', auth.currentUser.email).get())

    if (true) {
      registro.add({
        uid,
        photoURL,
        displayName,
        email,
        login: hora,
        lasttime: hora
      })
    }*/

    /*if (aux.size > 1) {
      firestore.collection('users').where('email', '==', auth.currentUser.email).limit(1).delete()
    }*/

    /*firestore.collection('users').where('email', '==', auth.currentUser.email)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data())
        })
    })
    .catch((error) => {
        console.log("Error al obtener docs: ", error)
    })*/

    

      

    /*firestore.collection('users').doc(IdToBeDeleted)
    .get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          console.log("ID OBTENIDO: ", IdToBeDeleted)
      })
    })
    .catch((error) => {
        console.log("Error al obtener docs: ", error)
    })*/

    //console.log(IdToBeDeleted)
}
  