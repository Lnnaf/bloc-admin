import moment from "moment";
export class TimeHelper {
  getRelativeTimeFromNow(createdDate: string): string {
    return moment(createdDate).fromNow();
  }

  convertHumanTime(createdDate: Date): string {
    return moment(createdDate).format("DD-MM-yyyy HH:mm:ss");
  }
}
