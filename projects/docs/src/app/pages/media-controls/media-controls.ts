import { GuiFields } from '@acrodata/gui';
import { Component } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';
import { ExampleViewer, PageHeader } from '../../shared';

@Component({
  selector: 'app-media-controls',
  imports: [ExampleViewer, PageHeader, HighlightModule],
  templateUrl: './media-controls.html',
  styleUrl: './media-controls.scss',
})
export class MediaControls {
  imageConfig: GuiFields = {
    image: {
      type: 'image',
      name: 'Upload Image',
      default:
        'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
    },
  };

  videoConfig: GuiFields = {
    video: {
      type: 'video',
      name: 'Upload Video',
      default: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
  };

  audioConfig: GuiFields = {
    audio: {
      type: 'audio',
      name: 'Upload Audio',
      default: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
    },
  };

  fileConfig: GuiFields = {
    file: {
      type: 'file',
      name: 'Upload File',
      default: '',
    },
  };
}
