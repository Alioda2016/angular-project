
export interface AlertData {
  title:string;
  content:string;
  action?:string;
}

export enum Messages {
  Confirm_Delete = 'Are you sure you want to delete?',
  Confirm_Update = 'Are you sure you want to update?',
}

export enum Titles {
  delete_element = 'Delete Element',
  Delete_Dimension = 'Delete Dimension',
  edit_rate = 'Update Rate'
}
