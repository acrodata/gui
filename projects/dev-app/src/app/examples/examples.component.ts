import { GuiFields, GuiFileUploaderConfig, GuiModule } from '@acrodata/gui';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-examples',
  standalone: true,
  imports: [CommonModule, GuiModule],
  templateUrl: './examples.component.html',
  styleUrl: './examples.component.scss',
})
export class ExamplesComponent implements OnInit {
  private fileUploaderCfg = inject(GuiFileUploaderConfig);

  form = new FormGroup({});
  config: GuiFields = {
    size: {
      type: 'inline',
      name: '屏幕大小',
      children: {
        width: {
          name: '宽度',
          type: 'number',
          default: 1920,
          description: '',
          col: 50,
          suffix: 'px',
          showIf: {
            conditions: [
              ['size.height', '$gt', 0],
              ['size.amount', '$gt', 0],
            ],
            logicalType: '$or',
          },
        },
        height: {
          name: '高度',
          type: 'number',
          default: 1080,
          description: '',
          col: 50,
        },
        angle: {
          name: '角度',
          type: 'select',
          default: '0',
          options: [
            { value: '0', label: '水平', src: 'horizontal' },
            { value: '45', label: '斜角', src: 'incline' },
            { value: '90', label: '垂直', src: 'vertical' },
          ],
          col: 50,
          showIf: {
            conditions: [['size.height', '$eq', 0]],
          },
        },
        amount: {
          name: '数量',
          type: 'number',
          default: 0,
          min: 0,
          step: 1,
          description: '坐标轴刻度标签最多显示个数',
          col: 50,
        },
      },
      description: '行内布局也是一个组合',
    },
    unit: {
      type: 'text',
      default: '',
      name: '轴单位',
      showIf: {
        conditions: [['size.amount', '$gt', 0]],
      },
    },
    font: {
      name: '字体',
      type: 'select',
      useFont: true,
      default: 'SimSun',
      prefix: '$',
      options: [
        { value: 'Microsoft Yahei', label: '微软雅黑' },
        { value: 'SimHei', label: '黑体' },
        { value: 'SimSun', label: '宋体' },
        { value: 'fangsong', label: '仿宋' },
        { value: 'KaiTi', label: '楷体' },
        { value: 'Arial', label: 'Arial' },
        { value: 'fantasy', label: 'Fantasy' },
      ],
      description: '请选择您系统有的字体,如果您系统无此字体,标题将会显示默认字体',
    },
    fruits: {
      name: '选择多项',
      type: 'select',
      multiple: true,
      options: [
        { value: 1, label: 'Apple' },
        { value: 2, label: 'Lemon' },
        { value: 3, label: 'Lime' },
        { value: 4, label: 'Orange', disabled: true },
        { value: 5, label: 'Strawberry' },
      ],
    },
    combobox1: {
      name: '复合框',
      type: 'combobox',
      options: [
        { value: 'Arial', label: 'Arial' },
        { value: 'fantasy', label: 'Fantasy' },
        { value: 'impact', label: 'Impact' },
        { value: 'monospace', label: 'Monospace' },
      ],
      placeholder: '单选',
      useFont: true,
    },
    combobox2: {
      name: '复合框',
      type: 'combobox',
      multiple: true,
      options: [
        { value: 1, label: 'Volvo' },
        { value: 2, label: 'Saab' },
        { value: 3, label: 'Mercedes' },
        { value: 4, label: 'Audi', disabled: true },
      ],
      placeholder: '多选',
    },
    align: {
      name: '对齐方式',
      type: 'buttonToggle',
      options: [
        { value: 'left', label: '左对齐', col: 50 },
        { value: 'center', label: '居中对齐', col: 50 },
        { value: 'right', label: '右对齐', col: 50 },
        { value: 'top', label: '上对齐', col: 50 },
        { value: 'bottom', label: '下对齐', col: 50 },
      ],
    },
    alignIcon: {
      name: '对齐方式',
      type: 'buttonToggle',
      useIcon: true,
      options: [
        { value: 'left', label: '左侧', src: 'mdi mdi-format-align-left' },
        { value: 'center', label: '居中', src: 'mdi mdi-format-align-center' },
        { value: 'right', label: '右侧', src: 'mdi mdi-format-align-right' },
      ],
    },
    direction: {
      name: '移动方向',
      type: 'buttonToggle',
      useIcon: true,
      options: [
        {
          value: 'left',
          label: '左侧',
          src: 'https://img.alicdn.com/tfs/TB1.77AgxYaK1RjSZFnXXa80pXa-48-48.png',
        },
        {
          value: 'right',
          label: '右侧',
          src: 'https://img.alicdn.com/tfs/TB1sWoggwDqK1RjSZSyXXaxEVXa-48-48.png',
        },
        {
          value: 'top',
          label: '上侧',
          src: 'https://img.alicdn.com/tfs/TB1t0wjgCzqK1RjSZFjXXblCFXa-48-48.png',
        },
        {
          value: 'bottom',
          label: '下侧',
          src: 'https://img.alicdn.com/tfs/TB1UAAjgwHqK1RjSZFkXXX.WFXa-48-48.png',
        },
      ],
    },
    hiddenInput: {
      name: '值',
      type: 'hidden',
      default: 22,
    },
    checkbox: {
      name: '地图内容',
      type: 'buttonToggle',
      multiple: true,
      options: [
        { value: 'bg', label: '背景' },
        { value: 'building', label: '建筑物' },
        { value: 'road', label: '道路' },
        { value: 'label', label: '标注' },
      ],
    },
    group: {
      type: 'group',
      name: '分组',
      children: {
        subgroup: {
          type: 'group',
          name: '子分组',
          children: {
            slider: {
              name: '透明度',
              type: 'slider',
              step: 0.1,
              min: 0,
              max: 1,
              suffix: 'α',
            },
            border: {
              type: 'switch',
              name: '边框可见',
              default: false,
            },
            image: {
              name: '上传封面',
              type: 'image',
              default:
                'https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/0193254851/p92926.png',
            },
            video: {
              name: '上传视频',
              type: 'video',
              default: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
            },
          },
        },
      },
      description: '展开组用于数据分类',
    },
    tabs: {
      name: '动态数组',
      type: 'tabs',
      default: [
        {
          seriesName: '第一产业',
        },
        {
          seriesName: '第二产业',
          seriesId: 2,
        },
      ],
      template: {
        name: '系列<%= i + 1%>',
        children: {
          seriesName: {
            type: 'text',
            name: '系列名',
            showIf: {
              conditions: [['seriesId', '$eq', 1]],
            },
            default: '1',
          },
          seriesId: {
            type: 'number',
            name: '数值',
            default: 1,
          },
        },
      },
      description: '用于数组类型的数据',
    },
    tabs2: {
      name: '固定数组',
      type: 'tabs',
      default: [
        {
          fullname: {
            firstName: 'n',
            lastName: 'zb',
          },
        },
        {
          switch: true,
        },
      ],
      children: [
        {
          name: 'tab1',
          type: 'tab',
          children: {
            fullname: {
              name: '全名',
              type: 'inline',
              children: {
                firstName: {
                  type: 'text',
                  name: '姓',
                  col: 50,
                },
                lastName: {
                  type: 'text',
                  name: '名',
                  col: 50,
                  showIf: {
                    conditions: [['firstName', '$eq', 'jack']],
                  },
                },
              },
            },
          },
        },
        {
          name: 'tab2',
          type: 'tab',
          children: {
            switch: {
              name: '开关',
              type: 'switch',
            },
          },
        },
      ],
    },
    tabs3: {
      name: '动态数组（基础数据）',
      type: 'tabs',
      default: ['123', '456'],
      template: {
        name: '系列<%= i + 1%>',
        type: 'text',
        default: '1',
      },
    },
    tabs4: {
      name: '固定数组（基础数据）',
      type: 'tabs',
      children: [
        {
          type: 'text',
          name: '系列名',
        },
        {
          type: 'switch',
          name: '开关',
        },
      ],
    },
    fill: {
      name: '填充',
      type: 'fill',
    },
    solid: {
      name: '纯色填充',
      type: 'fill',
      mode: 'solid',
      default: '#333',
    },
    gradient: {
      name: '渐变填充',
      type: 'fill',
      mode: 'gradient',
      default: 'linear-gradient(90deg, white 0%, black 100%)',
    },
    slider: {
      name: '透明度',
      type: 'slider',
      step: 0.1,
      min: 0,
      max: 1,
      suffix: 'α',
      mode: 'range',
      default: [0.2, 0.6],
    },
    menu: {
      name: '菜单',
      type: 'menu',
      children: {
        menuA: {
          name: '菜单A',
          type: 'menuItem',
          children: {
            image: {
              name: '装饰',
              type: 'imageSelect',
              default: 'gif1',
              options: [
                {
                  label: 'gif1',
                  value: 'gif1',
                  src: 'https://img.alicdn.com/tps/TB1tFMtPXXXXXXyXpXXXXXXXXXX-1920-1080.gif',
                  col: 50,
                },
                {
                  label: 'gif2',
                  value: 'gif2',
                  src: 'https://img.alicdn.com/tps/TB1XLAgPXXXXXbCXFXXXXXXXXXX-1080-824.gif',
                  col: 50,
                },
                {
                  label: 'gif3',
                  value: 'gif3',
                  src: 'https://img.alicdn.com/tps/TB1LArQPXXXXXcLapXXXXXXXXXX-1080-824.gif',
                  col: 50,
                },
                {
                  label: 'gif4',
                  value: 'gif4',
                  src: 'https://img.alicdn.com/tps/TB18er0PXXXXXXwapXXXXXXXXXX-1920-1080.gif',
                  col: 50,
                },
              ],
            },
            textarea: {
              name: '文本框',
              type: 'textarea',
              rows: 10,
            },
          },
        },
        menuB: {
          name: '菜单B',
          type: 'menu',
          children: {
            menuB1: {
              name: '菜单B1',
              type: 'menuItem',
              children: {
                text: {
                  name: '文本',
                  type: 'text',
                  default: 'Hello',
                },
                slider: {
                  name: '透明度',
                  type: 'slider',
                  step: 0.1,
                  min: 0,
                  max: 1,
                  suffix: 'α',
                  default: 0.4,
                },
              },
            },
            menuB2: {
              name: '菜单B2',
              type: 'menuItem',
              children: {
                display: {
                  name: '显示',
                  type: 'switch',
                  default: true,
                },
                stepper: {
                  name: '步进器',
                  type: 'number',
                  default: 1,
                },
              },
            },
          },
        },
      },
    },
    codearea: {
      type: 'codearea',
      name: '代码块',
      default: 'console.log("Hello World")',
      language: 'js',
    },
  };
  model = {};

  ngOnInit(): void {
    this.form.valueChanges.subscribe(v => {
      console.log(v);
    });
  }
}
