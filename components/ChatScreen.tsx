import refs from 'utils/refs';
import { chatScreen, messages, setChatScreen, userMessage } from 'utils/reactives';
import {
  AttachFileIcon,
  ChevronLeftIcon,
  InsertEmoticonIcon,
  MicIcon,
  MoreVertIcon,
} from '@assets/icons';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import db, { userDBChatCollection } from 'apis/db';
import { getId } from 'utils/getRecEmail';
import { setUserMessage } from 'utils/reactives';
import { For } from 'nixix/hoc';
import { callRef, effect } from 'nixix/primitives';
import { callAuthState } from 'nixix-firebase-hooks';
import auth from 'apis/auth';
import Message from './Messages';
import { type ChangeEvent, type MouseEvent } from 'nixix/types/eventhandlers';

// add props to it.
export default function ChatScreen() {
  const [user] = callAuthState(auth);
  const msgCont = callRef<HTMLElement>();
  effect(() => {
    msgCont.current.scrollIntoView({behavior: 'smooth', block: 'start'}) 
  }, 'once')

  function leaveChat()  {
    history.pushState({}, null, `/chats`);
    setChatScreen({
      display: 'none',
      flexGrow: '1',
      recEmail: 'Rec Email',
      photoUrl: null,
      sidebarDisplay: 'block' 
    });
  }

  function changeMessage(e: ChangeEvent<HTMLInputElement>)  {
    setUserMessage(() => {
      return {...userMessage.$$__value, message: {
        messageBody: e.currentTarget.value,
        timestamp: serverTimestamp()
      }}
    })
  }

  function sendMessage(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    // add the message to the db for the user this user is sending th message to.
    const messagesCol = collection(db, `${userDBChatCollection.path}/${getId()}/messages`);
    addDoc(messagesCol, userMessage.$$__value);
  }

  return (
    <section
      bind:ref={refs.chatScreen}
      style={{
        display: chatScreen.display,
        transition: '1s ease-in-out',
      }}
      className="chat-screen h-full flex-grow flex flex-col justify-between"
    >
      <header className="bg-white w-full h-[70px] flex items-center shadow-sm sm:px-[15px] sm:h-[80px]">
        <span
          on:click={leaveChat}
        >
          <ChevronLeftIcon
            size={0}
            className="w-[27px] h-[27px] stroke-blue-400 m-0 cursor-pointer sm:w-[35px] sm:h-[35px]"
            stroke:width={1.5}
          />
        </span>
        {/* Recipient's user avatar */}
        <span
          className="mr-[15px] rounded-full  cursor-pointer w-[27px] h-[27px] sm:w-[35px] sm:h-[35px]"
          bind:ref={refs.chatScreenUserAvatar}
        ></span>

        {/* Header info */}
        <div>
          <h1 className="font-bold" bind:ref={refs.recEmail}>
            {chatScreen.recEmail}
          </h1>
          <p>Last seen...</p>
        </div>

        {/* Header icons */}
        <div className="flex flex-grow justify-end">
          <AttachFileIcon
            className="stroke-blue-500 m-0 cursor-pointer w-[27px] h-[27px] sm:w-[35px] sm:h-[35px]"
            stroke:width={2}
          />
          <MoreVertIcon
            className="stroke-blue-500  m-0 cursor-pointer w-[27px] h-[27px] sm:w-[35px] sm:h-[35px]"
          />
        </div>
      </header>

      {/* message container */}
      <For parent={<section  bind:ref={msgCont} className="bg-whatsapp rounded-bl-lg messages-container flex-grow overflow-y-scroll no-scroll"
      ></section>} fallback={''} each={messages}>
        {
          (message: MessageProp) => {
            return <Message message={message.message.messageBody} user={message.user} loggedInUser={user}  timestamp={message.timestamp}/>
          }
        }
      </For>

      {/* Emoticon, input field and send button */}
      <form className="w-screen h-[70px] flex items-center justify-between bg-white px-[10px] py-[15px] relative box-border sm:w-full sm:h-[80px] sm:px-[15px] ">

        <InsertEmoticonIcon
          className=" stroke-blue-500 m-0 cursor-pointer w-[27px] h-[27px] absolute left-[22px] sm:static sm:w-[35px] sm:h-[35px]"
          stroke:width={1.5}
        />
        <input
          type="text"
          className="flex-1 outline-none border-none rounded-full bg-gray-300 py-[10px] pl-[42px] font-bold mr-[5px] sm:mx-[15px] sm:p-[15px] sm:rounded-[10px] sm:pl-[20px]"
          on:change={changeMessage}
        />
        <button className='hidden' on:click={sendMessage} type='submit' >Send message</button>
        <MicIcon
          className=" stroke-blue-500 m-0 cursor-pointer w-[27px] h-[27px] absolute right-[66px] sm:w-[35px] sm:h-[35px] sm:static"
          stroke:width={1.5}
        />
        <div className='bg-blue-500 flex sm:hidden items-center justify-center w-[44px] h-[44px] rounded-full' >
          <ChevronLeftIcon size={27} fill='white' className='rotate-180 cursor-pointer' />
        </div>
      </form>
    </section>
  );
}
