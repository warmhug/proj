import { chrome } from "@rookie-rs/api";
const cookies = chrome();
for (const cookie of cookies) {
  console.log(cookie);
}
