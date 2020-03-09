//Generics
// Genericsのextendsは型を絞り込む
// keyof オブジェクトのkey一覧
function copy<T extends { name: string }, U extends keyof T>(
  value: T,
  key: U,
): T {
  value[key];
  return value;
}
// keyofでオブジェクトのname,ageにのみアクセスできる
console.log(copy({ name: 'Quill', age: 38 }, 'name'));

// Union型との違い　安全性が高い
// 型がstringに固定される
class LightDatabase<T extends string | number | boolean> {
  private data: T[] = [];
  add(item: T) {
    this.data.push(item);
  }
  remove(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }
  get() {
    return this.data;
  }
}
const stringLightDatabase = new LightDatabase();
stringLightDatabase.add('Apple');
stringLightDatabase.add('Banana');
stringLightDatabase.add('Grape');
stringLightDatabase.remove('Banana');
console.log(stringLightDatabase.get());
// Apple, Grape

//Utility型
interface Todo {
  title: string;
  text: string;
}
// Partial：オプショナルを返す
type Todoable = Partial<Todo>;
// Readonly：readonlyにして返す
type ReadTodo = Readonly<Todo>;

// Promise型はGenericsを返す
const fetchData: Promise<string> = new Promise(resolve => {
  setTimeout(() => {
    resolve('hello');
  }, 3000);
});
// dataはunknown型を返す。PromiseはGenericsを返すのでGenericsに型を設定できる
fetchData.then(data => {
  data.toUpperCase();
});
// ArrayはGenerics型を返す
const vegetables: Array<string> = ['Tomato', 'Broccoli', 'Asparagus'];
// デフォルトの型を設定できる
interface ResponseData<T extends { message: string } = any> {
  data: T;
  status: number;
}
let genericsTmp2: ResponseData;

// MapedType
interface Vegetables {
  readonly tomato: string;
  pumpkin?: string;
}
let genericsTmp3: keyof Vegetables;
type MappedTypes = {
  -readonly // -:設定されているreadonly,?をなくす
  // readonly, ?を設定するができる
  [P in keyof Vegetables]-?: string;
};
// 三項演算子みたいにできる
// tomatoがstringに入れられる場合number, それ以外boolean
type ConditionalTypes = 'tomato' extends string ? number : boolean;
// infer R = anyみたいなもの
// 推論することができる：例の場合、string型になる
type ConditionalTypesInfer = { tomato: string } extends { tomato: infer R }
  ? R
  : boolean;
// Union型として扱われるのでGenericsでかく
// NonNullable型などに使われている
type DistributiveConditionalTypes<T> = T extends 'tomato' ? number : boolean;
let genericsTmp4: DistributiveConditionalTypes<'tomato' | 'pumpkin'>;
