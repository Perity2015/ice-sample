import axios, {AxiosInstance} from 'axios';
import {ToastError, ToastHide, ToastInfo, ToastLoading, ToastSuccess} from "./ToastUtils";

export const HOST = '';

export interface AjaxOptions {
    beforeAction?: () => void | undefined;
    isOk?: (res: any) => boolean;
    successAction?: (res: any) => void | undefined;
    errorAction?: (err?: any) => void | undefined;
    toastSuccess?: boolean;
}

const AjaxHelper: AxiosInstance = axios.create({
    baseURL: HOST,
    timeout: 20000,
    headers: {'Project-Header': 'mobile'}
});

enum Method {
    GET = 1,
    POST = 2
}

const GlobalCheck = (res: any) => {
    const contentType = res.headers['content-type'];
    if (contentType.toLowerCase().indexOf("text/html;") !== -1) {
        // window.location.href = '/login';
        console.log(res);
        return false;
    }
    return true;
};

const checkResult = (res: any) => {
    const {code} = res;
    return code === 200;
};

const Helper = (method: Method, url: string, data?: object, options?: AjaxOptions) => {
    const Options = {
        beforeAction: () => ToastLoading(),
        isOk: (res: any) => checkResult(res),
        successAction: undefined,
        errorAction: undefined,
        toastSuccess: false
    };
    Object.assign(Options, options || {});

    Options.beforeAction && Options.beforeAction();

    const ajaxData = method === Method.GET ? {params: data || {}} : data || {};
    const helperPromise = method === Method.GET ? AjaxHelper.get(url, ajaxData) : AjaxHelper.post(url, ajaxData);

    helperPromise
        .then(res => {
            ToastHide();
            if (GlobalCheck(res)) {
                return res.data;
            } else {
                throw new Error();
            }
        })
        .then(res => {
            if (Options.isOk(res)) {
                if (Options.successAction && typeof Options.successAction !== "undefined") {
                    Options.toastSuccess && ToastSuccess(res.msg, () => {
                        if (Options.successAction) {
                            Options.successAction(res)
                        }
                    });
                    !Options.toastSuccess && Options.successAction(res);
                } else {
                    Options.toastSuccess && ToastSuccess(res.msg);
                }
            } else {
                const {code, msg} = res;
                if (code === 302) {
                    ToastInfo(msg, () => window.location.reload());
                    return;
                }
                ToastInfo(msg, () => Options.errorAction && Options.errorAction());
            }
        })
        .catch(err => {
            console.log(err);
            ToastError(undefined, Options.errorAction && Options.errorAction( err));
        });
};

export const AjaxUtils = {
    post: (url: string, data?: object, options?: AjaxOptions) => Helper(Method.POST, url, data, options),
    get: (url: string, data?: object, options?: AjaxOptions) => Helper(Method.GET, url, data, options)
};

