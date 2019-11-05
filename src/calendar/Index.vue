<template>
  <div :class="[{showWeek:isWeek},'calendar-pro']" :style="{width,height}">
    <title-bar :year="renderYear" :month="renderMonth" v-if="showTitle"></title-bar>
    <div class="calendar-pro__body">
      <table width="100%" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th v-for="(weekDay,i) in this.weekTitle" :key="i">{{weekDay}}</th>
          </tr>
        </thead>
        <tbody>
          <tr :class="{'no-left-border':!border}" v-for="(week,j) in weekCount" :key="j">
            <td v-for="(day,m) in 7" :key="m">
              <slot name="dateCell" v-bind:date="currentDate(week,day)"></slot>
              <div @click="dateClick(currentDate(week,day))"><Item :source="currentDate(week,day)"></Item></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script type="text/babel">
import ChineseCalendar from "./js/ChineseCalendar";
import Item from "./Item";
import TitleBar from "./TitleBar";

export default {
  name: "Calendar",
  components: { Item, TitleBar },
  props: {
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "100%"
    },
    defaultDate: {
      type: [Date, String],
      default() {
        return new Date();
      }
    },
    selectDate: {
      type: Array,
      default: ()=>[]
    },
    disabledDate: {
      type: Array,
      default: ()=>[]
    },
    maxDate: {
      type: [Date, String]
    },
    minDate: {
      type: [Date, String]
    },
    highlighterDate: {
      type: Array,
      default: ()=>[]
    },
    //  高亮周末
    isWeek: {
      type: Boolean,
      default: true
    },
    // 是否显示头部标题栏(年月日/按钮)
    showTitle: {
      type: Boolean,
      default: true
    },
    // 是否显示控制按钮
    showControlBtn: {
      type: Boolean,
      default: true
    },
    renderTitle: {
      type: Function,
      default: function(h, year, month) {
        return (
          <div class="calendar-pro__title">
            <div class="calendar-pro__title-info">
              <span class="calendar-pro__year">{year}年</span>
              <span class="calendar-pro__month">{month}月</span>
            </div>
            {this.showControlBtn ? (
              <div class="calendar-pro__tool">
                  <button onClick={() => this.turn(-12)}>上一年
                  </button>
                  <button onClick={() => this.turn(-1)}>上一月
                  </button>
                  <button onClick={() => this.turnNow()}>本月</button>
                  <button onClick={() => this.turn(1)}>
                    下一月
                  </button>
                  <button onClick={() => this.turn(12)}>
                    下一年
                  </button>
              </div>
            ) : null}
          </div>
        );
      }
    },
    //  是否渲染农历
    showLunar: {
      type: Boolean,
      default: true
    },
    //  是否渲染节日
    showFestival: {
      type: Boolean,
      default: true
    },
    //  是否渲染节气
    showTerm: {
      type: Boolean,
      default: true
    },
    weekTitleAlign: {
      type: String,
      default: "right"
    },
    weekCount: {
      type: Number,
      default: 6
    },
    border: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    firstDayOfWeek: {
      type: Number,
      default: 7
    },
    renderContent: {
      type: Function,
      default: function(h, data) {
        var {
          isToday,
          isSelect,
          isHighlighter,
          isDisabled,
          isWeekend,
          isOtherMonthDay,
          date,
          year,
          month,
          day,
          weekDay,
          lunar,
          festival,
          term,
          renderMonth
        } = data;

        // 是否是初一
        var isChuYi = lunar.lunarDay == 1;

        var boxClassName = `day-box
          ${isSelect ? "select" : ""}
          ${isDisabled ? "disabled" : ""}
          ${isHighlighter ? "highlighter" : ""}
          ${isToday ? "today" : ""}
          ${isWeekend ? "weekend" : ""}
          ${isOtherMonthDay ? "other-month-day" : ""} `;
        var lunarClassName = `info-lunar ${isChuYi ? "lunar-first" : ""}`;

        // 农历字符串
        var lunarStr = isChuYi
          ? lunar.lunarMonthChiness + lunar.lunarDayChiness
          : lunar.lunarDayChiness;

        // 节日、节气
        var $festival = festival ? (
          <div class="info-festival">{festival}</div>
        ) : null;
        var $term = term ? <div class="info-term">{term}</div> : null;

        var $date = <span>{day}</span>;

        return (
          <div class={boxClassName}>
            <div class="info-date">{$date}</div>
            {this.showFestival ? $festival : null}
            {this.showLunar ? (
              <div class={lunarClassName}>{lunarStr}</div>
            ) : null}
            {this.showTerm ? $term : null}
          </div>
        );
      }
    },
    beforeRender: Function
  },
  created() {
    this.render(this.renderYear, this.renderMonth);
  },
  data() {
    var date = new Date(this.defaultDate);
    return {
      renderYear: date.getFullYear(),
      renderMonth: date.getMonth() + 1,
      currentMonthDays: [],
      weekTitle: []
    };
  },
  methods: {
    dateClick(date) {
      // 判断不可点击
      if (!date.isDisabled) {
        this.$emit("date-click", date);
        let tempDate = this.formatDate(date.date);
        var index = this.selectDate.indexOf(tempDate);
        if (this.multiple) {
          if (index > -1) {
            this.selectDate.splice(index, 1);
          } else {
            this.selectDate.push(tempDate);
          }
          date.isSelect = !date.isSelect;
        } else {
          this.selectDate.length = 0;
          this.selectDate.push(tempDate);
          date.isSelect = true;
          // 强制render
          this.render(date.year, date.month, this.weekCount);
        }
      }
    },
    /**
     * 获取当前渲染的月份
     * @returns {{year: number | *, month: methods.renderMonth, days: methods.renderMonth}}
     */
    getRenderedMonth() {
      return {
        year: this.renderYear,
        month: this.renderMonth,
        days: this.currentMonthDays
      };
    },
    /**
     * 强制渲染某个月份
     * @param year
     * @param month
     */
    renderThisMonth(year, month) {
      this.render(year, month);
    },
    /**
     * 渲染
     * @param year
     * @param month
     * @param weekCount
     */
    render(year, month, weekCount = this.weekCount) {
      var result = this.monthDetail(year, month, weekCount);
      var beforeRender = this.beforeRender;

      // 重新绑定数据->渲染
      var setInfo = () => {
        this.currentMonthDays = result;
        this.renderYear = year;
        this.renderMonth = month;
      };

      // 如果有beforeRender回调
      if (beforeRender && typeof beforeRender === "function") {
        beforeRender(year, month, setInfo);
      } else {
        setInfo();
      };
    },
    //  日期格式化yyyy-mm-dd
    formatDate: function(date) {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      return year + "-" + month + "-" + day;
    },
    //  日期转时间戳
    dateToTime: function(date) {
      let timestamp = new Date(date).getTime();
      return timestamp;
    },
    /**
     * 计算该月需要渲染的日期信息
     * @param year
     * @param month
     * @param weekCount
     * @returns {Array}
     */
    monthDetail(year, month, weekCount) {
      // 计算用的month为传入month - 1
      var monthToUse = month - 1;
      // 构建该月第一天date对象
      var firstDate = new Date(year, monthToUse);

      // 获取周几信息,0表示周日
      var weekDay = firstDate.getDay();
      // console.log("weekDay", weekDay);

      // firstDayOfWeek设置每周起始日，默认周日0
      // 将date设置为该周的第一天
      switch (this.firstDayOfWeek) {
        case 7:
          this.weekTitle = ["日", "一", "二", "三", "四", "五", "六"];
          firstDate.setDate(1 - weekDay);
          break;
        case 1:
          this.weekTitle = ["一", "二", "三", "四", "五", "六", "日"];
          if (weekDay != 0) {
            firstDate.setDate(2 - weekDay);
          } else {
            firstDate.setDate(weekDay - 5);
          };
          break;
        case 2:
          this.weekTitle = ["二", "三", "四", "五", "六", "日", "一"];
          if (weekDay == 1) {
            firstDate.setDate(weekDay - 6);
          } else if (weekDay != 0) {
            firstDate.setDate(3 - weekDay);
          } else {
            firstDate.setDate(weekDay - 4);
          };
          break;
        case 3:
          this.weekTitle = ["三", "四", "五", "六", "日", "一", "二"];
          if (weekDay == 1) {
            firstDate.setDate(weekDay - 5);
          } else if (weekDay == 2) {
            firstDate.setDate(weekDay - 7);
          } else if (weekDay != 0) {
            firstDate.setDate(4 - weekDay);
          } else {
            firstDate.setDate(weekDay - 3);
          };
          break;
        case 4:
          this.weekTitle = ["四", "五", "六", "日", "一", "二", "三"];
          if (weekDay == 3) {
            firstDate.setDate(weekDay - 8);
          } else if (weekDay == 1) {
            firstDate.setDate(weekDay - 4);
          } else if (weekDay == 2) {
            firstDate.setDate(weekDay - 6);
          } else if (weekDay != 0) {
            firstDate.setDate(5 - weekDay);
          } else {
            firstDate.setDate(weekDay - 2);
          };
          break;
        case 5:
          this.weekTitle = ["五", "六", "日", "一", "二", "三", "四"];
          if (weekDay == 3) {
            firstDate.setDate(weekDay - 7);
          } else if (weekDay == 1) {
            firstDate.setDate(weekDay - 3);
          } else if (weekDay == 2) {
            firstDate.setDate(weekDay - 5);
          } else if (weekDay != 0) {
            firstDate.setDate(6 - weekDay);
          } else {
            firstDate.setDate(weekDay - 1);
          };
          break;
        case 6:
          this.weekTitle = ["六", "日", "一", "二", "三", "四", "五"];
          if (weekDay == 0) {
            firstDate.setDate(weekDay);
          } else if (weekDay == 1) {
            firstDate.setDate(weekDay - 2);
          } else if (weekDay == 2) {
            firstDate.setDate(weekDay - 4);
          } else if (weekDay == 3) {
            firstDate.setDate(weekDay - 6);
          } else if (weekDay == 4) {
            firstDate.setDate(weekDay - 8);
          } else if (weekDay == 5) {
            firstDate.setDate(weekDay - 10);
          } else {
            firstDate.setDate(weekDay - 5);
          };
          break;
      };
      // 该月要显示的所有日期对象数组,包括前后月补完
      var monthDays = [];

      var todayDate = new Date();

      for (let i = 0, cursor = firstDate; i < weekCount * 7; i++) {
        // console.log("cursor",cursor)
        let day = cursor.getDate();

        let thisDate = new Date(cursor);
        // console.log("thisDate", thisDate);
        let isToday =
          todayDate.getFullYear() == thisDate.getFullYear() &&
          todayDate.getMonth() == thisDate.getMonth() &&
          todayDate.getDate() == thisDate.getDate();

        //  var dateStr = `${year}-${this.twoDigit(month)}-${this.twoDigit(day)}`
        //  let isSelect = this.selectDate.indexOf(dateStr);
        //  let tempDate = thisDate.getFullYear()+"-"+this.twoDigit(thisDate.getMonth()+1)+"-"+this.twoDigit(thisDate.getDate());
        let tempDate = this.formatDate(thisDate);
        let isSelect = this.selectDate.indexOf(tempDate) >= 0 || false;
        let isHighlighter = this.highlighterDate.indexOf(tempDate) >= 0 || false;
        var isDisabled;
        if (this.maxDate && this.minDate && this.disabledDate) {
          isDisabled = (this.dateToTime(thisDate) >= this.dateToTime(this.maxDate)) || (this.dateToTime(thisDate) <= this.dateToTime(this.minDate) - 86400000) || this.disabledDate.indexOf(tempDate) >= 0;
        } else if (this.maxDate && this.disabledDate) {
          isDisabled = this.dateToTime(thisDate) >= this.dateToTime(this.maxDate) || this.disabledDate.indexOf(tempDate) >= 0;
        } else if (this.minDate && this.disabledDate) {
          isDisabled = this.dateToTime(thisDate) <= this.dateToTime(this.minDate) - 86400000 || this.disabledDate.indexOf(tempDate) >= 0;
        } else if (this.disabledDate) {
          isDisabled = this.disabledDate.indexOf(tempDate) >= 0;
        } else {
          isDisabled = false;
        };
        // console.log("isSelect",isSelect)
        var defaultDate = new Date(this.defaultDate);
        let isDefaultDate =
          defaultDate.getFullYear() == defaultDate.getFullYear() &&
          defaultDate.getMonth() == defaultDate.getMonth() &&
          defaultDate.getDate() == defaultDate.getDate();

        monthDays.push({
          // 当前日期信息
          date: thisDate,
          year: thisDate.getFullYear(),
          month: thisDate.getMonth() + 1,
          day: thisDate.getDate(),
          weekDay: thisDate.getDay(),
          lunar: ChineseCalendar.date2lunar(thisDate), // 农历
          festival: ChineseCalendar.lunarFestival(thisDate), // 节日
          term: ChineseCalendar.lunarTerm(thisDate), // 节气
          // a:ChineseCalendar.getTerm(thisDate.getFullYear(),(thisDate.getMonth())*2 -1), // 节气
          isToday,
          // 是否是默认的那天
          isDefaultDate,
          // 是否是周末
          isWeekend: thisDate.getDay() == 0 || thisDate.getDay() == 6,
          isSelect,
          isHighlighter,
          isDisabled,
          // 是否是当前渲染月份中的日子
          isOtherMonthDay: thisDate.getMonth() + 1 != month,
          // 当前面板渲染的年、月
          renderYear: year,
          renderMonth: month
        });

        cursor.setDate(day + 1);
      }
      // console.log("monthDays", monthDays);
      return monthDays;
    },
    /**
     * 从当前渲染的月份中根据第几周，第几天获取日期数据
     * @param week
     * @param day
     * @returns {*}
     */
    currentDate(week, day) {
      var index = (week - 1) * 7 + day - 1;
      return this.currentMonthDays[index];
    },
    /**
     * 向后跳转几月，负数则是向前
     * @param step
     */
    turn(step) {
      var year = this.renderYear,
        month = this.renderMonth - 1;
      var date = new Date(year, month);
      date.setMonth(date.getMonth() + step);

      // 获取要渲染的年份、月份
      var toRenderYear = date.getFullYear();
      var toRenderMonth = date.getMonth() + 1;
      // 渲染
      this.render(toRenderYear, toRenderMonth);
    },
    /**
     * 跳转到当前月
     */
    turnNow() {
      var date = new Date();
      // 获取要渲染的年份、月份
      var toRenderYear = date.getFullYear();
      var toRenderMonth = date.getMonth() + 1;
      // 渲染
      this.render(toRenderYear, toRenderMonth);
    }
  },
  watch: {
    renderYear(year, oldYear) {
      this.$emit("year-change", year, this.renderMonth);
    },
    renderMonth(month, oldMonth) {
      this.$emit("month-change", this.renderYear, month);
    },
    defaultDate(date) {
      // var date = new Date(date);

      var year = date.getFullYear();
      var month = date.getMonth() + 1;

      this.render(year, month);
    }
  }
};
</script>