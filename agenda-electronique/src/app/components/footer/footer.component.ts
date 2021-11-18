import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogInsertComponent } from '../dialog-insert/dialog-insert.component';
import { DialogUpdateComponent } from '../dialog-update/dialog-update.component';
import { DialogDetailComponent } from '../dialog-detail/dialog-detail.component';

import { AgendaService } from '../../service/agenda.service';
import { EventModel } from '../../models/agenda.model';

import Swal from 'sweetalert2';

/* export interface PeriodicElement {
  id: number;
  title: string;
  recurrence: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, title: 'Hydrogen', recurrence: 'H'},
  {id: 2, title: 'Helium', recurrence: 'He'},
  {id: 3, title: 'Lithium', recurrence: 'Li'},
  {id: 4, title: 'Beryllium', recurrence: 'Be'},
  {id: 5, title: 'Boron', recurrence: 'B'},
  {id: 6, title: 'Carbon', recurrence: 'C'},
  {id: 7, title: 'Nitrogen', recurrence: 'N'},
  {id: 8, title: 'Oxygen', recurrence: 'O'},
];
 */

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  selected: any;
  tabDate: any = [];

  objDate: any = {
    day: '',
    month: '',
    year: '',
  };

  allEvents: EventModel[] = [];
  currentEvent: any; // currentEvent: EventModel = new EventModel();
  currentEventDetail: any;

  displayedColumns: string[] = ['id', 'title', 'reccurence', 'action'];
  expandedElement: any | null;

  dataSource: any;

  constructor(public dialog: MatDialog, private agendaservice: AgendaService) {}

  ngOnInit(): void {
    return this.getDataEvent();
  }

  getDate() {
    const date = this.selected.toDateString();
    console.log(date);

    // console.log('Date selectionnee: '+ date.getDay()+ ' ' + date.getMonth() + ' ' + date.getFullYear());

    const tabDate = date.split(' ');
    console.log(
      'Date selected: ' +
        tabDate[0] +
        ' ' +
        tabDate[2] +
        ' ' +
        tabDate[1] +
        ' ' +
        tabDate[3]
    );

    this.objDate.day = tabDate[2];
    this.objDate.month = tabDate[1];
    this.objDate.year = tabDate[3];

    this.openDialogInsert();
  }

  openDialogInsert() {
    // Stockage des valeurs dans la session storage du navigateur
    sessionStorage.setItem('session-day', this.objDate.day);
    sessionStorage.setItem('session-month', this.objDate.month);
    sessionStorage.setItem('session-year', this.objDate.year);

    console.log('Day: ' + this.objDate.day);
    console.log('Month: ' + this.objDate.month);
    console.log('Year: ' + this.objDate.year);

    if (this.objDate.day && this.objDate.month && this.objDate.year) {
      const dialogRef = this.dialog.open(DialogInsertComponent);

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    } else {
      alert('Aucune date selectionnee :)');
    }
  }

  openDialogUpdate(currentEvent: any) {
    this.currentEvent = currentEvent;
    alert(this.currentEvent._id);
    sessionStorage.setItem('current-event', JSON.stringify(this.currentEvent));

    const dialogRef = this.dialog.open(DialogUpdateComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // Function de recuperation des Events de MongoDB
  getDataEvent() {
    this.agendaservice.getDataEvent().subscribe(
      (res: any) => {
        this.allEvents = res;
        console.log(this.allEvents);

        this.dataSource = this.allEvents;
        console.log(this.dataSource);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async deleteEvent(currentEvent: any) {
    this.currentEvent = currentEvent;
    console.log(this.currentEvent);

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.agendaservice.deleteEvent(this.currentEvent._id).subscribe(
          (res) => {
            console.log(res);

            this.getDataEvent(); // Actualiser la page
          },
          (error) => {
            console.log(error);
          }
        );
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  // Function dappel du Composant #Dialog-detail
  openDialogDetail(currentEventDetail: any) {
    this.dialog.open(DialogDetailComponent);

    this.currentEventDetail = currentEventDetail;
    sessionStorage.setItem(
      'current-event-detail',
      JSON.stringify(this.currentEventDetail)
    );
  }
}
