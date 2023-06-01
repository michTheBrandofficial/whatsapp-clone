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

// add props to it.
export default function ChatScreen() {
  const userAvatarContainer = callRef<HTMLSpanElement>();

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
          on:click={() =>
            setChatScreen({
              display: 'none',
              flexGrow: '1',
            })
          }
        >
          <ChevronLeftIcon
            size={35}
            className=" stroke-blue-400 m-0 cursor-pointer"
            stroke:width={1.5}
          />
        </span>
        {/* Recipient's user avatar */}
        <span className="mr-[15px] w-[35px] h-[35px] rounded-full  cursor-pointer">
          <UserAvatar size={35} className="fill-blue-500 m-0 cursor-pointer" />
        </span>

        {/* Header info */}
        <div>
          <h1 className="font-bold">Rec Email</h1>
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
      <section className="flex-grow bg-whatsapp rounded-bl-lg"></section>

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
