import {Component, Input, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-skip-to-target',
  templateUrl: './skip-to-target.component.html',
  styleUrls: ['./skip-to-target.component.scss']
})
export class SkipToTargetComponent implements OnInit{

  @Input() title: string;
  @Input() targetId: string;

  targetPath: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(route => route instanceof NavigationEnd)
    ).subscribe(route => this.targetPath = `${this.router.url.split('#')[0]}#${this.targetId}`);
  }

}
