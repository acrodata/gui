import{b as f,c as u,d as c,e as g}from"./chunk-KWDDHJ5H.js";import{Fa as a,Oa as e,Pa as i,Qa as n,V as m,_a as t,fb as s,oa as l}from"./chunk-YYPOBED5.js";import"./chunk-CWTPBX7D.js";var S=(()=>{let o=class o{constructor(){this.imageConfig={image:{type:"image",name:"Upload Image",default:"https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"}},this.videoConfig={video:{type:"video",name:"Upload Video",default:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"}},this.audioConfig={audio:{type:"audio",name:"Upload Audio",default:"https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"}},this.fileConfig={file:{type:"file",name:"Upload File",default:""}}}};o.\u0275fac=function(r){return new(r||o)},o.\u0275cmp=m({type:o,selectors:[["app-media-controls"]],standalone:!0,features:[s],decls:27,vars:5,consts:[["subtitle","Used for uploading and displaying files.",3,"title"],["id","upload_settings"],["href","media-controls#upload_settings"],["highlight",`@Injectable()
export class YourUploadService {
  constructor(private http: HttpClient) {}

  upload(file: FormData) {
    return this.http.post<any>('your_url', file, {
      reportProgress: true,
      observe: 'events',
    });
  }
}

@Component({
  ...
  imports: [GuiModule],
  providers: [
    {
      provide: GuiFileUploaderConfig,
      useClass: YourUploadService
    },
  ],
})
export class YourComponent {
}`,"language","ts"],["id","image"],["href","media-controls#image"],[3,"config"],["id","video"],["href","media-controls#video"],["id","audio"],["href","media-controls#audio"],["id","file"],["href","media-controls#file"]],template:function(r,d){r&1&&(n(0,"app-page-header",0),e(1,"h2",1)(2,"a",2),t(3,"Upload Settings"),i()(),e(4,"p"),t(5,"If you want to use the upload feature, you should replace the "),e(6,"code"),t(7,"GuiFileUploaderConfig"),i(),t(8," with your own uploading logic."),i(),e(9,"pre"),n(10,"code",3),i(),e(11,"h2",4)(12,"a",5),t(13,"Image"),i()(),n(14,"app-example-viewer",6),e(15,"h2",7)(16,"a",8),t(17,"Video"),i()(),n(18,"app-example-viewer",6),e(19,"h2",9)(20,"a",10),t(21,"Audio"),i()(),n(22,"app-example-viewer",6),e(23,"h2",11)(24,"a",12),t(25,"File"),i()(),n(26,"app-example-viewer",6)),r&2&&(a("title","Media controls"),l(14),a("config",d.imageConfig),l(4),a("config",d.videoConfig),l(4),a("config",d.audioConfig),l(4),a("config",d.fileConfig))},dependencies:[c,g,u,f]});let p=o;return p})();export{S as MediaControlsComponent};
