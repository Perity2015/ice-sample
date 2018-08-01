/**
 * 获取图片途径
 * @param {string} pathname
 * @returns {string}
 */
export const getAssetPath = (pathname: string) => {
    return `//imgs/${pathname}`;
};

/**
 * 设置页面Title
 * @param title
 */
export const setDocumentTitle=(title)=> {
    const body = document.body;
    document.title = title; // hack在微信等webview中无法修改document.title的情况
    const $iframe = document.createElement('iframe');
    $iframe.style.display = 'none';
    $iframe.onload = () => {
        setTimeout(() => {
            $iframe.onload = null;
            body.removeChild($iframe);
        }, 0);
    };
    body.appendChild($iframe);
};
