
/**
"message": {
  "role": "assistant",
  "content": "run_shell_command{\"command\": \"npm run demo\", \"description\": \"Running the.\"}",
  "tool_calls": ""
},
->
"tool_calls": [{
  "id": "u3ssefwsd",
  "type": "function",
  "function": {
    "name": "run_shell_command",
    "arguments": "{\"command\": \"npm run demo\", \"description\": \"Running the npm run demo command.\"}"
  }
}]
*/
function hackRes(message = {}, newBody) {
    const newMsg = { ...message };
    const { content, tool_calls } = message;
    const toolNames = newBody?.tools?.map(item => item.function.name);
    if (!tool_calls && content?.includes('{\"')) {
        newMsg.content += ', tool call format error';
        return newMsg;
        const strArr = content.split('{');
        if (toolNames?.includes(strArr[0])) {
            newMsg.content = '';
            newMsg.tool_calls = [{
                type: 'function',
                function: {
                    name: strArr[0],
                    arguments: `{${strArr[1]}`,
                }
            }]
        }
    }
    return newMsg;
}
const msgs = hackRes({
  "role": "assistant",
  "content": "run_shell_command{\"command\": \"npm run demo\", \"description\": \"Running the.\"}",
  "tool_calls": ""
});
console.log('log msgs: ', msgs);


export const mock_tool_calls = [
  {
    "id": "chatcmpl-tool-6032b77d8e2144ef875964867fff693f",
    "type": "function",
    "function": {
      "name": "glob",
      "arguments": "{\n  \"path\": \"/Users/hua/inner/xxx-service\",\n  \"pattern\": \"**/*.py\"\n}"
    }
  },
  {
    "id": "chatcmpl-tool-8b194656dfd54f87899d8d8303be0455",
    "type": "function",
    "function": {
      "name": "read_file",
      "arguments": "{\n  \"absolute_path\": \"/Users/hua/inner/xxx-service/main.py\"\n}"
    }
  },
  {
    "id": "chatcmpl-tool-8b194656dfd54f87899d8d8303be0455",
    "type": "function",
    "function": {
      "name": "write_file",
      "arguments": "{\n  \"file_path\": \"/Users/hua/inner/xxx-service/main.py\",\n  \"content\": 200\n}"
    }
  },
  {
    "id": "chatcmpl-tool-26b3476ab8a942eeba30291287f7cdf3",
    "type": "function",
    "function": {
      "name": "read_file",
      "arguments": "{\n  \"absolute_path\": \"/Users/hua/inner/xxx-service/main.py\"\n}"
    }
  },
  {
    "id": "chatcmpl-tool-bcb8719606ad40fb936d93c009183a9e",
    "type": "function",
    "function": {
      "name": "read_file",
      "arguments": "{\n  \"absolute_path\": \"/Users/hua/inner/xxx-service/start.sh\"\n}"
    }
  },
  {
    "id": "chatcmpl-tool-0429c283f0204d4eaf04cd941c2323b0",
    "type": "function",
    "function": {
      "name": "read_file",
      "arguments": "{\n  \"absolute_path\": \"/Users/hua/inner/xxx-service/main.py\",\n  \"limit\": 200\n}"
    }
  },
  {
    "id": "chatcmpl-tool-10a1b8652727437ca00a80bae0a55b02",
    "type": "function",
    "function": {
      "name": "read_file",
      "arguments": "{\n  \"absolute_path\": \"/Users/hua/inner/xxx-service/main.py\",\n  \"offset\": 0,\n  \"limit\": 200\n}"
    }
  },
  {
    "id": "chatcmpl-tool-2ed9835820eb4850a5d49d79956fac35",
    "type": "function",
    "function": {
      "name": "read_file",
      "arguments": "{\n  \"absolute_path\": \"/Users/hua/inner/xxx-service/main.py\",\n  \"offset\": 0,\n  \"limit\": 20\n}"
    }
  },
  {
    "id": "chatcmpl-tool-a26fbe806e7f44f08379057db6ccccf1",
    "type": "function",
    "function": {
      "name": "read_file",
      "arguments": "{\n  \"absolute_path\": \"/Users/hua/inner/xxx-service/check_env.py\",\n  \"offset\": 0,\n  \"limit\": 20\n}"
    }
  },
  {
    "id": "chatcmpl-tool-9476c56033df41879ae5a4941faa17d6",
    "type": "function",
    "function": {
      "name": "read_many_files",
      "arguments": "{\n  \"paths\": [\"*.py\"]\n}"
    }
  },
  {
    "id": "chatcmpl-tool-c16e1cb851a841d8a73cd09ddc17655a",
    "type": "function",
    "function": {
      "name": "read_file",
      "arguments": "{\n  \"absolute_path\": \"/Users/hua/inner/xxx-service/main.py\"\n}"
    }
  },
  {
    "id": "chatcmpl-tool-fdac59d79f84443bb14435d4a9701c18",
    "type": "function",
    "function": {
      "name": "read_file",
      "arguments": "{\n  \"absolute_path\": \"/Users/hua/inner/xxx-service/main.py\",\n  \"offset\": 10,\n  \"limit\": 200\n}"
    }
  },
];

