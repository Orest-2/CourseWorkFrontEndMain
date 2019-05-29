import { Injectable } from "@angular/core";
import { AppConfig } from "../../app.config";
import { HttpClient } from "@angular/common/http";
import { Application } from "../../models";

@Injectable({
  providedIn: "root"
})
export class ApplicationService {
  applicationUrl = `${AppConfig.API_BASE_URL}/copyright_applications`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<{
      success: boolean;
      copyright_applications: Application[];
    }>(this.applicationUrl);
  }

  get(id: number) {
    return this.http.get<{
      success: boolean;
      copyright_application: Application;
    }>(`${this.applicationUrl}/${id}`);
  }

  create(application: Application) {
    return this.http.post<{
      success: boolean;
      copyright_application: Application;
    }>(this.applicationUrl, application);
  }

  update(id: number, application: Application) {
    return this.http.put<{
      success: boolean;
      copyright_application: Application;
    }>(`${this.applicationUrl}/${id}`, application);
  }

  delete(id: number) {
    return this.http.delete<{ success: boolean }>(
      `${this.applicationUrl}/${id}`
    );
  }

  submit(id: number) {
    return this.http.get<{
      success: boolean;
      copyright_application: Application;
    }>(`${this.applicationUrl}/submit/${id}`);
  }

  unSubmit(id: number) {
    return this.http.get<{
      success: boolean;
      copyright_application: Application;
    }>(`${this.applicationUrl}/unsubmit/${id}`);
  }

  accept(id: number) {
    return this.http.get<{
      success: boolean;
      copyright_application: Application;
    }>(`${this.applicationUrl}/accept/${id}`);
  }

  decline(id: number) {
    return this.http.get<{
      success: boolean;
      copyright_application: Application;
    }>(`${this.applicationUrl}/decline/${id}`);
  }
}
