import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  navIsOpen = false;

  openNav(event: Event){
    event.stopPropagation();
    this.navIsOpen = !this.navIsOpen;
  }

    @HostListener('document:click', ['$event'])
    closeCart(event: Event) {
      const target = event.target as HTMLElement;
      if (!target.closest('#nav-container') && this.navIsOpen) {
        this.navIsOpen = false;
      }
    }

}
