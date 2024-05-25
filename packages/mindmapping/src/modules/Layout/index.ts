import { BaseModule } from "../BaseModule";

class Layout extends BaseModule {
  static override readonly type = "Layout";

  getContainerLayout = () => {
    const data = this.ctx.getRenderNodesAndModel();
    if (!data) return { width: 0, height: 0 };
    let left = 0;
    let right = 0;
    let top = 0;
    let bottom = 0;
    data.forEach((item) => {
      const { model } = item;
      if (model.position.x < left) {
        left = model.position.x;
      }
      if (model.position.x + model.width > right) {
        right = model.position.x + model.width;
      }
      if (model.position.y < top) {
        top = model.position.y;
      }
      if (model.position.y + model.height > bottom) {
        bottom = model.position.y + model.height;
      }
    });
    return {
      width: right - left,
      height: bottom - top,
    };
  };
}

export { Layout };
