import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActiveComponents, ActiveOrientations } from './builder';

@Injectable()
export class BuilderService {
  activeEditComponent = new BehaviorSubject<string>(null);
  activeEditSetting = new BehaviorSubject<string>(null);
  activePageSetting = new BehaviorSubject<string>('Home');
  activePageIndex = new BehaviorSubject<number>(0);
  activeElement = new BehaviorSubject<string>(null);
  activeOrientation = new BehaviorSubject<string>(ActiveOrientations.Desktop);

  SIDEBAR_INACTIVE_TAB: string = 'tab-pane fade tab-padding';
  SIDEBAR_INACTIVE_MENU: string = 'nav-link';
  SIDEBAR_ACTIVE_TAB: string = 'tab-pane fade active show tab-padding';
  SIDEBAR_ACTIVE_MENU: string = 'nav-link active';
  sidebarTemplatesMenu = new BehaviorSubject<string>(this.SIDEBAR_ACTIVE_MENU);
  sidebarTemplatesTab = new BehaviorSubject<string>(this.SIDEBAR_ACTIVE_TAB);
  sidebarPagesMenu = new BehaviorSubject<string>(this.SIDEBAR_INACTIVE_MENU);
  sidebarPagesTab = new BehaviorSubject<string>(this.SIDEBAR_INACTIVE_TAB);
  sidebarComponentsMenu = new BehaviorSubject<string>(this.SIDEBAR_INACTIVE_MENU);
  sidebarComponentsTab = new BehaviorSubject<string>(this.SIDEBAR_INACTIVE_TAB);
  sidebarColoursMenu = new BehaviorSubject<string>(this.SIDEBAR_INACTIVE_MENU);
  sidebarColoursTab = new BehaviorSubject<string>(this.SIDEBAR_INACTIVE_TAB);
  sidebarLayoutMenu = new BehaviorSubject<string>(this.SIDEBAR_INACTIVE_MENU);
  sidebarLayoutTab = new BehaviorSubject<string>(this.SIDEBAR_INACTIVE_TAB);
  sidebarOptionsMenu = new BehaviorSubject<string>(this.SIDEBAR_INACTIVE_MENU);
  sidebarOptionsTab = new BehaviorSubject<string>(this.SIDEBAR_INACTIVE_TAB);
  sidebarDataMenu = new BehaviorSubject<string>(this.SIDEBAR_INACTIVE_MENU);
  sidebarDataTab = new BehaviorSubject<string>(this.SIDEBAR_INACTIVE_TAB);

  TOOLBAR_ACTIVE_BUTTON: string = 'toolbar-button toolbar-button-active';
  TOOLBAR_INACTIVE_BUTTON: string = 'toolbar-button';
  toolbarColoursButton = new BehaviorSubject<string>(this.TOOLBAR_ACTIVE_BUTTON);
  toolbarComponentsButton = new BehaviorSubject<string>(this.TOOLBAR_INACTIVE_BUTTON);
  toolbarLayoutButton = new BehaviorSubject<string>(this.TOOLBAR_INACTIVE_BUTTON);
  toolbarOptionsButton = new BehaviorSubject<string>(this.TOOLBAR_INACTIVE_BUTTON);
  toolbarDesktopOrientationButton = new BehaviorSubject<string>(this.TOOLBAR_ACTIVE_BUTTON);
  toolbarTabletOrientationButton = new BehaviorSubject<string>(this.TOOLBAR_INACTIVE_BUTTON);
  toolbarMobileOrientationButton = new BehaviorSubject<string>(this.TOOLBAR_INACTIVE_BUTTON);

  previewMode = new BehaviorSubject<boolean>(false);
  fonts = new BehaviorSubject<string[]>(['Avenir Next Regular', 'Avenir Next Medium', 'Nunito Sans', 'Poppins']);

  resetMenu() {
    this.sidebarTemplatesMenu.next(this.SIDEBAR_INACTIVE_MENU);
    this.sidebarPagesMenu.next(this.SIDEBAR_INACTIVE_MENU);
    this.sidebarComponentsMenu.next(this.SIDEBAR_INACTIVE_MENU);
    this.sidebarColoursMenu.next(this.SIDEBAR_INACTIVE_MENU);
    this.sidebarLayoutMenu.next(this.SIDEBAR_INACTIVE_MENU);
    this.sidebarOptionsMenu.next(this.SIDEBAR_INACTIVE_MENU);
    this.sidebarDataMenu.next(this.SIDEBAR_INACTIVE_MENU);
  }

  resetTabs() {
    this.sidebarTemplatesTab.next(this.SIDEBAR_INACTIVE_TAB);
    this.sidebarPagesTab.next(this.SIDEBAR_INACTIVE_MENU);
    this.sidebarComponentsTab.next(this.SIDEBAR_INACTIVE_TAB);
    this.sidebarColoursTab.next(this.SIDEBAR_INACTIVE_TAB);
    this.sidebarLayoutTab.next(this.SIDEBAR_INACTIVE_TAB);
    this.sidebarOptionsTab.next(this.SIDEBAR_INACTIVE_TAB);
    this.sidebarDataTab.next(this.SIDEBAR_INACTIVE_TAB);
  }

