import {ElementService} from '../../../services/element.service';
import {Messages, Titles} from '../../../models/Constant';
import {AlertService} from '../../../services/alert.service';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from '@angular/router';
import {AddNewElementComponent} from '../add-new-element/add-new-element.component';
import {Element} from 'src/app/models/Element';
import {ToastrService} from 'ngx-toastr';
import {StatusGroup} from "../../../models/StatusGroup";
import { DimensionElementDto } from 'src/app/models/DimensionElementDto';
import { DimensionService } from 'src/app/services/dimension.service';
import { element } from 'protractor';


/** Constants used to fill up our data base. */
const elements: Element[] = [
  {id: 0, name: "Yemen", rate: 5, elementName:'', dimension_id:7},
  {id: 1, name: "Egypt", rate: 6, elementName:'', dimension_id:7},
  {id: 2, name: "Qatar", rate: 5, elementName:'', dimension_id:7},
  {id: 3, name: "KSA", rate: 5, elementName:'', dimension_id:7},
  {id: 4, name: "UAE", rate: 8, elementName:'', dimension_id:7},
  {id: 5, name: "Iraq", rate: 9, elementName:'', dimension_id:7},
  {id: 6, name: "Tunesia", rate: 5, elementName:'', dimension_id:7},
  {id: 7, name: "Sudan", rate: 5, elementName:'', dimension_id:7}
];


@Component({
  selector: 'app-dimention-element',
  templateUrl: './dimention-element.component.html',
  styleUrls: ['./dimention-element.component.css']
})
export class DimentionElementComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['name', 'elementStatus','update' ,'delete'];
  dataSource = new MatTableDataSource<DimensionElementDto>();
  listId: number=0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  element: DimensionElementDto = new DimensionElementDto();

  constructor(public dialog: MatDialog,
              public route: ActivatedRoute,
              public alertService: AlertService,
              public elementService: ElementService,
              public dimensionService: DimensionService,
              public toastrService: ToastrService) {

  }

  ngAfterViewInit() {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    //this.dataSource = new MatTableDataSource(elements);

    // figure our router

    this.route.paramMap.subscribe(params => {
        console.info("params: " + params)
        this.listId = +(params.get('id')||0);
        console.info('listElementId = ', this.listId);
        this.element.dimensionId=this.listId;
        this.dimensionService.getDimensionElements(this.listId).subscribe((response: any)=>{
          console.log("response of get elements by id: ", response);
          this.dataSource.data = response;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      });

  
      
  }

  openForm() {
  let element:DimensionElementDto={dimensionId:this.listId,value:''}
    const dialogRef = this.dialog.open(AddNewElementComponent, {
      width: '600px',data:element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("element :", result);
       
        
        this.dimensionService.addElementToDimension(result).subscribe((response:DimensionElementDto)=>{
          console.log("response: " + response);          
          let originalSource = this.dataSource.data
          console.log("datasource", this.dataSource.data);
          originalSource.push(response)
          this.dataSource.data= originalSource
        });
      }
    });
  }

  deleteElement(row:DimensionElementDto, index: number) {
     this.alertService.confirm({title: Titles.delete_element, content: Messages.Confirm_Delete})
       .subscribe(
         (value: any) => {
          const response1 = value;
          if (response1.confirm === true) {
           console.log("row.elementId and row.dimensionId: ", row.elementId,+" ", row.dimensionId);
           
            this.dimensionService.deleteElementfromDimension(row.elementId, row.dimensionId)
                .subscribe(result=>{
              console.log("result delete from backend: ", result);
              this.dataSource.data = this.dataSource.data.filter((value,key)=>{
                return value.elementId != row.elementId;
              });
            })
            this.toastrService.success('Element Deleted Successfully !', 'Success');
            }(error: Error) => {
              console.log('Error Deleting the Element!', error);
              this.toastrService.error('Error Deleting the Element!', 'Error');
          }
        }
      )
  }

  UpdateElementRate(row:any, index: number){
    console.log("row: ", row);
    
    this.alertService.confirm({title: Titles.edit_rate, content: Messages.Confirm_Update}).subscribe(
      (response: any) => {
        const response1 = response;
        if (response1.confirm === true) {
          this.dimensionService.updateElementRate(row)
          .subscribe((result:any)=>{
        console.log("result update from backend: ", result);
        this.dataSource.data = this.dataSource.data.filter((value,key)=>{
          if(value.elementId == row.elementId){
            value.rate = row.rate;
            console.log("value: ", value);
            
          }
          return true;
        });        
      })
          this.toastrService.success('Element Updated Successfully !', 'Success');
          }(error: Error) => {
            console.log('Error updating the Element!', error);
            this.toastrService.error('Error updating the Element!', 'Error');
        }
      }
    )
  }
}
