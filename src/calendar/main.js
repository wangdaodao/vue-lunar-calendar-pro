import Calendar from './Index'
import './css/styles.scss';

Calendar.install = function (Vue) {
  Vue.component(Calendar.name, Calendar)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Calendar = Calendar;
  window.Vue.use(Calendar);
}

export default Calendar
