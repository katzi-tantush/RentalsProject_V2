import { Component, Input, OnInit } from '@angular/core';
import { RentData } from 'src/app/models/Car-Models/RentData';

@Component({
  selector: 'app-rent-history-view',
  templateUrl: './rent-history-view.component.html',
  styleUrls: ['./rent-history-view.component.css']
})
export class RentHistoryViewComponent implements OnInit {
  @Input() rentData: RentData;
  
  constructor() { }

  ngOnInit(): void {
  }

}
