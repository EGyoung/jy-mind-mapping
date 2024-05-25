import { Event, Listeners } from "../modules";
import type { BaseModule } from "../modules/BaseModule";
class MindMappingCore {
  public Event!: Event;
  public Listeners!: Listeners;
  private loadModule = (module: typeof BaseModule) => {
    try {
      // @ts-ignore
      this[module.type] = new module({ ctx: this });
      const currentModule = (this as any)[module.type] as BaseModule;
      currentModule.onLoaded?.();
    } catch (e) {
      console.error(`Module ${module.type} failed to load`, e);
    }
  };
  constructor() {
    this.exportAPI();
  }
  private exportAPI = () => {
    this.loadModule(Event);
    this.loadModule(Listeners);
  };

  public destroy = () => {
    this.Event.destroy();
    this.Listeners.destroy();
  };
}

const initMindMapping = (
  ...params: ConstructorParameters<typeof MindMappingCore>
) => {
  return new MindMappingCore(...params);
};
export { MindMappingCore, initMindMapping };

type TMindMappingCore = InstanceType<typeof MindMappingCore>;
export type { TMindMappingCore };
