import React, { useState, useEffect } from "react";
import DiscussionTopic from "./DiscussionTopic";
import NewDiscussion from "./NewDiscussion";
import OpenDiscussion from "./OpenDiscussion";
import axios from "axios";

function DiscussionForum() {
  const[openDiscussion,setOpenDiscussion]=useState(false)

  // const [comments, setComments] = useState([]);
  // const [newComment, setNewComment] = useState("");

  // function handleCommentChange(event) {
  //   setNewComment(event.target.value);
  // }

  // function handleCommentSubmit(event) {
  //   event.preventDefault();
  //   setComments([...comments, {text: newComment, replies: []}]);
  //   setNewComment("");
  // }

  // function handleReplySubmit(event, index) {
  //   event.preventDefault();
  //   const reply = event.target.reply.value;
  //   const newComments = [...comments];
  //   newComments[index].replies.push(reply);
  //   setComments(newComments);
  // }

  useEffect(() => {
    axios.get('http://localhost:8080/discussion/getMessages')
    .then(function (response) {
      console.log(response)
      if (response.data.success) {
        setMessages(response.data.message_data)
        console.log(response.data.message_data)
      } else {
        console.log(response.data.message_data)
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  , []);

  const [messages, setMessages] = useState([]);
  
  const changeOpenDiscussion=(value)=>{
    console.log("I am clicked")
    setOpenDiscussion(value)

  }

  const [currentopenMessage, setCurrentOpenMessage] = useState({});

  return (
    <div class="w-full my-2">
      <h5 class="text-3xl font-semibold text-center bg-gray-300 p-4">Discussion Forum</h5>
      <div class=" flex w-full justify-around h-full">

        <div class="container  border-gray-200 border-2">
        <div class="mx-8 my-4 flex justify-around">
        <button onClick={()=>setOpenDiscussion(false)} class="bg-[#0f172a] text-white p-2 w-60 rounded-md">New Question Form</button>
        </div>
        <form class="my-4 flex flex-col">
        <input type="text"class="border-gray-300 border-2 my-2 mx-4 rounded-md p-2 " placeholder="Search"/>
        </form>
        {messages.map(message=>(
          <DiscussionTopic data={message} changeOpenDiscussion={changeOpenDiscussion} setCurrentMessage={setCurrentOpenMessage}/>
        ))}
        
        </div>
        {openDiscussion ? <OpenDiscussion message={currentopenMessage}/> : <NewDiscussion /> }
        {/*Right side starts here*/}
        
        {/*<OpenDiscussion />*/}

        </div>
    </div>
  );
}

export default DiscussionForum;