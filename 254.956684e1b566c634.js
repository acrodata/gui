"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[254],{5254:(f,r,o)=>{o.r(r),o.d(r,{BasicControlsComponent:()=>_});var d=o(6814),s=o(6223),c=o(2599),p=o(4678),m=o(5895),u=o(9488),e=o(5879);let _=(()=>{class g{constructor(){this.textConfig={content:{type:"text",name:"Content",default:"Hello world",description:"I am description",prefix:"\u{1f44b}",suffix:"\u{1f496}"}},this.numberConfig={opacity:{type:"number",name:"Opacity",default:.33,min:0,max:1,step:.01}},this.switchConfig={visible:{type:"switch",name:"Visible",default:!1}},this.sliderConfig={temperature:{type:"slider",name:"Temperature",mode:"normal",default:30,min:0,max:100,step:5,suffix:"\xb0C"}},this.isRangeSlider=!1,this.fillConfig={color:{type:"fill",name:"Color",default:"#ff0055"}},this.selectConfig={font:{type:"select",name:"Font",default:"arial",multiple:!1,useFont:!0,options:[{value:"arial",label:"Arial"},{value:"fantasy",label:"Fantasy"},{value:"monospace",label:"Monospace"}]}},this.isMultiSelect=!1,this.buttonToggleConfig={textAlign:{type:"buttonToggle",name:"Align",default:"right",multiple:!1,options:[{value:"left",label:"Left"},{value:"center",label:"Center"},{value:"right",label:"Right"}]}},this.isMultiButtonToggle=!1,this.useIcon=0,this.buttonToggleConfig2={direction:{type:"buttonToggle",name:"Direction",default:"c",options:[{value:"nw",label:"NW",col:33.33},{value:"n",label:"N",col:33.33},{value:"ne",label:"NE",col:33.33},{value:"w",label:"W",col:33.33},{value:"c",label:"C",col:33.33},{value:"e",label:"E",col:33.33},{value:"sw",label:"SW",col:33.33},{value:"s",label:"S",col:33.33},{value:"se",label:"SE",col:33.33}]}},this.imageSelectConfig={background:{type:"imageSelect",name:"Background",default:"img1",options:[{label:"img1",value:"img1",src:"./assets/images/icon3d1.webp"},{label:"img2",value:"img2",src:"./assets/images/icon3d2.webp"},{label:"img3",value:"img3",src:"./assets/images/icon3d3.webp"}]}},this.textareaConfig={foo:{type:"textarea",name:"Foo",default:"I am a textarea",rows:3}},this.hiddenConfig={id:{type:"hidden",name:"ID",default:1}}}toggleRangeSlider(){const{temperature:l}=this.sliderConfig;l.mode=this.isRangeSlider?"range":"normal",l.default=this.isRangeSlider?[20,60]:30,this.sliderConfig={...this.sliderConfig}}toggleMultiSelect(){const{font:l}=this.selectConfig;l.multiple=this.isMultiSelect,l.default=this.isMultiSelect?[]:"arial",this.selectConfig={...this.selectConfig}}toggleMultiButtonToggle(){const{textAlign:l}=this.buttonToggleConfig;l.multiple=this.isMultiButtonToggle,l.default=this.isMultiButtonToggle?[]:"right",this.buttonToggleConfig={...this.buttonToggleConfig}}toggleIconButtonToggle(){const{textAlign:l}=this.buttonToggleConfig;l.useIcon=this.useIcon>0,l.options=l.options?.map(n=>({...n,src:1==this.useIcon?"mdi mdi-format-align-"+n.value:2==this.useIcon?"./assets/images/align_"+n.value+".png":void 0})),this.buttonToggleConfig={...this.buttonToggleConfig}}static#e=this.\u0275fac=function(n){return new(n||g)};static#t=this.\u0275cmp=e.Xpm({type:g,selectors:[["app-basic-controls"]],standalone:!0,features:[e.jDz],decls:58,vars:19,consts:[["subtitle","Used for binding primitive values (string, number or boolean).",3,"title"],["id","text"],["href","basic-controls#text"],[3,"config"],["id","number"],["href","basic-controls#number"],["id","switch"],["href","basic-controls#switch"],["id","slider"],["href","basic-controls#slider"],[3,"ngModel","ngModelChange"],["id","fill"],["href","basic-controls#fill"],["id","select"],["href","basic-controls#select"],["id","button_toggle"],["href","basic-controls#button_toggle"],[3,"value"],["id","image_select"],["href","basic-controls#image_select"],["id","textarea"],["href","basic-controls#textarea"],["id","hidden"],["href","basic-controls#hidden"]],template:function(n,t){1&n&&(e._UZ(0,"app-page-header",0),e.TgZ(1,"h2",1)(2,"a",2),e._uU(3,"Text"),e.qZA()(),e._UZ(4,"app-example-viewer",3),e.TgZ(5,"h2",4)(6,"a",5),e._uU(7,"Number"),e.qZA()(),e._UZ(8,"app-example-viewer",3),e.TgZ(9,"h2",6)(10,"a",7),e._uU(11,"Switch"),e.qZA()(),e._UZ(12,"app-example-viewer",3),e.TgZ(13,"h2",8)(14,"a",9),e._uU(15,"Slider"),e.qZA()(),e.TgZ(16,"div")(17,"mat-slide-toggle",10),e.NdJ("ngModelChange",function(a){return t.isRangeSlider=a})("ngModelChange",function(){return t.toggleRangeSlider()}),e._uU(18,"Range slider"),e.qZA()(),e._UZ(19,"app-example-viewer",3),e.TgZ(20,"h2",11)(21,"a",12),e._uU(22,"Fill"),e.qZA()(),e._UZ(23,"app-example-viewer",3),e.TgZ(24,"h2",13)(25,"a",14),e._uU(26,"Select"),e.qZA()(),e.TgZ(27,"div")(28,"mat-slide-toggle",10),e.NdJ("ngModelChange",function(a){return t.isMultiSelect=a})("ngModelChange",function(){return t.toggleMultiSelect()}),e._uU(29,"Multiple choice"),e.qZA()(),e._UZ(30,"app-example-viewer",3),e.TgZ(31,"h2",15)(32,"a",16),e._uU(33,"Button Toggle"),e.qZA()(),e.TgZ(34,"div")(35,"mat-slide-toggle",10),e.NdJ("ngModelChange",function(a){return t.isMultiButtonToggle=a})("ngModelChange",function(){return t.toggleMultiButtonToggle()}),e._uU(36,"Multiple choice"),e.qZA(),e.TgZ(37,"mat-button-toggle-group",10),e.NdJ("ngModelChange",function(a){return t.useIcon=a})("ngModelChange",function(){return t.toggleIconButtonToggle()}),e.TgZ(38,"mat-button-toggle",17),e._uU(39,"Text"),e.qZA(),e.TgZ(40,"mat-button-toggle",17),e._uU(41,"Font icon"),e.qZA(),e.TgZ(42,"mat-button-toggle",17),e._uU(43,"Image icon"),e.qZA()()(),e._UZ(44,"app-example-viewer",3)(45,"app-example-viewer",3),e.TgZ(46,"h2",18)(47,"a",19),e._uU(48,"Image Select"),e.qZA()(),e._UZ(49,"app-example-viewer",3),e.TgZ(50,"h2",20)(51,"a",21),e._uU(52,"Textarea"),e.qZA()(),e._UZ(53,"app-example-viewer",3),e.TgZ(54,"h2",22)(55,"a",23),e._uU(56,"Hidden"),e.qZA()(),e._UZ(57,"app-example-viewer",3)),2&n&&(e.Q6J("title","Basic controls"),e.xp6(4),e.Q6J("config",t.textConfig),e.xp6(4),e.Q6J("config",t.numberConfig),e.xp6(4),e.Q6J("config",t.switchConfig),e.xp6(5),e.Q6J("ngModel",t.isRangeSlider),e.xp6(2),e.Q6J("config",t.sliderConfig),e.xp6(4),e.Q6J("config",t.fillConfig),e.xp6(5),e.Q6J("ngModel",t.isMultiSelect),e.xp6(2),e.Q6J("config",t.selectConfig),e.xp6(5),e.Q6J("ngModel",t.isMultiButtonToggle),e.xp6(2),e.Q6J("ngModel",t.useIcon),e.xp6(1),e.Q6J("value",0),e.xp6(2),e.Q6J("value",1),e.xp6(2),e.Q6J("value",2),e.xp6(2),e.Q6J("config",t.buttonToggleConfig),e.xp6(1),e.Q6J("config",t.buttonToggleConfig2),e.xp6(4),e.Q6J("config",t.imageSelectConfig),e.xp6(4),e.Q6J("config",t.textareaConfig),e.xp6(4),e.Q6J("config",t.hiddenConfig))},dependencies:[d.ez,p.Z,m.q,c.rP,c.Rr,u.vV,u.A9,u.Yi,s.u5,s.JJ,s.On],styles:["mat-button-toggle-group[_ngcontent-%COMP%]{margin:0 16px;vertical-align:middle;font-size:14px}"]})}return g})()}}]);