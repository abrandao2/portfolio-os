import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  route: string;

  constructor(private router: Router, private location: Location) {
    router.events.subscribe(() => {
      this.route = location.path() || 'Apps';
    });
  }

  ngOnInit(): void {
  }

}
