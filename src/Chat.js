import React, { useEffect, useState} from 'react'

function Chat({socket,username,room}) {
    const  [currentMessage,setCurrentMessage]=useState('')
    const [messageList,setMessageList]=useState([])
    async function sendMessage(){
        if(!currentMessage!==''){
            const messageData={
                room:room,
                sender:username,
                message:currentMessage,
                time:new Date(Date.now()).getHours()+ ':' +new Date(Date.now()).getMinutes()
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
        },[socket])
    
  return (
    <div>
     <div className='chat-header'>
        <p>Live Chat</p>
     </div>
     <div className='chat-body'>
         {messageList.map((messageData)=>{
            return( 
            <div>
            <h4>{messageData.sender}</h4>
            <h2>{messageData.message}</h2>
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