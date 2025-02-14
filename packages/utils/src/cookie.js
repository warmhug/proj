const { chrome } = require('@rookie-rs/api');
console.log('log chrome: ', chrome);
const cookies = chrome();
for (const cookie of cookies) {
  console.log(cookie);
}
