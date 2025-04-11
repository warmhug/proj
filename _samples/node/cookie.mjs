// const { chrome } = require('@rookie-rs/api');
import { chrome } from "@rookie-rs/api";
// import { brave } from "@rookie/api";
// const cookies = brave();

console.log('log chrome: ', chrome);

const cookies = chrome();
for (const cookie of cookies) {
  console.log(cookie);
}
