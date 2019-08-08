import {Component, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import { PeopleService } from './services/people.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    // ViewChild is a method that allows you 
    // to get a html element from your html page
 @ViewChild('snav') snav: MatSidenav;

 constructor(
    private ss: PeopleService
  ) { }
    close() {
        this.snav.close();
    }
}
