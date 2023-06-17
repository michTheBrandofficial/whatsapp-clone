import { callRef } from "nixix/primitives";

export default {
  userAvatar: callRef<HTMLSpanElement>(),
  chatScreen: callRef<HTMLElement>(),
  chatScreenUserAvatar: callRef<HTMLElement>(),
  recEmail: callRef<HTMLHeadingElement>()
}