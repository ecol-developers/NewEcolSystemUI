import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DndDropEvent } from 'ngx-drag-drop';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { ResponseColumnSettingValueData } from 'src/app/models/responses/columns/responseColumnSettingValueData';
import { FormTableSetColumnService } from './form-table-set-column.service';

@Component({
  selector: 'app-form-table-set-column',
  templateUrl: './form-table-set-column.component.html',
  styleUrls: ['./form-table-set-column.component.css'],
})
export class FormTableSetColumnComponent implements OnInit {
  availableColumns: ResponseColumnSettingValueData[] = [];
  selectedColumns: ResponseColumnSettingValueData[] = [];
  draggedColumn: ResponseColumnSettingValueData | null;

  title: string;
  gridId: number;
  saveColumnSub: Subscription;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private translateService: TranslateService,
    private formTableSetColumnService: FormTableSetColumnService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.gridId = this.config.data[0];
    this.config.data.closeOnEscape = true;
    const cols: ResponseColumnSettingValueData[] = this.config.data[1];
    this.availableColumns = cols.filter((x) => x.isVisible === false);
    this.selectedColumns = cols.filter((x) => x.isVisible === true);
  }

  onDragStartAvailableColumns(
    ev: DragEvent,
    col: ResponseColumnSettingValueData
  ): void {
    this.draggedColumn = col;
  }

  onDropSelectedColumns(ev: DndDropEvent): void {
    if (this.draggedColumn) {
      if (
        !this.selectedColumns.find(
          (x) => x.columnName === this.draggedColumn?.columnName
        )
      ) {
        this.draggedColumn.isVisible = true;
        this.selectedColumns.push(this.draggedColumn);
        var index = this.availableColumns.findIndex(
          (x) => x.columnName === this.draggedColumn?.columnName
        );
        this.availableColumns.splice(index, 1);
        this.draggedColumn = null;
      }
    }
  }

  onDragStartSelectedColumns(
    ev: DragEvent,
    col: ResponseColumnSettingValueData
  ): void {
    this.draggedColumn = col;
  }

  onDropAvailableColumns(ev: DndDropEvent): void {
    if (this.draggedColumn) {
      if (
        !this.availableColumns.find(
          (x) => x.columnName === this.draggedColumn?.columnName
        )
      ) {
        this.draggedColumn.isVisible = false;
        this.availableColumns.push(this.draggedColumn);
        var index = this.selectedColumns.findIndex(
          (x) => x.columnName === this.draggedColumn?.columnName
        );
        this.selectedColumns.splice(index, 1);
        this.draggedColumn = null;
      }
    }
  }

  save(): void {
    var allColumns = this.availableColumns.concat(this.selectedColumns);

    this.saveColumnSub = this.formTableSetColumnService
      .setColumnByUserIdGridId(this.gridId, allColumns)
      .subscribe({
        next: (res: boolean) => {
          if (!res) {
            this.messageService.add({
              severity: 'error',
              summary: this.translateService.instant('table-menu.error'),
              detail: this.translateService.instant(
                'table-menu.set_column_error'
              ),
            });
            this.ref.close(false);
          } else {
            this.messageService.add({
              severity: 'success',
              summary: this.translateService.instant('table-menu.success'),
              detail: this.translateService.instant(
                'table-menu.set_column_success'
              ),
            });
            this.ref.close(true);
          }
        },
        complete: () => this.saveColumnSub.unsubscribe(),
      });
  }

  cancel(): void {
    this.ref.close();
  }
}
