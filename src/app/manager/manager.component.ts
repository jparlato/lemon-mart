import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
})
export class ManagerComponent implements OnInit {
  selectedItem = ''

  listItems = [
    { linkTitle: 'Home 1', link: '/home-a' },
    { linkTitle: 'Home 2', link: '/home-b' },
    { linkTitle: 'Home 3', link: '/home-c' },
    { linkTitle: 'Home 4', link: '/home-d' },
    { linkTitle: 'Home 5', link: '/home-e' },
  ]

  handleClick(selectedItem: { linkTitle: string }) {
    this.selectedItem = selectedItem.linkTitle
  }

  constructor() {}

  ngOnInit(): void {}
}
