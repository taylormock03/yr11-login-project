import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { PeopleService } from '../services/people.service';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;
  valid: any;
  errorMessage: any;
  count = 0;

  constructor(
    private fb: FormBuilder,
    private ps: PeopleService,
    private route: Router, private actroute: ActivatedRoute

  ) { }


  ngOnInit() {
    this.initialiseForm();
    this.errorMessage = "";
  }


  // ------------------ VALIDATION WHEN SUBMITTING FORM---------------------------------------//
  submit(): void {
    this.valid = this.ps.login(this.LoginForm.value);
    if (this.valid == "pass") {
      this.errorMessage = "";
      if (this.LoginForm.value.Level == 1) {
        this.ps.setAccess(1);
      }

      this.route.navigate(['home'])
    }
    if (this.valid == "false") {
      this.ps.setAccess(0);
      this.count = this.count + 1;
      if (this.count == 3) {
        this.errorMessage = "LOCKOUTED - PLease Admin";
        this.ps.setAccess(0);
      } else {
        this.errorMessage = "Incorrect Username or Password";
      }
    }

    this.LoginForm.reset();
  }


  // FORM INITIALISATION ==============================================================
  initialiseForm(): void {
    this.LoginForm = this.fb.group(
      {
        Login_Username: [null],
        Login_Password: [null],
      }
    );

  } // end initialiseForm



}