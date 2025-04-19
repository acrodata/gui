import{k as B,l as E}from"./chunk-LTX44ZKZ.js";import{$a as p,Ea as r,Na as o,Oa as t,Pa as s,Pb as y,Qb as v,Ra as m,Rb as S,Sb as w,Tb as T,Ub as x,V as _,Za as n,ab as d,bb as c,db as M,qa as l}from"./chunk-XWB7QNTZ.js";import{a as f,b}from"./chunk-EQDQRRRY.js";var A=(()=>{let h=class h{constructor(){this.textConfig={content:{type:"text",name:"Content",default:"Hello world",description:"I am description",prefix:"\u{1F44B}",suffix:"\u{1F496}"}},this.numberConfig={opacity:{type:"number",name:"Opacity",default:.33,min:0,max:1,step:.01}},this.switchConfig={visible:{type:"switch",name:"Visible",default:!1}},this.sliderConfig={temperature:{type:"slider",name:"Temperature",mode:"normal",default:30,min:0,max:100,step:5,suffix:"\xB0C"}},this.isRangeSlider=!1,this.fillConfig={color:{type:"fill",name:"Color",default:"#ff0055"}},this.selectConfig={font:{type:"select",name:"Font",default:"arial",multiple:!1,useFont:!0,options:[{value:"arial",label:"Arial"},{value:"fantasy",label:"Fantasy"},{value:"monospace",label:"Monospace"}]}},this.isMultiSelect=!1,this.comboboxConfig={font:{type:"combobox",name:"Font",default:"arial",multiple:!1,useFont:!0,options:[{value:"arial",label:"Arial"},{value:"fantasy",label:"Fantasy"},{value:"monospace",label:"Monospace"}]}},this.isMultiCombobox=!1,this.buttonToggleConfig={textAlign:{type:"buttonToggle",name:"Align",default:"right",multiple:!1,options:[{value:"left",label:"Left"},{value:"center",label:"Center"},{value:"right",label:"Right"}]}},this.isMultiButtonToggle=!1,this.useIcon=0,this.buttonToggleConfig2={direction:{type:"buttonToggle",name:"Direction",default:"c",options:[{value:"nw",label:"NW",col:33.33},{value:"n",label:"N",col:33.33},{value:"ne",label:"NE",col:33.33},{value:"w",label:"W",col:33.33},{value:"c",label:"C",col:33.33},{value:"e",label:"E",col:33.33},{value:"sw",label:"SW",col:33.33},{value:"s",label:"S",col:33.33},{value:"se",label:"SE",col:33.33}]}},this.imageSelectConfig={background:{type:"imageSelect",name:"Background",default:"img1",options:[{label:"img1",value:"img1",src:"./images/icon3d1.webp"},{label:"img2",value:"img2",src:"./images/icon3d2.webp"},{label:"img3",value:"img3",src:"./images/icon3d3.webp"}]}},this.textareaConfig={foo:{type:"textarea",name:"Foo",default:"I am a textarea",rows:3}},this.hiddenConfig={id:{type:"hidden",name:"ID",default:1}}}toggleRangeSlider(){let{temperature:a}=this.sliderConfig;a.mode=this.isRangeSlider?"range":"normal",a.default=this.isRangeSlider?[20,60]:30,this.sliderConfig=f({},this.sliderConfig)}toggleMultiSelect(){let{font:a}=this.selectConfig;a.multiple=this.isMultiSelect,a.default=this.isMultiSelect?[]:"arial",this.selectConfig=f({},this.selectConfig)}toggleMultiCombobox(){let{font:a}=this.comboboxConfig;a.multiple=this.isMultiCombobox,a.default=this.isMultiCombobox?[]:"arial",this.comboboxConfig=f({},this.comboboxConfig)}toggleMultiButtonToggle(){let{textAlign:a}=this.buttonToggleConfig;a.multiple=this.isMultiButtonToggle,a.default=this.isMultiButtonToggle?[]:"right",this.buttonToggleConfig=f({},this.buttonToggleConfig)}toggleIconButtonToggle(){let{textAlign:a}=this.buttonToggleConfig;a.useIcon=this.useIcon>0,a.options=a.options?.map(u=>b(f({},u),{src:this.useIcon==1?"mdi mdi-format-align-"+u.value:this.useIcon==2?"./images/align_"+u.value+".png":void 0})),this.buttonToggleConfig=f({},this.buttonToggleConfig)}};h.\u0275fac=function(u){return new(u||h)},h.\u0275cmp=_({type:h,selectors:[["app-basic-controls"]],standalone:!0,features:[M],decls:76,vars:22,consts:[["pageTitle","Basic controls","pageContent","Used for binding primitive values (string, number or boolean)."],["id","text"],["href","basic-controls#text"],[3,"config"],["id","number"],["href","basic-controls#number"],["id","switch"],["href","basic-controls#switch"],["id","slider"],["href","basic-controls#slider"],["type","checkbox",3,"ngModelChange","ngModel"],["id","fill"],["href","basic-controls#fill"],["id","select"],["href","basic-controls#select"],["id","combobox"],["href","basic-controls#combobox"],["id","button_toggle"],["href","basic-controls#button_toggle"],["type","radio","name","icontype",3,"ngModelChange","value","ngModel"],["id","image_select"],["href","basic-controls#image_select"],["id","textarea"],["href","basic-controls#textarea"],["id","hidden"],["href","basic-controls#hidden"]],template:function(u,e){u&1&&(s(0,"app-page-header",0),o(1,"h2",1)(2,"a",2),n(3,"Text"),t()(),s(4,"app-example-viewer",3),o(5,"h2",4)(6,"a",5),n(7,"Number"),t()(),s(8,"app-example-viewer",3),o(9,"h2",6)(10,"a",7),n(11,"Switch"),t()(),s(12,"app-example-viewer",3),o(13,"h2",8)(14,"a",9),n(15,"Slider"),t()(),o(16,"div")(17,"label")(18,"input",10),c("ngModelChange",function(i){return d(e.isRangeSlider,i)||(e.isRangeSlider=i),i}),m("ngModelChange",function(){return e.toggleRangeSlider()}),t(),n(19," Range slider "),t()(),s(20,"app-example-viewer",3),o(21,"h2",11)(22,"a",12),n(23,"Fill"),t()(),s(24,"app-example-viewer",3),o(25,"h2",13)(26,"a",14),n(27,"Select"),t()(),o(28,"div")(29,"label")(30,"input",10),c("ngModelChange",function(i){return d(e.isMultiSelect,i)||(e.isMultiSelect=i),i}),m("ngModelChange",function(){return e.toggleMultiSelect()}),t(),n(31," Multiple choice "),t()(),s(32,"app-example-viewer",3),o(33,"h2",15)(34,"a",16),n(35,"Combobox"),t()(),o(36,"div")(37,"label")(38,"input",10),c("ngModelChange",function(i){return d(e.isMultiCombobox,i)||(e.isMultiCombobox=i),i}),m("ngModelChange",function(){return e.toggleMultiCombobox()}),t(),n(39," Multiple choice "),t()(),s(40,"app-example-viewer",3),o(41,"h2",17)(42,"a",18),n(43,"Button Toggle"),t()(),o(44,"div")(45,"label")(46,"input",10),c("ngModelChange",function(i){return d(e.isMultiButtonToggle,i)||(e.isMultiButtonToggle=i),i}),m("ngModelChange",function(){return e.toggleMultiButtonToggle()}),t(),n(47," Multiple choice "),t(),o(48,"label")(49,"input",19),c("ngModelChange",function(i){return d(e.useIcon,i)||(e.useIcon=i),i}),m("ngModelChange",function(){return e.toggleIconButtonToggle()}),t(),n(50," Text "),t(),o(51,"label")(52,"input",19),c("ngModelChange",function(i){return d(e.useIcon,i)||(e.useIcon=i),i}),m("ngModelChange",function(){return e.toggleIconButtonToggle()}),t(),n(53," Font icon"),t(),o(54,"label")(55,"input",19),c("ngModelChange",function(i){return d(e.useIcon,i)||(e.useIcon=i),i}),m("ngModelChange",function(){return e.toggleIconButtonToggle()}),t(),n(56," Image icon "),t()(),s(57,"app-example-viewer",3),o(58,"p"),n(59,"If you have lots of options, you can make a grid for options with the "),o(60,"code"),n(61,"col"),t(),n(62," attr."),t(),s(63,"app-example-viewer",3),o(64,"h2",20)(65,"a",21),n(66,"Image Select"),t()(),s(67,"app-example-viewer",3),o(68,"h2",22)(69,"a",23),n(70,"Textarea"),t()(),s(71,"app-example-viewer",3),o(72,"h2",24)(73,"a",25),n(74,"Hidden"),t()(),s(75,"app-example-viewer",3)),u&2&&(l(4),r("config",e.textConfig),l(4),r("config",e.numberConfig),l(4),r("config",e.switchConfig),l(6),p("ngModel",e.isRangeSlider),l(2),r("config",e.sliderConfig),l(4),r("config",e.fillConfig),l(6),p("ngModel",e.isMultiSelect),l(2),r("config",e.selectConfig),l(6),p("ngModel",e.isMultiCombobox),l(2),r("config",e.comboboxConfig),l(6),p("ngModel",e.isMultiButtonToggle),l(3),r("value",0),p("ngModel",e.useIcon),l(3),r("value",1),p("ngModel",e.useIcon),l(3),r("value",2),p("ngModel",e.useIcon),l(2),r("config",e.buttonToggleConfig),l(6),r("config",e.buttonToggleConfig2),l(4),r("config",e.imageSelectConfig),l(4),r("config",e.textareaConfig),l(4),r("config",e.hiddenConfig))},dependencies:[B,E,x,v,y,T,S,w]});let C=h;return C})();export{A as BasicControlsComponent};
