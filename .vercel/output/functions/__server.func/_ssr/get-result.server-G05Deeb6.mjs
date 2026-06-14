import { c as createServerRpc } from "./createServerRpc-BFe2SfXJ.mjs";
import { a as createServerFn } from "./server-Bnk2je-q.mjs";
import { g as getResult } from "./webhook-results-xKR3EnNR.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const getProcessedImageUrl_createServerFn_handler = createServerRpc({
  id: "bab8c29a056825a138d325bde479c415c8b94748881635f4a4b7aeef253338ef",
  name: "getProcessedImageUrl",
  filename: "src/lib/api/get-result.server.ts"
}, (opts) => getProcessedImageUrl.__executeServer(opts));
const getProcessedImageUrl = createServerFn({
  method: "POST"
}).validator(objectType({
  requestId: stringType()
})).handler(getProcessedImageUrl_createServerFn_handler, async ({
  data
}) => {
  const url = getResult(data.requestId);
  return {
    url,
    found: !!url
  };
});
export {
  getProcessedImageUrl_createServerFn_handler
};
