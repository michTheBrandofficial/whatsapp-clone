import { ChatIcon, MoreVertIcon, SearchIcon } from '@assets/icons';
import { callCollection } from 'nixix-firebase-hooks';
import { userDBChatCollection } from 'apis/db';
import { signOut } from 'apis/auth';
import { createChat } from 'utils/chats';
import { effect, callRef } from 'nixix';
import Chat from './Chat';
import refs from 'utils/refs';
import { chatScreen } from 'utils/reactives';
import './Loader.css';

export default function Sidebar({ user }: UserProp) {
  const chatContainer = callRef<HTMLElement>();

  const [chatSnapShots, loading] = callCollection(userDBChatCollection);

  effect(() => {
    if (loading.value) {
      const allChats: AllChats[] = chatSnapShots.$$__value.docs.map((chat) => {
        return {id: chat.id, data: chat.data() as UsersChatsType};
      });

      const userChats = allChats?.filter((chat) => {
        return chat.data.users.includes(user.$$__value.email);
      });

      const userChatsArray = userChats?.map((chat) => {
        return <Chat users={chat.data.users} id={chat.id} />;
      }) || [''];

      chatContainer.current.replaceChildren(...userChatsArray);
    }
  });

  return (
    <section
      style={{ flexGrow: chatScreen.flexGrow }}
      className="flex flex-col"
    >
      <header className="sticky top-0 bg-white z-[1]">
        <section className="flex justify-between items-center p-[15px] h-[80px] border-b-[1px] border-gray-100">
          {/* User Avatar */}
          <span
            on:click={signOut}
            bind:ref={refs.userAvatar}
            className="my-[5px] mr-[15px] w-[50px] h-[50px] rounded-full cursor-pointer"
          >
            <p className="load w-[81%] h-[81%] rounded-full"></p>
          </span>

          {/* Chat icon and more icon */}
          <section className="flex">
            <ChatIcon size={40} className="fill-gray-500 cursor-pointer" />
            <MoreVertIcon
              size={40}
              className="stroke-gray-500 cursor-pointer"
            />
          </section>
        </section>

        <section className="flex items-center p-[20px] rounded-[2px]">
          <SearchIcon
            size={25}
            className="stroke-gray-500 cursor-pointer"
            stroke:width={2.5}
          />
          <input
            type="text"
            placeholder="Search in chats"
            className="pl-3 outline-none font-semibold text-gray-400"
          />
        </section>

        <button
          className="w-full border-y-[1px] border-y-gray-50 font-bold text-gray-500 uppercase hover:bg-gray-100 transition duration-[1000ms] backdrop-blur-sm"
          on:click={createChat({ user, chatSnapShots })}
        >
          Start a new chat
        </button>
      </header>

      {/* List of chats */}
      <section
        className="chat-container flex-grow overflow-y-scroll no-scroll"
        bind:ref={chatContainer}
      ></section>
    </section>
  );
}
