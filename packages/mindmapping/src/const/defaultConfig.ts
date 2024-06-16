const defaultConfig = {
  isRoot: true,
  width: 170,
  height: 60,
  text: "思维导图根节点",
  color: "#000",
  backgroundColor: "pink",
  id: "1",
  position: {
    x: 0,
    y: 0,
  },
  children: [
    {
      isRoot: false,
      width: 130,
      height: 40,
      text: "子节点",
      color: "#000",
      backgroundColor: "yellow",
      id: "0f3ed7e6-4204-461f-9500-da4127868495",
      position: {
        x: 200,
        y: -60,
      },
      children: [],
      type: "NodeElement",
    },
    {
      isRoot: false,
      width: 130,
      height: 40,
      text: "子节点",
      color: "#000",
      backgroundColor: "yellow",
      id: "3508f9d7-fe32-4b4f-83cf-118e62e3be82",
      position: {
        x: 200,
        y: 10,
      },
      children: [],
      type: "NodeElement",
    },
    {
      isRoot: false,
      width: 130,
      height: 40,
      text: "子节点",
      color: "#000",
      backgroundColor: "yellow",
      id: "2f7d106b-7ea7-45d2-b26f-46b796eec5d3",
      position: {
        x: 200,
        y: 80,
      },
      children: [],
      type: "NodeElement",
    },
  ],
  type: "NodeElement",
};

export { defaultConfig };
