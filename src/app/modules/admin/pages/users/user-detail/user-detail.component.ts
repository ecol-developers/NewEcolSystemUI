import { Component, EventEmitter, Input,Output } from "@angular/core";
import { TableMenuStructure } from "src/app/models/tableMenuStructure";
import { TableMenuService } from "src/app/universalComponents/table-menu/table-menu.service";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"]
})
export class UserDetailComponent {
  @Input()
  addPath:string;

  @Input()
  editPath:string;

  @Input()
  obj:TableMenuStructure;

  @Output()
  refreshTable = new EventEmitter();

  constructor(
    private tableMenuService:TableMenuService
  ) { }

  edit():void {
    this.tableMenuService.edit(this.obj).subscribe({
      next:(res:TableMenuStructure)=>this.obj = res
    });
  }

  save():void {
    this.tableMenuService.save(this.obj.objectEditDto,this.obj.objectEditDto.id,this.addPath, this.editPath).subscribe({
      next:(res:boolean)=> {
        if(res) {
          this.refreshTable.emit();
        }
      }
    });
  }

  cancel():void {
    this.obj.editState = false;
    this.obj.objectEditDto = {};
  }

}