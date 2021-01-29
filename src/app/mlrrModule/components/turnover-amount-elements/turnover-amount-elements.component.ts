import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AddNewTurnoverAmountElementComponent } from "../add-new-turnover-amount-element/add-new-turnover-amount-element.component";
import { MatTableDataSource } from "@angular/material/table";
import { elementType, TurnoverAmountElementModel } from "../../models/TurnoverAmountElement.model";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute } from '@angular/router';
import { TurnoveramountService } from '../../services/turnoveramount-service.service';
import { MLRRconstants } from 'src/app/MLRRconstants';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/services/alert.service';
import { Messages, Titles } from 'src/app/models/Constant';
import { ToastrService } from 'ngx-toastr';
import { DimensionElementDto } from 'src/app/models/DimensionElementDto';
@Component({
  selector: 'app-turnover-amount-elements',
  templateUrl: './turnover-amount-elements.component.html',
  styleUrls: ['./turnover-amount-elements.component.css']
})
export class TurnoverAmountElementsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['value', 'threshold', 'rate', 'update', 'delete'];
  dataSource = new MatTableDataSource<TurnoverAmountElementModel>([]);
  // dummyData: TurnoverAmountElementModel[] = [{ type: elementType.Individual, threshold: 100, elementValue: 'sales', rate: 9 },
  // { type: elementType.Organization, threshold: 800, elementValue: 'shopping', rate: 5 },
  // { type: elementType.Individual, threshold: 300, elementValue: 'banking', rate: 6 }]
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  turnOverAmountType: string = ''
  headerName: string = '';
   dimensionId:number=0
  constructor(public dialog: MatDialog, 
                     private route: ActivatedRoute, 
                     private turnoveramountService: TurnoveramountService,
                     private alertService: AlertService,
                     private toastrService: ToastrService) {
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
     this.dimensionId = +(params.get('id')||0);
      console.log("turn over amount: ", this.turnOverAmountType)
      console.log("turn over amount dimension id: ", this.dimensionId)
      // if (MLRRconstants.Individual==this.turnOverAmountType) {
      //   id = environment.individualTurnoveramountId
      // } else {
      //   id = environment.organizationTurnoveramountId
      // }
     this.getAllElements(this.dimensionId);
      this.valueColumnHeader()
    });
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addNewElementToTurnover() {
    const dialogRef = this.dialog.open(AddNewTurnoverAmountElementComponent, {
      width: '800px',
      data: { dimensionId: this.dimensionId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("result after close: ", result);
        this.turnoveramountService.addNewTurnoverAmountElement(result).subscribe((response:any)=>{
          // console.log("response: ", response);          
          // let originalSource = this.dataSource.data
          // console.log("datasource", this.dataSource.data);
          // originalSource.push(response)
          // this.dataSource.data= originalSource
          this.getAllElements(this.dimensionId);

        });
      }

    });
  }

  UpdateElementRate(row: TurnoverAmountElementModel, index: number){
        console.log("row: ", row);
    
    this.alertService.confirm({title: Titles.edit_rate, content: Messages.Confirm_Update}).subscribe(
      (response: any) => {
        const response1 = response;
        if (response1.confirm === true) {
          this.turnoveramountService.updateTurnoverElement(row)
          .subscribe((result:any)=>{
        console.log("result update from backend: ", result);
        this.dataSource.data = this.dataSource.data.filter((value,key)=>{
          if(value.id == row.id){
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

  deleteElement(row:TurnoverAmountElementModel, index: any) {
    this.alertService.confirm({title: Titles.delete_element, content: Messages.Confirm_Delete})
       .subscribe(
         (value: any) => {
          const response1 = value;
          if (response1.confirm === true) {
           console.log("row: ", row);
           console.log("dimension di for delete: ", this.dimensionId);
            this.turnoveramountService.deleteTurnoverElementsById(row.id)
                .subscribe(result=>{
              console.log("result delete from backend: ", result);
              this.getAllElements(this.dimensionId);
            })
            this.toastrService.success('Element Deleted Successfully !', 'Success');
            }(error: Error) => {
              console.log('Error Deleting the Element!', error);
              this.toastrService.error('Error Deleting the Element!', 'Error');
          }
        }
      )
  }

  getAllElements(id: number){
    this.turnoveramountService.findTurnoverElementByDimensionId(id)
    .subscribe((data: TurnoverAmountElementModel[]) => {
      this.dataSource.data = data
      });
  }

  valueColumnHeader() {
    if (this.dimensionId==environment.individualTurnoveramountId) {
      this.headerName = 'Occupation'
    } else {
      this.headerName = 'Industry'

    }
  }

}
