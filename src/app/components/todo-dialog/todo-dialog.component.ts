import { Component, OnDestroy, OnInit } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { NotificationService } from "../../services/notification.service";
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from "primeng/dynamicdialog";
import { TodoService } from "../../services/todo.service";

import { Todo } from "../../models/todo";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { CommonModule } from "@angular/common";
import { InputNumberModule } from "primeng/inputnumber";

@Component({
  selector: "app-todo-dialog",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    InputNumberModule,
  ],
  templateUrl: "./todo-dialog.component.html",
  styleUrl: "./todo-dialog.component.scss",
  providers: [
    NotificationService,
    TodoService,
    HttpClientModule,
    DialogService,
  ],
})
export class TodoDialogComponent implements OnInit, OnDestroy {
  todo: Todo | undefined;
  id: number | undefined;
  name: string | undefined;
  description: string | undefined;
  priority: number = 0;

  constructor(
    private todoService: TodoService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.todo = this.config.data;
    if (this.todo) {
      this.id = this.todo.id;
      this.name = this.todo.nome;
      this.description = this.todo.descricao;
      this.priority = this.todo.prioridade;
    }
  }

  ngOnDestroy(): void {
    this.clearTodo();
  }

  createTodo() {
    if (this.name) {
      const newTodo = {
        nome: this.name,
        descricao: this.description,
        prioridade: this.priority,
      } as Partial<Todo>;
      this.todoService.createTodo(newTodo);
      this.ref.close();
    } else {
      this.notificationService.error(
        "Campo Inválido",
        'O campo "nome" é obrigatório',
      );
    }
  }

  updateTodo() {
    if (this.todo) {
      this.todo.nome = this.name || "";
      this.todo.descricao = this.description || "";
      this.todo.prioridade = this.priority || 1;
      this.todoService.updateTodo(this.todo);
      this.ref.close();
    }
  }

  clearTodo() {
    this.todo = undefined;
  }
}
