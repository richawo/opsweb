import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Template } from '../../../../shared/models/template';
import { DataService } from '../../../../shared/services/data.service';
import { BuilderNavbarService } from '../../builder-components/builder-navbar/builder-navbar.service';
import { BuilderHeroService } from '../../builder-components/builder-hero/builder-hero.service';
import { ActiveNavbarThemes, ActiveTemplates } from '../../builder';
import { TemplateService } from '../../../../shared/services/template.service';
import { BuilderFooterService } from '../../builder-components/builder-footer/builder-footer.service';

@Component({
  selector: 'app-builder-sidebar-templates',
  templateUrl: './builder-sidebar-templates.component.html',
  styleUrls: ['./builder-sidebar-templates.component.css']
})
export class BuilderSidebarTemplatesComponent implements OnInit {
  innerHeight: number;
  searchText: string;
  private webTemplateSubscription: Subscription;
  private webTemplateBusinessSubscription: Subscription;
  private templateSubscription: Subscription;
  private selectedTemplateSubscription: Subscription;
  private webTemplateBusiness: Template[];
  private webTemplates: Template[];
  private selectedTemplate: Template;

  constructor(
    private dataService: DataService,
    private templateService: TemplateService,
    private builderNavbarService: BuilderNavbarService,
    private builderHeroService: BuilderHeroService,
    private builderFooterService: BuilderFooterService
  ) {
  }

  get selectedTemplates() {
    return TemplateService.selectedTemplates;
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
    this.setupWebTemplateSubscriptions();
  }

  setupWebTemplateSubscriptions() {
    this.webTemplateSubscription = this.dataService.getAllWebTemplates().subscribe(response => {
      if (response) {
        this.webTemplates = response;
        this.webTemplates.push(new Template(ActiveTemplates.Default, 'Default', 'Default template'));
        TemplateService.parseSelectedTemplates([].concat.apply([], this.webTemplates));
        TemplateService.parseAvailableTemplates([].concat.apply([], this.webTemplates));
      }
    });

    this.webTemplateBusinessSubscription = this.dataService.getWebTemplateBusiness().subscribe(response => {
      if (response) {
        this.webTemplateBusiness = response;
      }
    });

    this.selectedTemplateSubscription = this.templateService.selectedTemplate.subscribe(response => {
      if (response) {
        this.selectedTemplate = response;
      }
    });

    this.templateSubscription = this.templateService.selectedCategory.subscribe(response => {
      if (response) {
        switch (response) {
          case 'All':
            TemplateService.parseSelectedTemplates([].concat.apply([], this.webTemplates));
            break;
          case 'Business':
            TemplateService.parseSelectedTemplates([].concat.apply([], this.webTemplateBusiness));
            break;
          case 'E-commerce':
            TemplateService.parseSelectedTemplates([].concat.apply([], null));
            break;
          case 'Photography':
            TemplateService.parseSelectedTemplates([].concat.apply([], null));
            break;
          case 'Video':
            TemplateService.parseSelectedTemplates([].concat.apply([], null));
            break;
          case 'Music':
            TemplateService.parseSelectedTemplates([].concat.apply([], null));
            break;
          case 'Design':
            TemplateService.parseSelectedTemplates([].concat.apply([], null));
            break;
          case 'Restaurants and Food':
            TemplateService.parseSelectedTemplates([].concat.apply([], null));
            break;
          case 'Travel and Tourism':
            TemplateService.parseSelectedTemplates([].concat.apply([], null));
            break;
          case 'Events':
            TemplateService.parseSelectedTemplates([].concat.apply([], null));
            break;
          case 'Portfolio and CV':
            TemplateService.parseSelectedTemplates([].concat.apply([], null));
            break;
          case 'Beauty and Hair':
            TemplateService.parseSelectedTemplates([].concat.apply([], null));
            break;
          case 'Fashion and Style':
            TemplateService.parseSelectedTemplates([].concat.apply([], null));
            break;
          case 'Community and Education':
            TemplateService.parseSelectedTemplates([].concat.apply([], null));
            break;
          default:
            TemplateService.parseSelectedTemplates([].concat.apply([], this.webTemplates));
            break;
        }
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerHeight = window.innerHeight;
  }

  setTemplate(templateId: string) {
    this.builderNavbarService.navbarTheme.next(ActiveNavbarThemes.Default);
    this.builderNavbarService.navbarTemplate.next(templateId);
    this.builderNavbarService.setNavbarTemplate(templateId);

    this.builderHeroService.setHeroTemplate(templateId);

    this.builderFooterService.footerTheme.next(ActiveNavbarThemes.Default);
    this.builderFooterService.footerTemplate.next(templateId);
    this.builderFooterService.setFooterTemplate(templateId);
  }
}