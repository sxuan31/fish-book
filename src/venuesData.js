export const VENUE_CATEGORIES = [
  { id: 'beijing', name: '北京', icon: '🏛️' },
  { id: 'shanghai', name: '上海', icon: '🏙️' },
  { id: 'guangzhou', name: '广州', icon: '🗼' },
  { id: 'shenzhen', name: '深圳', icon: '🌆' },
  { id: 'chengdu', name: '成都', icon: '🐼' },
  { id: 'chongqing', name: '重庆', icon: '🌶️' },
  { id: 'wuhan', name: '武汉', icon: '🌉' },
  { id: 'hangzhou', name: '杭州', icon: '🏞️' },
  { id: 'nanjing', name: '南京', icon: '🦆' },
  { id: 'xian', name: '西安', icon: '🗿' },
  { id: 'tianjin', name: '天津', icon: '🎡' },
  { id: 'shenyang', name: '沈阳', icon: '❄️' },
  { id: 'changsha', name: '长沙', icon: '🍜' },
  { id: 'qingdao', name: '青岛', icon: '🍺' },
  { id: 'kunming', name: '昆明', icon: '🌸' },
  { id: 'zhengzhou', name: '郑州', icon: '🚂' },
  { id: 'harbin', name: '哈尔滨', icon: '🏰' },
  { id: 'jinan', name: '济南', icon: '⛲' },
  { id: 'xiamen', name: '厦门', icon: '🌅' },
  { id: 'guiyang', name: '贵阳', icon: '🌦️' },
  { id: 'fuzhou', name: '福州', icon: '🌳' },
  { id: 'nanning', name: '南宁', icon: '🐘' },
  { id: 'haikou', name: '海口', icon: '🥥' },
  { id: 'suzhou', name: '苏州', icon: '🚣' },
  { id: 'dalian', name: '大连', icon: '⚓' },
];

