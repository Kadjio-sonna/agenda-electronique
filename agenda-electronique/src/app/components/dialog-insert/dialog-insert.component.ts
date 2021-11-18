import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../../service/agenda.service';
import { EventModel } from '../../models/agenda.model';

@Component({
  selector: 'app-dialog-insert',
  templateUrl: './dialog-insert.component.html',
  styleUrls: ['./dialog-insert.component.css'],
})
export class DialogInsertComponent implements OnInit {
  objDate: any = {
    day: '',
    month: '',
    year: '',
  };

  /*   objData: any = {
    id: 0,
    title: '',
    place: '',
    dpStart: new Date(),
    dpEnd: new Date(),
    hrStart: '',
    hrEnd: '',
    recur: '',
    dpEndRecur: new Date(),
  };
 */
  dpEndRecurr: String = ''; // Variable pour recuperer la Date de Reccurence finale
  indexMonthCurrent: any;
  months: any;

  isShown: boolean = true;
  checkboxJourEntierValue: String = 'part-time';

  event: EventModel = new EventModel();
  allEvents: EventModel[] = [];

  constructor(private agendaservice: AgendaService) {}

  ngOnInit(): void {
    this.getSessionCalendar();
  }

  getSessionCalendar() {
    this.months = [];
    (this.months[1] = 'Jan'),
      (this.months[2] = 'Feb'),
      (this.months[3] = 'Mar'),
      (this.months[4] = 'Apr'),
      (this.months[5] = 'May'),
      (this.months[6] = 'Jun'),
      (this.months[7] = 'Jul'),
      (this.months[8] = 'Aug'),
      (this.months[9] = 'Sep'),
      (this.months[10] = 'Oct'),
      (this.months[11] = 'Nov'),
      (this.months[12] = 'Dec'),
      (this.objDate.day = sessionStorage.getItem('session-day'));
    this.objDate.month = sessionStorage.getItem('session-month');
    this.objDate.year = sessionStorage.getItem('session-year');

    /* Recuperation du this.checkboxJourEntier, Mois et Annee Selctionner au datepicker */
    console.log('Day: ' + this.objDate.day); // Day
    // console.log('Month: '+ this.objDate.month);

    if (this.objDate.month) {
      this.months.forEach((value: any, index: any) => {
        if (this.months[index] == this.objDate.month) {
          console.log('Voici index du mois courant: ' + index);
          this.indexMonthCurrent = index; // Recuperation de numero correspondant au caractere du Mois courant
        }
      });
    } else {
      alert('No Month');
    }

    console.log('Year: ' + this.objDate.year); // Year

    if (this.indexMonthCurrent < 10) {
      this.indexMonthCurrent = '0' + this.indexMonthCurrent;
    } else {
      console.log('Foramt Date Invalide :)');
    }

    alert(
      this.objDate.day + '-' + this.indexMonthCurrent + '-' + this.objDate.year
    );

    this.event.startDate =
      this.objDate.year + '-' + this.indexMonthCurrent + '-' + this.objDate.day; // Affectation de la Date de depart dans le Input Date start
    console.log('/' + this.event.startDate);
  }

  // Function pour Afficher et Cacher les Input de type TIME
  toggleShowTime() {
    this.isShown = !this.isShown;
    if (this.event.checkboxJourEntier == true) {
      this.event.startHour = '00:00';
      this.event.endHour = '00:00';

      this.checkboxJourEntierValue = 'swole day';
    } else {
      this.event.startHour = this.event.startHour;
      this.event.endHour = this.event.endHour;

      this.checkboxJourEntierValue = 'part-time';
    }
    // console.log(this.event.checkboxJourEntier);
    console.log(this.event.startHour, this.event.endHour);
  }

  showData() {
    // console.log(this.event);
    if (this.event.dateRecurrence) {
      var t = this.event.dateRecurrence.toString().split(' ');

      // console.log('Date de fin de recurrence: ' + t[0],t[2],t[1],t[3]);

      // this.dpEndRecurr = t[0] + ' ' + t[2] + ' ' + t[1] + ' ' + t[3]; // Date finale de fin de reccurence
      // this.dpEndRecurr = t[3] + '-' + t[1] + '-' + t[2];
      if (t[1]) {
        this.months.forEach((value: any, index: any) => {
          if (this.months[index] == t[1]) {
            console.log('Voici index du mois courant: ' + index);
            this.indexMonthCurrent = index; // Recuperation de numero correspondant au caractere du Mois courant
          }
        });
      } else {
        alert('No Month');
      }

      if (this.indexMonthCurrent < 10) {
        this.indexMonthCurrent = '0' + this.indexMonthCurrent;
      } else {
        console.log('Foramt Date Invalide :)');
      }

      this.dpEndRecurr = t[3] + '-' + this.indexMonthCurrent + '-' + t[2];
      console.log('Date de fin de recurrence: ' + this.dpEndRecurr);
    } else {
      console.log('Error');
    }
  }

  /* Differentes function du CRUD Event */

  // Ajout d'un Event
  async addEvent() {
    await this.showData();

    var form = {
      title: this.event.title,
      place: this.event.place,
      startDate: this.event.startDate,
      endDate: this.event.endDate,
      startHour: this.event.startHour,
      endHour: this.event.endHour,
      recurrence: this.event.recurrence,
      dateRecurrence: this.dpEndRecurr,
      swoleDay: this.checkboxJourEntierValue, // Save Jour entier
    };
    console.log(form);

    await this.agendaservice.addEvent(form).subscribe(
      (res: any) => {
        console.log(res);
        alert('Event registered successfully :)');
        location.reload();
      },
      (error) => {
        console.log(error);
        alert('Event recording error');
      }
    );
  }
}
