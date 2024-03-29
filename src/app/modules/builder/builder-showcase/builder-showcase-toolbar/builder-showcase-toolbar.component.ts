import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuilderService } from '../../builder.service';
import { BuilderNavbarService } from '../../builder-components/builder-navbar/builder-navbar.service';
import { BuilderDeletePageModalComponent } from '../../builder-actions/builder-delete-page-modal/builder-delete-page-modal.component';
import { BuilderNewPageModalComponent } from '../../builder-actions/builder-new-page-modal/builder-new-page-modal.component';
import { SimpleModalService } from '../../../../shared/components/simple-modal/simple-modal.service';
import { ActiveComponents, ActiveElements, MAX_NUMBER_OF_PAGES } from '../../builder';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { debounce } from '../../../../shared/decorators/debounce.decorator';
import { BuilderSaveWebsiteModalComponent } from '../../builder-actions/builder-save-website-modal/builder-save-website-modal.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth/auth.service';
import { BuilderCreateAccountModalComponent } from '../../builder-actions/builder-create-account-modal/builder-create-account-modal.component';

@Component({
  selector: 'app-builder-showcase-toolbar',
  templateUrl: './builder-showcase-toolbar.component.html',
  styleUrls: ['./builder-showcase-toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class BuilderShowcaseToolbarComponent implements OnInit, OnDestroy {
  activePage = 'Home';
  innerHeight: number;
  previewButtonIcon = 'btn-icon';
  fullScreenButtonIcon = 'btn-icon';
  dropdownClass = 'dropdown';
  navbarMenuOptions = Array<String>();
  previewMode: boolean;
  fullScreenMode: boolean;
  activePageIndex: number;
  activeToolbarOrientation: string;
  dropdownMenuClass = 'dropdown-menu';
  ariaExpandedAttribute = 'false';
  pageComponents = 'false';

  private navbarMenuOptionsSubscription: Subscription;
  private activePageSettingSubscription: Subscription;
  private fullScreenModeSubscription: Subscription;
  private activePageIndexSubscription: Subscription;
  private pageComponentsSubscription: Subscription;
  private activeOrientationSubscription: Subscription;
  private previewModeSubscription: Subscription;

  constructor(
    private builderService: BuilderService,
    private builderComponentsService: BuilderComponentsService,
    private modalService: NgbModal,
    private simpleModalService: SimpleModalService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private builderNavbarService: BuilderNavbarService
  ) {
  }

  static openFullScreen() {
    const element = document.documentElement;
    const methodToBeInvoked = element['requestFullscreen'] || element['webkitRequestFullScreen'] || element['mozRequestFullscreen'] || element['msRequestFullscreen'];
    if (methodToBeInvoked) {
      methodToBeInvoked.call(element);
    }
  }

  static closeFullScreen() {
    const methodToBeInvoked = document['exitFullscreen'] || document['webkitExitFullscreen'] || document['mozCancelFullScreen'];
    if (methodToBeInvoked) {
      methodToBeInvoked.call(document);
    }
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;

    this.previewModeSubscription = this.builderService.previewMode.subscribe((response => {
      this.previewMode = response;
      if (this.previewMode) {
        this.previewButtonIcon = 'btn-icon-active';
      } else {
        this.previewButtonIcon = 'btn-icon';
      }
    }));

    this.fullScreenModeSubscription = this.builderService.fullScreenMode.subscribe((response => {
      this.fullScreenMode = response;
      if (this.fullScreenMode) {
        this.fullScreenButtonIcon = 'btn-icon-active';
      } else {
        this.fullScreenButtonIcon = 'btn-icon';
      }
    }));

    this.activeOrientationSubscription = this.builderService.activeOrientation.subscribe((response => {
      if (response) {
        this.activeToolbarOrientation = response;
      }
    }));

    this.activePageSettingSubscription = this.builderService.activePageSetting.subscribe((response => {
      if (response) {
        this.activePage = response;
      }
    }));

    this.activePageIndexSubscription = this.builderService.activePageIndex.subscribe((response => {
      if (response) {
        this.activePageIndex = response;
      }
    }));

    this.pageComponentsSubscription = this.builderComponentsService.pageComponents.subscribe(response => {
      if (response) {
        this.pageComponents = response;
      }
    });

    this.navbarMenuOptionsSubscription = this.builderNavbarService.navbarMenuOptions.subscribe((response => {
      if (response) {
        this.navbarMenuOptions = response;
      }
    }));
  }

  openDeletePageModal() {
    if (this.activePage !== 'Home') {
      const modal = this.modalService.open(BuilderDeletePageModalComponent, {
        windowClass: 'modal-holder',
        centered: true
      });
      modal.componentInstance.activePage = this.activePage;
      modal.componentInstance.activePageIndex = this.activePageIndex;
    } else {
      this.simpleModalService.displayMessage('Oops!', `You cannot delete the ${this.activePage} page.`);
    }
  }

  openNewPageModal() {
    const numberOfPages = this.pageComponents['pages'].length;
    if (numberOfPages + 1 > MAX_NUMBER_OF_PAGES) {
      this.toastrService.warning('You cannot create more than four pages.', 'Oops!');
    } else {
      this.modalService.open(BuilderNewPageModalComponent, { windowClass: 'modal-holder', centered: true });
    }
  }

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize() {
    this.innerHeight = window.innerHeight;
  }

  togglePreview() {
    this.builderService.activeEditComponent.next(ActiveComponents.Placeholder);
    this.builderService.activeEditComponentId.next(ActiveComponents.Placeholder);
    this.builderService.activeElement.next(ActiveElements.Default);
    this.builderService.setSidebarComponentsSetting();
    this.builderService.previewMode.next(!this.previewMode);
  }

  setDropdownClass() {
    this.dropdownClass = 'dropdown show';
    this.dropdownMenuClass = 'dropdown-menu show';
    this.ariaExpandedAttribute = 'true';
  }

  setActivePage(navbarMenuOption: string, i: number) {
    this.dropdownClass = 'dropdown';
    this.dropdownMenuClass = 'dropdown-menu';
    this.ariaExpandedAttribute = 'false';
    this.builderService.activePageSetting.next(navbarMenuOption);
    this.builderService.activePageIndex.next(i);
  }

  toggleFullScreen() {
    this.builderService.fullScreenMode.next(!this.fullScreenMode);
    if (this.fullScreenMode) {
      BuilderShowcaseToolbarComponent.openFullScreen();
    } else {
      BuilderShowcaseToolbarComponent.closeFullScreen();
    }
  }

  openSaveWebsiteModal() {
    if (!this.authService.isLoggedIn()) {
      this.modalService.open(BuilderCreateAccountModalComponent, { windowClass: 'modal-holder', centered: true });
    } else {
      this.modalService.open(BuilderSaveWebsiteModalComponent, { windowClass: 'modal-holder', centered: true });
    }
  }

  @HostListener('document:fullscreenchange')
  @HostListener('document:webkitfullscreenchange')
  @HostListener('document:mozfullscreenchange')
  @HostListener('document:MSFullscreenChange')
  @debounce()
  onFullScreenChange() {
    const fullscreenElement = document.fullscreenElement || document['mozFullScreenElement'] || document['webkitFullscreenElement'];
    if (!fullscreenElement) {
      this.builderService.fullScreenMode.next(false);
    }
  }

  @HostListener('document:click', ['$event'])
  documentClick(e) {
    if (e.target.id !== 'pages-dropdown') {
      if (this.dropdownClass === 'dropdown show') {
        this.dropdownClass = 'dropdown';
        this.dropdownMenuClass = 'dropdown-menu';
        this.ariaExpandedAttribute = 'false';
      }
    }
  }

  ngOnDestroy() {
    this.navbarMenuOptionsSubscription.unsubscribe();
    this.activePageSettingSubscription.unsubscribe();
    this.fullScreenModeSubscription.unsubscribe();
    this.activePageIndexSubscription.unsubscribe();
    this.activeOrientationSubscription.unsubscribe();
    this.previewModeSubscription.unsubscribe();
    this.pageComponentsSubscription.unsubscribe();
  }
}
