/**
 */
export const jsonParse = (
  text: string | unknown,
  reviver?: ((this: any, key: string, value: any) => any) | undefined
) => {
  if (typeof text !== 'string') {
    return text;
  }

  let value;
  try {
    value = JSON.parse(text, reviver);
  } catch (error) {
    console.log('jsonParse: ', text, error);
  }
  return value;
};

export default {
  jsonParse,
};
