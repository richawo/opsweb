import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebsiteService } from 'src/app/shared/services/website.service';
import { ActiveTemplates } from '../../../builder';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderService } from '../../../builder.service';

@Component({
  selector: 'app-sidebar-padding',
  templateUrl: './builder-sidebar-padding.component.html'
})

export class BuilderSidebarPaddingComponent implements OnInit, OnDestroy {

  styleObject: any;
  currentTemplate: any;
  websiteChangeCount: number;
  activeEditComponentId: string;
  paddingTop: number;
  paddingLeft: number;
  paddingRight: number;
  paddingBottom: number;
  ngUnsubscribe = new Subject<void>();

  @Input() data: any;
  @Input() elementSettings: any;

  constructor(
    private builderComponentsService: BuilderComponentsService,
    private websiteService: WebsiteService,
    private builderService: BuilderService
  ) {
  }

  ngOnInit() {
    this.builderService.activeEditComponentId.pipe(takeUntil(this.ngUnsubscribe)).subscribe(activeEditComponentIdResponse => {
      if (activeEditComponentIdResponse) {
        this.activeEditComponentId = activeEditComponentIdResponse;
      }
    });

    this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (response && this.data.componentIndex) {
        const pageComponent = response;
        const component = pageComponent['pages'][this.data.pageIndex]['components'][this.data.componentIndex];
        if (this.elementSettings.name in component) {
          this.styleObject = component[this.elementSettings.name];
        } else {
          this.styleObject = component['style'][this.elementSettings.name];
        }
        this.paddingTop = this.styleObject['padding-top'].replace('px', '');
        this.paddingLeft = this.styleObject['padding-left'].replace('px', '');
        this.paddingRight = this.styleObject['padding-right'].replace('px', '');
        this.paddingBottom = this.styleObject['padding-bottom'].replace('px', '');
      }
    });

    this.websiteService.getWebsiteChangeCount().pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });
  }

  setPadding(position: string, value: number) {
    this.styleObject[`padding-${position}`] = `${value}px`;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.elementSettings.name, this.styleObject);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetPaddingStyle() {
    const defaultTemplate = this.builderComponentsService.activeTemplate.getValue()[this.data.componentName];

    for (let i of ['padding-top', 'padding-left', 'padding-right', 'padding-bottom']) {
      this.styleObject[i] = defaultTemplate['style'][this.elementSettings.name][i];
    }
    this.paddingTop = this.styleObject['padding-top'].replace('px', '');
    this.paddingLeft = this.styleObject['padding-left'].replace('px', '');
    this.paddingRight = this.styleObject['padding-right'].replace('px', '');
    this.paddingBottom = this.styleObject['padding-bottom'].replace('px', '');
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.elementSettings.name, this.styleObject);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