export const VENUES_DATA = [
  // 北京 (7)
  {
    id: "bj1", name: "国家体育场", enName: "National Stadium (Bird's Nest)", city: "beijing",
    status: "open", capacity: 80000, capacityNote: "2008年曾设9.1万座，现固定座位约8万", type: "综合体育场",
    tags: ["奥运主场馆", "地标", "演唱会圣地"], opened: "2008",
    history: "俗称“鸟巢”，是2008年北京奥运会和2022年北京冬奥会的主体育场及开闭幕式场馆。也是世界首个“双奥开闭幕式场馆”。",
    events: "田径、大型文艺演出、演唱会", notableEvents: ["2008北京奥运会开幕式", "2022北京冬奥会开幕式", "五月天巡演十万人场"],
    baikeImg: ""
  },
  {
    id: "bj2", name: "工人体育场 (新工体)", enName: "Workers' Stadium", city: "beijing",
    status: "open", capacity: 68000, capacityNote: "原老工体约可容纳6.5-7万人，新工体标准6.8万", type: "专业足球场",
    tags: ["专业足球场", "国安主场", "全新改造"], opened: "2023",
    history: "始建于1959年，历经多次改造。2020年启动复建，2023年全新亮相，成为全国首批、首都首座完全符合FIFA标准的顶级专业足球场。",
    events: "足球、大型演唱会", notableEvents: ["中超联赛北京国安主场", "阿根廷vs澳大利亚友谊赛"],
    baikeImg: ""
  },
  {
    id: "bj3", name: "华熙LIVE·五棵松", enName: "Cadillac Arena", city: "beijing",
    status: "open", capacity: 18000, type: "综合体育馆",
    tags: ["篮球圣地", "顶级场馆", "高频演唱会"], opened: "2008",
    history: "原名五棵松体育馆、凯迪拉克中心。2008年奥运会篮球项目比赛场馆，是目前北京举办室内大型演唱会和体育赛事频率最高的场馆之一。",
    events: "篮球、冰球、重磅演唱会", notableEvents: ["2008奥运会篮球赛", "CBA总决赛", "多位天王天后级歌手四面台演唱会"],
    baikeImg: ""
  },
  {
    id: "bj4", name: "首都体育馆", enName: "Capital Indoor Stadium", city: "beijing",
    status: "open", capacity: 17500, type: "综合体育馆",
    tags: ["历史悠久", "冰上运动", "四面台"], opened: "1968 (2021改造)",
    history: "建于1968年，是北京重要的老牌体育馆。经过大修改造后，承办了2022年冬奥会短道速滑和花样滑冰比赛。目前常办大型冰上及演艺活动。",
    events: "冰壶、短道速滑、花滑、演唱会", notableEvents: ["中美乒乓外交", "2008奥运排球", "2022冬奥短道速滑/花滑"],
    baikeImg: ""
  },
  {
    id: "bj5", name: "国家体育馆", enName: "National Indoor Stadium", city: "beijing",
    status: "open", capacity: 20000, type: "综合体育馆",
    tags: ["双奥场馆", "巨大容量", "体操冰球"], opened: "2008",
    history: "位于奥林匹克公园，俗称“折扇”。是目前亚洲最大的室内综合体育馆，历经双奥洗礼的顶级室内场馆。",
    events: "冰球、体操、超级演唱会", notableEvents: ["2008奥运体操跳床", "2022冬奥男子冰球", "巨星室内定点演唱会"],
    baikeImg: ""
  },
  {
    id: "bj6", name: "北京奥林匹克体育中心体育场", enName: "Olympic Sports Center Stadium", city: "beijing",
    status: "open", capacity: 36228, type: "综合体育场",
    tags: ["亚运遗产", "全运会"], opened: "1990",
    history: "为1990年北京亚运会而建，是中国近代较早的大型综合场馆，在国家体育场建成前长期承担重要活动。",
    events: "田径、国内足球赛、中型演出", notableEvents: ["1990北京亚运会", "2008奥运现代五项"],
    baikeImg: ""
  },
  {
    id: "bj7", name: "北京工人体育馆", enName: "Workers' Indoor Arena", city: "beijing",
    status: "open", capacity: 13000, type: "综合体育馆",
    tags: ["经典场馆", "时代记忆"], opened: "1961",
    history: "与工体相邻，圆顶建筑，见证了中国无数第一。早期是北京唯一的万人以上室内馆，承载几代人的集体记忆。",
    events: "篮球、室内演出、武术比赛", notableEvents: ["第26届世乒赛", "中国早期无数经典演唱会"],
    baikeImg: ""
  },
  
  // 上海 (7)
  {
    id: "sh1", name: "上海体育场", enName: "Shanghai Stadium", city: "shanghai",
    status: "open", capacity: 72000, capacityNote: "俗称“八万人”，原容量约5.6万，改建后增至7.2万", type: "专业足球场",
    tags: ["专业足球场", "八万人巨兽", "申花主场"], opened: "1997 (2023改建)",
    history: "俗称“八万人体育场”，曾为综合田径场。2023年大修竣工，取消跑道变身72000座国际足联顶级专业足球赛事场地。",
    events: "中超、亚冠、顶级演唱会", notableEvents: ["1997全运会", "08奥运足球", "多场破纪录的演唱会"],
    baikeImg: ""
  },
  {
    id: "sh2", name: "上汽浦东足球场", enName: "Pudong Football Stadium", city: "shanghai",
    status: "open", capacity: 37000, type: "专业足球场",
    tags: ["白玉碗", "极度贴近", "海港主场"], opened: "2021",
    history: "中国第一座严格按照国际足联标准设计建造的专业足球场，设计灵感来自传统瓷器白玉碗。看台第一排距球场仅8.5米。",
    events: "顶级足球赛事、大型电竞、演出", notableEvents: ["2020英雄联盟全球总决赛(S10)", "上海海港主场赛事"],
    baikeImg: ""
  },
  {
    id: "sh3", name: "虹口足球场", enName: "Hongkou Football Stadium", city: "shanghai",
    status: "open", capacity: 35000, type: "专业足球场",
    tags: ["中国第一专业球场", "历史深厚"], opened: "1999",
    history: "中国第一座专业足球场，曾经的上海申花足球俱乐部主场，历史底蕴极其深厚，是国内看球氛围最顶级的场馆之一。",
    events: "足球、内场演唱会", notableEvents: ["女足世界杯", "历年虹口经典中超赛事"],
    baikeImg: ""
  },
  {
    id: "sh4", name: "梅赛德斯-奔驰文化中心", enName: "Mercedes-Benz Arena", city: "shanghai",
    status: "open", capacity: 18000, type: "演艺中心",
    tags: ["飞碟", "最强室内演出馆", "世博遗产"], opened: "2010",
    history: "原2010上海世博会文化中心。飞碟造型，是目前国内乃至于亚洲最顶级的室内演艺场馆，所有顶流艺人必打卡之地。",
    events: "超级演唱会、NBA中国赛、盛典", notableEvents: ["历年双十一晚会", "各路跨国巨星演唱会", "英雄联盟系列赛"],
    baikeImg: ""
  },
  {
    id: "sh5", name: "浦发银行东方体育中心", enName: "Oriental Sports Center", city: "shanghai",
    status: "open", capacity: 15000, type: "综合体育馆",
    tags: ["海上皇冠", "水上运动结合", "多功能"], opened: "2011",
    history: "拥有壮丽的水晶皇冠造型。能够快速在冰上、水上、木板球场间切换，是上海举办国际体育锦标赛和万人演出的另一主战场。",
    events: "游泳、篮球、花滑、电竞、演唱会", notableEvents: ["2011世界游泳锦标赛", "2019篮球世界杯", "各类顶级演唱会"],
    baikeImg: ""
  },
  {
    id: "sh6", name: "上海万代南梦宫体育馆", enName: "Bandai Namco Shanghai Base", city: "shanghai",
    status: "open", capacity: 1500, type: "演艺中心 (Livehouse)",
    tags: ["二次元圣地", "千人级Live"], opened: "2017(命名)",
    history: "由原浅水湾文化艺术中心冠名转变而来，是上海规模最大、设备最顶尖的Livehouse级场馆，常年举办各类音乐会、粉丝见面会。",
    events: "Live演出、见面会", notableEvents: ["大量日本声优/歌手海外公演", "大量国内独立乐队专场"],
    baikeImg: ""
  },
  {
    id: "sh7", name: "上海旗忠网球中心", enName: "Qizhong Forest Sports City Arena", city: "shanghai",
    status: "open", capacity: 15000, type: "网球馆/综合馆",
    tags: ["开合屋顶", "白玉兰", "大师赛"], opened: "2005",
    history: "拥有酷似白玉兰花瓣的开合式穹顶，气势恢宏。是ATP1000上海劳力士大师赛的永久举办地。",
    events: "国际网球赛、大型晚会", notableEvents: ["ATP大师杯", "ATP1000上海大师赛"],
    baikeImg: ""
  },

  // 广州 (7)
  {
    id: "gz1", name: "天河体育中心体育场", enName: "Tianhe Stadium", city: "guangzhou",
    status: "open", capacity: 54000, capacityNote: "1987年落成时约6万座，后因外加座椅和安保缩减配置", type: "综合体育场",
    tags: ["魔鬼主场", "城市名片"], opened: "1987",
    history: "位于广州中央商务区中轴线，被誉为“亚洲第一魔鬼主场”。见证了广州足球的辉煌岁月，常年承担六万人级别的室外演唱会。",
    events: "亚冠、中超、大型演唱会", notableEvents: ["2013/2015亚冠决赛", "历年大型演唱会"],
    baikeImg: ""
  },
  {
    id: "gz2", name: "广州体育馆", enName: "Guangzhou Gymnasium", city: "guangzhou",
    status: "open", capacity: 10000, type: "综合体育馆",
    tags: ["叶片造型", "演唱会老友"], opened: "2001",
    history: "法国著名建筑师保罗·安德鲁设计，三个场馆如三片由大到小漂浮在白云山脚下的树叶。是广州万人级室内经典演唱会场地。",
    events: "篮球、羽毛球、室内演唱会", notableEvents: ["2010亚运会", "大量华语乐坛超级巡演广州站"],
    baikeImg: ""
  },
  {
    id: "gz3", name: "广州奥林匹克体育中心", enName: "Guangdong Olympic Stadium", city: "guangzhou",
    status: "open", capacity: 80012, type: "综合体育场",
    tags: ["超大容量", "九运会主场"], opened: "2001",
    history: "外观呈飘带造型，容量高达八万人，在较长时期内是中国南部规模最大的体育场，承载九运会和2010亚运盛事。",
    events: "田径、巨型演唱会", notableEvents: ["2001全运会", "2010亚运会田径", "历年户外特大演唱会"],
    baikeImg: ""
  },
  {
    id: "gz4", name: "广州足球公园", enName: "Guangzhou Football Park", city: "guangzhou",
    status: "under_construction", capacity: 75000, capacityNote: "原恒大足球场设计规划为10万座，现改为7.5万座", type: "专业足球场",
    tags: ["在建", "全国之最", "瑞玉吉祥"], opened: "预计2025底",
    history: "原为恒大十万人足球场项目，后由广州城投接手改为7.5万座专业球场。建成后将成为全国规模最大的专业足球场，设计取意“瑞玉吉祥·生态玲珑”。",
    events: "顶级足球赛、大型汇演", notableEvents: ["即将竣工"],
    baikeImg: ""
  },
  {
    id: "gz5", name: "宝能广州国际演艺中心", enName: "Baoneng Guangzhou International Sports Arena", city: "guangzhou",
    status: "open", capacity: 18000, type: "演艺中心",
    tags: ["NBA标准", "顶级室内馆"], opened: "2010",
    history: "按照国际NBA标准建设的顶级多功能室内演艺场馆，拥有极佳的声学设计和观演体验，是华南地区最豪华的室内演出场馆之一。",
    events: "室内演唱会、篮球", notableEvents: ["2010亚运篮球赛", "B站跨年晚会", "张学友巡演广州站"],
    baikeImg: ""
  },
  {
    id: "gz6", name: "南沙大湾区体育中心", enName: "Nansha Greater Bay Area Sports Center", city: "guangzhou",
    status: "open", capacity: 60000, type: "综合体育场",
    tags: ["大湾区新地标", "全运主场"], opened: "2025",
    history: "为迎接2025年粤港澳全运会而建，集体育、演艺、休闲于一体，具有极强未来都市感。已于2025年正式投入使用，成为南沙新门户。",
    events: "全运会、国际级田径、大型演出", notableEvents: ["2025粤港澳第十五届全运会"],
    baikeImg: ""
  },
  {
    id: "gz7", name: "大学城中心中心体育场", enName: "HEMC Stadium", city: "guangzhou",
    status: "open", capacity: 40000, type: "综合体育场",
    tags: ["高校辐射区", "草莓音乐节"], opened: "2007",
    history: "坐落于广州大学城，是全国规模第三大的高校体育场，具备举办国际田径和大中型演唱会的能力。常用于举办音乐节。",
    events: "足球直播赛、草莓/星巢音乐节、大运会", notableEvents: ["2007大运会", "常年音乐会主办地"],
    baikeImg: ""
  },

  // 深圳 (5)
  {
    id: "sz1", name: "深圳湾体育中心 (春茧)", enName: "Shenzhen Bay Sports Center", city: "shenzhen",
    status: "open", capacity: 20000, type: "综合体育场/馆",
    tags: ["春茧", "海景场馆", "演艺核心"], opened: "2011",
    history: "外形酷似孵化破茧的春茧，采用“一场两馆”钢结构网壳一体化设计。紧邻深圳湾畔，是深圳举办大型演唱会最频繁的场馆组合。",
    events: "演唱会、品牌发布会、网球", notableEvents: ["2011大运会开幕式", "极其高频的华语群星演唱会"],
    baikeImg: ""
  },
  {
    id: "sz2", name: "深圳市体育中心专业足球场", enName: "Shenzhen Sports Center Stadium", city: "shenzhen",
    status: "under_construction", capacity: 45000, type: "专业足球场",
    tags: ["在建", "扩容改造", "市中心"], opened: "预计2025",
    history: "原3.2万人体育场原址改建，即将变身无边际看台的4.5万人国际顶级专业足球场，是深圳未来承接国际A类赛事的核心。",
    events: "大型足球赛事、室外演唱会", notableEvents: ["原场馆见证深足夺冠", "2025全运会使用场馆"],
    baikeImg: ""
  },
  {
    id: "sz3", name: "深圳市体育馆", enName: "Shenzhen Gymnasium", city: "shenzhen",
    status: "open", capacity: 15000, type: "综合体育馆",
    tags: ["国内首例开合屋盖", "斗屏", "新锐科技"], opened: "2024",
    history: "最新落成启用，是国内首例集“开合屋盖”与“折叠移动式悬停斗屏”于一体的多功能大型体育馆。",
    events: "篮球联赛、演唱会、冰球", notableEvents: ["2024 CBA深圳男篮主场", "众多开馆重量级演出"],
    baikeImg: ""
  },
  {
    id: "sz4", name: "深圳大运中心体育场", enName: "Universiade Center Stadium", city: "shenzhen",
    status: "open", capacity: 60000, type: "综合体育场",
    tags: ["水晶石", "超大容积"], opened: "2011",
    history: "外立面如巨型绿水晶，设计极为耀眼，是深圳体量最大的单体体育场，能够满足六万人超大编制的演唱会及国际田径赛事。",
    events: "田径、六万人大巡演", notableEvents: ["2011大运会主赛场", "历年天王级巨星大场演唱会"],
    baikeImg: ""
  },
  {
    id: "sz5", name: "宝安体育中心", enName: "Bao'an Stadium", city: "shenzhen",
    status: "open", capacity: 40000, type: "综合体育场",
    tags: ["竹林", "造型优美", "中型场"], opened: "2011",
    history: "外围采用了仿竹林的绿色柱列格栅设计，极为独特，经常用于承办中型室外演唱会和各类足球邀请赛。",
    events: "演唱会、国内足球联赛", notableEvents: ["大运会女足赛事", "大湾区多场群星演唱会"],
    baikeImg: ""
  },

  // 成都 (3)
  {
    id: "cd1", name: "凤凰山体育公园专业足球场", enName: "Phoenix Hill Sports Park", city: "chengdu",
    status: "open", capacity: 50695, type: "专业足球场",
    tags: ["金牌球市", "蜀锦", "亚洲顶级"], opened: "2021",
    history: "建筑设计汲取了蜀锦与盖碗茶的元素，内部场馆拢音效果极为恐怖，“星光点点”的万人合唱成为成都在全网的体育名片。",
    events: "中超巨星主场、户外演艺", notableEvents: ["成都蓉城创造魔鬼主场", "足协杯决赛", "周杰伦等巨星演唱会"],
    baikeImg: ""
  },
  {
    id: "cd2", name: "东安湖体育公园主体育场", enName: "Dong'an Lake Sports Park Stadium", city: "chengdu",
    status: "open", capacity: 40000, type: "综合体育场",
    tags: ["大运主场", "飞碟", "绝美夜景"], opened: "2021",
    history: "圆盘“飞碟”造型，屋顶包含一面巨大的“太阳神鸟”图案，是第31届世界大学生夏季运动会的主会场，现为成都最重量级的全能演艺及赛事中心。",
    events: "大型开闭幕式、超级演唱会、田径", notableEvents: ["2023大运会开幕式", "多场破纪录的演唱会"],
    baikeImg: ""
  },
  {
    id: "cd3", name: "成都露天音乐公园", enName: "Chengdu Open Air Music Park", city: "chengdu",
    status: "open", capacity: 47000, type: "露天演艺场",
    tags: ["专为音乐而生", "双面剧场"], opened: "2019",
    history: "目前中国唯一的一座以露天音乐广场为主题的城市公园。主舞台形同展翅的巨大凤凰，拥有4.7万人容量的最大观演草坪区，是顶级沉浸式户外盛典的不二之选。",
    events: "大型音乐节、户外蹦迪、音乐盛典", notableEvents: ["草莓音乐节", "华晨宇火星演唱会", "跨年电音节"],
    baikeImg: ""
  },

  // 重庆 (3)
  {
    id: "cq1", name: "重庆龙兴足球场", enName: "Chongqing Longxing Football Stadium", city: "chongqing",
    status: "open", capacity: 60000, type: "专业足球场",
    tags: ["旋风", "西南之最", "红魂"], opened: "2022",
    history: "重庆第一座、中国西部容量最大的专业足球场。以“重庆气质的火热旋转”为设计理念，红色座椅带极具视觉压迫感。",
    events: "国际足球A级赛、文娱演出", notableEvents: ["原2023亚洲杯承办场"],
    baikeImg: ""
  },
  {
    id: "cq2", name: "重庆奥林匹克体育中心", enName: "Chongqing Olympic Sports Center", city: "chongqing",
    status: "open", capacity: 58680, type: "综合体育场",
    tags: ["老牌圣地", "市中心", "演唱会狂欢"], opened: "2004",
    history: "重庆最核心的老牌体育场地，见证了无数经典岁月。尽管已有年代，凭借市中心的绝佳位置，依然是重庆绝大多数超大型演唱会的唯一落脚点。",
    events: "田径赛、大型巨星巡演", notableEvents: ["2004亚洲杯", "历年五月天/周杰伦等场次"],
    baikeImg: ""
  },
  {
    id: "cq3", name: "重庆大田湾体育场", enName: "Datianwan Stadium", city: "chongqing",
    status: "open", capacity: 32000, type: "综合体育场",
    tags: ["新中国首座", "修旧如旧", "情怀"], opened: "1956 (2022修缮)",
    history: "新中国第一座甲级体育场，位于渝中核心区。2022年完成历时三年的保护性原貌修缮。具有独一无二的碉堡式石头外墙和历史风韵。",
    events: "全民健身、文化主题晚会、足球", notableEvents: ["贺龙元帅点位建设", "前卫寰岛甲A岁月"],
    baikeImg: ""
  },

  // 武汉 (3)
  {
    id: "wh1", name: "武汉体育中心体育场", enName: "Wuhan Sports Center", city: "wuhan",
    status: "open", capacity: 56213, type: "综合体育场",
    tags: ["楚风", "武汉最强场馆"], opened: "2002",
    history: "位于武汉沌口，是武汉常年的大型演唱会垄断者与多项世界级赛事的承办地。场馆呈“马鞍型”结构，极具地域楚风神韵。",
    events: "国足赛事、超大型演唱会、女足世界杯", notableEvents: ["2007女足世界杯", "2019世界军人运动会", "大量演唱会"],
    baikeImg: ""
  },
  {
    id: "wh2", name: "五环体育中心", enName: "Five Rings Sports Center", city: "wuhan",
    status: "open", capacity: 30000, type: "综合体育场",
    tags: ["军运会", "新城核心"], opened: "2019",
    history: "位于东西湖区，如车轮飞转的红色飘带架构，原为世界军人运动会新建，现为武汉三镇足球俱乐部主场，填补了武汉汉口片区顶级场馆空白。",
    events: "中超联赛、中型演唱会", notableEvents: ["第七届世界军人运动会", "武汉三镇勇夺中超冠军主战场"],
    baikeImg: ""
  },
  {
    id: "wh3", name: "光谷国际网球中心", enName: "Optics Valley International Tennis Center", city: "wuhan",
    status: "open", capacity: 15000, type: "室内网球馆/综合",
    tags: ["旋风球场", "WTA", "万人级室内演出"], opened: "2015",
    history: "别称“旋风球场”，拥有巨大的单体网球场（开合屋顶），不仅承接武网赛事，还由于极佳的室内环境被各大巡演团队指定为武汉的室内演艺首选。",
    events: "WTA网球赛、室内演唱会、电竞赛", notableEvents: ["历年武汉网球公开赛", "各大流量歌手武汉站必选"],
    baikeImg: ""
  },

  // 杭州 (3)
  {
    id: "hz1", name: "杭州奥体中心体育场 (大莲花)", enName: "Hangzhou Olympic Sports Centre Stadium", city: "hangzhou",
    status: "open", capacity: 80800, type: "综合体育场",
    tags: ["大莲花", "亚运主场", "容量惊人"], opened: "2018",
    history: "因外形由28片大花瓣和27片小花瓣相交错组成，被市民亲切称为“大莲花”。这是继鸟巢、广东奥体后国内第三大体育场，夜景极其绝美。",
    events: "大型开闭幕式、巨石级演唱会", notableEvents: ["2023杭州亚运会开复幕式", "多场周杰伦连开8万人的破纪录演出"],
    baikeImg: ""
  },
  {
    id: "hz2", name: "黄龙体育中心体育场", enName: "Yellow Dragon Sports Center Stadium", city: "hangzhou",
    status: "open", capacity: 51971, type: "综合体育场",
    tags: ["杭州老牌", "西湖腹地", "双南塔"], opened: "2000 (2022改造)",
    history: "坐落在西湖不远处的黄金地段，承载着杭州几代人的演艺体育记忆，双塔造型是其标志。为亚运会历经全面升级改造，软硬件大踏步跨入全新时代。",
    events: "亚运足球赛、高频演唱会、浙江队主场", notableEvents: ["女足世界杯", "杭州亚运会", "常年高频演唱会"],
    baikeImg: ""
  },
  {
    id: "hz3", name: "杭州奥体中心体育馆 (小莲花旁)", enName: "Hangzhou Olympic Sports Centre Indoor Arena", city: "hangzhou",
    status: "open", capacity: 18000, type: "综合体育馆",
    tags: ["化蝶", "双馆合并", "最强室内"], opened: "2021",
    history: "采用独特的“化蝶”双馆设计（体育馆+游泳馆），是浙江省目前唯一具备举办冰上赛事能力的冰篮转换馆，也是杭州室内顶流的最强收割机。",
    events: "亚运篮球/冰雪、顶流巡回演唱会", notableEvents: ["2023中国顶级电竞赛事", "大量天后天王四面台巡演"],
    baikeImg: ""
  },

  // 西安 (3)
  {
    id: "xa1", name: "西安国际足球中心", enName: "Xi'an International Football Centre", city: "xian",
    status: "under_construction", capacity: 60000, type: "专业足球场",
    tags: ["在建", "马鞍形大跨度", "西北第一双层"], opened: "预计2025",
    history: "将融合周秦汉唐的文化元素与现代流线型设计，双层环绕和巨大的正圆形轮廓视觉极度壮观。建成后将填补西北乃至中亚大区域顶级球场的空白。",
    events: "国际大足赛预备、大型文旅演艺", notableEvents: ["原2023亚洲杯承办场(筹)"],
    baikeImg: ""
  },
  {
    id: "xa2", name: "陕西省体育场 (朱雀)", enName: "Shaanxi Province Stadium", city: "xian",
    status: "open", capacity: 43000, type: "综合体育场",
    tags: ["国足福地", "朱雀门", "火爆球市"], opened: "1999",
    history: "中国著名的“魔鬼主场”之一，曾见证国足在此多次取下历史性大捷。尽管设施老旧年代久远，仍是西安情怀极其深重的承载地和音乐节主场。",
    events: "重大足球预选赛、群星演唱会", notableEvents: ["2001国足十强赛西安主导", "国奥国足多次关键战"],
    baikeImg: ""
  },
  {
    id: "xa3", name: "西安奥体中心体育场", enName: "Xi'an Olympic Sports Center Stadium", city: "xian",
    status: "open", capacity: 60000, type: "综合体育场",
    tags: ["石榴花", "十四运主会场", "西安门户"], opened: "2020",
    history: "形态取意于西安市花“石榴花”，犹如一朵巨型花朵盛开在灞河之畔。是十四运开闭幕式举办地，以5G智慧场馆为标志的西北现代体育巅峰之作。",
    events: "综合大型运动会、六万人级别演唱会", notableEvents: ["2021第十四届全运会", "TFBOYS十周年特大演唱会霸屏热搜"],
    baikeImg: ""
  },

  // 南京 (3)
  {
    id: "nj1", name: "南京奥林匹克体育中心", enName: "Nanjing Olympic Sports Centre Stadium", city: "nanjing",
    status: "open", capacity: 62000, type: "综合体育场",
    tags: ["金陵红", "大红拱门", "江苏符号"], opened: "2005",
    history: "以标志性的两条穿插的巨型红色钢拱（金陵红）著称，极具动态美感，是第二代奥体中心的杰出代表，承办过两届青年规模的国际级盛会。",
    events: "青奥会、十运会、国内天王巨星下江南必停地", notableEvents: ["2005十运会", "2013亚青会", "2014青奥会"],
    baikeImg: ""
  },
  {
    id: "nj2", name: "南京青奥体育公园", enName: "Youth Olympic Sports Park", city: "nanjing",
    status: "open", capacity: 21000, type: "综合体育馆",
    tags: ["江北明珠", "两万全座", "超级巨单体"], opened: "2017",
    history: "外形酷似“江鸥”，其中体育馆单体容量冠绝全亚洲（2.1万座），是国内室内万人级演唱会追求极限容量的不二选择。",
    events: "世锦赛篮球、超级演唱会", notableEvents: ["2019篮球世界杯", "大量歌手连开多场刷新上座率"],
    baikeImg: ""
  },
  {
    id: "nj3", name: "南京五台山体育场", enName: "Wutaishan Sports Center", city: "nanjing",
    status: "open", capacity: 18500, type: "综合体育场",
    tags: ["苏体老家", "情怀", "小型演艺"], opened: "1953",
    history: "位于市中心黄金地段，江苏省最早的一批标志性体育建筑，也是中国建国后最早期的现代化体育场之一。目前多用于中小型演唱会极具氛围的LIVE场。",
    events: "音乐节、大牌私密秀、同城德比", notableEvents: ["江苏足球早年发源地", "李志等独立音乐人里程碑跨年"],
    baikeImg: ""
  },

  // 大连 (3)
  {
    id: "dl1", name: "大连梭鱼湾专业足球场", enName: "Dalian Suoyuwan Football Stadium", city: "dalian",
    status: "open", capacity: 63000, type: "专业足球场",
    tags: ["三面环海", "螺旋上升", "中国足球新圣地"], opened: "2023",
    history: "国内绝无仅有的三面环海专业足球场，外形采用波浪形的双层交错膜结构，极具海洋气息。看台陡峭营造极强压迫感。",
    events: "大连英博主场、国足重磅赛", notableEvents: ["18强赛中国对阵沙特", "全网爆火的大连金牌球市中甲上座王"],
    baikeImg: ""
  },
  {
    id: "dl2", name: "大连体育中心体育场", enName: "Dalian Sports Center Stadium", city: "dalian",
    status: "open", capacity: 60832, type: "综合体育场",
    tags: ["蓝色巨浪", "全运主场"], opened: "2013",
    history: "外廓呈流动曲线，拥有极美的蓝色座位体系设计。是大连市综合承载力最强的户外演唱会及大型赛事大本营。",
    events: "中超、亚冠、各类巨星巡演", notableEvents: ["2013第十二届全运会", "大连阿尔滨/大连人俱乐部主场留痕"],
    baikeImg: ""
  },
  {
    id: "dl3", name: "大连体育中心体育馆", enName: "Dalian Sports Center Arena", city: "dalian",
    status: "open", capacity: 18000, type: "综合体育馆",
    tags: ["万米穹顶", "设备顶尖", "多栖舞台"], opened: "2013",
    history: "东北地区目前最高级别的室内NBA标准竞技与演艺综合馆，完美承接大连冬季长流线室内的各类极限文化表演需求。",
    events: "室内音乐节、巨星大馆巡演", notableEvents: ["腾讯音乐各类颁奖盛典", "海湾多项室内嘉年华"],
    baikeImg: ""
  },
  // 天津 (3)
  {
    id: "tj1", name: "天津奥林匹克中心体育场", enName: "Tianjin Olympic Center Stadium", city: "tianjin",
    status: "open", capacity: 54696, type: "综合体育场",
    tags: ["水滴", "奥运场馆"], opened: "2007",
    history: "俗称“水滴”，是2008年北京奥运会协办场馆之一。外形如一滴水，不仅承接足球赛事，也是大型室外演唱会天津站的首选场地。",
    events: "足球联赛、户外演唱会", notableEvents: ["2008奥运会足球赛", "多次周杰伦等巨星演唱会"],
    baikeImg: ""
  },
  {
    id: "tj2", name: "天津体育馆", enName: "Tianjin Arena", city: "tianjin",
    status: "open", capacity: 10000, type: "综合体育馆",
    tags: ["飞碟", "老牌场馆"], opened: "1995",
    history: "与水滴毗邻，呈“飞碟”状，是天津举办万人级室内演唱会和室内竞技项目的老牌经典场馆。",
    events: "男篮联赛、室内演出", notableEvents: ["第四十三届世乒赛", "大量华语室内巡演"],
    baikeImg: ""
  },
  {
    id: "tj3", name: "天津泰达足球场", enName: "TEDA Football Stadium", city: "tianjin",
    status: "open", capacity: 36390, type: "专业足球场",
    tags: ["国内首批专业球场", "泰达主场"], opened: "2004",
    history: "国内最早建成的顶级专业足球场之一。看台极度贴近球场，2023年大修后重新焕发生机。",
    events: "中超联赛", notableEvents: ["天津津门虎主场", "2004中超元年揭幕战"],
    baikeImg: ""
  },

  // 沈阳 (2)
  {
    id: "sy1", name: "沈阳奥体中心", enName: "Shenyang Olympic Sports Center", city: "shenyang",
    status: "open", capacity: 60000, type: "综合体育场",
    tags: ["水晶皇冠", "东北第一场", "国足福地"], opened: "2007",
    history: "作为2008奥运会分会场建造，是国足数次出线的历史福地。也是东北地区举办超大型演唱会的终极要塞。",
    events: "超级演唱会、国足A级赛", notableEvents: ["2008奥运会男足赛", "国足十二强赛全胜主场"],
    baikeImg: ""
  },
  {
    id: "sy2", name: "辽宁体育馆", enName: "Liaoning Gymnasium", city: "shenyang",
    status: "open", capacity: 12000, type: "综合体育馆",
    tags: ["辽篮主场", "室内火爆球市"], opened: "2007",
    history: "位于浑南新区，是CBA超级强队辽宁男篮的魔鬼主场，见证了辽宁篮球王朝的建立，同时也是顶流室内演唱会常客。",
    events: "CBA总决赛、室内群星演唱会", notableEvents: ["辽宁男篮多次夺冠游行起点", "跨年演唱会"],
    baikeImg: ""
  },

  // 长沙 (3)
  {
    id: "cs1", name: "贺龙体育场", enName: "Helong Stadium", city: "changsha",
    status: "open", capacity: 55000, type: "综合体育场",
    tags: ["国足圣地", "市中心红场"], opened: "2003",
    history: "中国唯一一座以国家领导人名字命名的大型综合体育场。地处长沙繁华市中心，更是国足“抗韩”、“破法”的不败魔鬼主场，近年因演唱会频繁火爆出圈。",
    events: "中韩/中法大战、娱乐之都狂欢巡演", notableEvents: ["2017国足十二强赛1-0阻击韩国", "薛之谦/张杰等霸屏连拍演唱会"],
    baikeImg: ""
  },
  {
    id: "cs2", name: "长沙国际体育文化中心", enName: "Changsha International Sports Cultural Center", city: "changsha",
    status: "under_construction", capacity: 60000, type: "综合演艺/体育场",
    tags: ["在建", "未来新地标"], opened: "预计2026",
    history: "位于南部融城片区，定位为满足国际顶级单项赛事及世界级超大型音乐节的新一代综合性场馆，旨在打破贺龙体育场单一中心的格局。",
    events: "未来超大规模演艺群落", notableEvents: ["规划中"],
    baikeImg: ""
  },
  {
    id: "cs3", name: "湖南国际会展中心 (芒果馆)", enName: "Hunan International Exhibition Center", city: "changsha",
    status: "open", capacity: 10000, type: "综合展演中心",
    tags: ["芒果台福地", "跨年晚会"], opened: "2002",
    history: "紧邻湖南广电，虽然本质是会展中心，但因其超大的无柱空间，成为湖南卫视历年跨年演唱会及多档S级音综的录制狂欢圣地。",
    events: "卫视特大晚会演出、室内音乐节", notableEvents: ["历年湖南卫视跨年演唱会主场", "《歌手》总决赛"],
    baikeImg: ""
  },

  // 青岛 (3)
  {
    id: "qd1", name: "青岛青春足球场", enName: "Qingdao Youth Football Stadium", city: "qingdao",
    status: "open", capacity: 50000, type: "专业足球场",
    tags: ["跃动海浪", "超一流专业球场"], opened: "2023",
    history: "山东省首座五万人级专业足球场，设计灵感来自“跃动海浪”。全罩式屋顶将看台完全覆盖，球迷助威声拢音极佳，为海牛主场。",
    events: "中超联赛、国足世预赛", notableEvents: ["2026世预赛亚洲区18强赛", "各类大牌室外演唱会"],
    baikeImg: ""
  },
  {
    id: "qd2", name: "青岛市民健身中心 (海之沙)", enName: "Qingdao Citizen Fitness Center", city: "qingdao",
    status: "open", capacity: 60000, type: "综合体育场",
    tags: ["海之沙", "超大单馆"], opened: "2018",
    history: "体育场取名“海之沙”，是青岛容量最大的室外体育场馆，主要承接超大型体育综合赛事及六万人级别巅峰演唱会。",
    events: "山东省运会、户外巨星演唱会", notableEvents: ["第24届山东省运会", "林俊杰等天王巡演"],
    baikeImg: ""
  },
  {
    id: "qd3", name: "青岛体育中心国信体育馆", enName: "Qingdao Conson Gymnasium", city: "qingdao",
    status: "open", capacity: 12500, type: "综合体育馆",
    tags: ["钻石馆", "老大哥"], opened: "2009",
    history: "外形如一颗璀璨的钻石，是省内最大的综合性室内体育馆之一。承载了青岛男篮的火爆球市，也是青岛大型室内演艺的垄断者。",
    events: "CBA联赛、室内全档演出", notableEvents: ["苏迪曼杯世界羽毛球混合团体锦标赛", "众多室内四面台绝版演唱会"],
    baikeImg: ""
  },

  // 昆明 (2)
  {
    id: "km1", name: "云南省拓东体育场", enName: "Tuodong Stadium", city: "kunming",
    status: "open", capacity: 40000, type: "综合体育场",
    tags: ["国足发源地之一", "魔鬼高原主场"], opened: "1958",
    history: "建于1950年代的昆明市中心，是中国足球冲出亚洲的绝对高原福地。曾在世预赛中让众多西亚强队吃尽高原反应的苦头。",
    events: "中国足球记忆、昆明唯一大场演出", notableEvents: ["2001十强赛国足神奇不败", "常年高频演唱会"],
    baikeImg: ""
  },
  {
    id: "km2", name: "昆明滇池国际会展中心", enName: "Dianchi International Convention and Exhibition Center", city: "kunming",
    status: "open", capacity: 10000, type: "室内外展演中心",
    tags: ["孔雀展屏", "超大综合体"], opened: "2015",
    history: "设计主题为“孔雀开屏、浩瀚繁星”。虽然以展会为主，但依靠极大的建筑阵列，成为了近年来国内热门说唱、摇滚室内外大型演出西南据点。",
    events: "南博会、LIVE狂欢", notableEvents: ["中国-南亚博览会", "新裤子/重塑等超限室内摇滚大派对"],
    baikeImg: ""
  },

  // 郑州 (2)
  {
    id: "zz1", name: "郑州奥林匹克体育中心", enName: "Zhengzhou Olympic Sports Center", city: "zhengzhou",
    status: "open", capacity: 60000, type: "综合体育场",
    tags: ["中原新地标", "天地之中", "巨型罩棚"], opened: "2019",
    history: "以“天地之中、黄河天水”为设计理念，是中原地区目前最高级别的巨型体育场馆。包容万象的建筑气场成为河南举办数万人大Party的绝对首选。",
    events: "民运会、顶级巨星下沉巡演", notableEvents: ["第十一届全国少数民族传统体育运动会", "华语极度火爆特大规模演唱会"],
    baikeImg: ""
  },
  {
    id: "zz2", name: "郑州航空港专业足球场", enName: "Airport Economy Zone Football Stadium", city: "zhengzhou",
    status: "under_construction", capacity: 60000, type: "专业足球场",
    tags: ["在建", "河南第一专"], opened: "预计2025",
    history: "河南第一座对标世界杯足球赛的特大型专业足球场项目，承载了“建业”老球迷的全新希望。将极大提升中原足球氛围与高级演艺承载极值。",
    events: "极重磅足球赛、超豪演艺筹备中", notableEvents: ["建队30周年新主场大动作筹备中"],
    baikeImg: ""
  },

  // 哈尔滨 (1)
  {
    id: "hrb1", name: "哈尔滨国际会展体育中心", enName: "Harbin ICE Sports Center", city: "harbin",
    status: "open", capacity: 50000, type: "综合体育场",
    tags: ["冰城红魔", "东三省名片"], opened: "2004",
    history: "作为黑龙江最大的体育场，承托了东三省的足球信仰，冬季更以零下几十度极寒观赛的火爆氛围在中国独树一帜。也是哈尔滨唯一能装下五万人的露天演唱会场所。",
    events: "中甲联赛、大型演唱会、冰雪狂欢", notableEvents: ["黑龙江冰城魔鬼主场", "张学友等多场冰城户外巡演"],
    baikeImg: ""
  },

  // 济南 (2)
  {
    id: "jn1", name: "济南奥林匹克体育中心", enName: "Jinan Olympic Sports Center", city: "jinan",
    status: "open", capacity: 60000, type: "综合体育场",
    tags: ["东荷西柳", "鲁军大本营"], opened: "2009",
    history: "以“东荷西柳”绝美建筑布局著称，西侧的体育场呈柳叶造型。是中超豪门山东泰山的魔鬼主场，见证了中超无数荡气回肠的夺冠时刻。",
    events: "中超联赛、全运会、户外定点演唱会", notableEvents: ["2009十一运会", "山东泰山亚冠/中超高光战役", "群星空降济南演唱会"],
    baikeImg: ""
  },
  {
    id: "jn2", name: "山东省体育中心", enName: "Shandong Provincial Sports Center", city: "jinan",
    status: "open", capacity: 43000, type: "综合体育场",
    tags: ["老派豪门", "泰山精神"], opened: "1988",
    history: "一代山东人的信仰圣地。在奥体建成前，是山东鲁能制霸甲A和中超初期的“百万军中取上将首级”的绝对红海主场。目前多用于惠民体育及各类中大型演绎。",
    events: "音乐节下沉现场、历史追忆大秀", notableEvents: ["国足2004亚洲杯主场", "早期中国乃至亚洲极度火热的第一球市"],
    baikeImg: ""
  },

  // 厦门 (2)
  {
    id: "xm1", name: "厦门白鹭体育场", enName: "Xiamen Egret Stadium", city: "xiamen",
    status: "open", capacity: 60000, type: "综合/专业足球场双模式",
    tags: ["全国首例升降看台", "白鹭展翅", "海景最美"], opened: "2023",
    history: "中国唯一、世界罕见的“可实现专业足球场与田径场无模式自由转换”的神级体育场。看台可通过升降设备快速前推，紧贴球场边线。并独拥一线无敌海景。",
    events: "奥运资格赛、金鸡奖关联演艺、国足生死战", notableEvents: ["2023钻石联赛厦门站", "2026世预赛国足死战日本队", "全员爆满的跨年演唱会"],
    baikeImg: ""
  },
  {
    id: "xm2", name: "厦门奥林匹克体育中心凤凰体育馆", enName: "Phoenix Gymnasium", city: "xiamen",
    status: "open", capacity: 18000, type: "综合体育馆",
    tags: ["凤凰", "亚洲最大单体", "演艺新极点"], opened: "2023",
    history: "位于白鹭体育场一侧，不仅拥有极为华丽的曲面外观系统，更作为CBA全明星周末的御用主场，成为了沿海全新崛起的最大型、最豪华的室内演出场馆。",
    events: "全明星周末、室内最顶配演唱会", notableEvents: ["2023/2024接连承办CBA全明星", "林俊杰等各大巨星指定首选站"],
    baikeImg: ""
  },

  // 贵阳 (1)
  {
    id: "gy1", name: "贵阳奥林匹克体育中心", enName: "Guiyang Olympic Sports Center", city: "guiyang",
    status: "open", capacity: 51000, type: "综合体育场",
    tags: ["西南巨晶", "爽爽的贵阳"], opened: "2011",
    history: "坐落在观山湖区，曾是第九届全国少数民族传统体育运动会的主会场，现成为西南腹地巡回大秀中云岭贵州站的终极主场。",
    events: "特大型民族运动会、夏季消暑大演艺", notableEvents: ["第九届全国民运会", "中国好声音等现象级室内外综合大录制"],
    baikeImg: ""
  },
  
  // 福州 (1)
  {
    id: "fz1", name: "福州海峡奥林匹克体育中心", enName: "Fuzhou Strait Olympic Sports Center", city: "fuzhou",
    status: "open", capacity: 59562, type: "综合体育场",
    tags: ["海螺", "青运会", "福建巨无霸"], opened: "2015",
    history: "外形酷似海螺，为第一届全国青年运动会而建。是目前福建省容纳人数最多的大型综合性体育场，近年来火爆异常的大型商业演唱会频频落户在此。",
    events: "全国级各类田径单项、极高频群星演唱会", notableEvents: ["第一届全国青年运动会", "多位破纪录华语天王福州定点"],
    baikeImg: ""
  },

  // 南宁 (1)
  {
    id: "nn1", name: "广西体育中心", enName: "Guangxi Sports Center", city: "nanning",
    status: "open", capacity: 60000, type: "综合体育场",
    tags: ["绿叶", "中国杯", "东盟枢纽"], opened: "2010",
    history: "场馆造型如漂浮的绿叶，极具热带亚热带风情。这里曾是中国杯国际足球锦标赛的长期举办地，云集了大量世界顶级球星登场。也是西南地区首屈一指的巨星演唱会场馆。",
    events: "国际足球A级锦标赛、大型户外演艺", notableEvents: ["全战线星光灿烂的中国杯", "刘德华等多位不老男神/女神南宁专场"],
    baikeImg: ""
  },

  // 海口 (1)
  {
    id: "hk1", name: "五源河体育场", enName: "Wuyuan River Stadium", city: "haikou",
    status: "open", capacity: 42000, type: "综合体育场",
    tags: ["国际演艺之都", "中超集中隔离赛", "海口之贝"], opened: "2018",
    history: "体育场外形采用海螺和贝壳的理念设计，极为优雅。海口市近年来全力打造“国际演艺之都”，这里几乎每周都在不间断举办全网刷屏的特大型演唱会舞台，号称天涯海角的演艺收割机。",
    events: "中超赛区、全天候高频极大型演唱会", notableEvents: ["中超最特殊时期的赛会制坚固城墙", "周杰伦、薛之谦、华晨宇等海量连场演唱会"],
    baikeImg: ""
  },

  // 苏州 (1)
  {
    id: "su1", name: "苏州奥林匹克体育中心", enName: "Suzhou Olympic Sports Centre", city: "suzhou",
    status: "open", capacity: 45000, type: "综合体育场",
    tags: ["江南绝美", "世乒赛", "超级商圈体育极"], opened: "2018",
    history: "不仅是一座甲级体育中心，它将商业、休闲与体育完美融合。独特的膜结构网壳如一顶江南编织草帽。其软硬件配备在国内首屈一指，也是长三角演唱会兵家必争之地。",
    events: "中超苏州赛区、国际乒羽大型单项、高频演唱会现场", notableEvents: ["中超特殊赛会制主场", "张信哲/林俊杰等顶流全开麦巡回重镇"],
    baikeImg: ""
  },

  // 合肥 (1)
  {
    id: "hf1", name: "合肥体育中心", enName: "Hefei Sports Center", city: "hefei",
    status: "open", capacity: 60000, type: "综合体育场",
    tags: ["皇冠", "四体会", "国足福地"], opened: "2006",
    history: "标志性主体育场呈皇冠造型，为合肥地标建筑。承办过多场国足热身赛和大型艺术博览交流活动。现已成为中部地区顶级文体演出的重地，常年排满重磅艺人。",
    events: "国足/国奥重要友谊赛、室外大型天王演唱会", notableEvents: ["国足对阵泰国历史名局", "大量顶级全内场数万人站席演唱会狂热之夜"],
    baikeImg: ""
  },

  // 南昌 (1)
  {
    id: "nc1", name: "南昌国际体育中心", enName: "Nanchang International Sports Center", city: "nanchang",
    status: "open", capacity: 60000, type: "综合体育场",
    tags: ["九龙湖畔", "七城会", "赣鄱雄鹰"], opened: "2011",
    history: "坐落于红谷滩区，庞大的圆盘网架散发出惊人的金属质感。作为中华人民共和国第七届城市运动会的主会场，是江西省规模最大、规格最高的超级多功能运动圣殿。",
    events: "城运会开闭幕、中南大区最大型群星演出", notableEvents: ["第七届全国城市运动会", "多位传奇巨星南昌空降之地"],
    baikeImg: ""
  },

  // 东莞 (1)
  {
    id: "dg1", name: "东莞篮球中心 (银行篮球中心)", enName: "Dongguan Basketball Center", city: "dongguan",
    status: "open", capacity: 16108, type: "室内综合馆",
    tags: ["NBA标准", "宏远主场", "最强室内声效"], opened: "2014",
    history: "国内严格按照美国NBA标准设计的多功能体育馆。这里是CBA“十一冠王”广东宏远的铁血主场，其完美的声学反馈令其成为大湾区顶尖歌手趋之若鹜的演艺舞台。",
    events: "CBA总决赛、最顶流行顶级室内个唱大场", notableEvents: ["广东宏远多次夺冠", "易建联最高荣誉退役退袍仪式", "跨年大厂晚会级综艺"],
    baikeImg: ""
  }
];
