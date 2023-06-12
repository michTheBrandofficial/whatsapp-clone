import { callRef } from "nixix";

export default {
  userAvatar: callRef<HTMLSpanElement>(),
  chatScreen: callRef<HTMLElement>(),
  chatScreenUserAvatar: callRef<HTMLElement>(),
  recEmail: callRef<HTMLHeadingElement>()
}