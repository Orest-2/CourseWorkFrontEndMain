import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray
} from "@angular/forms";
import { CopyrightApplication, Product } from "src/app/models";
import { SelectItem } from "primeng/api";

@Component({
  selector: "app-applications",
  templateUrl: "./applications.component.html",
  styleUrls: ["./applications.component.scss"]
})
export class ApplicationsComponent implements OnInit {
  applicationForm: FormGroup;
  display: boolean;
  newApplication: boolean;
  products: Product[];
  productOptions: SelectItem[];
  applications: CopyrightApplication[];
  columns: any[];

  constructor(private title: Title, private fb: FormBuilder) {}

  ngOnInit() {
    this.title.setTitle("Applications");

    this.products = [
      { id: 1, name: "test", description: "qqq", product_type: 1 }
    ];
    this.applications = [
      {
        id: 1,
        title: "app 1",
        description: "qqq",
        product_id: 1,
        tasks: [{ title: "qqq" }, { title: "qqq2" }]
      }
    ];

    this.productOptions = this.getOptions(this.products, "id", "name");

    this.columns = [
      { field: "title", header: "Title" },
      { field: "description", header: "Description" },
      {
        field: "product_id",
        header: "Product",
        render: (rowData: { product_id: number }) => {
          return this.products.find(el => el.id === rowData.product_id).name;
        }
      }
    ];

    this.applicationForm = this.fb.group({
      id: [""],
      product_id: ["", Validators.required],
      title: ["", Validators.required],
      description: ["", Validators.required],
      tasks: this.fb.array([])
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

  getOptions(array: any[], value: string, label: string) {
    return array.map<SelectItem>(el => ({
      value: el[value],
      label: el[label]
    }));
  }

  showDialog(type: string, data: CopyrightApplication = null) {
    switch (type) {
      case "add":
        this.newApplication = true;
        this.applicationForm.setControl("tasks", new FormArray([]));
        this.applicationForm.reset();
        break;
      case "edit":
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
    console.log(this.applicationForm.value);
    this.display = false;
  }

  update() {
    console.log(this.applicationForm.value);

    this.display = false;
  }

  delete(id: number) {}
}
