import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MlrrUtilityService } from 'src/app/mlrr-utility.service';
import { Messages, Titles } from 'src/app/models/Constant';
import { Correlation } from 'src/app/models/Correlation';
import { Dimension } from 'src/app/models/Dimension';
import { Element } from 'src/app/models/Element';
import { AlertService } from 'src/app/services/alert.service';
import { CorrelationService } from 'src/app/services/correlation.service';
import { FlatCorrelatedListElement } from '../../models/FlatCorrelatedListElement.model';
import { AddNewCorrelationComponent } from '../add-new-correlation/add-new-correlation.component';


interface Status {
  value: number;
  viewValue: string;
}

interface StatusGroup {
  name: string;
  status: Status[];
}
interface rowss {
  id: number,
  value: string,
  rate: number
}
@Component({
  selector: 'app-correlation',
  templateUrl: './correlation.component.html',
  styleUrls: ['./correlation.component.css']
})
export class CorrelationComponent implements OnInit {

  dataSource = new MatTableDataSource<rowss>([]);
  displayedColumns: string[] = ['elementName', 'elementStatus', 'update', 'delete'];
  dimensionsList: Dimension[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  groups: FlatCorrelatedListElement[][] = [];


  constructor(public dialog: MatDialog,
    public route: ActivatedRoute,
    public alertService: AlertService,
    public correlationService: CorrelationService,
    public toastrService: ToastrService, private mlrrUtility: MlrrUtilityService) { }

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

  ngOnInit(): void {
    this.getAllCorrelatedList()
  }

  openForm() {
    const dialogRef = this.dialog.open(AddNewCorrelationComponent, {
      width: '800px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCorrelatedList()
      console.log('The dialog was closed');
      console.log("correlation as response of pop up after close: ", result);

    });
  }

  selectStatus = new FormControl();


  deleteElement(row: Correlation, index: any) {
    this.alertService.confirm({ title: Titles.delete_element, content: Messages.Confirm_Delete })
      .subscribe(
        (value: any) => {
          const response1 = value;
          if (response1.confirm === true) {
          
            this.correlationService.deleteCorrelatedListById(row.id).subscribe(result => {
              console.log("result", result);
              this.dataSource.data = this.dataSource.data.filter((value,key)=>{
                return value.id != row.id;
              });
              // let cloned = this.dataSource.data
              // cloned.splice(index, 1)
              // this.dataSource.data = cloned
            }), (error: Error) => {
              console.log('Error Deleting the Element!', error);
              this.toastrService.error('Error Deleting the Element!', 'Error');
            }
          }
        }
      )
  }

  getAllCorrelatedList() {
    this.correlationService.findAllCorrelatedLists().subscribe((result: FlatCorrelatedListElement[]) => {
      console.log("all correlated lists: ", result);

      this.groups = this.mlrrUtility.groupBy(result, "correlatedListId")
      this.calculateData(this.groups)

    });
  }
  calculateData(groups: FlatCorrelatedListElement[][]) {
    let data: any[] = []
    groups.forEach(group => {
      if (group && group.length > 0) {
        let names: string[] = []
        let id = group[0].correlatedListId || 0
        let rate = group[0].rate || 0
        group.forEach(g => {
          names .push([g.elementName || '', g.dimensionName || ''].join(':'))
        })
        data.push({ id: id, value: names.join(','), rate })
      }

    })
    this.dataSource.data = data
  }

  UpdateElementRate(row: Correlation, index: number) {
    console.log("row: ", row);

    this.alertService.confirm({ title: Titles.edit_rate, content: Messages.Confirm_Update }).subscribe(
      (response: any) => {
        const response1 = response;
        if (response1.confirm === true) {
          this.correlationService.editCorrelatedListRate(row.id, row.rate)
            .subscribe((result: any) => {
              console.log("result update from backend: ", result);
              this.dataSource.data = this.dataSource.data.filter((value, key) => {
                if (value.id == row.id) {
                  value.rate = row.rate;
                  console.log("value: ", value);
                }
                return true;
              });
            })
          this.toastrService.success('Element Updated Successfully !', 'Success');
        } (error: Error) => {
          console.log('Error updating the Element!', error);
          this.toastrService.error('Error updating the Element!', 'Error');
        }
      }
    )
  }

}
