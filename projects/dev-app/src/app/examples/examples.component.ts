import { GuiConfigs, GuiModule } from '@acrodata/gui';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, GuiModule],
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
})
export class ExamplesComponent implements OnInit {
  form = new FormGroup({});
  config: GuiConfigs = {
    options: {
      name: '菜单',
      type: 'menu',
      children: {
        menuA: {
          name: '菜单A',
          type: 'menuItem',
          children: {
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
            // search: {
            //   name: '搜索',
            //   type: 'combobox',
            //   prefix: '$',
            //   options: [
            //     { value: 1, label: 'Apple' },
            //     { value: 2, label: 'Lemon' },
            //     { value: 3, label: 'Lime' },
            //     { value: 4, label: 'Orange', disabled: true },
            //     { value: 5, label: 'Strawberry' },
            //   ],
            // },
            searchMulti: {
              name: '搜索多项',
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
            align: {
              name: '对齐方式',
              type: 'buttonToggle',
              options: [
                { value: 'left', label: '左对齐', col: 20 },
                { value: 'center', label: '居中对齐', col: 20 },
                { value: 'right', label: '右对齐', col: 20 },
                { value: 'top', label: '上对齐', col: 20 },
                { value: 'bottom', label: '下对齐', col: 20 },
              ],
              multiple: true,
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
            // alignRadio: {
            //   name: '对齐方式',
            //   type: 'radio',
            //   default: 'left',
            //   options: [
            //     { label: '左对齐', value: 'left', col: 50 },
            //     { label: '居中对齐', value: 'center', col: 50 },
            //     { label: '右对齐', value: 'right', col: 50 },
            //   ],
            // },
            hiddenInput: {
              name: '值',
              type: 'hidden',
              default: 22,
            },
            // checkbox: {
            //   name: '地图内容',
            //   type: 'checkbox',
            //   options: [
            //     { value: 'bg', label: '背景' },
            //     { value: 'building', label: '建筑物' },
            //     { value: 'road', label: '道路' },
            //     { value: 'label', label: '标注' },
            //   ],
            // },
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
                      default:
                        'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
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
                },
              ],
              template: {
                name: '系列<%= i + 1%>',
                children: {
                  seriesName: {
                    type: 'text',
                    name: '系列名',
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
            flat: {
              name: '纯色填充',
              type: 'fill',
              default: '#333',
            },
            gradient: {
              name: '渐变填充',
              type: 'fill',
              mode: 'gradient',
              default: 'linear-gradient(90deg, white 0%, black 100%)',
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
                  mode: 'range',
                  default: [0.2, 0.6],
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
  };
  model = {};
  value = {};

  ngOnInit(): void {
    this.form.valueChanges.subscribe(v => {
      console.log(v);
      this.value = v;
    });
  }
}
