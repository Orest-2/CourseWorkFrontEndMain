import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  RootStoreState,
  AuthStoreActions,
  AuthStoreSelectors
} from "src/app/root-store";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { MustMatch } from "src/app/helpers";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;

  constructor(
    private store$: Store<RootStoreState.State>,
    private fb: FormBuilder,
    private messageService: MessageService,
    private cdRef: ChangeDetectorRef,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle("Sign Up");

    this.signupForm = this.fb.group(
      {
        login: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(8)]],
        passwordConfirmation: [
          "",
          [Validators.required, Validators.minLength(8)]
        ]
      },
      {
        validators: MustMatch("password", "passwordConfirmation")
      }
    );

    this.isLoading$ = this.store$.select(
      AuthStoreSelectors.selectSignupIsLoading
    );
  }

  ngAfterViewInit(): void {
    this.store$
      .select(AuthStoreSelectors.selectSignupError)
      .subscribe(error => {
        if (error) {
          let tostError = [];
          error.errors.full_messages.forEach((element: any) => {
            tostError.push({
              severity: "error",
              summary: "Error Message",
              detail: element,
              life: 5000
            });
          });
          this.messageService.addAll(tostError);
        }
      });

    this.cdRef.detectChanges();
  }

  get form() {
    return this.signupForm.controls;
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.signupForm.get(fieldName);
    return (
      (field.invalid && (field.dirty || field.touched)) ||
      (field.invalid && field.untouched && this.submitted)
    );
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) return;

    this.store$.dispatch(
      new AuthStoreActions.SignupRequestAction(this.signupForm.value)
    );
  }
}
