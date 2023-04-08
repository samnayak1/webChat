
import './App.css';
import io from 'socket.io-client'
import react,{useState} from 'react'
import Chat from './Chat';
const socket=io.connect('http://localhost:5001');

function App() {
   const [userName,setUserName]=useState('')
   const[room,setRoom]=useState('')
   const[showChat,setShowChat]=useState(false)
   function joinRoom(){
   if(room!==''&&userName!==''){
      socket.emit('join_room',room)
      setShowChat(true)

    }

   }

  return (
    <div className="App">
      {
      !showChat?(
        <div id='join-room'>
       <h3>Join a chat</h3>
       <input type='text' placeholder='john...' onChange={(e)=>{setUserName(e.target.value)}}></input>
       <input type='text' placeholder='roomId' onChange={(e)=>{setRoom(e.target.value)}}></input>
       <button onClick={joinRoom}>join a room</button>
       </div>
      ):(
        <div id='chat'>
       <Chat socket={socket} username={userName} room={room}></Chat>
        </div>
      )
      }
    </div>
  );
}

export default App;
