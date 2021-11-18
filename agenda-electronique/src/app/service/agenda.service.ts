import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private baseUrl = 'http://127.0.0.1:3000/api/';

  constructor(private http: HttpClient) { }

  getDataEvent(){
    return this.http.get(this.baseUrl + 'events');
  }
  getOneEvent(id: String){
    return this.http.get(this.baseUrl + 'event' + id);
  }
  addEvent(form: any){
    return this.http.post(this.baseUrl + 'add-event', form);
  }
  updateEvent(id: String, form: any){
    return this.http.put(this.baseUrl + 'update-event/' + id, form);
  }
  deleteEvent(id: String){
    return this.http.delete(this.baseUrl + 'delete-event/' + id);
  }
}
