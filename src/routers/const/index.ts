export const BASE_PATH = '/react';

export enum Paths {
    APP = 1,
    APP2 = 2
}

export const RoutePaths = {
    [Paths.APP]: `${BASE_PATH}/app`,
    [Paths.APP2]: `${BASE_PATH}/app2`
};
