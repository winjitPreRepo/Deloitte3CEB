import { Component, OnInit } from '@angular/core';
import { HttpGenericSerivce } from 'src/app/shared/http-genric.service';
import * as consts from '../../../shared/globle.constants'
import { first } from 'rxjs/operators';
import { FilterModel } from '../../../shared/models/ApplicationUser';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    sortByList;
    filterModel: FilterModel = new FilterModel();
    constructor(private httpGenericSerivce: HttpGenericSerivce) { }

    ngOnInit() {
        this.getSortByList();
        this.getProducts();
    }

    getSortByList() {
        this.httpGenericSerivce.fetchAll(consts.GetApplicationSortByList).pipe(first()).subscribe(sortByList => {
          this.sortByList = sortByList;
        });
      }

      getProducts() {
        this.filterModel.startIndex = 0;
        this.filterModel.size = 8;
        this.httpGenericSerivce.postData(consts.GetApplications, this.filterModel).pipe(first()).subscribe(productList => {
        });
      }

}
