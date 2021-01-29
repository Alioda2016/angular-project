export interface ScaleBoundry {

  id: number;
  keyConfiguration: string;
  valueConfiguration: number;
  category: 'scaleBoundry'
}

export interface RatingScale {
  maxScaleControl: number,
  lowBoundryControl: number,
  highBoundryControl: number
}
