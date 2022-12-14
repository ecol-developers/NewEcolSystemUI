import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { TableMenuStructure } from 'src/app/modules/universal-components/models/tableMenuStructure.model';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

@Injectable({
  providedIn: 'root',
})
export class TableButtonService {
  postSub: Subscription;

  constructor(
    private translateService: TranslateService,
    private confirmationService: ConfirmationService,
    private apiService: ApiService,
    private commonService: CommonService
  ) {}

  // deprecated
  post(obj: TableMenuStructure): Observable<TableMenuStructure> {
    let ret = new BehaviorSubject<TableMenuStructure>(obj);
    obj.editState = true;
    obj.submitValue = this.translateService.instant('btn.add');
    obj.objectDto = {};
    obj.objectEditDto = {};
    ret.next(obj);
    return ret.asObservable();
  }

  // deprecated
  put(obj: TableMenuStructure): Observable<TableMenuStructure> {
    let ret = new BehaviorSubject<TableMenuStructure>(obj);

    if (obj.objectEditDto?.id !== null) {
      obj.editState = true;
      obj.submitValue = this.translateService.instant('btn.save');
    } else {
      this.commonService.getMessageToastBySeverity(
        'warn',
        this.translateService.instant('table-menu.select_record')
      );
    }

    return ret.asObservable();
  }

  //deprecated
  delete(path: string): Observable<boolean> {
    let returnSubject = new BehaviorSubject<boolean>(false);

    this.confirmationService.confirm({
      message: this.translateService.instant(
        'table-menu.remove_record_question'
      ),
      accept: () => {
        this.apiService.getResponseByDelete(path).subscribe({
          complete: () => {
            this.commonService.getMessageToastBySeverity(
              'success',
              this.translateService.instant('table-menu.remove_record_success')
            );
            returnSubject.next(true);
          },
          error: (er: HttpErrorResponse) => {
            this.commonService.getMessageToastBySeverity(
              'error',
              er.error?.Errors[0]?.Message
            );
          },
        });
      },
    });

    return returnSubject.asObservable();
  }

  save(path: string, objectDto: any, id?: number): Observable<boolean> {
    var returnSubject = new BehaviorSubject<boolean>(false);

    if (objectDto !== undefined) {
      if (id === undefined || id === 0) {
        id = 0;

        this.apiService.getResponseByPost(path, objectDto).subscribe({
          complete: () => {
            this.commonService.getMessageToastBySeverity(
              'success',
              this.translateService.instant('table-menu.add_record_success')
            );
            returnSubject.next(true);
          },
          error: (er: HttpErrorResponse) => {
            const errorText =
              er?.error?.Errors === undefined
                ? er?.error?.errors[0]?.message
                : er?.error?.Errors[0]?.Message;
            this.commonService.getMessageToastBySeverity('error', errorText);
          },
        });
      } else {
        this.apiService
          .getResponseByPut(path + '?id=' + id, objectDto)
          .subscribe({
            complete: () => {
              this.commonService.getMessageToastBySeverity(
                'success',
                this.translateService.instant('table-menu.edit_record_success')
              );
              returnSubject.next(true);
            },
            error: (er: HttpErrorResponse) => {
              this.commonService.getMessageToastBySeverity(
                'error',
                er.error?.errors[0]?.message
              );
            },
          });
      }
    }
    return returnSubject.asObservable();
  }
}
