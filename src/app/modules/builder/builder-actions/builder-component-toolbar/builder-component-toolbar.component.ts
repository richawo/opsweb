import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BuilderService } from '../../builder.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuilderDeleteComponentModalComponent } from '../builder-delete-component-modal/builder-delete-component-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-builder-component-toolbar',
  templateUrl: './builder-component-toolbar.component.html'
})
export class BuilderComponentToolbarComponent implements OnInit, OnDestroy {
  @Input() componentName;
  @Input() componentId;
  activeEditComponent: string;
  activeEditComponentId: string;
  activeRoute: string;

  private activeEditComponentSubscription: Subscription;
  private activeEditComponentIdSubscription: Subscription;

  constructor(
    private builderService: BuilderService,
    private router: Router,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.activeRoute = this.router.url;
    this.activeEditComponentSubscription = this.builderService.activeEditComponent.subscribe(response => {
      if (response) {
        this.activeEditComponent = response;
      }
    });
    this.activeEditComponentIdSubscription = this.builderService.activeEditComponentId.subscribe(response => {
      this.activeEditComponentId = response;
    });
  }

  deleteComponent() {
    const modal = this.modalService.open(BuilderDeleteComponentModalComponent, {
      windowClass: 'modal-holder',
      centered: true
    });
    modal.componentInstance.componentId = this.activeEditComponentId;
  }

  toggleComponentToolbarVisibility() {
    if (this.activeEditComponent === this.componentName && this.activeEditComponentId === this.componentId) {
      return (this.activeEditComponent === this.componentName && this.activeRoute !== '/preview') ||
        (this.activeEditComponentId === this.componentId && this.activeRoute !== '/preview');
    } else {
      return false;
    }
  }

  ngOnDestroy() {
    if (this.activeEditComponentIdSubscription) {
      this.activeEditComponentIdSubscription.unsubscribe();
    }
    if (this.activeEditComponentSubscription) {
      this.activeEditComponentSubscription.unsubscribe();
    }

  }
}
