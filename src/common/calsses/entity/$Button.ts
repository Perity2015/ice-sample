import {$BaseEntity} from "@common/calsses/entity/$BaseEntity";
import {bean} from "@common/ioc";
import {observable} from "mobx";
import * as uuid from "uuid/v4";

@bean($Button)
export class $Button extends $BaseEntity{
    @observable public id: string = uuid();
    @observable public name: string;
    @observable public onClick: () => void;
}