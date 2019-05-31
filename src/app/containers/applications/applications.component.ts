import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Application, Product, User } from "src/app/models";
import { SelectItem, ConfirmationService } from "primeng/api";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import {
  RootStoreState,
  ProductStoreSelectors,
  ProductStoreActions,
  ApplicationStoreSelectors,
  ApplicationStoreActions,
  AuthStoreSelectors
} from "src/app/root-store";
import { map, filter } from "rxjs/operators";
import { ApplicationService } from "src/app/services";
import {
  SettingsUserStoreSelectors,
  SettingsUserStoreActions
} from "src/app/root-store/settings-user-store";
import { OverlayPanel } from "primeng/overlaypanel";

@Component({
  selector: "app-applications",
  templateUrl: "./applications.component.html",
  styleUrls: ["./applications.component.scss"]
})
export class ApplicationsComponent implements OnInit {
  user$: Observable<User>;
  applicationForm: FormGroup;
  shareForm: FormGroup;
  display: boolean;
  displayShare: boolean;
  newApplication: boolean;
  columns: any[];
  searchResult: any[];
  productOptions$: Observable<SelectItem[]>;
  executorOptions$: Observable<SelectItem[]>;
  applications$: Observable<Application[]>;
  products$: Observable<Product[]>;
  users$: Observable<User[]>;
  errorProduct$: Observable<string>;
  errorApplication$: Observable<string>;
  isLoadingProduct$: Observable<boolean>;
  isLoadingApplication$: Observable<boolean>;

  constructor(
    private title: Title,
    private applicationService: ApplicationService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private store$: Store<RootStoreState.State>
  ) {}

  ngOnInit() {
    this.title.setTitle("Applications");

    this.user$ = this.store$.select(AuthStoreSelectors.selectSigninUser);
    this.users$ = this.store$.select(
      SettingsUserStoreSelectors.selectAllUserItems
    );
    this.products$ = this.store$.select(
      ProductStoreSelectors.selectAllProductItems
    );
    this.applications$ = this.store$.select(
      ApplicationStoreSelectors.selectAllApplicationItems
    );
    this.errorProduct$ = this.store$.select(
      ProductStoreSelectors.selectProductError
    );
    this.isLoadingProduct$ = this.store$.select(
      ProductStoreSelectors.selectProductIsLoading
    );
    this.errorApplication$ = this.store$.select(
      ApplicationStoreSelectors.selectApplicationError
    );
    this.isLoadingApplication$ = this.store$.select(
      ApplicationStoreSelectors.selectApplicationIsLoading
    );

    this.store$.dispatch(new ApplicationStoreActions.LoadRequestAction());
    this.store$.dispatch(new SettingsUserStoreActions.LoadRequestAction());

    this.columns = [
      { field: "title", header: "Title" },
      { field: "description", header: "Description" }
    ];

    this.user$.pipe(filter(user => !!user)).subscribe(user => {
      if (user.is_customer) {
        this.store$.dispatch(new ProductStoreActions.LoadRequestAction());
        this.productOptions$ = this.getOptions(this.products$, "id", "name");
        this.columns.push({
          field: "product_id",
          header: "Product",
          render: (rowData: { product_id: number }) => {
            return this.products$.pipe(
              map(data => {
                const p = data.find(el => el.id === rowData.product_id);
                return p ? p.name : "";
              })
            );
          }
        });
      }
    });

    this.executorOptions$ = this.getOptions(
      this.users$.pipe(map(data => data.filter(user => user.is_executor))),
      "id",
      "email"
    );

    this.applicationForm = this.fb.group({
      id: [""],
      product_id: ["", Validators.required],
      title: ["", Validators.required],
      description: ["", Validators.required],
      tasks: this.fb.array([])
    });

    this.shareForm = this.fb.group({
      id: ["", Validators.required],
      executor_id: ["", Validators.required]
    });
  }

  initTasks() {
    return this.fb.group({
      id: [""],
      title: ["", Validators.required]
    });
  }

  addTask() {
    const control = this.applicationForm.controls.tasks as FormArray;
    control.push(this.initTasks());
  }

