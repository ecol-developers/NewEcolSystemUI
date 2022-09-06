import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { observableToBeFn } from "rxjs/internal/testing/TestScheduler";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class TableMenuService {

  constructor(
    private translateService:TranslateService,
    private http:HttpClient,
    private messageService:MessageService,
    private confirmationService:ConfirmationService
  ) { }

  delete(path:string, id?:number):Observable<boolean> {
    var returnSubject = new BehaviorSubject<boolean>(false);

    if(id !== null) {
      this.confirmationService.confirm({
        message: this.translateService.instant("table-menu.remove_record_question"),
        accept:()=> {
            this.http.delete(environment.endpointApiPath+path+id).subscribe({
            complete:()=> {
              this.messageService.add(
                {severity:"success", summary:this.translateService.instant("btn.ok"), detail:this.translateService.instant("table-menu.remove_record_success")}
                );
                returnSubject.next(true);
            },
            error:()=> {
              this.messageService.add(
                {severity:"error", summary:this.translateService.instant("table-menu.error"), detail:this.translateService.instant("table-menu.remove_record_error")}
                );
            }
          });
        }
      });

    }
    return returnSubject.asObservable();
 }

 save(objectDto:any, id?:number, addPath?:string, editPath?:string):Observable<boolean> {
  var returnSubject = new BehaviorSubject<boolean>(false);

  if(objectDto != undefined) {
    if(id === undefined) {
      id = 0;
      this.http.post(environment.endpointApiPath+addPath,objectDto)
      .subscribe({
        complete:()=> {
          this.messageService.add(
            {severity:"success",summary:this.translateService.instant("btn.ok"), detail:this.translateService.instant("table-menu.add_record_success")}
            );
          returnSubject.next(true);
        },
        error:(er:any)=>this.messageService.add(
          {severity:"error",summary:this.translateService.instant("table-menu.error"), detail:this.translateService.instant("table-menu.add_record_error")}
          )
      });
    } else {
      this.http.put(environment.endpointApiPath+editPath+"/"+id,objectDto).subscribe({
        complete:()=> {
          this.messageService.add(
            {severity:"success",summary:this.translateService.instant("btn.ok"), detail:this.translateService.instant("table-menu.edit_record_success")}
            );
          returnSubject.next(true);
        },
        error:(er:any)=>this.messageService.add(
          {severity:"error",summary:this.translateService.instant("table-menu.error"), detail:this.translateService.instant("table-menu.edit_record_error")}
          )
      });
    }
  }

  return returnSubject.asObservable();

 }
}