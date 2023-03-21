import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-openmodal',
  templateUrl: './openmodal.component.html',
  styleUrls: ['./openmodal.component.scss']
})
export class OpenmodalComponent implements OnInit {
  @Input() isOpen = false;
  constructor() { }

  ngOnInit(): void {
  }

}
