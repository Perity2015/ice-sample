import {observable} from "mobx";

class UserStore {
    @observable public notice: string = "Welcome to React";
}

const userStore = new UserStore();

export {userStore, UserStore};
