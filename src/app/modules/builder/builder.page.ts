import { Component, HostListener, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BuilderService } from './builder.service';
import { Subscription } from 'rxjs';
import { RouterService } from '../../shared/services/router.service';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.page.html'
})
export class BuilderComponent implements OnInit {
  innerWidth: number;
  previewMode: boolean = false;
  sidebarClass: string = 'col-md-3';
  showcaseClass: string = 'col-md-9';
  websiteName: string;
  previewModeSubscription: Subscription;

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private builderService: BuilderService,
    private routerService: RouterService
  ) {
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.routerService.currentRoute.next(window.location.pathname);
    this.routerService.setCurrentRoute();
    this.builderService.websiteName.next(UtilService.generatWebsiteName());

    this.ngxLoader.start();
    this.previewModeSubscription = this.builderService.previewMode.subscribe((response => {
      if (response) {
        this.previewMode = response;
        this.showcaseClass = 'col-md-12';
      } else {
        this.previewMode = false;
        this.setBuilderPanelSizes();
      }
    }));
    this.ngxLoader.stop();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    if (!this.previewMode) {
      this.setBuilderPanelSizes();
    }
  }

  setBuilderPanelSizes() {
    if (this.innerWidth > 1900) {
      this.showcaseClass = 'col-md-10';
      this.sidebarClass = 'col-md-2';
    } else {
      this.showcaseClass = 'col-md-9';
      this.sidebarClass = 'col-md-3';
    }
  }
}
