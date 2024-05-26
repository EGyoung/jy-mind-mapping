import { EventName } from "../../const";
import { BaseModule } from "../BaseModule";

class Selection extends BaseModule {
  static override readonly type = "Selection";
  private _selectedId: string | null = null;

  public get selectedId() {
    return this._selectedId;
  }

  private clearSelected = () => {
    this.setSelectedId(null);
  };

  public setSelectedId = (id: string | null) => {
    if (this._selectedId === id) return;
    this._selectedId = id;
    this.ctx.Event.emit(EventName.NODE_SELECTED, id);
  };

  private handleContainerClick = (e: Event) => {
    const target = e.target as HTMLElement;
    const node = target.closest("[data-node-id]");
    if (!node) return this.clearSelected();
    this.setSelectedId(node.getAttribute("data-node-id")!);
  };

  public override onLoaded = () => {
    this.ctx.container?.addEventListener("click", this.handleContainerClick);
  };

  public override destroy = () => {
    this.ctx.container?.removeEventListener("click", this.handleContainerClick);
  };
}

export { Selection };
