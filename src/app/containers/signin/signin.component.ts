import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootStoreState, AuthStoreSelectors, AuthStoreActions } from 'src/app/root-store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  submitted = false;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;

  constructor(
    private store$: Store<RootStoreState.State>,
    private fb: FormBuilder,
    private router: Router
  ) { }

  get form() { return this.signinForm.controls; }

  ngOnInit() {
    this.signinForm = this.fb.group({
      login: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.error$ = this.store$.select(AuthStoreSelectors.selectSigninError);
    this.isLoading$ = this.store$.select(AuthStoreSelectors.selectSigninIsLoading);
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.signinForm.get(fieldName);
    return field.invalid && (field.dirty || field.touched) || (field.invalid && field.untouched && this.submitted);
  }

  onSubmit() {
    this.submitted = true;

    if (this.signinForm.invalid) { return; }

    this.store$.dispatch(new AuthStoreActions.SigninRequestAction(this.signinForm.value));
  }
}
