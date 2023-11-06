import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleViewerComponent } from '../../shared';

@Component({
  selector: 'app-media-controls',
  standalone: true,
  imports: [CommonModule, ExampleViewerComponent],
  templateUrl: './media-controls.component.html',
  styleUrls: ['./media-controls.component.scss'],
})
export class MediaControlsComponent {
  imageConfig = {
    image: {
      type: 'image',
      name: 'Upload Image',
      default:
        'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
    },
  };

  videoConfig = {
    video: {
      type: 'video',
      name: 'Upload Video',
      default: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
  };

  audioConfig = {
    audio: {
      type: 'audio',
      name: 'Upload Audio',
      default: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
    },
  };

  fileConfig = {
    file: {
      type: 'file',
      name: 'Upload File',
      default: '',
    },
  };
}
