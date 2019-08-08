import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  loginDB = [];
  valid: any;
  visible:number;
  constructor() {
    /* ====LOCALSTORAGE========
  Local storage stores data as key-value pairs, and the values are stored as "strings". 
  So, if we must JSON.stringify when we put them into LocalStorage and we must 'parse' the string into a valid object. when we retrieve it.
  */
    if (localStorage.loginDB == null) {
      localStorage.setItem('loginDB', JSON.stringify(this.loginDB));
    }

  } //end constructor


  // Setting visibility for Bottom Nav Bar
  setAccess(state) {
    this.visible = state
  }
  getAccess() {
    return this.visible
  }

  getUsers() {
    let people = JSON.parse(localStorage.getItem('loginDB'));
    return people;
  }

  // this FUNCTION accepts 'one' parameter 'person'
  // and pushes this parameter into the peole array
  addUser(loginValues): void {
    let loginDB = JSON.parse(localStorage.getItem('loginDB'));
    loginDB.push(loginValues);
    localStorage.setItem('loginDB', JSON.stringify(loginDB));
  }

  login(loginValues): void {
    this.setAccess(0)
    this.valid = "false"
    let loginDB = JSON.parse(localStorage.getItem('loginDB'));
    var usercount = 0;
    while (usercount < loginDB.length) {
      if (loginDB[usercount].Username == loginValues.Login_Username && loginDB[usercount].Password == loginValues.Login_Password) {
        this.valid = "pass"
        this.setAccess(1)
      }
      usercount++
    } // end while
    return this.valid
    //localStorage.setItem('loginDB', JSON.stringify(loginDB));
  } // end login

  checksignup(loginValues): void {
    this.valid = "pass"
    let loginDB = JSON.parse(localStorage.getItem('loginDB'));
    var usercount  = 0;
    while (usercount < loginDB.length) {
     // console.log(loginDB[usercount].Username + " == " + loginValues.Username)
      if (loginDB[usercount].Username == loginValues.Username) {
        this.valid = "fail"
      }
      usercount ++
    } // end while
    return this.valid
    //localStorage.setItem('loginDB', JSON.stringify(loginDB));
  } // end checksignup


  editPerson(user, id): void {
    let people = JSON.parse(localStorage.getItem('loginDB'));
    people[id] = user;
    localStorage.setItem('loginDB', JSON.stringify(people));
  }

  deletePerson(id): void {
    let people = this.getUsers()
    people.splice(id, 1);
    localStorage.setItem('loginDB', JSON.stringify(people));
  }
}  // end class




