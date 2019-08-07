import moment from 'moment';

export default class DateService {
  constructor() {
    this.getDate = this.getDate.bind(this);
    this.getTime = this.getTime.bind(this);
  }

  getDate(date) {
    return moment(date).format('dddd, MMMM Do YYYY');
  }


  getTime(date) {
    return moment(date).format('h:mm A');
  }
}
