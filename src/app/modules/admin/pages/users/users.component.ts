import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { Subscription } from 'rxjs';
import { GridEnum } from 'src/app/models/enums/gridEnum';
import { TableButtonComponent } from 'src/app/modules/universal-components/components/table-button/table-button.component';
import { TableComponent } from 'src/app/modules/universal-components/components/table/table.component';
import { TableService } from 'src/app/modules/universal-components/components/table/table.service';
import { TableMenuStructure } from 'src/app/modules/universal-components/models/tableMenuStructure.model';
import { getModelPath, postModelPath } from 'src/app/services/path';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  @ViewChild(TableComponent) tableComponent: TableComponent;
  @ViewChild(TableButtonComponent) tableButtonComponent: TableButtonComponent;

  static icon = PrimeIcons.USERS;
  icon = PrimeIcons.USERS;
  static title = 'pages.users.title';
  gridId = GridEnum.Users;
  multiselect = true;
  model = 'User';
  buttons: MenuItem[];
  obj: TableMenuStructure = new TableMenuStructure();
  selectedId: number;
  postPath: string = postModelPath(this.model);
  putPath: string;
  compsiteSub = new Subscription();

  constructor(
    private tableService: TableService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.getButtons();
  }

  getButtons(): void {
    this.buttons = [
      {
        label: this.translateService.instant('btn.add'),
        icon: 'pi pi-fw pi-plus',
        disabled: false,
        command: () => (this.obj = this.tableButtonComponent.post(this.obj)),
      },
      {
        label: this.translateService.instant('btn.remove'),
        icon: 'pi pi-fw pi-minus',
        disabled: false,
        command: () =>
          this.tableButtonComponent.delete(this.model, this.obj.objectDto.id),
      },
      {
        label: this.translateService.instant('btn.edit'),
        icon: 'pi pi-fw pi-pencil',
        disabled: false,
        command: () => this.tableButtonComponent.put(this.obj),
      },
      {
        label: this.translateService.instant('btn.refresh'),
        icon: 'pi pi-fw pi-refresh',
        disabled: false,
        command: () => this.tableButtonComponent.refreshTable.emit(),
      },
    ];
  }

  getSelected(ev: any): void {
    var path = getModelPath(this.model, ev.id);
    this.selectedId = ev.id;
    this.tableService.getObjDto(path, this.obj);
  }

  refreshTable(): void {
    this.tableComponent.getData4Grid(this.gridId);
    this.obj.editState = false;
  }

  ngOnDestroy(): void {
    this.compsiteSub.unsubscribe();
  }
}
