import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MegaMenuItem, TreeNode } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { Tab } from 'src/app/models/tab.model';
import { UsersComponent } from 'src/app/modules/admin/pages/users/users.component';
import { ProductTradeNameComponent } from 'src/app/modules/dictionaries/pages/product-trade-name/product-trade-name.component';
import { DashboardPageComponent } from '../dashboard-page.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  animations: [
    trigger('topbarActionPanelAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scaleY(0.8)' }),
        animate(
          '.12s cubic-bezier(0, 0, 0.2, 1)',
          style({ opacity: 1, transform: '*' })
        ),
      ]),
      transition(':leave', [animate('.1s linear', style({ opacity: 0 }))]),
    ]),
  ],
})
export class TopbarComponent implements OnInit {
  activeItem: number;

  model: MegaMenuItem[] = [
    {
      label: 'RAPORTY',
      icon: 'pi pi-fw pi-print',
      items: [
        [
          {
            label: 'UI KIT 1',
            items: [
              {
                label: 'Form Layout',
                icon: 'pi pi-fw pi-id-card',
                routerLink: ['/uikit/formlayout'],
              },
              {
                label: 'Input',
                icon: 'pi pi-fw pi-check-square',
                routerLink: ['/uikit/input'],
              },
              {
                label: 'Float Label',
                icon: 'pi pi-fw pi-bookmark',
                routerLink: ['/uikit/floatlabel'],
              },
              {
                label: 'Button',
                icon: 'pi pi-fw pi-mobile',
                routerLink: ['/uikit/button'],
              },
              {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                routerLink: ['/uikit/file'],
              },
            ],
          },
        ],
        [
          {
            label: 'UI KIT 2',
            items: [
              {
                label: 'Table',
                icon: 'pi pi-fw pi-table',
                routerLink: ['/uikit/table'],
              },
              {
                label: 'List',
                icon: 'pi pi-fw pi-list',
                routerLink: ['/uikit/list'],
              },
              {
                label: 'Tree',
                icon: 'pi pi-fw pi-share-alt',
                routerLink: ['/uikit/tree'],
              },
              {
                label: 'Panel',
                icon: 'pi pi-fw pi-tablet',
                routerLink: ['/uikit/panel'],
              },
              {
                label: 'Chart',
                icon: 'pi pi-fw pi-chart-bar',
                routerLink: ['/uikit/charts'],
              },
            ],
          },
        ],
        [
          {
            label: 'UI KIT 3',
            items: [
              {
                label: 'Overlay',
                icon: 'pi pi-fw pi-clone',
                routerLink: ['/uikit/overlay'],
              },
              {
                label: 'Media',
                icon: 'pi pi-fw pi-image',
                routerLink: ['/uikit/media'],
              },
              {
                label: 'Menu',
                icon: 'pi pi-fw pi-bars',
                routerLink: ['/uikit/menu'],
              },
              {
                label: 'Message',
                icon: 'pi pi-fw pi-comment',
                routerLink: ['/uikit/message'],
              },
              {
                label: 'Misc',
                icon: 'pi pi-fw pi-circle-off',
                routerLink: ['/uikit/misc'],
              },
            ],
          },
        ],
      ],
    },
    {
      label: 'ULUBIONE OKNA',
      icon: 'pi pi-fw pi-heart',
      items: [
        [
          {
            label: 'UTILITIES 1',
            items: [
              {
                label: 'Icons',
                icon: 'pi pi-fw pi-prime',
                routerLink: ['utilities/icons'],
              },
              {
                label: 'PrimeFlex',
                icon: 'pi pi-fw pi-desktop',
                url: 'https://www.primefaces.org/primeflex/',
                target: '_blank',
              },
            ],
          },
        ],
      ],
    },
  ];

  @ViewChild('searchInput') searchInputViewChild: ElementRef;

  pages: TreeNode[];
  selectedPage: TreeNode;

  constructor(
    public app: AppComponent,
    public dashboard: DashboardPageComponent
  ) {}

  ngOnInit(): void {}

  onSearchAnimationEnd(event: any) {
    switch (event.toState) {
      case 'visible':
        this.searchInputViewChild.nativeElement.focus();
        break;
    }
  }

  select(item: any): void {
    const tab: Tab = {
      header: item.label,
      component: item.component,
      tooltip: item.label,
    };

    this.selectedPage = {};
    this.dashboard.searchClick = true;
    this.dashboard.addTab(tab);
  }

  search(ev: any): void {
    const data = [
      {
        label: 'Użytkownicy',
        component: UsersComponent,
      },
      {
        label: 'Grupy produktów',
        component: ProductTradeNameComponent,
      },
    ];

    //to ma isc z jednego zródła
    this.pages = data.filter((x) => x.label.toLowerCase().includes(ev.query));
  }
}