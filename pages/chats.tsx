import ChatScreen from 'components/ChatScreen';
import Sidebar from 'components/Sidebar';

// TODO: Add an Outlet componennt for the interpolation of user chat screens.
export default function Chats({ user }: UserProp) {

  return (
    <>
      <Sidebar user={user} />
      {/* Chat screen */}
      <ChatScreen />
    </>
  );
}
