import {beanMapper} from "@common/calsses/helper/BeanHelper";
import {bean} from "@common/ioc";

@bean($BaseEntity)
export class $BaseEntity {

    constructor(entity: any) {
        beanMapper(entity, this);
    }
}
