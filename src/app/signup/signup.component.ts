import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { PeopleService } from '../services/people.service';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // Define my Form name "peopleForm" as a FORMGROUP
  signupForm: FormGroup;
  valid: any;
  errorMessage: any;
  // Create instances of FormBuilder (fb) and PeopleServices (ps)
  constructor(
    private fb: FormBuilder,
    private ps: PeopleService,
    private route: Router, private actroute: ActivatedRoute
  ) { }


  ngOnInit() {
    this.initialiseForm();

  }

  // ------------------ VALIDATION WHEN SUBMITTING FORM---------------------------------------//
  signupSubmit(): void {
    this.valid = this.ps.checksignup(this.signupForm.value);

    if (this.valid == "pass") {
      this.ps.addUser(this.signupForm.value);
      this.route.navigate(['login'])
    }
    if (this.valid == "fail") {
      this.errorMessage = "The Username already exsists"
      console.log("valid is " + this.valid)
    }
    
    this.signupForm.reset();
  }


  // FORM INITIALISATION ==============================================================
  initialiseForm(): void {
    this.signupForm = this.fb.group(
      {
        Username: [null],
        Password: [null],
        Email: [null],
        Level: [null],
      }
    );

  } // end initialiseForm



}