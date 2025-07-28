import { PassThrough, Readable } from 'node:stream';
import { request as gRequest, Gaxios } from 'gaxios';

// 来自 Gemini-cli
// https://github.com/google-gemini/gemini-cli/blob/main/packages/cli
// src/ui/hooks/useGeminiStream.ts
// ->
// https://github.com/google-gemini/gemini-cli/blob/main/packages/core
// src/core/client.ts
// src/core/geminiChat.ts
// src/core/turn.ts

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator

await submitQuery();

const gaxios = new Gaxios();
gaxios.mockRequest = async function(config) {
  if (config.url === 'error_mock_url') {
    let data = {
      role: 'user',
    };
    if (config.responseType === 'stream') {
        const stream = new PassThrough();
        stream.end(Buffer.from(JSON.stringify(data)));
        data = stream;
    }
    return {
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
      data,
    };
  }
  // return Gaxios.prototype.request.call(this, config);
};
async function aRequest(req) {
  try {
    // throw new Error(`error on purpose`);
    const res = await gRequest(req);
    return res;
  } catch (error) {
    console.log('log error aRequest: ', error);
    const res = await gaxios.mockRequest({ ...req, url: 'error_mock_url' });
    return res;
  }
}

async function *run(req, signal) {
  try {
    const responseStream = await aRequest(req);
    for await (const resp of responseStream) {
      console.log('log resp: ', resp);
      if (signal?.aborted) {
        yield { type: 'UserCancelled' };
        // Do not add resp to debugResponses if aborted before processing
        return;
      }
    }
  } catch (error) {
    console.log('log error run: ', error);
  }
}

async function *sendMessageStream() {
  const abortController = new AbortController();
  const signal = abortController.signal;
  const req = {
    url: '',
    method: 'POST',
    headers: {
      'X-App-Id': 'xx',
      'X-App-Key': 'yy',
    },
    body: JSON.stringify({ d: 1 }),
  };
  // req.responseType = 'json';
  req.responseType = 'stream';
  req.signal = signal;
  const resultStream = run(req);  // Note: no await
  for await (const event of resultStream) {
    yield event;
  }
  if (signal && !signal.aborted) {
      const res = await gaxios.mockRequest({ ...req, url: 'error_mock_url' });
      return;
      yield* sendMessageStream();
  }
}

async function submitQuery() {
  try {
    const stream = sendMessageStream();  // Note: no await
    await processGeminiStreamEvents(stream);
  } catch (error) {
    console.log('log error submitQuery: ', error);
  }
  const processGeminiStreamEvents = async (stream) => {
    for await (const event of stream) {
      console.log('log event.type: ', event.type);
    }
  }
}
