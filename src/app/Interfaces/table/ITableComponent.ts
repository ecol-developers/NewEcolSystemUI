import { LazyLoadEvent } from "primeng/api";

export declare interface ITableComponent {
  getColumns():void;
  prepareRequest(ev:LazyLoadEvent | null):void;
  getRequestObjFromComponent(ev:LazyLoadEvent):void;
  getSelectedObjFromComponent(ev:any):void;
}