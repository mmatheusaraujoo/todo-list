import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

type NotificationSeverity = "success" | "error";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private messageService: MessageService) {}

  success(summary: string, detail: string) {
    this.displayNotification(summary, detail, "success");
  }

  error(summary: string, detail: string) {
    this.displayNotification(summary, detail, "error");
  }

  private displayNotification(
    summary: string,
    detail: string,
    severity: NotificationSeverity,
  ) {
    this.messageService.add({
      summary,
      detail,
      severity,
      key: "bc",
    });
  }
}