export const mock_functionCalls = mock_tool_calls.map(item => {
  return {
    "functionCall": {
      "name": item.function.name,
      "args": JSON.parse(item.function.arguments)
    }
  }
});


var res = filterDuplicateToolCallsStrict(mock_tool_calls);
console.log('log res: ', res);
var res = filterDuplicateFunctionCalls(mock_functionCalls);
console.log('log res: ', JSON.stringify(res, null, 2));

function filterDuplicateToolCallsStrict(toolCalls) {
  const seen = new Set();
  const results = [];
  const resultRF = {};

  for (const toolCall of toolCalls) {
    const { function: fn } = toolCall || {};
    const functionString = JSON.stringify(fn || {});

    if (!seen.has(functionString)) {
      seen.add(functionString);
      results.push(toolCall);
      if (fn?.name === 'read_file') {
        resultRF[results.length - 1] = fn;
      }
    }
  }

  return filterToolReadFile(results, resultRF);
}

function filterDuplicateFunctionCalls(toolCalls) {
  const seen = new Set();
  const results = [];
  const resultRF = {};

  for (const toolCall of toolCalls) {
    const { args, name } = toolCall.functionCall;
    const argsString = JSON.stringify(args || {});

    if (!seen.has(`${name}_${argsString}`)) {
      seen.add(`${name}_${argsString}`);
      results.push(toolCall);
      if (name === 'read_file') {
        resultRF[results.length - 1] = { name, arguments: argsString };
      }
    }
  }

  return filterToolReadFile(results, resultRF);
}

function filterToolReadFile(results, specificResult) {
  if (!specificResult) {
    return results;
  }
  const filePathGroup = {};
  Object.keys(specificResult).forEach(item => {
    const { name, arguments: args } = specificResult[item] || {};
    if (name === 'read_file') {
      // if read_file tool only has absolute_path (no offset and limit).
      const jsonObj = getJsonObj(args);
      if (!jsonObj?.absolute_path) {
        return;
      }
      if (!filePathGroup[jsonObj.absolute_path]) {
        filePathGroup[jsonObj.absolute_path] = []
      }
      filePathGroup[jsonObj.absolute_path].push([
        item, jsonObj
      ]);
    }
    // todo: consider case: read_file - write_file - read_file
  });
  const filePathGroupFilter = {};
  Object.keys(filePathGroup).forEach((key) => {
    for (let index = 0; index < filePathGroup[key].length; index++) {
      const [idx, jsonObj] = filePathGroup[key][index];
      if (Object.keys(jsonObj).length === 1 && !filePathGroupFilter[key]) {
        filePathGroupFilter[key] = filePathGroup[key][index];
      }
    }
  });
  const delIdx = [];
  Object.keys(filePathGroupFilter).forEach((key) => {
    const [idx, jsonObj] = filePathGroupFilter[key];
    const idxs = filePathGroup[key].filter(item => item[0] !== idx).map(item => item[0]);
    delIdx.push(...idxs);
  });
  delIdx.sort((a, b) => b - a).forEach(i => results.splice(i, 1));
  // console.log('log results: ', results);
  return results;
}

function getJsonObj(inputData) {
  if (typeof inputData !== 'string') {
    return undefined;
  }
  let jsonObj;
  try {
    jsonObj = JSON.parse(inputData);
  } catch (error) {}
  return jsonObj;
}
