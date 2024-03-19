import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Todo } from "../models/todo";
import { NotificationService } from "./notification.service";
import { Subject } from "rxjs";
import { environment } from "../../environments/environments";
import { LoadingManager } from "../helpers/loading-manager";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  private _todos$: Subject<Todo[]> = new Subject<Todo[]>();
  private _loading: LoadingManager = new LoadingManager();

  private url = `${environment.apiUrlBase}/todos`;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
  ) {}

  refreshTodoList() {
    this._loading.startLoading("refreshTodoList");
    this.http.get<Todo[]>(this.url).subscribe({
      next: (value) => {
        this._todos$.next(value);
        this._loading.stopLoading("refreshTodoList");
      },
      error: (e: HttpErrorResponse) => {
        this.notificationService.error(e.statusText, e.message);
        this._loading.stopLoading("refreshTodoList");
      },
    });
  }

  createTodo(todo: Todo) {
    this._loading.startLoading("createTodo");
    this.http.post(this.url, todo).subscribe({
      next: () => {
        this.notificationService.success(
          "Criar Atividade",
          "Atividade criada com sucesso!",
        );
        this.refreshTodoList();
        this._loading.stopLoading("createTodo");
      },
      error: (e: HttpErrorResponse) => {
        this.notificationService.error(e.statusText, e.message);
        this._loading.stopLoading("createTodo");
      },
    });
  }

  updateTodo(todo: Todo) {
    this._loading.startLoading("updateTodo");
    this.http.put(this.url, todo, { params: { id: todo.id } }).subscribe({
      next: () => {
        this.notificationService.success(
          "Alterar Atividade",
          "Atividade alterada com sucesso!",
        );
        this.refreshTodoList();
        this._loading.stopLoading("updateTodo");
      },
      error: (e: HttpErrorResponse) => {
        this.notificationService.error(e.statusText, e.message);
        this._loading.stopLoading("updateTodo");
      },
    });
  }

  deleteTodo(todo: Todo) {
    this._loading.startLoading("deleteTodo");
    this.http.delete(this.url, { params: { id: todo.id } }).subscribe({
      next: () => {
        this.notificationService.success(
          "Deletar atividade",
          "Atividade excluida com sucesso!",
        );
        this.refreshTodoList();
        this._loading.stopLoading("deleteTodo");
      },
      error: (e: HttpErrorResponse) => {
        this.notificationService.error(e.statusText, e.message);
        this._loading.stopLoading("deleteTodo");
      },
    });
  }

  get todo$() {
    return this._todos$.asObservable();
  }

  get loading$() {
    return this._loading.loading$;
  }
}
