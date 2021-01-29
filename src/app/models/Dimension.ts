import {Element} from "./Element";

export interface Dimension {
  id: number;
  name: string;
  description: string;
  weight: number;
  enabled: boolean;
  sourceColumn: string
  individual: boolean,
  organization: boolean,
  elements :Element[];
}



