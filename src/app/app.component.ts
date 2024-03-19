import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterOutlet } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Observable } from "rxjs";

import { NotificationService } from "./services/notification.service";
import { TodoService } from "./services/todo.service";

import { ToastModule } from "primeng/toast";
import { BlockUIModule } from "primeng/blockui";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { AccordionModule } from 'primeng/accordion';
import { BadgeModule } from 'primeng/badge';

import { Todo } from "./models/todo";
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
    BadgeModule
  ],
  providers: [NotificationService, TodoService, HttpClientModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  public title = "todo-list";
  public todoList$: Observable<Todo[]> | undefined = this.todoService.todo$;
  public loading$ = this.todoService.loading$;
  public inputText: string | undefined;

  constructor(public todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.refreshTodoList();
  }

  refreshList() {
    this.todoService.refreshTodoList();
  }

  changeState(todo:Todo){
    todo.realizado = !todo.realizado;
    this.todoService.todoChangeState(todo);
  }

  deleteTodo(todo:Todo){
    this.todoService.deleteTodo(todo);
  }
}
