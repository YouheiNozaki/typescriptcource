// 関数の型を定義できるが、typeで定義するのがベター
interface addFunc {
  (num1: number, num2: number): number;
}
let addFunc: addFunc;
addFunc = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Nameable {
  name?: string;
  // ?をつけるとなくても良いプロパティとなる
  nickName?: string;
}
const nameable: Nameable = {
  name: 'Nozaki',
};

// interfaceはオブジェクトのみを扱う。
// オブジェクトだということを明示的にする
// extendsでinterfaceを継承
interface Human extends Nameable {
  // radonlyをつけられる
  // readonly name: string;
  age: number;
  greeting(message: string): void;
}

// basic
// const human = {
//   name: 'Nozaki',
//   age: 25,
//   greeting(message: string) {
//     console.log(message);
//   },
// };

// interfaceをclassに継承
class Developer implements Human {
  name?: string;
  constructor(
    public age: number,
    public experience: number,
    initName?: string,
  ) {
    if (initName) {
      this.name = initName;
    }
  }
  greeting(message?: string) {
    if (message) {
      message.toUpperCase();
    }
    console.log(message);
  }
}

// 構造的部分型
const tmpDeveloper = {
  name: 'Nozaki',
  age: 38,
  experience: 3,
  greeting(message: string) {
    console.log(message);
  },
};
const user: Human = tmpDeveloper;
// readonlyにはアクセスできない
// user.name = 'gadfa';
