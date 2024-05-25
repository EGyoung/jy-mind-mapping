import type { TMindMappingCore } from "../../core";

abstract class BaseModule {
  static type: Readonly<string>;
  protected ctx: TMindMappingCore;
  constructor({ ctx }: { ctx: TMindMappingCore }) {
    this.ctx = ctx;
  }
  onLoaded?: (...args: any[]) => void;
}

export { BaseModule };
