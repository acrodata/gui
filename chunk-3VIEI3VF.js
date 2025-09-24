import{i as m,j as o,l as d}from"./chunk-LQP7WSSI.js";import{Oa as e,Pa as t,Qa as i,_a as n,ua as r}from"./chunk-7ISOVZI5.js";import"./chunk-3MLRKNYQ.js";import"./chunk-OBGRJE75.js";import"./chunk-EQDQRRRY.js";var f=(()=>{class a{static{this.\u0275fac=function(l){return new(l||a)}}static{this.\u0275cmp=r({type:a,selectors:[["app-getting-started"]],decls:92,vars:0,consts:[["pageTitle","Getting started","pageContent","Add Acrodata GUI to your project."],["id","installation"],["href","getting-started#installation"],["highlight","npm install @angular/material @ng-matero/extensions @acrodata/gui --save","language","bash"],["id","setup"],["href","getting-started#setup"],["href","https://material.angular.io/guide/theming","target","_blank"],["highlight",`@use '@angular/material' as mat;
@use '@acrodata/gui' as gui;

@include mat.core();

$theme: mat.define-theme(...);

@include gui.all-control-themes($theme);`,"language","scss"],["highlight",`+ @include mat.all-component-themes($theme);
+ @include mtx.all-component-themes($theme);
- @include gui.all-control-themes($theme);`,"language","diff"],["id","usage"],["href","getting-started#usage"],["highlight",`import { Component } from '@angular/core';
import { GuiModule, GuiFields } from '@acrodata/gui';

@Component({
  selector: 'your-app',
  template: \`<gui-form [config]="config" [model]="model" [form]="form" />\`,
  standalone: true,
  imports: [GuiModule],
})
export class YourAppComponent {
  config: GuiFields = {
    title: {
      type: 'text',
      name: 'Title',
      default: 'I am title',
    },
  };
  model = {};
  form = new FormGroup({});
}`,"language","ts"],["id","properties"],["href","getting-started#properties"],["id","properties_inputs"],["href","getting-started#properties_inputs"],["id","properties_outputs"],["href","getting-started#properties_outputs"]],template:function(l,p){l&1&&(i(0,"app-page-header",0),e(1,"h2",1)(2,"a",2),n(3,"Installation"),t()(),e(4,"pre"),i(5,"code",3),t(),e(6,"h2",4)(7,"a",5),n(8,"Setup"),t()(),e(9,"p"),n(10,"Define a theme with Angular Material's theming system. "),e(11,"a",6),n(12,"More about theming."),t()(),e(13,"pre"),i(14,"code",7),t(),e(15,"p"),n(16,"\u{1F6A8} If you use the Angular Material as default library and have included all component themes, there's no need to include the GUI themes anymore."),t(),e(17,"pre"),i(18,"code",8),t(),e(19,"h2",9)(20,"a",10),n(21,"Usage"),t()(),e(22,"pre"),i(23,"code",11),t(),e(24,"h2",12)(25,"a",13),n(26,"Properties"),t()(),e(27,"h3",14)(28,"a",15),n(29,"Inputs"),t()(),e(30,"table")(31,"thead")(32,"tr")(33,"th"),n(34,"Name"),t(),e(35,"th"),n(36,"Type"),t(),e(37,"th"),n(38,"Required"),t(),e(39,"th"),n(40,"Description"),t()()(),e(41,"tbody")(42,"tr")(43,"td")(44,"code"),n(45,"config"),t()(),e(46,"td")(47,"code"),n(48,"GuiFields"),t()(),e(49,"td"),n(50,"yes"),t(),e(51,"td"),n(52,"The field configurations for building the form."),t()(),e(53,"tr")(54,"td")(55,"code"),n(56,"model"),t()(),e(57,"td")(58,"code"),n(59,"any"),t()(),e(60,"td"),n(61,"no"),t(),e(62,"td"),n(63,"The model to be represented by the form."),t()(),e(64,"tr")(65,"td")(66,"code"),n(67,"form"),t()(),e(68,"td")(69,"code"),n(70,"FormGroup"),t()(),e(71,"td"),n(72,"no"),t(),e(73,"td"),n(74,"The form instance which allow to track model value and validation status."),t()()()(),e(75,"h3",16)(76,"a",17),n(77,"Outputs"),t()(),e(78,"table")(79,"thead")(80,"tr")(81,"th"),n(82,"Name"),t(),e(83,"th"),n(84,"Description"),t()()(),e(85,"tbody")(86,"tr")(87,"td")(88,"code"),n(89,"modelChange"),t()(),e(90,"td"),n(91,"Fired on model value change."),t()()()())},dependencies:[o,m,d],encapsulation:2})}}return a})();export{f as GettingStartedComponent};
