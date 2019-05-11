import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/models";
import { ProductService } from "src/app/services";
import { Title } from "@angular/platform-browser";
import { ConfirmationService, SelectItem } from "primeng/api";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import {
  RootStoreState,
  ProductStoreSelectors,
  ProductStoreActions
} from "src/app/root-store";
import { Observable } from "rxjs";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  productForm: FormGroup;
  display: boolean;
  newProduct: boolean;
  productTypes: SelectItem[];
  columns: any[];
  products$: Observable<Product[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;

  constructor(
    private store$: Store<RootStoreState.State>,
    private fb: FormBuilder,
    private productService: ProductService,
    private title: Title,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.title.setTitle("Products");

    this.products$ = this.store$.select(
      ProductStoreSelectors.selectAllProductItems
    );

    this.error$ = this.store$.select(ProductStoreSelectors.selectProductError);

    this.isLoading$ = this.store$.select(
      ProductStoreSelectors.selectProductIsLoading
    );

    this.store$.dispatch(new ProductStoreActions.LoadRequestAction());

    this.productTypes = [
      { value: 1, label: "Text" },
      { value: 2, label: "Video" },
      { value: 3, label: "Songs" },
      { value: 4, label: "Image" },
      { value: 5, label: "Other" }
    ];

    this.columns = [
      { field: "name", header: "Title" },
      { field: "description", header: "Description" },
      {
        field: "product_type",
        header: "Type",
        render: (rowData: { product_type: number }) => {
          return this.productTypes.find(e => e.value === rowData.product_type)
            .label;
        }
      }
    ];

    this.productForm = this.fb.group({
      id: [""],
      name: ["", Validators.required],
      description: ["", Validators.required],
      product_type: ["", Validators.required]
    });
  }

  showDialog(type: string, data: Product = null) {
    switch (type) {
      case "add":
        this.newProduct = true;
        this.productForm.reset();
        break;
      case "edit":
        this.newProduct = false;
        this.productForm.patchValue(data);
        break;
    }

    this.display = true;
  }

  create() {
    this.productService
      .create(this.productForm.value)
      .subscribe(
        data =>
          this.store$.dispatch(
            new ProductStoreActions.CreateRequestAction(data.product)
          ),
        error => console.log(error)
      );

    this.display = false;
  }

  update() {
    const id = this.productForm.value.id;

    this.productService
      .update(id, this.productForm.value)
      .subscribe(
        data =>
          this.store$.dispatch(
            new ProductStoreActions.UpdateRequestAction(id, data.product)
          ),
        error => console.log(error)
      );

    this.display = false;
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: "Do you want to delete this Product?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      accept: () => {
        this.productService
          .delete(id)
          .subscribe(
            () =>
              this.store$.dispatch(
                new ProductStoreActions.DeleteRequestAction(id)
              ),
            error => console.log(error)
          );
      }
    });
  }
}
