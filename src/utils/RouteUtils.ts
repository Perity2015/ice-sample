const qs = require("qs");

/**
 * 跳转链接
 * @param context
 * @param {string} pathname
 * @param {{}} query
 * @param replace
 * @param refresh
 */
export const goToPath = (context: any, pathname: string, query = {}, replace?: boolean, refresh?: boolean) => {
    const keys = Object.keys(query);
    const params = qs.parse(context.location.search.substring(1));
    const {appId = ''} = params;
    let search = `appId=${appId}`;
    keys.forEach(key => search += `&${key}=${query[key]}`);
    if (refresh) {
        if (replace) {
            window.location.replace(`${pathname}?${search}`);
        } else {
            window.location.href = `${pathname}?${search}`;
        }
    } else {
        if (replace) {
            context.history.replace({pathname, search});
        } else {
            context.history.push({pathname, search});
        }
    }
};

/**
 * 用于权限判断后刷新页面
 * @param context
 * @param {string} pathname
 * @param {{}} query
 */
export const replaceUrl = (context: any, pathname: string, query = {}) => {
    const keys = Object.keys(query);
    const params = qs.parse(context.location.search.substring(1));
    const {appId = ''} = params;
    let search = `appId=${appId}`;
    keys.forEach(key => search += `&${key}=${query[key]}`);
    const origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    window.location.replace(`${origin}${pathname}?${search}`);
};

/**
 * 获取链接参数
 * @param {string} search
 * @returns {any}
 */
export const getUrlParams = (search = "") => {
    if (search) {
        return qs.parse(search.substring(1));
    }
    return {};
};