import{i as s,j as f,k as u,l as c}from"./chunk-N4JD7ZYK.js";import{Ca as a,Ma as e,Na as i,Oa as n,U as d,Ya as t,cb as m,oa as o}from"./chunk-KXJ44QWQ.js";import"./chunk-5XDRKBHK.js";import"./chunk-F5JPP5ZL.js";import"./chunk-EQDQRRRY.js";var x=(()=>{class r{constructor(){this.imageConfig={image:{type:"image",name:"Upload Image",default:"https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"}},this.videoConfig={video:{type:"video",name:"Upload Video",default:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"}},this.audioConfig={audio:{type:"audio",name:"Upload Audio",default:"https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"}},this.fileConfig={file:{type:"file",name:"Upload File",default:""}}}static{this.\u0275fac=function(l){return new(l||r)}}static{this.\u0275cmp=d({type:r,selectors:[["app-media-controls"]],standalone:!0,features:[m],decls:27,vars:4,consts:[["pageTitle","Media controls","pageContent","Used for uploading and displaying files."],["id","upload_settings"],["href","media-controls#upload_settings"],["highlight",`@Injectable()
export class YourUploadService {
  constructor(private http: HttpClient) {}

  upload(file: FormData) {
    return this.http
      .post('your_url', file, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map(res => {
          if (res instanceof HttpResponse && res.body) {
            return res.body.url;
          }
          return null;
        })
      );
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: GuiFileUploaderConfig,
      useClass: YourUploadService
    },
  ],
}`,"language","ts"],["id","image"],["href","media-controls#image"],[3,"config"],["id","video"],["href","media-controls#video"],["id","audio"],["href","media-controls#audio"],["id","file"],["href","media-controls#file"]],template:function(l,p){l&1&&(n(0,"app-page-header",0),e(1,"h2",1)(2,"a",2),t(3,"Upload Settings"),i()(),e(4,"p"),t(5," If you want to use the upload feature, you should replace the "),e(6,"code"),t(7,"GuiFileUploaderConfig"),i(),t(8,` with your own uploading logic. The returns of upload function must be a stream of file URL (or null).
`),i(),e(9,"pre"),n(10,"code",3),i(),e(11,"h2",4)(12,"a",5),t(13,"Image"),i()(),n(14,"app-example-viewer",6),e(15,"h2",7)(16,"a",8),t(17,"Video"),i()(),n(18,"app-example-viewer",6),e(19,"h2",9)(20,"a",10),t(21,"Audio"),i()(),n(22,"app-example-viewer",6),e(23,"h2",11)(24,"a",12),t(25,"File"),i()(),n(26,"app-example-viewer",6)),l&2&&(o(14),a("config",p.imageConfig),o(4),a("config",p.videoConfig),o(4),a("config",p.audioConfig),o(4),a("config",p.fileConfig))},dependencies:[u,c,f,s]})}}return r})();export{x as MediaControlsComponent};
