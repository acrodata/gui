"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[832],{4832:(s,i,n)=>{n.r(i),n.d(i,{GroupControlsComponent:()=>u});var p=n(6814),m=n(4678),r=n(5895),e=n(5879);let u=(()=>{class a{constructor(){this.groupConfig={size:{type:"group",name:"Size",children:{width:{name:"Width",type:"number",default:1920,suffix:"px"},height:{name:"Height",type:"number",default:1080,suffix:"px"}},expanded:!0}},this.inlineConfig={offset:{type:"inline",name:"Offset",children:{x:{name:"X",type:"number",default:0,col:50},y:{name:"Y",type:"number",default:0,col:50}}}},this.tabs1Config={series:{type:"tabs",name:"Series",description:"Dynamic add/delete",default:[{id:1,name:"bar"},{id:2,name:"foo"}],template:{name:"No.<%= i + 1 %>",children:{id:{type:"number",name:"ID"},name:{type:"text",name:"Name"}}},expanded:!0}},this.tabs2Config={misc:{type:"tabs",name:"Misc",mode:"list",children:[{type:"tab",name:"Full Name",children:{firstName:{type:"text",name:"First Name",default:"James"},lastName:{type:"text",name:"Last Name",default:"Bob"}}},{type:"tab",name:"Contact",children:{phone:{type:"number",name:"Phone",default:5550100}}}],expanded:!0}},this.menuConfig={options:{type:"menu",name:"Menu",children:{menuA:{type:"menuItem",name:"Menu A",children:{textarea:{type:"textarea",name:"Comments",default:"Hello world"}}},menuB:{type:"menu",name:"Menu B",children:{menuB1:{type:"menuItem",name:"Menu B1",children:{label:{type:"text",name:"Label",default:"Hello"}}},menuB2:{type:"menuItem",name:"Menu B2",children:{display:{type:"switch",name:"Display",default:!0}}}}}}}}}static#e=this.\u0275fac=function(o){return new(o||a)};static#n=this.\u0275cmp=e.Xpm({type:a,selectors:[["app-group-controls"]],standalone:!0,features:[e.jDz],decls:18,vars:6,consts:[[3,"title"],["id","group"],["href","group-controls#group"],[3,"config"],["id","inline_group"],["href","group-controls#inline_group"],["id","tabs"],["href","group-controls#tabs"],["id","menu"],["href","group-controls#menu"]],template:function(o,t){1&o&&(e._UZ(0,"app-page-header",0),e.TgZ(1,"h2",1)(2,"a",2),e._uU(3,"Group"),e.qZA()(),e._UZ(4,"app-example-viewer",3),e.TgZ(5,"h2",4)(6,"a",5),e._uU(7,"Inline Group"),e.qZA()(),e._UZ(8,"app-example-viewer",3),e.TgZ(9,"h2",6)(10,"a",7),e._uU(11,"Tabs"),e.qZA()(),e._UZ(12,"app-example-viewer",3)(13,"app-example-viewer",3),e.TgZ(14,"h2",8)(15,"a",9),e._uU(16,"Menu"),e.qZA()(),e._UZ(17,"app-example-viewer",3)),2&o&&(e.Q6J("title","Group controls"),e.xp6(4),e.Q6J("config",t.groupConfig),e.xp6(4),e.Q6J("config",t.inlineConfig),e.xp6(4),e.Q6J("config",t.tabs1Config),e.xp6(1),e.Q6J("config",t.tabs2Config),e.xp6(4),e.Q6J("config",t.menuConfig))},dependencies:[p.ez,m.Z,r.q]})}return a})()}}]);