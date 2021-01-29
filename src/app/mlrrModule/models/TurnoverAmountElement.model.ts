export interface TurnoverAmountElementModel {
  dimensionId: number,
  threshold:number,
  type:elementType,
  elementValue:string,
  rate:number,
  id:number
}
export enum elementType {
  Individual="Individual",
  Organization="Organization"

}
