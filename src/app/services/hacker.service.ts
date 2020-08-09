import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HackerService {

  constructor(private _http:HttpClient) { 

  }

  getHackers() {
      return this._http.get(`${environment.APIURL}api/hackers`);
  }
 
  vote(id, votes) {
    return this._http.put(`${environment.APIURL}/api/posts/${id}/vote`, {votes: votes});
  }

  deleteHacker(id) {
    return this._http.delete(`${environment.APIURL}/api/hackers/${id}`);
  }

}
