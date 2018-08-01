import {$Button} from "@common/calsses/entity/$Button";
import {bean} from "@common/ioc";
import {Toast} from "antd-mobile";
import {action, observable} from "mobx";

@bean($ButtonMV)
export class $ButtonMV {

    @observable public buttons: $Button[] = [];

    @action
    public addNewButton() {
        const newButton = new $Button({
            name: "挂单",
            onClick: () => {
                Toast.info("开发中...");
            },
        });
        this.buttons.push(newButton);
    }


}