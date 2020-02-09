import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActiveHeadingThemes, ActiveTemplates } from '../../../builder';
import { BuilderHeadingService } from '../../../builder-components/builder-heading/builder-heading.service';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../../builder.service';

@Component({
  selector: 'app-heading-colour-picker',
  templateUrl: './heading-colour-picker.component.html'
})
export class HeadingColourPickerComponent implements OnInit, OnDestroy {
  headingThemes: any;
  defaultHeadingStyle: any;
  headingStyle: any;
  headingHeaderStyle: any = {'color': '#000'};
  headingSubheaderStyle: any = {'color': '#000'};
  headingTemplate: string = ActiveTemplates.Default;
  headingTheme: string = ActiveHeadingThemes.Default;
  websiteChangeCount: number;
  activeComponentId: string;

  private featureStyleSubscription: Subscription;
  private featureHeaderStyleSubscription: Subscription;
  private featureSubheaderStyleSubscription: Subscription;
  private headingThemesSubscription: Subscription;
  private headingTemplateSubscription: Subscription;
  private defaultHeadingStyleSubscription: Subscription;
  private websiteChangeCountSubscription: Subscription;
  private activeComponentIdSubscription: Subscription;

  constructor(
    private builderHeadingService: BuilderHeadingService,
    private builderService: BuilderService
  ) {
  }

  ngOnInit() {

    this.activeComponentIdSubscription = this.builderService.activeEditComponentId.subscribe(response => {
      if (response) {
        this.activeComponentId = response;
      }
    });

    this.builderService.postMessage('get-feature', this.activeComponentId, 'feature-subheader-style-color');

    this.featureStyleSubscription = this.builderHeadingService.headingStyle.subscribe(response => {
      if (response) {
        this.headingStyle = response;
      }
    });

    this.featureHeaderStyleSubscription = this.builderHeadingService.headingHeaderStyle.subscribe(response => {
      if (response) {
        this.headingHeaderStyle = response;
      }
    });

    this.featureSubheaderStyleSubscription = this.builderHeadingService.headingSubheaderStyle.subscribe(response => {
      if (response) {
        this.headingSubheaderStyle = response;
      }
    });

    this.headingThemesSubscription = this.builderHeadingService.getHeadingThemes().subscribe(response => {
      if (response) {
        this.headingThemes = response;
      }
    });

    this.headingTemplateSubscription = this.builderHeadingService.headingTemplate.subscribe(response => {
      if (response) {
        this.headingTemplate = response;

        this.defaultHeadingStyleSubscription = this.builderHeadingService.getDefaultHeadingStyle(this.headingTemplate).subscribe(style => {
          if (style) {
            this.defaultHeadingStyle = style;
          }
        });
      }
    });

    this.websiteChangeCountSubscription = this.builderService.getWebsiteChangeCount().subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });
  }

  onThemeChange() {
    if (this.headingTheme === ActiveHeadingThemes.Default) {
      this.resetToDefault();
    } else {
      this.builderHeadingService.headingTheme.next(this.headingTheme);
      this.builderHeadingService.setHeadingTheme(this.headingTheme, this.activeComponentId);
    }
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setHeadingStyle() {
    this.builderHeadingService.headingStyle.next(this.headingStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setHeadingHeaderStyle() {
    this.builderHeadingService.headingHeaderStyle.next(this.headingHeaderStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setHeadingSubheaderStyle() {
    this.builderHeadingService.headingSubheaderStyle.next(this.headingSubheaderStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetToDefault() {
    const id = this.activeComponentId;
    this.builderHeadingService.headingTheme.next(ActiveHeadingThemes.Default);
    this.headingStyle['background-color'] = this.defaultHeadingStyle['headingStyle']['background-color'];
    this.headingHeaderStyle['color'] = this.defaultHeadingStyle['headingHeaderStyle']['color'];
    this.headingSubheaderStyle['color'] = this.defaultHeadingStyle['headingSubheaderStyle']['color'];
    this.setHeadingStyle();
    this.setHeadingHeaderStyle();
    this.setHeadingSubheaderStyle();
  }

  clearCurrentSettings(): void {
    this.activeComponentId = null;
    this.headingHeaderStyle = null;
    this.headingSubheaderStyle = null;
  }

  @HostListener('window:message', ['$event'])
  onMessage(e) {
    if (e.data.for == 'opsonion') {
      if ((e.data.action == 'unique-component-selected' || e.data.action == 'duplicate-component-deselected') && this.activeComponentId) {
        this.clearCurrentSettings();
      }
    }
  }

  ngOnDestroy(): void {
    this.headingThemesSubscription.unsubscribe();
    this.headingTemplateSubscription.unsubscribe();
    if (this.defaultHeadingStyleSubscription && !this.defaultHeadingStyleSubscription.closed) {this.defaultHeadingStyleSubscription.unsubscribe(); }
    this.websiteChangeCountSubscription.unsubscribe();
    this.activeComponentIdSubscription.unsubscribe();
    this.featureHeaderStyleSubscription.unsubscribe();
    this.featureSubheaderStyleSubscription.unsubscribe();
  }
}
