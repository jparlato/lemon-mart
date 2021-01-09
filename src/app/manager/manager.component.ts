import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
})
export class ManagerComponent implements OnInit {
  selectedItem = ''

  listItems = [
    { linkTitle: 'Home', link: '/home', icon: 'home' },
    { linkTitle: 'Receipts', link: '/manager/receipts', icon: 'receipt_long' },
    { linkTitle: 'Stock Entry', link: '/home', icon: 'edit' },
    { linkTitle: 'Pos', link: '/pos/home', icon: 'point_of_sale' },
    { linkTitle: 'Inventory', link: '/inventory/home', icon: 'inventory_2' },
  ]

  handleClick(selectedItem: { linkTitle: string }): void {
    this.selectedItem = selectedItem.linkTitle
  }

  constructor() {}

  ngOnInit(): void {}
}
