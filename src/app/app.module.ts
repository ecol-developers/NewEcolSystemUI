import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FileSaverService } from 'ngx-filesaver';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ChipModule } from 'primeng/chip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SidebarModule } from 'primeng/sidebar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './components/pages/dashboard-page/breadcrumb/breadcrumb.component';
import { SelectDepartmentComponent } from './components/pages/dashboard-page/breadcrumb/select-department/select-department.component';
import { ConfigComponent } from './components/pages/dashboard-page/config/config.component';
import { DashboardPageComponent } from './components/pages/dashboard-page/dashboard-page.component';
import { FooterComponent } from './components/pages/dashboard-page/footer/footer.component';
import { InlineMenuComponent } from './components/pages/dashboard-page/inline-menu/inline-menu.component';
import { MenuComponent } from './components/pages/dashboard-page/menu/menu.component';
import { MenuitemComponent } from './components/pages/dashboard-page/menuitem/menuitem.component';
import { RightmenuComponent } from './components/pages/dashboard-page/rightmenu/rightmenu.component';
import { TopbarComponent } from './components/pages/dashboard-page/topbar/topbar.component';
import { TabsComponent } from './components/pages/dashboard/tabs/tabs.component';
import { AuthconfigInterceptor } from './modules/login/auth/authconfig.interceptor';
import { loginReducer, LOGIN_KEY } from './modules/login/state/login.reducer';
import { hydrationMetaReducer } from './modules/login/state/rehydrate_reducer';
import { RootState } from './modules/login/state/root-state';
import { ExportDataComponent } from './modules/universal-components/components/table/export-data/export-data.component';
import { UniversalComponentsModule } from './modules/universal-components/universal-components.module';
import { DiagramOrdersComponent } from './pages/main-summary/diagram-orders/diagram-orders.component';
import { DiagramPercentageComponent } from './pages/main-summary/diagram-percentage/diagram-percentage.component';
import { MainSummaryComponent } from './pages/main-summary/main-summary.component';
import { ProductsUnderMinimalStateComponent } from './pages/main-summary/products-under-minimal-state/products-under-minimal-state.component';
import { TodayOrdersComponent } from './pages/main-summary/today-orders/today-orders.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { Summary1Component } from './pages/summary1/summary1.component';
import { Summary2Component } from './pages/summary2/summary2.component';
import { TreeComponent } from './pages/tree/tree.component';

function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

export const reducers: ActionReducerMap<RootState> = {
  [LOGIN_KEY]: loginReducer,
};

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    NotfoundComponent,
    TabsComponent,
    TopbarComponent,
    RightmenuComponent,
    BreadcrumbComponent,
    FooterComponent,
    ConfigComponent,
    InlineMenuComponent,
    MenuComponent,
    MenuitemComponent,
    Summary1Component,
    Summary2Component,
    TreeComponent,
    MainSummaryComponent,
    SelectDepartmentComponent,
    DiagramOrdersComponent,
    DiagramPercentageComponent,
    TodayOrdersComponent,
    ProductsUnderMinimalStateComponent,
    ExportDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    PanelModule,
    MenubarModule,
    SplitButtonModule,
    TreeModule,
    TableModule,
    ToastModule,
    HttpClientModule,
    SidebarModule,
    PanelMenuModule,
    TreeSelectModule,
    SplitterModule,
    ConfirmDialogModule,
    OrganizationChartModule,
    BadgeModule,
    DropdownModule,
    ChartModule,
    MessagesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    TabViewModule,
    BreadcrumbModule,
    AutoCompleteModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 15,
    }),
    MegaMenuModule,
    RadioButtonModule,
    InputSwitchModule,
    ProgressBarModule,
    MenuModule,
    TimelineModule,
    CardModule,
    OverlayPanelModule,
    ContextMenuModule,
    MultiSelectModule,
    DialogModule,
    UniversalComponentsModule,
    ChipModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthconfigInterceptor,
      multi: true,
    },
    ConfirmationService,
    MessageService,
    FileSaverService,
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