  removeTask(i: number) {
    const control = this.applicationForm.controls.tasks as FormArray;
    control.removeAt(i);
  }

  getOptions(
    array: Observable<any[]>,
    value: string,
    label: string
  ): Observable<SelectItem[]> {
    return array.pipe(
      map(data =>
        data.map(el => ({
          value: el[value],
          label: el[label]
        }))
      )
    );
  }

  showDialog(type: string, data: Application = null) {
    switch (type) {
      case "add":
        this.newApplication = true;
        this.applicationForm.setControl("tasks", new FormArray([]));
        this.applicationForm.reset();
        break;
      case "edit":
        this.applicationForm.reset();
        this.newApplication = false;
        this.applicationForm.setControl(
          "tasks",
          new FormArray(data.tasks.map(() => this.initTasks()))
        );

        this.applicationForm.patchValue(data);
        break;
    }

    this.display = true;
  }

  create() {
    this.applicationService
      .create(this.applicationForm.value)
      .subscribe(
        data =>
          this.store$.dispatch(
            new ApplicationStoreActions.CreateRequestAction(
              data.copyright_application
            )
          ),
        error => console.log(error)
      );

    this.display = false;
  }

  update() {
    const id = this.applicationForm.value.id;

    this.applicationService
      .update(id, this.applicationForm.value)
      .subscribe(
        data =>
          this.store$.dispatch(
            new ApplicationStoreActions.UpdateRequestAction(
              id,
              data.copyright_application
            )
          ),
        error => console.log(error)
      );

    this.display = false;
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: "Do you want to delete this Application?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      accept: () => {
        this.applicationService
          .delete(id)
          .subscribe(
            () =>
              this.store$.dispatch(
                new ApplicationStoreActions.DeleteRequestAction(id)
              ),
            error => console.log(error)
          );
      }
    });
  }

  submit(id: number) {
    this.applicationService
      .submit(id)
      .subscribe(
        data =>
          this.store$.dispatch(
            new ApplicationStoreActions.UpdateRequestAction(
              id,
              data.copyright_application
            )
          ),
        error => console.log(error)
      );
  }

  unSubmit(id: number) {
    this.confirmationService.confirm({
      message: "Do you want to cancel submit?",
      header: "Cancel Submit",
      icon: "pi pi-info-circle",
      accept: () => {
        this.applicationService
          .unSubmit(id)
          .subscribe(
            data =>
              this.store$.dispatch(
                new ApplicationStoreActions.UpdateRequestAction(
                  id,
                  data.copyright_application
                )
              ),
            error => console.log(error)
          );
      }
    });
  }

  accept(id: number) {
    this.applicationService
      .accept(id)
      .subscribe(
        data =>
          this.store$.dispatch(
            new ApplicationStoreActions.UpdateRequestAction(
              id,
              data.copyright_application
            )
          ),
        error => console.log(error)
      );
  }

  decline(id: number) {
    this.confirmationService.confirm({
      message: "Do you want to decline this application?",
      header: "Decline application",
      icon: "pi pi-info-circle",
      accept: () => {
        this.applicationService
          .decline(id)
          .subscribe(
            data =>
              this.store$.dispatch(
                new ApplicationStoreActions.UpdateRequestAction(
                  id,
                  data.copyright_application
                )
              ),
            error => console.log(error)
          );
      }
    });
  }

  openShareDialog(id: number) {
    this.shareForm.reset();
    this.shareForm.controls.id.setValue(id);
    this.displayShare = true;
  }

  share() {
    this.applicationService
      .share(this.shareForm.value)
      .subscribe(
        data =>
          this.store$.dispatch(
            new ApplicationStoreActions.UpdateRequestAction(
              data.copyright_application.id,
              data.copyright_application
            )
          ),
        error => console.log(error)
      );

    this.displayShare = false;
  }

  search(event, id: number, overlayPanel: OverlayPanel) {
    this.applicationService.search(id).subscribe(data => {
      this.searchResult = data.result;
      overlayPanel.toggle(event);
    });
  }
}
