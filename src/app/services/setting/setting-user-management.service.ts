import { Injectable } from "@angular/core";
import { AppConfig } from "src/app/app.config";
import { HttpClient } from "@angular/common/http";
import { User } from "src/app/models";

@Injectable({
  providedIn: "root"
})
export class SettingUserManagementService {
  settingsUserUrl = `${AppConfig.API_BASE_URL}/director/users`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<{
      success: boolean;
      executor: User[];
      secretaries: User[];
    }>(this.settingsUserUrl);
  }

  create(user: {
    email: string;
    password: string;
    password_confirmation: string;
    type: string;
  }) {
    return this.http.post<{ success: boolean; user: User }>(
      this.settingsUserUrl,
      user
    );
  }

  delete(id: number) {
    return this.http.delete<{ success: boolean }>(
      `${this.settingsUserUrl}/${id}`
    );
  }
}
