// DecoratorFactory
// 引数を取ることができる
function Logging(message: string) {
  // DecoratorFactoryは上から下に実行される
  console.log('Logging Factory');
  //Decoratorを返す関数
  return function(constructor: Function) {
    console.log(message);
    console.log(constructor);
  };
}
function Component(template: string, selector: string) {
  console.log('Component Factory');
  // newは予約語
  // 値が追加されてもいいようにnewにスプレッド構文を使って型を指定する
  // Genericsで拡張：クラスが持っている値を型の情報に渡す
  return function<T extends { new (...args: any[]): { name: string } }>(
    constructor: T,
  ) {
    // クラスのインスタンスに型を継承
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);
        console.log('Component');
        // User classの値を取得する
        const mountedElement = document.querySelector(selector);
        const instance = new constructor();
        // stringの際にだけ処理
        if (mountedElement) {
          mountedElement.innerHTML = template;
          mountedElement.querySelector('h1')!.textContent = instance.name;
        }
      }
    };
  };
}

// target にはprototypeがはいる: 関数が持っているプロパティ
// 関数がコンストラクタとして働いた時にprototypeが使用される
// 関数＝オブジェクト
function PropertyLogging(target: any, propertyKey: string) {
  console.log('propertyLogging');
  // Userが持っているプロパティ
  console.log(target);
  console.log(propertyKey);
}

//メソッドは引数を3つとる
function MethodLogging(
  target: any,
  propertyKey: string,
  // オブジェクト　ObjectdefinePropertyでアクセスできる
  descriptor: PropertyDescriptor,
) {
  console.log('MethodLogging');
  console.log(target);
  console.log(propertyKey);
  console.log(descriptor);
}
function enumerable(isEnumerable: boolean) {
  return function(
    _target: any,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    return {
      enumerable: isEnumerable,
    };
  };
}

function AccessorLogging(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  console.log('AccessorLogging');
  console.log(target);
  console.log(propertyKey);
  console.log(descriptor);
}

function ParameterLogging(
  target: any,
  propertyKey: string,
  parameterIndex: number,
) {
  console.log('ParameterLogging');
  console.log(target);
  console.log(propertyKey);
  console.log(parameterIndex);
}

// Decolatorはclassの生成時に実行されている
// 下から上の順番に実行される
@Logging('Logging User')
// id がappの際に,h1にnameを埋め込む
@Component('<h1>{{ name }}</h1>', '#app')
class User {
  @PropertyLogging
  name = 'Quill';
  constructor(private _age: number) {
    console.log('User was created!');
  }
  @AccessorLogging
  get age() {
    return this._age;
  }
  set age(value) {
    this._age = value;
  }
  @enumerable(false)
  @MethodLogging
  greeting(@ParameterLogging message: string) {
    console.log(message);
  }
}
const user1 = new User(32);
const user2 = new User(32);
const user3 = new User(32);
