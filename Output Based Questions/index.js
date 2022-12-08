// 1 what will be the output?

const obj = {
  name: "anil",
  printName: function () {
    console.log(this.name);
  },
};

obj.printName();
const func = obj.printName;
func();
