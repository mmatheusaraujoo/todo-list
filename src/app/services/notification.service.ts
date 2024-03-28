import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

type NotificationSeverity = "success" | "error";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private messageService: MessageService) {}

  success(summary: string, detail: string) {
    this.displayNotification(summary, detail, "success", false);
  }

  error(summary: string, detail: string) {
    this.displayNotification(summary, detail, "error", false);
  }

  private displayNotification(
    summary: string,
    detail: string,
    severity: NotificationSeverity,
    closable: boolean,
  ) {
    this.messageService.add({
      summary,
      detail,
      severity,
      closable,
      key: "bc",
    });
  }
}
