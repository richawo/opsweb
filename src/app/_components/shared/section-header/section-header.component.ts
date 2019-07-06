import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html'
})
export class SectionHeaderComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  headerTopPadding$: Observable<any>;
  @Input() title: string;
  @Input() subtitle: string;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    this.headerTopPadding$ = this.breakpointObserver.observe([Breakpoints.Handset]).pipe(
      map(isHandset => isHandset ? { 'padding-top': '2.5em' } : { 'padding-top': '0em' })
    );
  }
}
