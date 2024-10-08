import { EventName, PluginType } from "../const";
import { Event, Layout, Listeners, Model, Selection } from "../modules";
import type { BaseModule } from "../modules/BaseModule";
import { AddNodeWrapper, NodeElement } from "../plugins";
import type { BasePlugin } from "../plugins/basePlugin";
import { LinePlugin } from "../plugins/widgets";
import type { Node } from "../types/node";
import { v4 as uuid } from "uuid";

class MindMappingCore {
  private _id: string = uuid();
  public Event!: Event;
  public Listeners!: Listeners;
  public Layout!: Layout;
  public Model!: Model;
  public Selection!: Selection;
  private plugins: BasePlugin[] = [];
  private _config: Node | null = null;
  private onLoadLists: (() => void)[] = [];

  get id() {
    return this._id;
  }

  get container() {
    return document.querySelector(`[data-id="${this._id}"]`) as HTMLElement;
  }

  private loadModule = (module: typeof BaseModule) => {
    try {
      // @ts-ignore
      this[module.type] = new module({ ctx: this });
      const currentModule = (this as any)[module.type] as BaseModule;
      this.onLoadLists.push(currentModule.onLoaded ?? (() => {}));
    } catch (e) {
      console.error(`Module ${module.type} failed to load`, e);
    }
  };
  constructor({ config }: { config?: Node }) {
    this._config = config || null;
    this.exportAPI();
    this.registerPlugins();
  }

  public onLoaded = () => {
    this.onLoadLists.forEach((fn) => fn());
  };

  public setConfig = (config: Node) => {
    this._config = config;
    this.Event.emit(EventName.MODEL_CHANGE);
  };

  // todo 工具方法 抽离
  public flatNode = (node: Node) => {
    const result: Node[] = [];
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

  public getParentNode = (nodeId: string): Node | null => {
    // Helper function to perform recursive search
    function search(node: Node | null, parent: Node | null): Node | null {
      if (!node) {
        return null;
      }
      // If the current node's ID matches the target ID, return the parent
      if (node.id === nodeId) {
        return parent;
      }
      // Recursively search in the children
      for (const child of node.children) {
        const result = search(child, node);
        if (result !== null) {
          return result;
        }
      }
      // If not found, return null
      return null;
    }

    // Start the search from the root node
    return search(this._config, null);
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

  public getDecoratorRenders = () => {
    const getDecoratorRendersArray = this.plugins
      .map((plugin) => {
        if (plugin.pluginType === PluginType.Decorator) {
          return plugin.render;
        }
        return null;
      })
      .filter(Boolean);
    console.log(getDecoratorRendersArray);
    const Decorator = getDecoratorRendersArray[0] as any;
    // todo多个时的渲染
    return Decorator;
  };

  public getWidgetRenders = () => {
    const getWidgetRendersArray = this.plugins
      .map((plugin) => {
        if (plugin.pluginType === PluginType.Widget) {
          return plugin.render;
        }
        return null;
      })
      .filter(Boolean);
    const Widget = getWidgetRendersArray?.[0] as any;
    // todo多个时的渲染
    return Widget ?? null;
  };

  private exportAPI = () => {
    this.loadModule(Event);
    this.loadModule(Listeners);
    this.loadModule(Layout);
    this.loadModule(Model);
    this.loadModule(Selection);
  };

  // 注册机制待完善
  private registerPlugins = () => {
    this.plugins = [
      new NodeElement({ ctx: this }) as any,
      new AddNodeWrapper({ ctx: this }),
      // new LinePlugin({ ctx: this }),
    ];
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
    this.Model.destroy?.();
    this.Selection.destroy?.();
    this.plugins.forEach((plugin) => {
      plugin.destroy?.();
    });
  };

  public createRootNode = () => {
    const config = this.Model.createRootModel();
    this.setConfig(config);
  };

  public createNode = (selectModelId: string, direction: string) => {
    const originConfig = this._config;
    if (originConfig) {
      console.log("createNode");
      const model = this.flatNode(originConfig).find(
        (node) => node.id === selectModelId
      );
      const originModel = this.Model.createNormalNodeModel();
      if (model?.children) {
        model.children.push(originModel);
        this.setConfig(originConfig);
        this.Model.calculateNodePosition(model);
      }
    }
  };

  public getConfig = () => {
    return this._config;
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
