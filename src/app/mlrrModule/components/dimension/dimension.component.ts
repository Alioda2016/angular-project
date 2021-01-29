import { Messages, Titles } from '../../../models/Constant';
import { AlertService } from '../../../services/alert.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewDimensionComponent } from '../add-new-dimension/add-new-dimension.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Dimension } from 'src/app/models/Dimension';
import { DimensionService } from "../../../services/dimension.service";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-dimension',
  templateUrl: './dimension.component.html',
  styleUrls: ['./dimension.component.css']
})
export class DimensionComponent implements OnInit {

  displayedColumns = ['name', 'sourceColumn', 'description', 'individual', 'organization', 'update', 'weight', 'enable', 'display', 'edit','Delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  type: boolean=false;
  dataSource = new MatTableDataSource<Dimension>();
  buttonDisabled: boolean = false;

  constructor(public dialog: MatDialog,
    public router: ActivatedRoute,
    public route: Router,
    public alertService: AlertService,
    private dimensionService: DimensionService,
    private toastrService: ToastrService) {

  }

  ngOnInit(): void {


    this.getAllDimensions();


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

  openForm() {
    let emptydimenion:Dimension={description:'',id:0, weight: 0, sourceColumn: '', name:'',
                                  enabled: false, individual: false, organization: false, elements:[]}
    const dialogRef = this.dialog.open(AddNewDimensionComponent, {
      width: '800px',
      data:{type:false, dimensionValue:emptydimenion},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        // let originalSource = this.dataSource.data
        // originalSource.push(result)
        // this.dataSource.data = originalSource
        this.getAllDimensions();
      }

    });
  }

  disabled(row: Dimension) {
    this.buttonDisabled = row.enabled;
    return this.buttonDisabled;
  }

  displayElements(row: Element) {


    this.route.navigateByUrl(`/element/${row.id}`);
  }

  changeActivity(row: Dimension) {
    if (row.enabled) {
      this.dimensionService.disableDimension(row.id).subscribe(() => {
        row.enabled = !row.enabled

      })
    } else {
      this.dimensionService.enableDimension(row.id).subscribe(() => {
        row.enabled = !row.enabled

      })
    }
  }

  deleteDimension(row: Dimension, index: number) {
    this.alertService.confirm({ title: Titles.Delete_Dimension, content: Messages.Confirm_Delete })
      .subscribe(
        (value: any) => {
          const response1 = value;
          if (response1.confirm === true) {
            this.dimensionService.deleteDimension(row.id).subscribe(() => {
              this.dimensionService.getAllDimensions().subscribe((result: any) => {
                // this.getAllDimensions();
                this.dataSource.data = this.dataSource.data.filter((value, key) => {
                  return value.id != row.id;
                });
              })

            })
            this.toastrService.success('Element Deleted Successfully !', 'Success');
          } (error: Error) => {
            console.log('Error Deleting the Element!', error);
            this.toastrService.error('Error Deleting the Element!', 'Error');
          }
        }

      )
  }

  changesourceColumn(event: any, row: any) {
    console.log(event)
  }

  getAllDimensions() {
    this.dimensionService.getAllDimensions().subscribe((result: any) => {
      result.forEach((p: Dimension) => {
        if(p.individual==null){p.individual=false}
        if(p.organization==null){p.organization=false}
      });
      this.dataSource.data = result;
    });
  }

  updateDimension(row: Dimension, index: number){
    const dialogRef = this.dialog.open(AddNewDimensionComponent, {
      width: '800px',
      data:{type:true,dimensionValue:row},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("result after close: ", result);
        this.dataSource.data = this.dataSource.data.filter((value, key) => {
          if (value.id == result.id) {
            value = result
            console.log("value: ", value);

          }
          return true;
        });
      }

    });
  }

  UpdateDimensionType(row: Dimension, index: number) {
    console.log("row: ", row);

    this.alertService.confirm({ title: Titles.edit_rate, content: Messages.Confirm_Update }).subscribe(
      (response: any) => {
        const response1 = response;
        if (response1.confirm === true) {
          this.dimensionService.updateDimensionType(row.id, row.individual, row.organization)
            .subscribe((result: any) => {
              console.log("result update from backend: ", result);
              this.dataSource.data = this.dataSource.data.filter((value, key) => {
                if (value.id == row.id) {
                  value.individual = row.individual;
                  value.organization = row.organization
                  console.log("value: ", value);

                }
                return true;
              });
              this.toastrService.success('Element Updated Successfully !', 'Success');
            })
        } (error: Error) => {
          console.log('Error updating the Element!', error);
          this.toastrService.error('Error updating the Element!', 'Error');
        }
      }
    )
  }
}

const dimensions: Dimension[] = [
  {
    id: 0,
    name: "Ocupation",
    description: "fhjkhfkjscnkjn",
    weight: 23,
    enabled: true,
    sourceColumn: 'pep_ind',
    elements: [],
    organization: true,
    individual: false
  },
  {
    id: 1,
    name: "nationality",
    description: "fhjkhfkjscnkjn",
    weight: 1,
    enabled: true,
    sourceColumn: "pep_ind",
    elements: [],
    organization: true,
    individual: false
  },
  {
    id: 2,
    name: "industry",
    description: "fhjkhfkjscnkjn",
    weight: 54,
    enabled: true,
    sourceColumn: "pep_ind",
    elements: [],
    organization: true,
    individual: false
  },
  {
    id: 3,
    name: "country street",
    description: "fhjkhfkjscnkjn",
    weight: 88,
    enabled: true,
    sourceColumn: "pep_ind",
    elements: [],
    organization: true,
    individual: false
  },
  {
    id: 4,
    name: "Ocupation4",
    description: "fhjkhfkjscnkjn",
    weight: 12,
    enabled: true,
    sourceColumn: "pep_ind",
    elements: [],
    organization: true,
    individual: false
  },
  {
    id: 5,
    name: "Ocupation",
    description: "fhjkhfkjscnkjn",
    weight: 17,
    enabled: true,
    sourceColumn: "pep_ind",
    elements: [],
    organization: true,
    individual: false
  },
  {
    id: 6,
    name: "Ocupation",
    description: "fhjkhfkjscnkjn",
    weight: 23,
    enabled: true,
    sourceColumn: "pep_ind",
    elements: [],
    organization: true,
    individual: false
  },
  {
    id: 7,
    name: "Ocupation",
    description: "fhjkhfkjscnkjn",
    weight: 23,
    enabled: true,
    sourceColumn: "pep_ind",
    elements: [],
    organization: true,
    individual: false
  },
  {
    id: 8,
    name: "Ocupation",
    description: "fhjkhfkjscnkjn",
    weight: 23,
    enabled: false,
    sourceColumn: "pep_ind",
    elements: [],
    organization: true,
    individual: false
  }
];
