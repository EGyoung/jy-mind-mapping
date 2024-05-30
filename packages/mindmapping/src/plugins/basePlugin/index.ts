import type { TMindMappingCore } from "../../core";

abstract class BasePlugin<T = any> {
  pluginType?: string;
  pluginName?: string;
  protected ctx: TMindMappingCore;
  constructor({ ctx }: { ctx: TMindMappingCore }) {
    this.ctx = ctx;
  }
  init?: () => void;
  destroy?: () => void;
  render?: (props: T) => JSX.Element;
}

export { BasePlugin };
