import { callRef } from "nixix";

export default {
  userAvatar: callRef<HTMLSpanElement>(),
  chatScreen: callRef<HTMLElement>()
}