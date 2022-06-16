chrome.contextMenus.create({
  id: "get-price",
  title: "Get Price",
  contexts: ["selection"],
});
chrome.runtime.onMessage.addListener((message) => {
  console.log(message);
  chrome.contextMenus.update("get-price", message.options);
});
