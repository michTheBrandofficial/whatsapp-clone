import { callRef } from 'nixix';
import refs from 'utils/refs';
import { chatScreen, setChatScreen } from 'utils/reactives';
import {
  AttachFileIcon,
  ChevronLeftIcon,
  InsertEmoticonIcon,
  MicIcon,
  MoreVertIcon,
  UserAvatar,
} from '@assets/icons';
import { callCollection } from 'nixix-firebase-hooks';
import { orderBy, query } from 'firebase/firestore';

// add props to it.
export default function ChatScreen() {
  const messagesContainer = callRef<HTMLElement>();
  // const [messagesSnapshot] = callCollection(query(, orderBy('timestamp', 'asc')))

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
              photoUrl: null
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
        <span className="mr-[15px] w-[35px] h-[35px] rounded-full  cursor-pointer" bind:ref={refs.chatScreenUserAvatar}>
        </span>

        {/* Header info */}
        <div>
          <h1 className="font-bold" bind:ref={refs.recEmail}>{chatScreen.recEmail}</h1>
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
      <section className="bg-whatsapp rounded-bl-lg messages-container flex-grow overflow-y-scroll no-scroll"
      bind:ref={messagesContainer}></section>

      {/* input field */}
      <section className="w-full h-[20%] flex items-center  justify-between p-[15px] sm:h-[80px] bg-white">
        {/* emoticon */}
        <InsertEmoticonIcon
          size={35}
          className=" stroke-blue-500 m-0 cursor-pointer"
          stroke:width={1.5}
        />
        <input
          type="text"
          className="flex-[1] outline-none border-none rounded-[10px] bg-whitesmoke p-[15px] pl-[20px] mx-[15px] font-bold"
        />
        <MicIcon
          size={35}
          className=" stroke-blue-500 m-0 cursor-pointer"
          stroke:width={1.5}
        />
      </section>
    </section>
  );
}
