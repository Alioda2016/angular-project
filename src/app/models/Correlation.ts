import { DimensionElementDto } from './DimensionElementDto';

export interface Correlation {
    id: number;
    name: string;
    rate: number,
    elements:DimensionElementDto[]

  }
//   export class Correlation{
//       id: number;
//       elementName: string;
//       dimension_id: number
//   }