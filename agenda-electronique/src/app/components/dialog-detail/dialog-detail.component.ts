import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-detail',
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog-detail.component.css'],
})
export class DialogDetailComponent implements OnInit {
  currentEventDetail: any;
  typeOfDay: any;
  constructor() {}

  ngOnInit(): void {
    this.showOneEventDetail();
  }

  showOneEventDetail() {
    let objSessionEvent: any = sessionStorage.getItem('current-event-detail');
    this.currentEventDetail = JSON.parse(objSessionEvent);
    console.log(this.currentEventDetail);

    if (
      this.currentEventDetail.startHour == '00:00' &&
      this.currentEventDetail.endHour == '00:00'
    ) {
      this.typeOfDay = "All day";
    }else{
      this.typeOfDay = "Part-time";
    }
  }
}
