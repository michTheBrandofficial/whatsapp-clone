import refs from 'utils/refs';
import { chatScreen, messages, setChatScreen, userMessage } from 'utils/reactives';
import {
  AttachFileIcon,
  ChevronLeftIcon,
  InsertEmoticonIcon,
  MicIcon,
  MoreVertIcon,
} from '@assets/icons';
import {  addDoc, collection, serverTimestamp } from 'firebase/firestore';
import db, {userDBChatCollection} from 'apis/db';
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

  function sendMessage(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    // add the message to the db for the user this user is sending th message to.
    const messagesCol = collection(db, `${userDBChatCollection.path}/${getId()}/messages`);
    addDoc(messagesCol, userMessage.$$__value);
  }

  function changeMessage(e: ChangeEvent<HTMLInputElement>)  {
    setUserMessage(() => {
      return {...userMessage.$$__value, message: {
        messageBody: e.currentTarget.value,
        timestamp: serverTimestamp()
      }}
    })
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
      <header className="bg-white w-full h-[80px] flex items-center shadow-sm p-[15px]">
        <span
          on:click={() => {
            history.pushState({}, null, `/chats`);
            setChatScreen({
              display: 'none',
              flexGrow: '1',
              recEmail: 'Rec Email',
              photoUrl: null,
            });
          }}
        >
          <ChevronLeftIcon
            size={35}
            className=" stroke-blue-400 m-0 cursor-pointer"
            stroke:width={1.5}
          />
        </span>
        {/* Recipient's user avatar */}
        <span
          className="mr-[15px] w-[35px] h-[35px] rounded-full  cursor-pointer"
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
            size={35}
            className="stroke-blue-500 m-0 cursor-pointer"
            stroke:width={2}
          />
          <MoreVertIcon
            size={35}
            className="stroke-blue-500  m-0 cursor-pointer"
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
      <form className="w-full h-[20%] flex items-center  justify-between p-[15px] sm:h-[80px] bg-white">

        <InsertEmoticonIcon
          size={35}
          className=" stroke-blue-500 m-0 cursor-pointer"
          stroke:width={1.5}
        />
        <input
          type="text"
          className="flex-[1] outline-none border-none rounded-[10px] bg-whitesmoke p-[15px] pl-[20px] mx-[15px] font-bold"
          on:change={changeMessage}
        />
        <button className='hidden' on:click={sendMessage} type='submit' >Send message</button>
        <MicIcon
          size={35}
          className=" stroke-blue-500 m-0 cursor-pointer"
          stroke:width={1.5}
        />
      </form>
    </section>
  );
}
