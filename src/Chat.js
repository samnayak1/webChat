import React, { useEffect, useState} from 'react'
import * as uuid from 'uuid';
function Chat({socket,username,room}) {
    const  [currentMessage,setCurrentMessage]=useState('')
    const [messageList,setMessageList]=useState([])
    async function sendMessage(){
        if(!currentMessage!==''){
            const messageData={
               id:uuid.v4(),
                room:room,
                sender:username,
                message:currentMessage,
                time:new Date(Date.now()).getDate()+'-'+new Date(Date.now()).getMonth()+'-'+new Date(Date.now()).getFullYear()+' '+new Date(Date.now()).getHours()+':'+new Date(Date.now()).getMinutes()
            }
            await socket.emit('send_message',messageData)
            setMessageList(list=>[...list,messageData])

        }
    }
        useEffect(()=>{
           socket.on('receive_message',(data)=>{
                setMessageList(list=>[...list,data])
                
                console.log(data)
           })
           return () => socket.removeListener('receive_message')
        },[socket])
    
  return (
    <div>
     <div className='chat-header'>
        <p>Live Chat</p>
     </div>
     <div className='chat-body'>
         {messageList.map((messageData)=>{
            return( 
            <div key={messageData.id}>
            <h4>{messageData.sender}</h4>
            <h2>{messageData.message}</h2>
            <h2>{messageData.time}</h2>
            </div>
            )
         })}
     </div>
     <div className='chat-footer'>
       <input type='text' onChange={(e)=>{setCurrentMessage(e.target.value)}}></input>
     </div>
     <button onClick={sendMessage}>&#10148;</button>

    </div>
  )
}

export default Chat