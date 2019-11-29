import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BuilderComponent } from './builder.page';
import { BuilderService } from './builder.service';
import { BuilderHeaderComponent } from './builder-header/builder-header.component';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../shared/services/data.service';
import { BuilderComponentModule } from './builder-components/builder-component.module';
import { TemplateService } from '../../shared/services/template.service';
import { BuilderActionsModule } from './builder-actions/builder-actions.module';
import { BuilderShowcaseModule } from './builder-showcase/builder-showcase.module';
import { BuilderSidebarModule } from './builder-sidebar/builder-sidebar.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: '', component: BuilderComponent }
];

@NgModule({
  declarations: [
    BuilderComponent,
    BuilderHeaderComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    BuilderComponentModule,
    BuilderSidebarModule,
    BuilderShowcaseModule,
    BuilderActionsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    BuilderService,
    DataService,
    TemplateService
  ]
})

export class BuilderModule {
}