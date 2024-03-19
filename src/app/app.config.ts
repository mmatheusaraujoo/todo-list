import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideAnimations } from "@angular/platform-browser/animations";

import { routes } from "./app.routes";
import { provideHttpClient } from "@angular/common/http";
import { MessageService } from "primeng/api";
import { NotificationService } from "./services/notification.service";
import { TodoService } from "./services/todo.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    MessageService,
    NotificationService,
    TodoService,
  ],
};
