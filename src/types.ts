export type LogRes = {
    uuid: string;
    time: Date;
    type: string;
    message: string;
};
export type LogFilters = {
    from?: Date;
    to?: Date;
    uuid?: string;
};