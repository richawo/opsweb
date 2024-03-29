import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../builder.service';
import { BuilderNavbarService } from './builder-navbar.service';
import {
  ActiveComponents,
  ActiveComponentsPartialSelector,
  ActiveElements,
  ActiveSettings,
  ActiveThemes
} from '../../builder';
import { IComponent } from '../../../../shared/models/component';
import { BuilderComponentsService } from '../builder-components.service';
import { BuilderFooterService } from '../builder-footer/builder-footer.service';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from '../../../../shared/services/util.service';
import { TemplateService } from 'src/app/shared/services/template.service';

@Component({
  selector: 'app-builder-navbar',
  templateUrl: './builder-navbar.component.html',
  styleUrls: ['./builder-navbar.component.css']
})
export class BuilderNavbarComponent implements OnInit, OnDestroy, IComponent {
  navbarStyle: any;
  navbarLinkStyle: any;
  navbarBrandStyle: any;
  navbarLogoImage: string;
  navbarLogoText: string;
  navbarTheme: string = ActiveThemes.Default;
  navbarMenuOptions: any;
  navbarLayoutClass: any = 'navbar-nav ml-auto';
  activeEditComponent: string;
  activeEditComponentId: string;
  componentName: string = ActiveComponents.Navbar;
  componentId: string;
  activeElement: string;
  previewMode = false;
  navbarLogoImageStyle: any;
  pageComponents: any;
  componentDetail: any;
  activePageSetting: string;
  websiteMode: boolean;
  navbarOpen: boolean;

  private activeEditComponentSubscription: Subscription;
  private activeEditComponentIdSubscription: Subscription;
  private activePageSettingSubscription: Subscription;
  private navbarStyleSubscription: Subscription;
  private navbarBrandStyleSubscription: Subscription;
  private navbarLinkStyleSubscription: Subscription;
  private navbarLayoutClassSubscription: Subscription;
  private navbarMenuOptionsSubscription: Subscription;
  private previewModeSubscription: Subscription;
  private activeElementSubscription: Subscription;
  private navbarLogoImageSubscription: Subscription;
  private navbarLogoTextSubscription: Subscription;
  private navbarLogoImageStyleSubscription: Subscription;
  private navbarThemeSubscription: Subscription;
  private builderComponentsSubscription: Subscription;
  private websiteModeSubscription: Subscription;
  private templateServiceSubscription: Subscription;

  constructor(
    private templateServce: TemplateService,
    private builderService: BuilderService,
    private toastrService: ToastrService,
    private elementRef: ElementRef,
    private builderComponentsService: BuilderComponentsService,
    private builderNavbarService: BuilderNavbarService,
    private builderFooterService: BuilderFooterService
  ) {
  }

