import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message = 'You are not logged in'

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/user', { withCredentials:true })
    .subscribe( (res: any) => {
        console.log(res)
        this.message = `Hi ${res.name}`
        Emitters.authEmitter.emit(true)
      }, err => {
        console.log(err)
        this.message = 'You are not logged in'
        Emitters.authEmitter.emit(false)
    })
  }

}