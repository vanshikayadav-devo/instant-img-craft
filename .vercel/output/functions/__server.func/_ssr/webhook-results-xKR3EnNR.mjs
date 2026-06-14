const resultStore = /* @__PURE__ */ new Map();
const RESULT_TTL = 60 * 60 * 1e3;
function storeResult(requestId, url) {
  resultStore.set(requestId, { url, timestamp: Date.now() });
  setTimeout(() => {
    resultStore.delete(requestId);
  }, RESULT_TTL);
}
function getResult(requestId) {
  const result = resultStore.get(requestId);
  if (!result) return null;
  if (Date.now() - result.timestamp > RESULT_TTL) {
    resultStore.delete(requestId);
    return null;
  }
  return result.url;
}
export {
  getResult as g,
  storeResult as s
};
