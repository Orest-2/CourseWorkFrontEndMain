import { NgModule } from "@angular/core";
import { ToastModule } from "primeng/toast";
import { TableModule } from "primeng/table";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { DropdownModule } from "primeng/dropdown";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { MessageService } from "primeng/api";
import { InplaceModule } from "primeng/inplace";
import { ConfirmationService } from "primeng/api";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { ScrollPanelModule } from "primeng/scrollpanel";

const primeNgModules = [
  ToastModule,
  TableModule,
  DialogModule,
  ButtonModule,
  InputTextModule,
  InputTextareaModule,
  DropdownModule,
  DynamicDialogModule,
  InplaceModule,
  ConfirmDialogModule,
  OverlayPanelModule,
  ScrollPanelModule
];

@NgModule({
  imports: primeNgModules,
  exports: primeNgModules,
  providers: [MessageService, ConfirmationService]
})
export class AppPrimeNGModule {}