  ngOnInit() {
    this.navbarOpen = false;

    this.previewModeSubscription = this.builderService.previewMode.subscribe(response => {
      this.previewMode = response;
    });

    this.websiteModeSubscription = this.builderService.websiteMode.subscribe(response => {
      this.websiteMode = response;
    });

    this.navbarThemeSubscription = this.builderNavbarService.navbarTheme.subscribe(response => {
      if (!response) {
        this.builderNavbarService.navbarTheme.next(ActiveThemes.Default);
      }
    });

    this.templateServiceSubscription = this.templateServce.activeTemplate.subscribe(response => {
      if (response) {
        this.builderNavbarService.setNavbarTemplateStyle(response[this.componentName]['style']);
      }
    });

    // this.navbarTemplateSubscription = this.builderNavbarService.navbarTemplate.subscribe(response => {
    //   if (!response) {
    //     this.builderNavbarService.navbarTemplate.next(ActiveThemes.Default);
    //   }
    // });

    this.activeEditComponentSubscription = this.builderService.activeEditComponent.subscribe(response => {
      if (response) {
        this.activeEditComponent = response;
      }
    });

    this.activeEditComponentIdSubscription = this.builderService.activeEditComponentId.subscribe(response => {
      if (response) {
        this.activeEditComponentId = response;
      }
    });

    this.navbarLogoImageSubscription = this.builderNavbarService.navbarLogoImage.subscribe(response => {
      if (response) {
        this.navbarLogoImage = response;
      }
    });

    this.navbarLogoTextSubscription = this.builderNavbarService.navbarLogoText.subscribe(response => {
      if (response) {
        this.navbarLogoText = response;
      }
    });

    this.navbarStyleSubscription = this.builderNavbarService.navbarStyle.subscribe(response => {
      if (response) {
        this.navbarStyle = response;
      }
    });

    this.navbarBrandStyleSubscription = this.builderNavbarService.navbarBrandStyle.subscribe(response => {
      if (response) {
        this.navbarBrandStyle = response;
      }
    });

    this.navbarLinkStyleSubscription = this.builderNavbarService.navbarLinkStyle.subscribe(response => {
      if (response) {
        this.navbarLinkStyle = response;
      }
    });

    this.navbarLayoutClassSubscription = this.builderNavbarService.navbarLayoutClass.subscribe(response => {
      if (response) {
        this.navbarLayoutClass = response;
      }
    });

    this.navbarMenuOptionsSubscription = this.builderNavbarService.navbarMenuOptions.subscribe(response => {
      if (response) {
        this.navbarMenuOptions = response;
      }
    });

    this.navbarLogoImageStyleSubscription = this.builderNavbarService.navbarLogoImageStyle.subscribe(response => {
      if (response) {
        this.navbarLogoImageStyle = response;
      }
    });

    this.activeElementSubscription = this.builderService.activeElement.subscribe(response => {
      if (response) {
        this.activeElement = response;
      }
    });

    this.activePageSettingSubscription = this.builderService.activePageSetting.subscribe(activePageSettingResponse => {
      if (activePageSettingResponse) {
        this.activePageSetting = activePageSettingResponse;
        this.builderComponentsSubscription = this.builderComponentsService.pageComponents.subscribe(response => {
          if (response) {
            this.pageComponents = response;
            this.builderNavbarService.navbarTemplate.next(this.pageComponents['template']);
            this.componentId = this.elementRef.nativeElement['id'];
            for (let i = 0; i < this.pageComponents['pages'].length; i++) {
              const pageName = this.pageComponents['pages'][i]['name'];
              if (pageName === this.activePageSetting) {
                for (let j = 0; j < this.pageComponents['pages'][i]['components'].length; j++) {
                  if (this.pageComponents['pages'][i]['components'][j]['componentId'] === this.componentId) {
                    this.componentDetail = this.pageComponents['pages'][i]['components'][j];
                    this.builderNavbarService.navbarStyle.next(this.componentDetail['style']['navbarStyle']);
                    this.builderNavbarService.navbarLinkStyle.next(this.componentDetail['style']['navbarLinkStyle']);
                    this.builderNavbarService.navbarBrandStyle.next(this.componentDetail['style']['navbarBrandStyle']);
                    this.builderNavbarService.navbarLogoImageStyle.next(this.componentDetail['style']['navbarLogoImageStyle']);
                    this.builderNavbarService.navbarLayoutClass.next(this.componentDetail['navbarLayoutClass']);
                    this.builderNavbarService.navbarLogoText.next(this.componentDetail['navbarLogoText']);
                    this.builderNavbarService.navbarLogoImage.next(this.componentDetail['navbarLogoImage']);
                    this.builderNavbarService.navbarMenuOptions.next(this.componentDetail['navbarMenuOptions']);
                    this.builderNavbarService.navbarTheme.next(this.componentDetail['navbarTheme']);
                  }
                }
              }
            }
          }
        });
      }
    });
  }

  setActiveEditComponent() {
    this.builderService.activeElement.next(ActiveElements.Default);
    this.builderService.activeEditComponentId.next(ActiveComponents.Placeholder);
    if (this.activeEditComponent === ActiveComponents.Navbar) {
      this.clearActiveEditComponent();
    } else {
      this.builderService.setActiveEditComponent(ActiveComponents.Navbar, this.componentId);
      this.builderService.setActiveEditSetting(ActiveSettings.Colours);
    }
  }

  setComponentClass() {
    return BuilderService.setComponentClass(this.previewMode, this.activeEditComponent, this.componentName);
  }

  setContextMenu() {
    return BuilderService.setContextMenu(this.previewMode, this.activeEditComponent, this.componentName);
  }

  removeLineBreaks(event: any) {
    BuilderService.removeLineBreaks(event);
  }

  setActiveElementStyle(activeElement, element) {
    if (activeElement === element && !this.previewMode) {
      if (element.indexOf('navbar-logo-brand') > -1) {
        return 'nav-brand-edit';
      }
      if (element.indexOf('navbar-link') > -1) {
        return 'nav-link-edit';
      }
      if (element.indexOf('navbar-logo-image') > -1) {
        return 'nav-image-edit';
      }
    }
  }

  setContentEditable() {
    return !this.previewMode;
  }

  isNavbarLogoImageNull() {
    return !this.navbarLogoImage || this.navbarLogoImage === 'navbarLogoImage';
  }

  clearActiveEditComponent() {
    if (this.activeElement.indexOf('navbar-link') === -1) {
      this.builderService.clearActiveEditComponent();
    }
  }

