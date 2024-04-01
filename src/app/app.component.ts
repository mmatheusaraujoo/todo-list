import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterOutlet } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Observable } from "rxjs";

import { NotificationService } from "./services/notification.service";
import { TodoService } from "./services/todo.service";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";

import { ToastModule } from "primeng/toast";
import { BlockUIModule } from "primeng/blockui";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { AccordionModule } from "primeng/accordion";
import { BadgeModule } from "primeng/badge";
import { InputNumberModule } from "primeng/inputnumber";

import { Todo } from "./models/todo";
import { generateMokedTodo } from "./helpers/tests";
import { TodoDialogComponent } from "./components/todo-dialog/todo-dialog.component";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterOutlet,
    ToastModule,
    BlockUIModule,
    ProgressSpinnerModule,
    InputTextModule,
    ButtonModule,
    AccordionModule,
    BadgeModule,
    InputNumberModule,
    TodoDialogComponent,
  ],
  providers: [
    NotificationService,
    TodoService,
    HttpClientModule,
    DialogService,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  public title = "todo-list";
  public todoList$: Observable<Todo[]> | undefined = this.todoService.todo$;
  public loading$ = this.todoService.loading$;
  public inputText: string | undefined;
  public numberSelector: number = 1;

  public dialogRef: DynamicDialogRef | undefined;

  constructor(
    public todoService: TodoService,
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.todoService.refreshTodoList();
  }

  refreshList() {
    this.todoService.refreshTodoList();
  }

  changeState(todo: Todo) {
    todo.realizado = !todo.realizado;
    this.todoService.todoChangeState(todo);
  }

  createTodo() {
    this.dialogRef = this.dialogService.open(TodoDialogComponent, {
      width: "50vw",
      contentStyle: { overflow: "auto" },
      header: "Adicionar Tarefa",
      breakpoints: {
        "960px": "75vw",
        "640px": "90vw",
      },
    });

    this.dialogRef.onClose.subscribe(() => {
      this.refreshList();
    });
  }

  updateTodo(todo: Todo) {
    this.dialogRef = this.dialogService.open(TodoDialogComponent, {
      width: "50vw",
      contentStyle: { overflow: "auto" },
      header: "Editar Tarefa",
      breakpoints: {
        "960px": "75vw",
        "640px": "90vw",
      },
      data: todo,
    });

    this.dialogRef.onClose.subscribe(() => {
      this.refreshList();
    });
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }

  checkSeverity(priority: number) {
    if (priority >= 4) return "danger";
    if (priority >= 2) return "warning";
    return "info";
  }

  createMokedTodo() {
    this.todoService.createTodo(generateMokedTodo());
  }
}
