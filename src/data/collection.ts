export interface Artifact {
  id: string;
  objectID: string;
  title: string;
  dynasty: string;
  date: string;
  medium: string;
  dimensions: string;
  category: string;
  culture: string;
  provenance: string;
  description: string;
  audioGuide: string;
  image: string;
}

export const artifacts: Artifact[] = [
  {
    id: 'chunyu',
    objectID: 'YC-2024-BR-001',
    title: '巴人虎钮錞于',
    dynasty: '战国',
    date: '约公元前 475 - 前 221 年',
    medium: '青铜',
    dimensions: '高 68.5 厘米，重 32.4 千克',
    category: '青铜器',
    culture: '巴文化',
    provenance: '宜昌市博物馆旧藏',
    description:
      '虎钮錞于是巴人最具代表性的军乐器，战时击之鼓舞士气。器身椭圆如瓮，顶部铸虎钮，虎作昂首欲扑状，造型雄浑，是巴楚文化交融的实物见证。',
    audioGuide:
      '这件巴人虎钮錞于出土于宜昌地区，是战国时期巴人的军乐器。錞于的顶部铸有一只昂首挺胸的猛虎，象征巴人的勇武与图腾崇拜。敲击錞于，声音洪亮悠远，可传数里，古人用它来号令军队、祭祀神明。',
    image: 'images/chunyu.jpg',
  },
  {
    id: 'ding',
    objectID: 'YC-2024-BR-002',
    title: '青铜云纹鼎',
    dynasty: '春秋',
    date: '约公元前 770 - 前 476 年',
    medium: '青铜',
    dimensions: '通高 42 厘米，口径 38 厘米',
    category: '青铜器',
    culture: '楚文化',
    provenance: '三峡库区考古发掘',
    description:
      '鼎是先秦礼制的核心重器。此鼎腹饰云雷纹，双立耳，三兽足，器形规整，纹饰繁缛，反映了楚国青铜铸造工艺的高超水平。',
    audioGuide:
      '鼎是古代最重要的礼器之一，象征着权力与等级。这件春秋时期的青铜云纹鼎出土于三峡库区，器身布满云雷纹，体现了楚人浪漫而神秘的审美。',
    image: 'images/ding.jpg',
  },
  {
    id: 'lacquer',
    objectID: 'YC-2024-LW-001',
    title: '楚式漆豆',
    dynasty: '战国',
    date: '约公元前 475 - 前 221 年',
    medium: '木胎髹漆',
    dimensions: '高 24.6 厘米，盘径 18.2 厘米',
    category: '漆木器',
    culture: '楚文化',
    provenance: '当阳赵家湖楚墓',
    description:
      '漆豆为盛放祭品的礼器。以木为胎，髹黑漆朱绘，纹样灵动流畅，红黑对比强烈，是楚式漆器“朱画其内，墨染其外”的典型代表。',
    audioGuide:
      '漆豆是先秦时期盛放食物的器具。这件楚式漆豆采用木胎髹漆工艺，红黑相间，纹饰飘逸，展现了楚人高超的漆艺和对色彩的偏爱。',
    image: 'images/lacquer.jpg',
  },
  {
    id: 'stone',
    objectID: 'YC-2024-PL-001',
    title: '长阳人化石（复制）',
    dynasty: '旧石器时代',
    date: '距今约 19 万年',
    medium: '古生物化石',
    dimensions: '上颌骨化石，残长约 12 厘米',
    category: '古生物',
    culture: '远古人类',
    provenance: '长阳土家族自治县钟家湾',
    description:
      '1956 年在长阳钟家湾龙洞发现的人类上颌骨化石，被命名为“长阳人”，填补了我国古人类发展链条中的重要一环，证明长江中游是早期人类活动的重要区域。',
    audioGuide:
      '长阳人化石发现于 1956 年，是我国发现较早、保存较好的人类化石之一。它证明了近 19 万年前，长江中游地区就有人类繁衍生息，是研究人类进化的重要资料。',
    image: 'images/stone.jpg',
  },
  {
    id: 'qin',
    objectID: 'YC-2024-MU-001',
    title: '峡江古琴（复制）',
    dynasty: '明代',
    date: '约 1368 - 1644 年',
    medium: '木、丝弦',
    dimensions: '通长 124 厘米，肩宽 19 厘米',
    category: '乐器',
    culture: '三峡文人文化',
    provenance: '宜昌民间征集',
    description:
      '古琴为文人雅士修身之器。此琴形制浑厚，琴面髹漆断纹天成，音色清越。三峡地区的文人传统与楚辞浪漫一脉相承，古琴正是这种文化气韵的载体。',
    audioGuide:
      '古琴是中国最古老的弹弦乐器之一。这件峡江古琴形制浑厚、断纹天然，体现了三峡地区绵延千年的文人传统。古人抚琴，讲究“清、微、淡、远”。',
    image: 'images/qin.jpg',
  },
  {
    id: 'talisman',
    objectID: 'YC-2024-FO-001',
    title: '峡江木雕船模',
    dynasty: '清代',
    date: '约 1644 - 1912 年',
    medium: '木',
    dimensions: '长 86 厘米，高 42 厘米',
    category: '民俗',
    culture: '峡江航运民俗',
    provenance: '宜昌江段民间征集',
    description:
      '木雕船模是峡江船工文化的缩影。船体雕刻精细，桅帆樯橹俱全，再现了长江航运黄金水道的昔日盛景，寄托着船工对平安顺遂的祈愿。',
    audioGuide:
      '这件峡江木雕船模出自清代，雕刻精细，完整再现了长江木船的构造。过去三峡航道险滩密布，船工们以此为生，也把对平安的祈愿刻进了船模里。',
    image: 'images/talisman.jpg',
  },
];

