import{b as c,c as f,d as g,e as h}from"./chunk-CG2HFPQ7.js";import{Ca as n,La as e,Ma as i,Na as o,V as m,Xa as t,cb as s,db as u,na as l}from"./chunk-MGBPXXXS.js";import"./chunk-55KE2TB7.js";var y=()=>["ts"],U=(()=>{let a=class a{constructor(){this.imageConfig={image:{type:"image",name:"Upload Image",default:"https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"}},this.videoConfig={video:{type:"video",name:"Upload Video",default:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"}},this.audioConfig={audio:{type:"audio",name:"Upload Audio",default:"https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"}},this.fileConfig={file:{type:"file",name:"Upload File",default:""}}}};a.\u0275fac=function(r){return new(r||a)},a.\u0275cmp=m({type:a,selectors:[["app-media-controls"]],standalone:!0,features:[s],decls:27,vars:7,consts:[["subtitle","Used for uploading and displaying files.",3,"title"],["id","upload_settings"],["href","media-controls#upload_settings"],["highlight",`@Injectable()
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
}`,3,"languages"],["id","image"],["href","media-controls#image"],[3,"config"],["id","video"],["href","media-controls#video"],["id","audio"],["href","media-controls#audio"],["id","file"],["href","media-controls#file"]],template:function(r,p){r&1&&(o(0,"app-page-header",0),e(1,"h2",1)(2,"a",2),t(3,"Upload Settings"),i()(),e(4,"p"),t(5,"If you want to use the upload feature, you should replace the "),e(6,"code"),t(7,"GuiFileUploaderConfig"),i(),t(8," with your own uploading logic."),i(),e(9,"pre"),o(10,"code",3),i(),e(11,"h2",4)(12,"a",5),t(13,"Image"),i()(),o(14,"app-example-viewer",6),e(15,"h2",7)(16,"a",8),t(17,"Video"),i()(),o(18,"app-example-viewer",6),e(19,"h2",9)(20,"a",10),t(21,"Audio"),i()(),o(22,"app-example-viewer",6),e(23,"h2",11)(24,"a",12),t(25,"File"),i()(),o(26,"app-example-viewer",6)),r&2&&(n("title","Media controls"),l(10),n("languages",u(6,y)),l(4),n("config",p.imageConfig),l(4),n("config",p.videoConfig),l(4),n("config",p.audioConfig),l(4),n("config",p.fileConfig))},dependencies:[g,h,f,c]});let d=a;return d})();export{U as MediaControlsComponent};