  selectNavbarLink(pageIndex: number, event: any, elementId: string) {
    if (this.websiteMode) {
      this.builderService.activePageSetting.next(this.navbarMenuOptions[pageIndex]);
      this.builderService.activePageIndex.next(pageIndex);
    } else {
      this.builderService.setActiveEditComponent(ActiveComponents.Navbar, this.componentId);
      this.builderService.setSidebarOptionsSetting();
      this.builderService.activeElement.next(elementId);
      this.builderService.setActiveEditSetting(ActiveSettings.Options);
      this.builderService.triggerScrollTo('navbar-options-menu');
    }
    event.stopPropagation();
  }

  saveNavbarMenuOption(pageIndex: number, pageName: string) {
    if (pageName !== this.navbarMenuOptions[pageIndex]) {
      const oldPageName = this.navbarMenuOptions[pageIndex];

      this.builderFooterService.setFooterMenuOptions(UtilService.toTitleCase(pageName), pageIndex);
      this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerMenuOptions', this.builderFooterService.footerMenuOptions.getValue());
      this.builderNavbarService.setNavbarMenuOptions(UtilService.toTitleCase(pageName), pageIndex);
      this.navbarMenuOptions[pageIndex] = pageName;
      this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarMenuOptions', this.builderNavbarService.navbarMenuOptions.getValue());

      this.builderComponentsService.renamePage(UtilService.toTitleCase(pageName), oldPageName);
      this.builderService.activeElement.next(ActiveElements.Default);
      this.builderService.activePageSetting.next('Home');
      this.builderService.activePageIndex.next(this.builderComponentsService.getPageIndex('Home'));

      this.toastrService.success('Your page has been renamed.', 'Great!');
    }
  }

  setNavbarLinkClass() {
    if (this.previewMode) {
      return 'nav-link nav-link-preview';
    }
    if (!this.previewMode) {
      return 'nav-link nav-link-active';
    }
  }

  selectNavbarLogoBrand(event: any, elementId: string) {
    if (this.websiteMode) {
      this.builderService.activePageSetting.next('Home');
      this.builderService.activePageIndex.next(this.builderComponentsService.getPageIndex('Home'));
    } else {
      this.builderService.setActiveEditComponent(ActiveComponents.Navbar, this.componentId);
      this.builderService.setSidebarOptionsSetting();
      this.builderService.activeElement.next(elementId);
      this.builderService.setActiveEditSetting(ActiveSettings.Options);
      this.builderService.triggerScrollTo('navbar-options');
    }
    event.stopPropagation();
  }

  saveNavbarLogoBrandOption() {
    this.builderService.activeElement.next(ActiveElements.Default);
    this.builderNavbarService.navbarLogoText.next(this.navbarLogoText);
  }

  setNavbarLogoBrandClass() {
    if (this.previewMode) {
      return 'nav-logo-brand-preview';
    }
    if (!this.previewMode) {
      return 'nav-logo-brand-active';
    }
  }

  setNavbarLogoImageClass() {
    if (this.previewMode) {
      return 'nav-logo-image-preview';
    }
    if (!this.previewMode) {
      return 'nav-logo-image-active';
    }
  }

  selectNavbarLogoImage(event: any, elementId: string) {
    if (this.websiteMode) {
      this.builderService.activePageSetting.next('Home');
      this.builderService.activePageIndex.next(this.builderComponentsService.getPageIndex('Home'));
    } else {
      this.builderService.setActiveEditComponent(ActiveComponents.Navbar);
      this.builderService.setSidebarOptionsSetting();
      this.builderService.activeElement.next(elementId);
      this.builderService.triggerScrollTo('navbar-options-logo');
    }
    event.stopPropagation();
  }

  toggleNavbar() {
    if (this.websiteMode) {
      this.navbarOpen = !this.navbarOpen;
    }
  }

  setNavbarOpenOption() {
    if (this.websiteMode) {
      return { 'show': this.navbarOpen };
    }
  }

  ngOnDestroy() {
    this.activeEditComponentSubscription.unsubscribe();
    this.navbarStyleSubscription.unsubscribe();
    this.navbarBrandStyleSubscription.unsubscribe();
    this.navbarLinkStyleSubscription.unsubscribe();
    this.navbarLayoutClassSubscription.unsubscribe();
    this.navbarMenuOptionsSubscription.unsubscribe();
    this.previewModeSubscription.unsubscribe();
    this.navbarLogoImageSubscription.unsubscribe();
    this.navbarLogoTextSubscription.unsubscribe();
    this.navbarLogoImageStyleSubscription.unsubscribe();
    this.navbarThemeSubscription.unsubscribe();
    this.builderComponentsSubscription.unsubscribe();
    this.activeEditComponentIdSubscription.unsubscribe();
    this.activePageSettingSubscription.unsubscribe();
    this.activeElementSubscription.unsubscribe();
    this.websiteModeSubscription.unsubscribe();
    this.templateServiceSubscription.unsubscribe();
  }
}
