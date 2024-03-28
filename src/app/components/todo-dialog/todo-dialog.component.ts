import { Component } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { NotificationService } from "../../services/notification.service";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { TodoService } from "../../services/todo.service";

import { Todo } from "../../models/todo";

@Component({
  selector: "app-todo-dialog",
  standalone: true,
  imports: [],
  templateUrl: "./todo-dialog.component.html",
  styleUrl: "./todo-dialog.component.scss",
  providers: [
    NotificationService,
    TodoService,
    HttpClientModule,
    DialogService,
  ],
})
export class TodoDialogComponent {
  todo: Todo | undefined;

  constructor(
    private todoService: TodoService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
  ) {}

  createTodo() {
    if (this.todo) this.todoService.createTodo(this.todo);
  }
}
