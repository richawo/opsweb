import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { NGXLogger } from 'ngx-logger';
import { BuilderComponentsService } from '../../modules/builder/builder-components/builder-components.service';
import { map } from 'rxjs/operators';
import { BuilderService } from '../../modules/builder/builder.service';
import { ActiveTemplates } from '../../modules/builder/builder';
import { UtilService } from './util.service';
import { IUser } from '../models/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable()
export class WebsiteService {
  constructor(
    private afs: AngularFirestore,
    private builderComponentsService: BuilderComponentsService,
    private builderService: BuilderService,
    private toastrService: ToastrService,
    public logger: NGXLogger,
    private ngZone: NgZone,
    public router: Router
  ) {
  }

  websiteName = new BehaviorSubject<string>(null);
  websiteId = new BehaviorSubject<string>(null);
  initialWebsiteChangeCount: any = {value: 0};
  websiteChangeCount = new BehaviorSubject<any>(this.initialWebsiteChangeCount);
  websiteLoaded = new BehaviorSubject<boolean>(false);
  MAX_NUMBER_OF_WEBSITES = 3;

  private websiteOwnershipSubscription: Subscription;

  createWebsite() {
    const documentId = this.afs.createId();
    this.router.navigateByUrl(`/builder/${documentId}`).then(() => {
    });
    this.toastrService.success('Your website has been created.', 'Great!');
  }

  createWebsiteFromTemplate(template: string, user: IUser) {
    const websiteName = UtilService.generateWebsiteName();
    const documentId = this.afs.createId();
    const documentPath = `websites/${documentId}`;
    const documentRef: AngularFirestoreDocument<any> = this.afs.doc(documentPath);

    const frontPageComponents = this.builderComponentsService.frontPageComponents.getValue();
    const quickPageComponents = this.builderComponentsService.quickPageComponents.getValue();
    const defaultPageComponents = this.builderComponentsService.defaultPageComponents.getValue();

    this.websiteOwnershipSubscription = this.getWebsitesByUserId(user.uid).subscribe(websitesOwnedByUser => {
      if (websitesOwnedByUser.length < this.MAX_NUMBER_OF_WEBSITES) {
        switch (template['id']) {
          case ActiveTemplates.Front:
            documentRef.set({
              name: websiteName,
              id: documentId,
              createdBy: user.uid,
              pages: frontPageComponents['pages'],
              template: ActiveTemplates.Front
            }, {merge: true});
            break;
          case ActiveTemplates.Quick:
            documentRef.set({
              name: websiteName,
              id: documentId,
              createdBy: user.uid,
              pages: quickPageComponents['pages'],
              template: ActiveTemplates.Quick
            }, {merge: true});
            break;
          default:
            documentRef.set({
              name: websiteName,
              id: documentId,
              createdBy: user.uid,
              pages: defaultPageComponents['pages'],
              template: ActiveTemplates.Default
            }, {merge: true});
            break;
        }
        this.builderService.setSidebarComponentsSetting();
        this.builderService.activePageIndex.next(0);
        this.toastrService.success('Your website has been created.', 'Great!');
        this.router.navigateByUrl(`/builder/${documentId}`).then(() => {
        });
      } else {
        this.toastrService.warning('You cannot create more than 3 websites on your current plan.', 'Oops!');
      }
      this.websiteOwnershipSubscription.unsubscribe();
    });
  }

  getWebsitesByUserId(id) {
    return this.afs.collection('websites', ref => ref.where('createdBy', '==', id)).valueChanges();
  }

  getWebsite(id) {
    if (id) {
      return this.afs.collection('websites').doc(id).snapshotChanges().pipe(map(action => {
        const data = action.payload.data();
        const uid = action.payload.id;
        return {uid, ...data};
      }));
    }
  }

  checkIfWebsiteNameIsAvailable(name) {
    return this.afs.collection('websites', (ref) => ref.where('name', '==', name).limit(1)).get();
  }

  saveWebsite() {
    const id = this.websiteId.getValue();
    const pageComponents = this.builderComponentsService.pageComponents.getValue();
    if (id && pageComponents) {
      const websiteRef: AngularFirestoreDocument<any> = this.afs.doc(`websites/${id}`);
      return websiteRef.set(pageComponents, {
        merge: true
      });
    }
  }

  renameWebsite(websites, activeModal, websiteId, newWebsiteName) {
    if (websites.size === 0) {
      activeModal.dismiss();
      const documentRef: AngularFirestoreDocument<any> = this.afs.doc(`websites/${websiteId}`);
      documentRef.set({
        name: newWebsiteName
      }, {merge: true});
      activeModal.dismiss();
      this.websiteName.next(newWebsiteName);
      this.toastrService.success('Your website has been renamed.', 'Great!');
    } else {
      this.toastrService.error(`A website with this name already exists.`, 'Oops!');
    }
  }

  getWebsiteChangeCount(): Observable<any> {
    return this.websiteChangeCount.asObservable();
  }

  setWebsiteChangeCount(value: number, delta: number) {
    this.websiteChangeCount.next({value: (value + delta)});
  }

  resetWebsiteChangeCount() {
    this.websiteChangeCount.next(this.initialWebsiteChangeCount);
  }

  createWebsiteFromSource(uid, pageComponents) {
    if (pageComponents && uid) {
      const name = window.document.getElementById('builder-header-website-name').innerText;
      const id = window.location.pathname.split('/')[2];
      const createdBy = uid;
      const pages = pageComponents['pages'];
      const template = pageComponents['template'];

      this.websiteOwnershipSubscription = this.getWebsitesByUserId(uid).subscribe(websitesOwnedByUser => {
        if (websitesOwnedByUser.length < this.MAX_NUMBER_OF_WEBSITES) {
          const documentPath = `websites/${id}`;
          const documentRef: AngularFirestoreDocument<any> = this.afs.doc(documentPath);
          documentRef.set({
            name: name,
            id: id,
            createdBy: createdBy,
            pages: pages,
            template: template
          }, {merge: true});
          this.websiteName.next(name);
          this.ngZone.run(() => {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate([`/builder/${id}`]);
            }).then(() => {
            });
            this.toastrService.success('Your account has been created.', 'Great!');
          });
        } else {
          this.toastrService.warning('You cannot create more than 3 websites on your current plan.', 'Oops!');
        }
        this.websiteOwnershipSubscription.unsubscribe();
      });
    }
  }
}
