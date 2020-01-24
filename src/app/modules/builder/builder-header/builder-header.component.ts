import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuilderCreateAccountModalComponent } from '../builder-actions/builder-create-account-modal/builder-create-account-modal.component';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { BuilderService } from '../builder.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IUser } from '../../../shared/models/user';
import * as fromUser from '../../core/store/user/user.reducer';
import { BuilderSaveWebsiteModalComponent } from '../builder-actions/builder-save-website-modal/builder-save-website-modal.component';

@Component({
  selector: 'app-builder-header',
  templateUrl: './builder-header.component.html',
  styleUrls: ['./builder-header.component.css']
})
export class BuilderHeaderComponent implements OnInit {
  websiteName: string;
  websiteNameSubscription: Subscription;
  photoURL: string = '/assets/img/anonymous.jpg';
  user: IUser;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private builderService: BuilderService,
    private userStore: Store<fromUser.State>,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.userStore.select('user')
      .pipe()
      .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
        }
      });

    this.websiteNameSubscription = this.builderService.websiteName.subscribe((response => {
      if (response) {
        this.websiteName = response;
      }
    }));
  }

  openCreateAccountModal() {
    this.modalService.open(BuilderCreateAccountModalComponent, { windowClass: 'modal-holder', centered: true });
  }

  signOut() {
    this.authService.signOut();
  }

  redirectToDashboard() {
    this.router.navigate(['dashboard']).then(() => {
    });
  }

  removeLineBreaks(event: any) {
    BuilderService.removeLineBreaks(event);
  }

  saveWebsiteName(event: any) {
    if (this.websiteName != event.target.innerHTML) {
      const modal = this.modalService.open(BuilderSaveWebsiteModalComponent, { windowClass: 'modal-holder', centered: true });
      modal.componentInstance.websiteName = this.websiteName;
      modal.componentInstance.newWebsiteName = event.target.innerHTML;
    }
  }
}
