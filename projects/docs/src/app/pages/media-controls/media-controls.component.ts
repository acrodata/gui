import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuiFields } from '@acrodata/gui';
import { HighlightModule } from 'ngx-highlightjs';
import { ExampleViewerComponent, PageHeaderComponent } from '../../shared';

@Component({
  selector: 'app-media-controls',
  standalone: true,
  imports: [CommonModule, ExampleViewerComponent, PageHeaderComponent, HighlightModule],
  templateUrl: './media-controls.component.html',
  styleUrl: './media-controls.component.scss',
})
export class MediaControlsComponent {
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