export interface Exhibition {
  id: string;
  title: string;
  period: string;
  location: string;
  status: '展出中' | '即将开展' | '已结束';
  intro: string;
  image: string;
}

export const exhibitions: Exhibition[] = [
  {
    id: 'ex-1',
    title: '巴楚夷陵——宜昌古代文明展',
    period: '常设展览',
    location: '一楼 · 巴楚文明厅',
    status: '展出中',
    intro: '以巴人、楚人、夷陵三大文化脉络为主线，展出青铜器、漆木器、陶瓷器等文物 1200 余件。',
    image: 'images/chunyu.jpg',
  },
  {
    id: 'ex-2',
    title: '峡尽天开——三峡记忆展',
    period: '常设展览',
    location: '二楼 · 三峡文化厅',
    status: '展出中',
    intro: '通过纤夫石、木船、纤绳等实物与场景复原，讲述三峡航道千年传奇与库区移民记忆。',
    image: 'images/talisman.jpg',
  },
  {
    id: 'ex-3',
    title: '古人类长阳——远古家园展',
    period: '常设展览',
    location: '二楼 · 远古厅',
    status: '展出中',
    intro: '聚焦“长阳人”与三峡地区旧石器文化，再现 19 万年前长江中游先民的生活图景。',
    image: 'images/stone.jpg',
  },
  {
    id: 'ex-4',
    title: '非遗匠心——宜昌民间技艺展',
    period: '临时展览',
    location: '三楼 · 临展厅',
    status: '展出中',
    intro: '宜昌丝竹、长阳南曲、土家织锦等非物质文化遗产项目联展，现场设非遗体验工坊。',
    image: 'images/qin.jpg',
  },
  {
    id: 'ex-5',
    title: '楚韵流芳——楚式漆器特展',
    period: '临时展览',
    location: '三楼 · 临展厅',
    status: '即将开展',
    intro: '联合省内外多家文博单位，集中展示战国楚墓出土漆器精品 80 余件。',
    image: 'images/lacquer.jpg',
  },
  {
    id: 'ex-6',
    title: '铁血宜昌——抗战文物展',
    period: '专题展览',
    location: '四楼 · 专题厅',
    status: '已结束',
    intro: '以宜昌大撤退等历史事件为线索，展出抗战时期文物与档案资料。',
    image: 'images/ding.jpg',
  },
];

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  tag: string;
}

export const news: NewsItem[] = [
  { id: 'n1', title: '宜昌博物馆 2026 年暑期夜游开放公告', date: '2026-08-01', tag: '公告' },
  { id: 'n2', title: '数字文博平台 3D 展厅正式上线，云端逛馆体验开启', date: '2026-07-20', tag: '动态' },
  { id: 'n3', title: '“楚韵流芳”漆器特展文物点交入库工作完成', date: '2026-07-12', tag: '动态' },
  { id: 'n4', title: '社教部 8 月研学课程开放预约', date: '2026-07-05', tag: '活动' },
];
