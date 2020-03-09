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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// DecoratorFactory
// 引数を取ることができる
function Logging(message) {
    // DecoratorFactoryは上から下に実行される
    console.log('Logging Factory');
    //Decoratorを返す関数
    return function (constructor) {
        console.log(message);
        console.log(constructor);
    };
}
function Component(template, selector) {
    console.log('Component Factory');
    // newは予約語
    // 値が追加されてもいいようにnewにスプレッド構文を使って型を指定する
    // Genericsで拡張：クラスが持っている値を型の情報に渡す
    return function (constructor) {
        // クラスのインスタンスに型を継承
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, args) || this;
                console.log('Component');
                // User classの値を取得する
                var mountedElement = document.querySelector(selector);
                var instance = new constructor();
                // stringの際にだけ処理
                if (mountedElement) {
                    mountedElement.innerHTML = template;
                    mountedElement.querySelector('h1').textContent = instance.name;
                }
                return _this;
            }
            return class_1;
        }(constructor));
    };
}
// target にはprototypeがはいる: 関数が持っているプロパティ
// 関数がコンストラクタとして働いた時にprototypeが使用される
// 関数＝オブジェクト
function PropertyLogging(target, propertyKey) {
    console.log('propertyLogging');
    // Userが持っているプロパティ
    console.log(target);
    console.log(propertyKey);
}
//メソッドは引数を3つとる
function MethodLogging(target, propertyKey, 
// オブジェクト　ObjectdefinePropertyでアクセスできる
descriptor) {
    console.log('MethodLogging');
    console.log(target);
    console.log(propertyKey);
    console.log(descriptor);
}
function enumerable(isEnumerable) {
    return function (_target, _propertyKey, _descriptor) {
        return {
            enumerable: isEnumerable,
        };
    };
}
function AccessorLogging(target, propertyKey, descriptor) {
    console.log('AccessorLogging');
    console.log(target);
    console.log(propertyKey);
    console.log(descriptor);
}
function ParameterLogging(target, propertyKey, parameterIndex) {
    console.log('ParameterLogging');
    console.log(target);
    console.log(propertyKey);
    console.log(parameterIndex);
}
// Decolatorはclassの生成時に実行されている
// 下から上の順番に実行される
var User = /** @class */ (function () {
    function User(_age) {
        this._age = _age;
        this.name = 'Quill';
        console.log('User was created!');
    }
    Object.defineProperty(User.prototype, "age", {
        get: function () {
            return this._age;
        },
        set: function (value) {
            this._age = value;
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.greeting = function (message) {
        console.log(message);
    };
    __decorate([
        PropertyLogging
    ], User.prototype, "name", void 0);
    __decorate([
        AccessorLogging
    ], User.prototype, "age", null);
    __decorate([
        enumerable(false),
        MethodLogging,
        __param(0, ParameterLogging)
    ], User.prototype, "greeting", null);
    User = __decorate([
        Logging('Logging User')
        // id がappの際に,h1にnameを埋め込む
        ,
        Component('<h1>{{ name }}</h1>', '#app')
    ], User);
    return User;
}());
var user1 = new User(32);
var user2 = new User(32);
var user3 = new User(32);
