import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ConfirmationService, SelectItem } from "primeng/api";
import { RootStoreState } from "src/app/root-store";
import { Store } from "@ngrx/store";
import { MustMatch } from "src/app/helpers";
import { SettingUserManagementService } from "src/app/services";
import {
  SettingsUserStoreActions,
  SettingsUserStoreSelectors
} from "src/app/root-store/settings-user-store";
import { User } from "src/app/models";
import { Observable } from "rxjs";

@Component({
  selector: "app-settings-user-management",
  templateUrl: "./settings-user-management.component.html",
  styleUrls: ["./settings-user-management.component.scss"]
})
export class SettingsUserManagementComponent implements OnInit {
  userForm: FormGroup;
  display: boolean;
  users$: Observable<User[]>;
  userTypes: SelectItem[];
  columns: any[];

  constructor(
    private store$: Store<RootStoreState.State>,
    private fb: FormBuilder,
    private title: Title,
    private settingUserService: SettingUserManagementService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.title.setTitle("User management");

    this.users$ = this.store$.select(
      SettingsUserStoreSelectors.selectAllUserItems
    );

    this.columns = [
      { field: "email", header: "Email" },
      {
        field: "type",
        header: "Type",
        render: (rowData: User) => {
          if (rowData.is_executor) {
            return "Executor";
          } else if (rowData.is_secretary) {
            return "Secretary";
          }
        }
      }
    ];

    this.userTypes = [
      { value: "executor", label: "Executor" },
      { value: "secretary", label: "Secretary" }
    ];

    this.userForm = this.fb.group(
      {
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(8)]],
        password_confirmation: [
          "",
          [Validators.required, Validators.minLength(8)]
        ],
        type: ["", Validators.required]
      },
      {
        validators: MustMatch("password", "password_confirmation")
      }
    );

    this.store$.dispatch(new SettingsUserStoreActions.LoadRequestAction());
  }

  create() {
    this.settingUserService
      .create(this.userForm.value)
      .subscribe(
        data =>
          this.store$.dispatch(
            new SettingsUserStoreActions.CreateRequestAction(data.user)
          ),
        error => console.log(error)
      );

    this.display = false;
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: "Do you want to delete this User?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      accept: () => {
        this.settingUserService
          .delete(id)
          .subscribe(
            () =>
              this.store$.dispatch(
                new SettingsUserStoreActions.DeleteRequestAction(id)
              ),
            error => console.log(error)
          );
      }
    });
  }
}
