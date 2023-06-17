import { type User } from "firebase/auth"
import { type StoreObject } from "nixix/primitives"

export default function Message({user, message, timestamp, loggedInUser}: {user: string, message: string, timestamp: any} & {loggedInUser: StoreObject<User>}) {
  function TypoeOfMessage({children}: JSX.IntrinsicAttributes) {
    // if user property has the value of the current logged in user's email, show the green message, else, show the whitesmoke message
    return user === loggedInUser.$$__value.email ? (
      <p className="w-fit p-[10px] rounded-[5px] m-2 min-w-[60px] pb-[26px] relative text-right ml-auto bg-teaGreen" >{children}</p>
    ) : (
      <p className="w-fit p-[10px] rounded-[5px] m-2 min-w-[60px] pb-[26px] relative text-left bg-whitesmoke " >{children}</p>
    )
  }

  return (
    <div>
      {/* photoUrl */}
      {/* message */}
      {/* last seen */}
      <div className="font-semibold text-gray-900">
        <TypoeOfMessage>
          {message}
        </TypoeOfMessage>
      </div>
    </div>
  )  
};
