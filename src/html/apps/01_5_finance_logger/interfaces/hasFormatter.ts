export interface HasFormatter {
    id: number,
    type:string,
    format(): string;
}