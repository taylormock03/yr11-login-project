import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../services/people.service';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  people: any;
  // Create Instance of PeopleService(ps) and MatDialog (dialog)
  constructor(private ps: PeopleService) {
  }



  ngOnInit(): void {
    this.people = this.ps.getUsers();
  } //end ngOnInit()


}