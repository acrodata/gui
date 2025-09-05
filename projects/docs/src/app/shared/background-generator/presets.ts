export interface IBackground {
  layers: IBgLayer[];
  blendMode: string[];
  repeat: string;
}

export interface IBgLayer {
  image: string;
  position?: { x?: string; y?: string };
  size?: { w?: string; h?: string };
}

export const presets: IBackground[] = [
  {
    layers: [
      {
        image:
          'repeating-linear-gradient(45deg, rgba(75, 75, 75, 0.5) 0%, rgba(220, 235, 255, 0.75) 50%)',
        position: {},
        size: { w: '100px', h: '100px' },
      },
      {
        image:
          'repeating-linear-gradient(135deg, rgba(5, 30, 50, 0.75) 0%, rgba(115, 150, 255, 0.5) 50%)',
        position: {},
        size: {},
      },
    ],
    blendMode: ['overlay'],
    repeat: 'repeat',
  },
  {
    layers: [
      {
        image:
          'repeating-conic-gradient(rgb(2, 48, 71) 0%, rgb(2, 48, 71) 25%, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0) 50%)',
        position: { x: '0', y: '0' },
        size: { w: '50px', h: '86.5px' },
      },
      {
        image:
          'repeating-conic-gradient(from -30deg, rgb(251, 133, 0) 0%, rgb(251, 133, 0) 16.67%, rgb(2, 48, 71) 16.67%, rgb(2, 48, 71) 50%)',
        position: { x: '0', y: '0' },
        size: { w: '25px', h: '43.25px' },
      },
    ],
    blendMode: ['normal'],
    repeat: 'repeat',
  },
  {
    layers: [
      {
        image:
          'conic-gradient(from -60deg at 50% 33.33%, rgb(217, 217, 217) 0deg, rgb(217, 217, 217) 120deg, rgba(0, 0, 0, 0) 120deg)',
        position: {},
        size: { w: '142.024px', h: '82px' },
      },
      {
        image:
          'conic-gradient(from 120deg at 50% 66.67%, rgb(217, 217, 217) 0deg, rgb(217, 217, 217) 120deg, rgba(0, 0, 0, 0) 120deg)',

        position: {},
        size: {},
      },
      {
        image:
          'conic-gradient(from 60deg at 66.67% center, rgb(217, 217, 217) 60deg, rgb(255, 255, 255) 60deg, rgb(255, 255, 255) 120deg, rgba(0, 0, 0, 0) 120deg)',
        position: {},
        size: {},
      },
      {
        image:
          'conic-gradient(from 180deg at 33.33% center, rgb(178, 178, 178) 60deg, rgb(217, 217, 217) 60deg, rgb(217, 217, 217) 120deg, rgba(0, 0, 0, 0) 120deg)',
        position: {},
        size: {},
      },
      {
        image:
          'linear-gradient(90deg, rgb(178, 178, 178) 16.7%, rgb(255, 255, 255) 16.7%, rgb(255, 255, 255) 50%, rgb(178, 178, 178) 50%, rgb(178, 178, 178) 83.33%, rgb(255, 255, 255) 83.33%)',
        position: {},
        size: {},
      },
    ],
    blendMode: ['normal'],
    repeat: 'repeat',
  },
  {
    layers: [
      {
        image:
          'repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.2) 0px, transparent 5px, transparent 50px)',
        position: {},
        size: {},
      },
      {
        image:
          'repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.2) 0px, transparent 5px, transparent 50px)',
        position: {},
        size: {},
      },
      {
        image:
          'repeating-linear-gradient(45deg, rgb(0, 0, 0) 0px, rgb(0, 0, 0) 10px, rgb(51, 51, 51) 10px, rgb(51, 51, 51) 20px, rgb(215, 144, 51) 20px, rgb(215, 144, 51) 30px, rgb(215, 215, 211) 30px, rgb(215, 215, 211) 40px, rgb(233, 233, 234) 40px, rgb(233, 233, 234) 50px)',
        position: {},
        size: {},
      },
      {
        image:
          'repeating-linear-gradient(-45deg, rgb(0, 0, 0) 0px, rgb(0, 0, 0) 10px, rgb(51, 51, 51) 10px, rgb(51, 51, 51) 20px, rgb(215, 144, 51) 20px, rgb(215, 144, 51) 30px, rgb(215, 215, 211) 30px, rgb(215, 215, 211) 40px, rgb(233, 233, 234) 40px, rgb(233, 233, 234) 50px)',
        position: {},
        size: {},
      },
    ],
    blendMode: ['multiply', 'multiply', 'lighten'],
    repeat: 'repeat',
  },
];
