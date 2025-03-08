export function handleBrowserGoBack(back) {
    console.log("back");
    pushHistory();
    addPopstateListener(back);
}
/**
* 向历史记录中插入了当前页
*/
function pushHistory() {
    let hash = location.hash;
    let state = {
        title: "title",
        url: hash
    };
    window.history.pushState(state, "title", hash);
}
/**
 * 添加popstate监听
 */
function addPopstateListener(back) {
    if (window.addEventListener) {
        window.addEventListener("popstate", back, true);
    } else {
        window.attachEvent("popstate", back);
    }
}
/**
* 移除popstate监听
*/
export function removeBrowserBackListener(back) {
    console.log("remove");
    if (window.removeEventListener) {
        window.removeEventListener("popstate", back, true);
    } else {
        window.detachEvent("popstate", back);
    }
}