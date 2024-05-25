import { Event, Listeners } from "../modules";
import type { BaseModule } from "../modules/BaseModule";
import { NodeElement } from "../plugins";
import type { BasePlugin } from "../plugins/basePlugin";
import type { Node } from "../types/node";
class MindMappingCore {
  public Event!: Event;
  public Listeners!: Listeners;
  private plugins: BasePlugin[] = [];
  private _config: Node | null = null;

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
  constructor({ config }: { config?: Node }) {
    this._config = config || null;
    this.exportAPI();
    this.registerPlugins();
  }

  public setConfig = (config: Node) => {
    this._config = config;
    this.Event.emit("stateChange");
  };

  // todo 工具方法 抽离
  public flatNode = (node: Node) => {
    const result: any[] = [];
    const dfs = (node: Node) => {
      if (!node) return;
      result.push(node);
      if (node.children.length) {
        for (let currentNode of node.children) {
          dfs(currentNode);
        }
      }
    };
    dfs(node);
    return result;
  };

  public getRenderNodesAndModel = () => {
    if (!this._config) return null;
    const renderNodes: { render: <T>(props: T) => JSX.Element; model: Node }[] =
      [];
    const nodes = this.flatNode(this._config);
    if (this._config) {
      nodes.forEach((node) => {
        const plugin = this.getPlugin(node.type);
        if (plugin?.render) {
          renderNodes.push({
            render: plugin.render,
            model: node,
          });
        }
      });
    }

    return renderNodes;
  };

  private exportAPI = () => {
    this.loadModule(Event);
    this.loadModule(Listeners);
  };

  // 注册机制待完善
  private registerPlugins = () => {
    this.plugins = [new NodeElement({ ctx: this }) as any];
    this.plugins.forEach((plugin) => {
      plugin.init?.();
    });
  };

  public getPlugin = (pluginName: string) => {
    return this.plugins.find((plugin) => plugin.pluginName === pluginName);
  };

  public destroy = () => {
    this.Event.destroy();
    this.Listeners.destroy();
    this.plugins.forEach((plugin) => {
      plugin.destroy?.();
    });
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
