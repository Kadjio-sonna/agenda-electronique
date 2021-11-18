import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../../service/agenda.service';
// import { FooterComponent } from '../footer/footer.component';

// import { EventModel } from '../../models/agenda.model';

@Component({
  selector: 'app-dialog-update',
  templateUrl: './dialog-update.component.html',
  styleUrls: ['./dialog-update.component.css'],
})
export class DialogUpdateComponent implements OnInit {
  isShown: any;

  currentEvent: any;

  objDate: any = {
    day: '',
    month: '',
    year: '',
  };
  indexMonthReccurence: any;

  // months: any; // Tableau de mois
  constructor(private agendaservice: AgendaService) {}

  ngOnInit(): void {
    this.showOneEventUpdate();
  }
  // Function pour Afficher et Cacher les Input de type TIME
  toggleShowTime() {
    this.isShown = !this.isShown;
    if (this.isShown == true) {
      this.currentEvent.startHour = '00:00';
      this.currentEvent.endHour = '00:00';

      this.currentEvent.swoleDay = 'swole day';
    } else {
      this.currentEvent.startHour = this.currentEvent.startHour;
      this.currentEvent.endHour = this.currentEvent.endHour;

      this.currentEvent.swoleDay = 'part-time';
    }
  }

  // Recuperer l'Event courant selectionne sur le tableau afin de Modifier ses donnees
  showOneEventUpdate() {
    /*     this.months = [];
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
      (this.months[12] = 'Dec');
 */
    let objSessionEvent: any = sessionStorage.getItem('current-event');
    this.currentEvent = JSON.parse(objSessionEvent);

    /*
    var dateReccurence = this.currentEvent.dateRecurrence.split(' ');
    this.objDate.day = dateReccurence[1];
    this.objDate.month = dateReccurence[2];
    this.objDate.year = dateReccurence[3];

     if (this.objDate.month) {
      this.months.forEach((value: any, index: any) => {
        if (this.months[index] == this.objDate.month) {
          console.log('Voici index du mois de date reccurence: ' + index);
          this.indexMonthReccurence = index; // Recuperation de numero correspondant au caractere du Mois courant
        }
      });
    } else {
      alert('No Month');
    }

    if (this.indexMonthReccurence < 10) {
      this.indexMonthReccurence = '0' + this.indexMonthReccurence;
    } else {
      console.log('Foramt Date Invalide :)');
    }
 
    this.currentEvent.dateRecurrence =
      this.objDate.year +
      '-' +
      this.indexMonthReccurence +
      '-' +
      this.objDate.day;
 */

    if (this.currentEvent.swoleDay == 'swole day') {
      this.isShown = true;
    } else if (this.currentEvent.swoleDay == 'part-time') {
      this.isShown = false;
    }
    console.log(this.currentEvent); // Objet de session de l'Event a modifier
    // console.log(this.currentEvent.dateRecurrence);
  }

  async updateEvent() {
    var _id = this.currentEvent._id;

    /*     var dateR = this.currentEvent.dateRecurrence.toString().split(' ');
    console.log(dateR);

    this.currentEvent.dateRecurrence =
      dateR[0] + ' ' + dateR[2] + ' ' + dateR[1] + ' ' + dateR[3];
    alert(this.currentEvent.dateRecurrence);
 */
    var form = {
      title: this.currentEvent.title,
      place: this.currentEvent.place,
      startDate: this.currentEvent.startDate,
      endDate: this.currentEvent.endDate,
      startHour: this.currentEvent.startHour,
      endHour: this.currentEvent.endHour,
      recurrence: this.currentEvent.recurrence,
      dateRecurrence: this.currentEvent.dateRecurrence,
      swoleDay: this.currentEvent.swoleDay, // Save your Input Jour entier
    };
    console.log(form);
    await this.agendaservice.updateEvent(_id, form).subscribe(
      (res) => {
        console.log(res);
        alert('Event successfully modified :)');
        location.reload();
      },
      (error) => {
        console.log(error);
        alert('Event modification error');
      }
    );
  }
}