  resetToolbar() {
    this.toolbarColoursButton.next(this.TOOLBAR_INACTIVE_BUTTON);
    this.toolbarComponentsButton.next(this.TOOLBAR_INACTIVE_BUTTON);
    this.toolbarLayoutButton.next(this.TOOLBAR_INACTIVE_BUTTON);
    this.toolbarOptionsButton.next(this.TOOLBAR_INACTIVE_BUTTON);
  }

  setActiveEditComponent(componentName: string) {
    window.postMessage({ 'for': 'opsonion', 'action': 'unique-component-selected' }, '*');
    this.activeEditComponent.next(componentName);
    this.setSidebarColoursSetting();
  }

  setActiveEditSetting(settingName: string) {
    this.activeEditSetting.next(settingName);
  }

  setSidebarTemplatesSetting() {
    this.resetMenu();
    this.resetTabs();
    this.resetToolbar();
    this.sidebarTemplatesMenu.next(this.SIDEBAR_ACTIVE_MENU);
    this.sidebarTemplatesTab.next(this.SIDEBAR_ACTIVE_TAB);
  }

  setSidebarComponentsSetting() {
    this.resetMenu();
    this.resetTabs();
    this.resetToolbar();
    this.toolbarComponentsButton.next(this.TOOLBAR_ACTIVE_BUTTON);
    this.sidebarComponentsMenu.next(this.SIDEBAR_ACTIVE_MENU);
    this.sidebarComponentsTab.next(this.SIDEBAR_ACTIVE_TAB);
  }

  setSidebarColoursSetting() {
    this.resetMenu();
    this.resetTabs();
    this.resetToolbar();
    this.toolbarColoursButton.next(this.TOOLBAR_ACTIVE_BUTTON);
    this.sidebarColoursMenu.next(this.SIDEBAR_ACTIVE_MENU);
    this.sidebarColoursTab.next(this.SIDEBAR_ACTIVE_TAB);
  }

  setSidebarLayoutSetting() {
    this.resetMenu();
    this.resetTabs();
    this.resetToolbar();
    this.toolbarLayoutButton.next(this.TOOLBAR_ACTIVE_BUTTON);
    this.sidebarLayoutMenu.next(this.SIDEBAR_ACTIVE_MENU);
    this.sidebarLayoutTab.next(this.SIDEBAR_ACTIVE_TAB);
  }

  setSidebarOptionsSetting() {
    this.resetMenu();
    this.resetTabs();
    this.resetToolbar();
    this.toolbarOptionsButton.next(this.TOOLBAR_ACTIVE_BUTTON);
    this.sidebarOptionsMenu.next(this.SIDEBAR_ACTIVE_MENU);
    this.sidebarOptionsTab.next(this.SIDEBAR_ACTIVE_TAB);
  }

  setSidebarPagesSetting() {
    this.resetMenu();
    this.resetTabs();
    this.resetToolbar();
    this.sidebarPagesMenu.next(this.SIDEBAR_ACTIVE_MENU);
    this.sidebarPagesTab.next(this.SIDEBAR_ACTIVE_TAB);
  }

  setSidebarDataSetting() {
    this.resetMenu();
    this.resetTabs();
    this.resetToolbar();
    this.sidebarDataMenu.next(this.SIDEBAR_ACTIVE_MENU);
    this.sidebarDataTab.next(this.SIDEBAR_ACTIVE_TAB);
  }

  static setComponentClass(previewMode: boolean, activeEditComponent: string, componentName: string) {
    if (previewMode) {
      return '';
    } else {
      if (activeEditComponent == componentName) {
        return 'component-border-active';
      } else {
        return 'component-border';
      }
    }
  }

  static setContextMenu(previewMode: boolean, activeEditComponent: string, componentName: string) {
    if (!previewMode && activeEditComponent == componentName) {
      return `${ componentName }-edit-component no-select`;
    } else {
      return 'no-select';
    }
  }

  processIncomingMessages(e: any, activeEditComponent: string) {
    if (activeEditComponent == ActiveComponents.Navbar) {
      this.processIncomingNavbarMessages(e);
    }
  }

  static removeLineBreaks(e: any) {
    let element = e.target;
    element.innerText = element.innerText.replace(/\n/g, '').trim();
  }

  processIncomingNavbarMessages(e: any) {
    if (e.data.action == 'edit-logo' || e.data.action == 'manage-menu') {
      this.setSidebarOptionsSetting();
    }
    if (e.data.action == 'set-design') {
      this.setSidebarColoursSetting();
    }
    if (e.data.action == 'set-layout') {
      this.setSidebarLayoutSetting();
    }
  }
}
