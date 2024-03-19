import { BehaviorSubject, Observable } from "rxjs";

export class LoadingManager {
  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _activeLoadings: string[] = [];

  public startLoading(loadingDescription: string) {
    if (!this._activeLoadings.includes(loadingDescription)) {
      this._activeLoadings.push(loadingDescription);
      this.updateLoadingState();
    }
  }

  public stopLoading(loadingDescription: string) {
    const index = this._activeLoadings.indexOf(loadingDescription);
    if (index !== -1) {
      this._activeLoadings.splice(index, 1);
      this.updateLoadingState();
    }
  }

  private updateLoadingState() {
    this._loading$.next(this._activeLoadings.length > 0);
  }

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  get activesLoading(): string[] {
    return [...this._activeLoadings];
  }
}
