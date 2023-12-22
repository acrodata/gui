export interface IBackground {
  gradients: IGradient[];
  blendMode: string[];
  repeat: string;
}

export interface IGradient {
  type: 'linear' | 'radial' | 'conic';
  repeating?: boolean;
  reverse?: boolean;
  angle?: number;
  radialBase?: string;
  conicBase?: string;
  stops?: IColorStop[];
  position?: { x?: string; y?: string };
  size?: { w?: string; h?: string };
}

export interface IColorStop {
  color: string;
  offset: string;
}

export const gradientPresets: IBackground[] = [
  {
    gradients: [
      {
        type: 'linear',
        repeating: true,
        reverse: false,
        angle: 45,
        stops: [
          { color: 'rgba(75, 75, 75, 0.5)', offset: '0%' },
          { color: 'rgba(220, 235, 255, 0.75)', offset: '50%' },
        ],
        position: {},
        size: { w: '100px', h: '100px' },
      },
      {
        type: 'linear',
        repeating: true,
        reverse: false,
        angle: 135,
        stops: [
          { color: 'rgba(5, 30, 50, 0.75)', offset: '0%' },
          { color: 'rgba(115, 150, 255, 0.5)', offset: '50%' },
        ],
        position: {},
        size: {},
      },
    ],
    blendMode: ['overlay'],
    repeat: 'repeat',
  },
  {
    gradients: [
      {
        type: 'conic',
        repeating: true,
        conicBase: '',
        stops: [
          { color: '#023047', offset: '0 25%' },
          { color: '#00000000', offset: '0 50%' },
        ],
        position: { x: '0', y: '0' },
        size: { w: '50px', h: '86.5px' },
      },
      {
        type: 'conic',
        repeating: true,
        conicBase: 'from -30deg',
        stops: [
          { color: '#fb8500', offset: '0 16.67%' },
          { color: '#023047', offset: '0 50%' },
        ],
        position: { x: '0', y: '0' },
        size: { w: '25px', h: '43.25px' },
      },
    ],
    blendMode: ['normal'],
    repeat: 'repeat',
  },
  {
    gradients: [
      {
        type: 'conic',
        conicBase: 'from -60deg at 50% 33.33%',
        stops: [
          { color: '#d9d9d9', offset: '0 120deg' },
          { color: '#00000000', offset: '0' },
        ],
        position: {},
        size: { w: '142.024px', h: '82px' },
      },
      {
        type: 'conic',
        conicBase: 'from 120deg at 50% 66.67%',
        stops: [
          { color: '#d9d9d9', offset: '0 120deg' },
          { color: '#00000000', offset: '0' },
        ],
        position: {},
        size: {},
      },
      {
        type: 'conic',
        conicBase: 'from 60deg at 66.67%',
        stops: [
          { color: '#d9d9d9', offset: '60deg' },
          { color: '#ffffff', offset: '0 120deg' },
          { color: '#00000000', offset: '0' },
        ],
        position: {},
        size: {},
      },
      {
        type: 'conic',
        conicBase: 'from 180deg at 33.33%',
        stops: [
          { color: '#b2b2b2', offset: '60deg' },
          { color: '#d9d9d9', offset: '0 120deg' },
          { color: '#00000000', offset: '0' },
        ],
        position: {},
        size: {},
      },
      {
        type: 'linear',
        angle: 90,
        stops: [
          { color: '#b2b2b2', offset: '16.7%' },
          { color: '#ffffff', offset: '0 50%' },
          { color: '#b2b2b2', offset: '0 83.33%' },
          { color: '#ffffff', offset: '0' },
        ],
        position: {},
        size: {},
      },
    ],
    blendMode: ['normal'],
    repeat: 'repeat',
  },
  {
    gradients: [
      {
        type: 'linear',
        repeating: true,
        angle: 45,
        stops: [
          { color: 'rgba(0,0,0,.2)', offset: '0' },
          { color: 'transparent', offset: '5px 50px' },
        ],
        position: {},
        size: {},
      },
      {
        type: 'linear',
        repeating: true,
        angle: -45,
        stops: [
          { color: 'rgba(0,0,0,.2)', offset: '0' },
          { color: 'transparent', offset: '5px 50px' },
        ],
        position: {},
        size: {},
      },
      {
        type: 'linear',
        repeating: true,
        angle: 45,
        stops: [
          { color: '#000', offset: '0 10px' },
          { color: '#333', offset: '0 20px' },
          { color: '#d79033', offset: '0 30px' },
          { color: '#d7d7d3', offset: '0 40px' },
          { color: '#e9e9ea', offset: '0 50px' },
        ],
        position: {},
        size: {},
      },
      {
        type: 'linear',
        repeating: true,
        angle: -45,
        stops: [
          { color: '#000', offset: '0 10px' },
          { color: '#333', offset: '0 20px' },
          { color: '#d79033', offset: '0 30px' },
          { color: '#d7d7d3', offset: '0 40px' },
          { color: '#e9e9ea', offset: '0 50px' },
        ],
        position: {},
        size: {},
      },
    ],
    blendMode: ['multiply', 'multiply', 'lighten'],
    repeat: 'repeat',
  },
];
