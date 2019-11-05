var ChineseCalendar = {
    /**
     * https://blog.jjonline.cn/userInterFace/173.html
     * 农历1900-2100的润大小信息表
     * @Array Of Property
     * @return Hex
     *
     * 5位16进制数代表20位2进制
     * 比如1900年代表0x04bd8二进制
     * 0000 0100 1011 1101 1000
     * 其中0-3位代表此年的闰月是大月还是小月，1为大月30天，0为小月29天
     *    4-15位代表1-12月每个月是大月还是小月，1为大月30天，0为小月29天
     *    16-20位代表此年是否闰月，如果全0代表不闰月，否则代表润的月份
     */
    lunarInfo:[0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,//1900-1909
        0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,//1910-1919
        0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,//1920-1929
        0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,//1930-1939
        0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,//1940-1949
        0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,//1950-1959
        0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,//1960-1969
        0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,//1970-1979
        0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,//1980-1989
        0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x05ac0,0x0ab60,0x096d5,0x092e0,//1990-1999
        0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,//2000-2009
        0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,//2010-2019
        0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,//2020-2029
        0x05aa0,0x076a3,0x096d0,0x04afb,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,//2030-2039
        0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,//2040-2049
        /**Add By JJonline@JJonline.Cn**/
        0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50, 0x06b20,0x1a6c4,0x0aae0,//2050-2059
        0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,//2060-2069
        0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,//2070-2079
        0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,//2080-2089
        0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,//2090-2099
        0x0d520],//2100
    /**
     * @{array} 天干对应表
     * **/
    Gan: ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
    /**
     * @{array} 地支对应表
     * **/
    Zhe: ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"],
    /**
     * @{array} 生肖对应表
     * **/
    Animals: ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"],
    /**
     * @{array} 24节气对应表
     * **/
    solarTerm: ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"],
    /**
     * @{array} 星期对应表
     * **/
    weekend: ['日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
    /**
     * @{array} 农历日期对应表
     * **/
    lunarStr: ['初', '十', '廿', '卅'],
    /**
     * @{array} 农历月份对应表
     * **/
    lunarMonStr: ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'],
    /**
     * @{array} 每年的正小寒点到各节期正节期点（即十五度倍数点）的分钟数。
     * 即从小寒到依次的节气的分钟数
     * 地球公转每年都一样
     * 由于公转轨道是椭圆，故这个数列并不是准确的等差数列
     * **/
    sTermInfo: [0, 21208, 42467, 63836,
        85337, 107014, 128867, 150921,
        173149, 195551, 218072, 240693,
        263343, 285989, 308563, 331033,
        353350, 375494, 397447, 419210,
        440795, 462224, 483532, 504758,
    ],
    /**
      * 1900-2100各年的24节气日期速查表
      * @Array Of Property
      * @return 0x string For splice
      */
     sTermInfo1:['9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf97c3598082c95f8c965cc920f',
     '97bd0b06bdb0722c965ce1cfcc920f','b027097bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
     '97bcf97c359801ec95f8c965cc920f','97bd0b06bdb0722c965ce1cfcc920f','b027097bd097c36b0b6fc9274c91aa',
     '97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f','97bd0b06bdb0722c965ce1cfcc920f',
     'b027097bd097c36b0b6fc9274c91aa','9778397bd19801ec9210c965cc920e','97b6b97bd19801ec95f8c965cc920f',
     '97bd09801d98082c95f8e1cfcc920f','97bd097bd097c36b0b6fc9210c8dc2','9778397bd197c36c9210c9274c91aa',
     '97b6b97bd19801ec95f8c965cc920e','97bd09801d98082c95f8e1cfcc920f','97bd097bd097c36b0b6fc9210c8dc2',
     '9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec95f8c965cc920e','97bcf97c3598082c95f8e1cfcc920f',
     '97bd097bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec9210c965cc920e',
     '97bcf97c3598082c95f8c965cc920f','97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
     '97b6b97bd19801ec9210c965cc920e','97bcf97c3598082c95f8c965cc920f','97bd097bd097c35b0b6fc920fb0722',
     '9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f',
     '97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
     '97bcf97c359801ec95f8c965cc920f','97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
     '97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f','97bd097bd07f595b0b6fc920fb0722',
     '9778397bd097c36b0b6fc9210c8dc2','9778397bd19801ec9210c9274c920e','97b6b97bd19801ec95f8c965cc920f',
     '97bd07f5307f595b0b0bc920fb0722','7f0e397bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c920e',
     '97b6b97bd19801ec95f8c965cc920f','97bd07f5307f595b0b0bc920fb0722','7f0e397bd097c36b0b6fc9210c8dc2',
     '9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec9210c965cc920e','97bd07f1487f595b0b0bc920fb0722',
     '7f0e397bd097c36b0b6fc9210c8dc2','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
     '97bcf7f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
     '97b6b97bd19801ec9210c965cc920e','97bcf7f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
     '9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf7f1487f531b0b0bb0b6fb0722',
     '7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
     '97bcf7f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
     '97b6b97bd19801ec9210c9274c920e','97bcf7f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
     '9778397bd097c36b0b6fc9210c91aa','97b6b97bd197c36c9210c9274c920e','97bcf7f0e47f531b0b0bb0b6fb0722',
     '7f0e397bd07f595b0b0bc920fb0722','9778397bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c920e',
     '97b6b7f0e47f531b0723b0b6fb0722','7f0e37f5307f595b0b0bc920fb0722','7f0e397bd097c36b0b6fc9210c8dc2',
     '9778397bd097c36b0b70c9274c91aa','97b6b7f0e47f531b0723b0b6fb0721','7f0e37f1487f595b0b0bb0b6fb0722',
     '7f0e397bd097c35b0b6fc9210c8dc2','9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721',
     '7f0e27f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
     '97b6b7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
     '9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722',
     '7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721',
     '7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722','9778397bd097c36b0b6fc9274c91aa',
     '97b6b7f0e47f531b0723b0787b0721','7f0e27f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
     '9778397bd097c36b0b6fc9210c91aa','97b6b7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
     '7f0e397bd07f595b0b0bc920fb0722','9778397bd097c36b0b6fc9210c8dc2','977837f0e37f149b0723b0787b0721',
     '7f07e7f0e47f531b0723b0b6fb0722','7f0e37f5307f595b0b0bc920fb0722','7f0e397bd097c35b0b6fc9210c8dc2',
     '977837f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0721','7f0e37f1487f595b0b0bb0b6fb0722',
     '7f0e397bd097c35b0b6fc9210c8dc2','977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
     '7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722','977837f0e37f14998082b0787b06bd',
     '7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
     '977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722',
     '7f0e397bd07f595b0b0bc920fb0722','977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
     '7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722','977837f0e37f14998082b0787b06bd',
     '7f07e7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
     '977837f0e37f14998082b0723b06bd','7f07e7f0e37f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
     '7f0e397bd07f595b0b0bc920fb0722','977837f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b0721',
     '7f07e7f0e47f531b0723b0b6fb0722','7f0e37f1487f595b0b0bb0b6fb0722','7f0e37f0e37f14898082b0723b02d5',
     '7ec967f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0722','7f0e37f1487f531b0b0bb0b6fb0722',
     '7f0e37f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
     '7f0e37f1487f531b0b0bb0b6fb0722','7f0e37f0e37f14898082b072297c35','7ec967f0e37f14998082b0787b06bd',
     '7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e37f0e37f14898082b072297c35',
     '7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722',
     '7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f149b0723b0787b0721',
     '7f0e27f1487f531b0b0bb0b6fb0722','7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14998082b0723b06bd',
     '7f07e7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722','7f0e37f0e366aa89801eb072297c35',
     '7ec967f0e37f14998082b0723b06bd','7f07e7f0e37f14998083b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
     '7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14898082b0723b02d5','7f07e7f0e37f14998082b0787b0721',
     '7f07e7f0e47f531b0723b0b6fb0722','7f0e36665b66aa89801e9808297c35','665f67f0e37f14898082b0723b02d5',
     '7ec967f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0722','7f0e36665b66a449801e9808297c35',
     '665f67f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
     '7f0e36665b66a449801e9808297c35','665f67f0e37f14898082b072297c35','7ec967f0e37f14998082b0787b06bd',
     '7f07e7f0e47f531b0723b0b6fb0721','7f0e26665b66a449801e9808297c35','665f67f0e37f1489801eb072297c35',
     '7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722'],
    /**
     * 前两位代表月份，第三位代表第几个星期，第四位代表星期几，其中0代表星期7
     * **/
    wFestive: [
        '0520-母亲节',
        '0630-父亲节',
        '1144-感恩节'
    ],
    /**公历节日
     * 前两位代表月份，后两位代表日期
     **/
    cFestive: [
        '0101-元旦',
        '0214-情人节',
        '0305#1963-雷锋日',
        '0308-妇女节',
        '0312-植树节',
        '0401-愚人节',
        '0422-地球日',
        '0501-劳动日',
        '0504-青年节',
        '0512-护士节',
        '0601#1925-儿童节',
        '0701#1997-建党节',
        '0801#1927-建军节',
        '0910-教师节',
        '1001#1949-国庆节',
        '1224-平安夜',
        '1225-圣诞节',
    ],
    /**农历节日
     * 前两位代表月份，后两位代表日期
     **/
    lFestive: [
        '1230-除夕',
        '0101-春节',
        '0102-正月初二',
        '0115-元宵节',
        '0505-端午节',
        '0707-七夕节',
        '0715-中元节',
        '0815-中秋节',
        '0909-重阳节',
        '1208-腊八节',
        '1223-北方小年',
        '1224-南方小年'
    ],
    /**
     * 参数为农历日期
     * @method 根据年份计算有多少天
     * @param {int} 年
     * @return {int} 天数
     * **/
    lunarYearLength: function(y) {
        var sum = 12 * 29;
        for (var i = 0x8000; i > 0x8; i = i >> 1) {
            sum += (ChineseCalendar.lunarInfo[y - 1900] & i ? 1 : 0);
        }
        sum += ChineseCalendar.leapMonthLengths(y);
        return sum;
    },
    /**
     * 参数为农历日期
     * @method 根据该年份的月份有多少天
     * @param {int} 年
     * @param {int} 月
     * @return {int} 月天数
     * **/
    lunarMonthLength: function(y, m) {
        return ChineseCalendar.lunarInfo[y - 1900] & (0x10000 >> m) ? 30 : 29;
    },
    /**
     * 参数为农历日期
     * @method 根据年份判断是否闰月
     * @param {int} 年
     * @return {boolean} 是否闰月
     * **/
    isLeapMonth: function(y) {
        return ChineseCalendar.lunarInfo[y - 1900] & 0xf ? true : false;
    },
    /**
     * 参数为农历日期
     * @method 根据年份判断闰几月
     * @param {int} 年
     * @return {boolean} 闰几月
     * **/
    leapMonth: function(y) {
        if (ChineseCalendar.isLeapMonth(y)) {
            return ChineseCalendar.lunarInfo[y - 1900] & 0xf;
        }
        return 0;
    },
    /**
     * 参数为农历日期
     * @method 根据年份判断闰月天数，不闰月返回0
     * @param {int} 年
     * @return {int} 闰月天数
     * **/
    leapMonthLengths: function(y) {
        if (ChineseCalendar.isLeapMonth(y)) {
            return ChineseCalendar.lunarInfo[y - 1900] & 0x10000 ? 30 : 29;
        }
        return 0;
    },
    /**
     * 参数为农历日期
     * @method 根据年份判断天干地支年
     * @param {int} 年
     * @return {string} 天干地支
     *
     * 干支纪年方法：
     * 十天干：甲、乙、丙、丁、戊、己、庚、辛、壬、癸。
     * 十二地支：子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥。
     * 干支还是阴阳之分：
     * 甲、丙、戊、庚、壬为阳干，
     * 乙、丁、己、辛、癸为阴干；
     * 子、寅、辰、午、申、戌为阳支，
     * 丑、卯、巳、未、酉、亥为阴支。
     * 以一个天干和一个地支相配，排列起来，
     * 天干在前，地支在后，
     * 天干由甲起，地支由子起，
     * 阳干配阳支，阴干配阴支(阳干不配阴支，阴干不配阳支)，共有六十个组合，称为“六十甲子”。
     * **/
    year2GanZhe: function(y) {
        var gan = (y - 3) % 10;
        if (gan === 0) {
            gan = 10;
        }
        var zhe = (y - 3) % 12;
        if (zhe === 0) {
            zhe = 12;
        }
        return ChineseCalendar.Gan[gan - 1] + ChineseCalendar.Zhe[zhe - 1];
    },
    /**
     * 参数为农历日期
     * @method 根据年份,月份判断天干地支月
     * @param {int} 年
     * @param {int} 月
     * @return {string} 天干地支
     *
     *
     * 干支记月的方法：
     * 如果年干为甲、己，正月从丙寅开始，其余月按照六十甲子计算
     * 如果年干为乙、庚，正月从戊寅开始，其余月按照六十甲子计算
     * 如果年干为丙、辛，正月从庚寅开始，其余月按照六十甲子计算
     * 如果年干为丁、壬，正月从壬寅开始，其余月按照六十甲子计算
     * 如果年干为戊、癸，正月从甲寅开始，其余月按照六十甲子计算
     * **/
    month2GanZhe: function(y, m) {
        var ganY = (y - 3) % 10;
        if (ganY === 0) {
            ganY = 10;
        }
        var month = ((ganY - 1) % 5) * 12 + m + 1;
        return ChineseCalendar.Gan[month % 10] + ChineseCalendar.Zhe[month % 12];
    },
    /**
     * 参数为农历日期
     * @method 按照1900.1.31为甲辰日做起点，根据偏移日，判断天干地支日
     * @param {int} 偏移
     * @return {string} 天干地支
     *
     *
     * 干支记月的方法：
     * 如果年干为甲、己，正月从丙寅开始，其余月按照六十甲子计算
     * 如果年干为乙、庚，正月从戊寅开始，其余月按照六十甲子计算
     * 如果年干为丙、辛，正月从庚寅开始，其余月按照六十甲子计算
     * 如果年干为丁、壬，正月从壬寅开始，其余月按照六十甲子计算
     * 如果年干为戊、癸，正月从甲寅开始，其余月按照六十甲子计算
     * **/
    day2GanZhe: function(offset) {
        var temp = 40 + offset;
        return ChineseCalendar.Gan[temp % 10] + ChineseCalendar.Zhe[temp % 12];
    },
    /**
     * 参数均为公历日期
     * @method 某年的第n个节气为几日(从0小寒起算)
     * @param {int} 年份
     * @param {int} 第几个节气
     * @return {date} 公历日期
     * **/
    sTerm: function(y, n) {
        //ms代表y年第n个节气到1900年第一个节气的毫秒数
        var ms = 31556925974.7 * (y - 1900) + ChineseCalendar.sTermInfo[n] * 60000;
        //1900年一月六日两点五分是正小寒点，此点到1970年1.1 00：00：00的毫秒数
        var base = Date.UTC(1900, 0, 6, 2, 5);
        //对应的公历日期
        var date = new Date(ms + base);
        return date;
    },
    /**
      * 传入公历(!)y年获得该年第n个节气的公历日期
      * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
      * @return day Number
      * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
      */
     getTerm: function(y,n) {
        if(y<1900 || y>2100) {return -1;}
        if(n<1 || n>24) {return -1;}
        var year = y;
        var month = parseInt((n+1)/2);
        var _table = ChineseCalendar.sTermInfo1[y-1900];
        var _info = [
            parseInt('0x'+_table.substr(0,5)).toString() ,
            parseInt('0x'+_table.substr(5,5)).toString(),
            parseInt('0x'+_table.substr(10,5)).toString(),
            parseInt('0x'+_table.substr(15,5)).toString(),
            parseInt('0x'+_table.substr(20,5)).toString(),
            parseInt('0x'+_table.substr(25,5)).toString()
        ];
        var _calday = [
            _info[0].substr(0,1),
            _info[0].substr(1,2),
            _info[0].substr(3,1),
            _info[0].substr(4,2),

            _info[1].substr(0,1),
            _info[1].substr(1,2),
            _info[1].substr(3,1),
            _info[1].substr(4,2),

            _info[2].substr(0,1),
            _info[2].substr(1,2),
            _info[2].substr(3,1),
            _info[2].substr(4,2),

            _info[3].substr(0,1),
            _info[3].substr(1,2),
            _info[3].substr(3,1),
            _info[3].substr(4,2),

            _info[4].substr(0,1),
            _info[4].substr(1,2),
            _info[4].substr(3,1),
            _info[4].substr(4,2),

            _info[5].substr(0,1),
            _info[5].substr(1,2),
            _info[5].substr(3,1),
            _info[5].substr(4,2),
        ];
        if (month<10) {
            month = "0" + month
        };
        var day = parseInt(_calday[n-1]);
        if (day<10) {
            day = "0" + day
        }
        var temp = year+'/'+month+'/'+day;
        var date = new Date(temp);
        // console.log("==============",temp)
        // return parseInt(_calday[n-1]);
        return date;
    },
    /**
     * 参数为公历日期
     * @method 判断是不是节气
     * @param {int} 年份
     * @param {int} 月份
     * @param {date} 日子
     * @return {boolean} 是否是节气，是返回节气名，不是返回false
     * **/
    isTerm: function(y, m, d) {
        var date = new Date(y, m - 1, d);
        var n = 2*m - 1;
        var dateTerm = ChineseCalendar.getTerm(y, n);
        if (ChineseCalendar.isSameDay(dateTerm, date)) {
            return ChineseCalendar.solarTerm[n-1];
        }
        n = n + 1;
        dateTerm = ChineseCalendar.getTerm(y, n);
        if (ChineseCalendar.isSameDay(dateTerm, date)) {
            return ChineseCalendar.solarTerm[n-1];
        }
        // console.log("ChineseCalendar.solarTerm[n]",y, m, d,ChineseCalendar.solarTerm[n])
        return false;
    },
    
    isSameDay: function(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
    },
    /**
     * 参数均为公历日期
     * @method 根据日期获取星座
     * @param {int} 月份
     * @param {int} 日子
     * @return {string} 星座
     * **/
    getStar: function(month, day) {
        var start = ['魔羯', '水瓶', '双鱼', '白羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手', '魔羯'],
            limit = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22],
            result = (month - 1) + (day > limit[month - 1] ? 1 : 0);
        return start[result] + '座';
    },
    /**
     * 参数为农历日期
     * @method 根据月份获取中文写法
     * @param {int} 月份
     * @return {string} 中文
     * **/
    toLunarMonth: function(m, flag) {
        if (flag) {
            return '闰' + ChineseCalendar.lunarMonStr[m - 1] + '月';
        }
        return ChineseCalendar.lunarMonStr[m - 1] + '月';
    },
    /**
     * 参数为农历日期
     * @method 根据日子获取中文写法
     * @param {int} 日子
     * @return {string} 中文
     * **/
    toLunarDay: function(d) {
        if (d === 10) {
            return '初十';
        }
        return ChineseCalendar.lunarStr[Math.floor(d / 10)] + (d % 10 === 0 ? '十' : ChineseCalendar.weekend[d % 10]);
    },
    /**
     * 参数为公历年
     * @method 根据年份获取生肖
     * @param {int} 年
     * @return {string} 生肖
     * **/
    getAnimal: function(y) {
        return ChineseCalendar.Animals[(y - 4) % 12];
    },
    /**
     * 参数为公历年
     * @method 判断是不是今天
     * @param {date} 日期
     * @return {boolean} 是否是今天
     * **/
    isTody: function(date) {
        var now = new Date();
        return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate();
    },
    /**
     * 参数为日期
     * @method 判断是不是节日
     * @param {int} 公历年份
     * @param {int} 公历月份
     * @param {int} 公历日子
     * @param {int} 农历年份
     * @param {int} 农历月份
     * @param {int} 农历日子
     * @return {boolean} 是否是节日，是返回节日名，不是返回false
     * **/
    isFestive: function(y, m, d, ly, lm, ld) {
        var lstr = lm > 9 ? (lm + '') : '0' + lm;
        lstr += ld > 9 ? (ld + '') : '0' + ld;
        var cstr = m > 9 ? (m + '') : '0' + m;
        cstr += d > 9 ? (d + '') : '0' + d;
        //先算农历节日
        var festive = ChineseCalendar.lFestive;
        for (var i = 0, l = festive.length; i < l; i += 1) {
            var test = festive[i].match(/(\d*)-(.*)/);
            if (test[1] === lstr) {
                return test[2];
            }
        }
        //算阳历
        festive = ChineseCalendar.cFestive;
        for (var i = 0, l = festive.length; i < l; i += 1) {
            var test = festive[i].match(/(\d*#?\d*)-(.*)/);
            var year = test[1].split('#');
            if (year[1] && y > year[1]) {
                if (year[0] === cstr) {
                    return test[2];
                }
            } else if (!year[1]) {
                if (test[1] === cstr) {
                    return test[2];
                }
            }
        }
        //算星期，没有算对所以去掉
        festive = ChineseCalendar.wFestive;
        var date = new Date(y, m - 1, d);
        for (var i = 0, l = festive.length; i < l; i += 1) {
            var test = festive[i].match(/(\d*)-(.*)/);
            var month = test[1].substring(0, 2);
            var day = test[1].substring(3, 4);
            var nWeek = test[1].substring(2, 3);
            var str = m > 9 ? (m + '') : '0' + m;
            if (str === month && date.getDay() === parseInt(day)) {
                var temp = ChineseCalendar.theNoWeek(y, m, d);
                if (temp === parseInt(nWeek)) {
                    return test[2];
                }
            }
        }

        return false;
    },
    /**
     * 参数为日期
     * @method 判断是第几周
     * @param {int} 公历年份
     * @param {int} 公历月份
     * @param {int} 公历日子
     * @return {init} 返回第几周
     * **/
    theNoWeek: function(y, m, d) {
        var date = new Date(y, m - 1, d);
        // 先计算出该日期为第几周
        let week = Math.ceil(date.getDate()/7);
        let month = date.getMonth() + 1;
        // 判断这个月前7天是周几，如果不是周一，则计入上个月
        if  (date.getDate() < 7) {
            if (date.getDay() !== 1) {
                week = 5;
                month = date.getMonth();
            }
        }
        return week
    },
    isRunYear: function(year) {
        return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
    },
    getlunarYMD: function(date) {
        var result = {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        };
        var offset = (Date.UTC(result.year, result.month - 1, result.day) - Date.UTC(1900, 0, 31)) / (60 * 60 * 24 * 1000),
            temp = 0;
        for (var i = 1900; i < 2101 && offset > 0; i++) {
            temp = ChineseCalendar.lunarYearLength(i);
            offset -= temp;
        }
        if (offset < 0) {
            offset += temp;
            i--;
        }
        result.lunarYear = i;

        var isLear = false,
            lunarMonth = ChineseCalendar.leapMonth(result.lunarYear);
        for (var i = 1; i < 13 && offset >= 0; i++) {
            temp = ChineseCalendar.lunarMonthLength(result.lunarYear, i);
            offset -= temp;
            isLear = false;
            if (i === lunarMonth) {
                if (offset < 0) {
                    i--;
                    isLear = true;
                } else {
                    temp = ChineseCalendar.leapMonthLengths(result.lunarYear);
                    offset -= temp;
                }
            }
        }
        if (offset < 0) {
            if (i === lunarMonth && isLear) {
                offset += temp;
                isLear = false;
            } else if (i === (lunarMonth + 1)) {
                offset += temp;
                isLear = true;
                i--;
            } else {
                offset += temp;
                i--;
            }
        }
        result.lunarMonth = i;
        result.lunarMonthChiness = ChineseCalendar.toLunarMonth(result.lunarMonth, isLear);

        result.lunarDay = offset + 1;
        result.lunarDayChiness = ChineseCalendar.toLunarDay(result.lunarDay);

        return result;
    },
    lunarFestival: function (date) {
        var result = ChineseCalendar.getlunarYMD(date);
        var festive = ChineseCalendar.isFestive(result.year, result.month, result.day, result.lunarYear, result.lunarMonth, result.lunarDay);
        var term = ChineseCalendar.isTerm(result.year, result.month, result.day);

        if (festive) {
            return festive
        }
    },
    lunarTerm: function (date) {
        var result = ChineseCalendar.getlunarYMD(date);
        var term = ChineseCalendar.isTerm(result.year, result.month, result.day);
        // console.log("term",result,term)
        if (term) {
            return term
        }
    },
    lunarTime: function(date) {
        var result = ChineseCalendar.getlunarYMD(date);

        return result.lunarDayChiness;
    },
    date2lunar: function(date) {
        date = date || new Date();
        var result = {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        };
        //date距离我们的base时间1900-1-31日有多少天
        var offset = (Date.UTC(result.year, result.month - 1, result.day) - Date.UTC(1900, 0, 31)) / (60 * 60 * 24 * 1000),
            temp = 0;
        //干支记日
        result.gzD = ChineseCalendar.day2GanZhe(offset);
        //获取农历年
        for (var i = 1900; i < 2101 && offset > 0; i++) {
            temp = ChineseCalendar.lunarYearLength(i);
            offset -= temp;
        }
        if (offset < 0) {
            offset += temp;
            i--;
        }
        result.lunarYear = i;
        //获取农历月
        var isLear = false,
            lunarMonth = ChineseCalendar.leapMonth(result.lunarYear);
        for (var i = 1; i < 13 && offset >= 0; i++) {
            temp = ChineseCalendar.lunarMonthLength(result.lunarYear, i);
            offset -= temp;
            isLear = false;
            if (i === lunarMonth) {
                if (offset < 0) {
                    i--;
                    isLear = true;
                } else {
                    temp = ChineseCalendar.leapMonthLengths(result.lunarYear);
                    offset -= temp;
                }
            }
        }
        if (offset < 0) {
            if (i === lunarMonth && isLear) {
                offset += temp;
                isLear = false;
            } else if (i === (lunarMonth + 1)) {
                offset += temp;
                isLear = true;
                i--;
            } else {
                offset += temp;
                i--;
            }
        }
        result.lunarMonth = i;
        result.lunarMonthChiness = ChineseCalendar.toLunarMonth(result.lunarMonth, isLear);
        //获取农历日
        result.lunarDay = offset + 1;
        result.lunarDayChiness = ChineseCalendar.toLunarDay(result.lunarDay);
        //获取生肖
        result.animal = ChineseCalendar.getAnimal(result.year);
        //获取星期
        result.week = "星期" + ChineseCalendar.weekend[date.getDay()];
        //获取星座
        result.start = ChineseCalendar.getStar(result.month, result.day);
        //获取干支年
        result.gzY = ChineseCalendar.year2GanZhe(result.lunarYear);

        result.isTody = ChineseCalendar.isTody(date);
        //获取干支月
        result.gzM = ChineseCalendar.month2GanZhe(result.lunarYear, result.lunarMonth);

        //是否是节气，是返回节气名，不是返回false
        result.isTerm = ChineseCalendar.isTerm(result.year, result.month, result.day);
        if (result.isTerm) {
            result.term = result.isTerm;
            result.isTerm = true;
        }
        //是否是节日，是返回节日名，不是返回false
        result.isFestive = ChineseCalendar.isFestive(result.year, result.month, result.day, result.lunarYear, result.lunarMonth, result.lunarDay);
        if (result.isFestive) {
            result.festive = result.isFestive;
            result.isFestive = true;
        }

        return result;
    }
}
export default ChineseCalendar;