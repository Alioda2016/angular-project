import {SharedService} from '../../services/shared.service';
import {SearchCriteriaDataStorage} from './manual-risk-data-storage';
import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ToastrService} from 'ngx-toastr';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MlrrUtilityService} from 'src/app/mlrr-utility.service';
import {ResultRiskRating} from 'src/app/mlrrModule/models/result.risk.rating.model';
import {manualRatingCase} from 'src/app/mlrrModule/models/manualRating.model';
import {DisplayRiskRatingDialogComponent} from './display-risk-rating-dialog/display-risk-rating-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manual-risk-rating',
  templateUrl: './manual-risk-rating.component.html',
  styleUrls: ['./manual-risk-rating.component.css']
})
export class ManualRiskRatingComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['partyNumber', 'partyName', 'partyId', 'partyNationality', 'partyResidency', 'rating', 'editrating', 'save',
    'displayElement', 'kyc'];
  dataSource = new MatTableDataSource([]);
  pageSizes = [5, 10, 15, 20];
  pageSize = 5;
  pageIndex: number;
  pageEvent: PageEvent = {pageIndex: 1, length: 200, pageSize: 5};
  resultsLength: number;
  @Input() data: string[] = [];
  loading: Boolean = true;
  IsLoaded = true;
  search = false;
  resultRiskRatingList: ResultRiskRating;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('MatPaginator1', {static: true}) paginator: MatPaginator;
//  @ViewChild('MatPaginator1') paginator: MatPaginator;
  searchCriteriaFormGroup: FormGroup = new FormGroup({
    'partyNumberControl': new FormControl(null),
    'partyIdControl': new FormControl(null),
    'partyResidencyControl': new FormControl(null),
    'partyNameControl': new FormControl(null),
    'partyNationalityControl': new FormControl(null),
  });

  constructor(private searchCriteriaDataStorage: SearchCriteriaDataStorage,
              private sharedService: SharedService, private mlrrUtil: MlrrUtilityService,
              private SearchCriteriaDataStorage: SearchCriteriaDataStorage,
              private toaster: ToastrService, private  dialog: MatDialog, private router: Router) {
  }

  ngAfterViewInit(): void {
    this.getSearchResult();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    // Reading value input from form
    let partyKeyInput = this.searchCriteriaFormGroup.get('partyIdControl')?.value;
    let partyNumber = this.searchCriteriaFormGroup.get('partyNumberControl')?.value;
    let partyNameInput = this.searchCriteriaFormGroup.get('partyNameControl')?.value;
    let nationalityInput = this.searchCriteriaFormGroup.get('partyNationalityControl')?.value;
    let residenceCountryNameInput = this.searchCriteriaFormGroup.get('partyResidencyControl')?.value;
    this.resultRiskRatingList = {
      partyNumber: partyNumber, nationality: nationalityInput,
      partyKey: partyKeyInput, partyName: partyNameInput, residenceCountryName: residenceCountryNameInput
    };
    this.search = true;
    this.getSearchResult();
  }

  onClear() {
    this.searchCriteriaFormGroup.reset();
  }

  getSearchResult() {
    merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          if (!this.paginator.pageIndex) {
            this.paginator.pageIndex = 0;
          }
          if (!this.paginator.pageSize) {
            this.paginator.pageSize = this.pageSize;
          }
          if (this.sort && this.paginator && this.search == true) {
            return this.searchCriteriaDataStorage.getAllSearchCriteria(this.resultRiskRatingList,
              this.paginator.pageIndex,
              this.paginator.pageSize);
          } else {
            return this.searchCriteriaDataStorage.getAllParties(this.paginator.pageIndex,
              this.paginator.pageSize);
          }
          return observableOf([]);
          ;
        }), map((data: any) => {
          if (!data) {
            return null;
          }
          this.resultsLength = data.totalElements;
          return data.content;
        }),
        catchError((error) => {
          console.error(error);
          return observableOf([]);
        })
      ).subscribe(response => {
      console.info('success getting message from server =', response);
      if (response) {
        this.dataSource = new MatTableDataSource(response);
      } else {
        this.dataSource = new MatTableDataSource([]);
      }
      this.IsLoaded = false;
      this.loading = false;
    });
  }

  getServerData(event: PageEvent) {
    console.info({
      note: 'we are in getServerData ',
      event: event
    });
    this.getSearchResult();
    return event;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editPartyRating(row: ResultRiskRating) {
    let targetRating = this.calculateRating(row.ratingValue || 0);
    let source = (row.riskRating || ' ').toUpperCase();
    let manualRatingCase: manualRatingCase = {partyNumber: row.partyNumber, source: source, target: targetRating};
    this.SearchCriteriaDataStorage.createManualRatingCase(manualRatingCase).subscribe(data => {
      this.toaster.success(JSON.stringify(data));
    });
    console.log(manualRatingCase);
  }

  calculateRating(ratingValue: number) {
    return this.mlrrUtil.calculateRating(ratingValue);
  }

  initializeDatatable() {
    this.paginator.firstPage();
    this.dataSource.paginator = this.paginator;
  }

  openDialogToDisplayElement(row: ResultRiskRating): void {
    const dialogRef = this.dialog.open(DisplayRiskRatingDialogComponent, {
      width: '600px',
      data: {
        partyNumber: row.partyNumber,
        partyName: row.partyName,
        partyKey: row.partyKey,
        nationality: row.nationality,
        residenceCountryName: row.residenceCountryName,
        riskRating: row.riskRating
      }
    });
  }

  openKYC(row: ResultRiskRating) {
    let partyKey = row.partyKey;
    this.router.navigate(['party-kyc', partyKey]);
  }
}
