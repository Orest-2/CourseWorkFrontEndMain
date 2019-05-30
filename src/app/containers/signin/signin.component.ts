import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import {
  RootStoreState,
  AuthStoreSelectors,
  AuthStoreActions
} from "src/app/root-store";
import { Observable } from "rxjs";
import { MessageService } from "primeng/api";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"]
})
export class SigninComponent implements OnInit, AfterViewInit {
  signinForm: FormGroup;
  submitted = false;
  isLoading$: Observable<boolean>;

  constructor(
    private store$: Store<RootStoreState.State>,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private messageService: MessageService,
    private title: Title
  ) {}

  get form() {
    return this.signinForm.controls;
  }

  ngOnInit() {
    this.title.setTitle("Sign In");

    this.signinForm = this.fb.group({
      login: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });

    this.isLoading$ = this.store$.select(
      AuthStoreSelectors.selectSigninIsLoading
    );
  }

  ngAfterViewInit(): void {
    this.store$
      .select(AuthStoreSelectors.selectSigninError)
      .subscribe(error => {
        if (error) {
          this.messageService.add({
            severity: "error",
            summary: "Error Message",
            detail: error.errors[0],
            life: 5000
          });
        }
      });

    this.cdRef.detectChanges();
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.signinForm.get(fieldName);
    return (
      (field.invalid && (field.dirty || field.touched)) ||
      (field.invalid && field.untouched && this.submitted)
    );
  }

  onSubmit() {
    this.submitted = true;

    if (this.signinForm.invalid) { return; }

    this.store$.dispatch(
      new AuthStoreActions.SigninRequestAction(this.signinForm.value)
    );
  }
}
