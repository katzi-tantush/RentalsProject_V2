import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MockDataService } from 'src/app/services/mock-data.service';

@Component({
  selector: 'app-mock-date',
  templateUrl: './mock-date.component.html',
  styleUrls: ['./mock-date.component.css']
})
export class MockDateComponent implements OnInit {

  constructor(
    private mockData: MockDataService
  ) { }

  ngOnInit(): void {
  }

  setMockDate(dateInput: Date) {
    this.mockData.setMockDate(dateInput);
  }
}
