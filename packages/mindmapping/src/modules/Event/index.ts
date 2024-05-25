import { BaseModule } from "../BaseModule";

type Handler = (...args: any[]) => any;

class Event extends BaseModule {
  static override readonly type = "Event";
  private _all: Map<string, Handler[]> = new Map();

  on(type: string, handler: Handler): void {
    const handlers = this._all.get(type);
    const added = handlers && handlers.push(handler);
    if (!added) {
      this._all.set(type, [handler]);
    }
  }
  off(type: string, handler: Handler): void {
    const handlers = this._all.get(type);
    if (handlers) {
      handlers.splice(handlers.indexOf(handler) >>> 0, 1);
    }
  }
  emit(type: string, ...params: any[]): void {
    const handlers = this._all.get(type);
    if (handlers) {
      for (const handler of handlers) {
        handler(...params);
      }
    }
  }
  override destroy = () => {
    this._all.clear();
  };
}

export { Event };
