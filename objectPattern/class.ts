//classは型になる
abstract class Person {
  //static example インスタンスにしなくても使える
  static species = 'Homo sapiens';
  static isAdult(age: number) {
    if (age > 17) return true;
    return false;
  }
  // privete:クラス以外で参照できないようにする
  // readonly: 読むだけconstructor内なら書き換えできる
  // protected: 継承先のclassでも使える
  constructor(public readonly name: string, protected age: number) {}

  // ageをreadonlyにするとageはクラス内でも書き換え不可;
  incrementAge() {
    this.age += 1;
  }
  //関数にthisの値を教えてあげることによってthisが使われているかどうかを確認
  //Person型を与える　name:string...etc
  greeting(this: Person) {
    console.log(`Hello!! My name is ${this.name}. I am ${this.age} years old`);
    this.explainJob();
  }
  abstract explainJob(): void;
}

// const nozaki = new Person('Nozaki', 25);
// nozaki.incrementAge();
// priveteなので参照できない
// nozaki.age;
// nozaki.greeting();

// TypeScriptはthisを読み取れない。
//下の例ではエラーがでる。thisはPerson型を含んでいないので
// const anotherNozaki = {
//   name; "ryusou",
//   anotherGreeting: nozaki.greeting,
// };
// anotherNozaki.anotherGreeting();

// abstructクラスはインスタンスを形成できない
// new Person();

//継承
class Teacher extends Person {
  private static instance: Teacher;
  // abstructclassから継承
  explainJob() {
    console.log(`I am teacher and I teach ${this.subject}`);
  }
  //getter example
  get subject() {
    if (!this._subject) {
      throw new Error('there is no subject.');
    }
    return this._subject;
  }
  //setter example
  set subject(value) {
    if (!value) {
      throw new Error('there is no subject.');
    }
    this._subject = value;
  }

  //シングルトンパターンを作成1つだけインスタンスを作る
  private constructor(name: string, age: number, private _subject: string) {
    super(name, age);
  }

  static getInstance() {
    if (Teacher.instance) return Teacher.instance;
    Teacher.instance = new Teacher('Nozaki', 25, 'Social');
    return Teacher.instance;
  }

  // 冗長な表現
  // greeting() {
  //   console.log(
  //     `Hello!! My name is ${this.name}. I am ${this.age} years old I teach ${this.subject}`,
  //   );
  // }
}
// const teacher = new Teacher('Nozaki', 25, 'Math');
// teacher.subject = 'Music';
// console.log(teacher.subject);
// teacher.greeting();

//シングルトンパターンなので、外部参照不可
// const teacher = new Teacher('Nozaki', 25, 'Social');
// teacher.greeting();

const teacher = Teacher.getInstance();
teacher.greeting();
