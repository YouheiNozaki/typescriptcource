"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//classは型になる
var Person = /** @class */ (function () {
    // privete:クラス以外で参照できないようにする
    // readonly: 読むだけconstructor内なら書き換えできる
    // protected: 継承先のclassでも使える
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.isAdult = function (age) {
        if (age > 17)
            return true;
        return false;
    };
    // ageをreadonlyにするとageはクラス内でも書き換え不可;
    Person.prototype.incrementAge = function () {
        this.age += 1;
    };
    //関数にthisの値を教えてあげることによってthisが使われているかどうかを確認
    //Person型を与える　name:string...etc
    Person.prototype.greeting = function () {
        console.log("Hello!! My name is " + this.name + ". I am " + this.age + " years old");
        this.explainJob();
    };
    //static example インスタンスにしなくても使える
    Person.species = 'Homo sapiens';
    return Person;
}());
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
var Teacher = /** @class */ (function (_super) {
    __extends(Teacher, _super);
    //シングルトンパターンを作成1つだけインスタンスを作る
    function Teacher(name, age, _subject) {
        var _this = _super.call(this, name, age) || this;
        _this._subject = _subject;
        return _this;
    }
    // abstructclassから継承
    Teacher.prototype.explainJob = function () {
        console.log("I am teacher and I teach " + this.subject);
    };
    Object.defineProperty(Teacher.prototype, "subject", {
        //getter example
        get: function () {
            if (!this._subject) {
                throw new Error('there is no subject.');
            }
            return this._subject;
        },
        //setter example
        set: function (value) {
            if (!value) {
                throw new Error('there is no subject.');
            }
            this._subject = value;
        },
        enumerable: true,
        configurable: true
    });
    Teacher.getInstance = function () {
        return new Teacher('Nozaki', 25, 'Social');
    };
    return Teacher;
}(Person));
// const teacher = new Teacher('Nozaki', 25, 'Math');
// teacher.subject = 'Music';
// console.log(teacher.subject);
// teacher.greeting();
//シングルトンパターンなので、外部参照不可
// const teacher = new Teacher('Nozaki', 25, 'Social');
// teacher.greeting();
var teacher = Teacher.getInstance();
teacher.greeting();
