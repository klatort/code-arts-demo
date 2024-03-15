import { Component } from '@angular/core';
import { Message } from '../interfaces/message';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMiniFabButton } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {

  messages: Message[] = [];
  isLoading: boolean = true;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    this.add();
  }

  add() {
    this.isLoading = true;
    this.http.get('http://localhost:3000/msg/get').subscribe({
      next: (response: any) => {
        this.messages.push(...response.map((item: any) => ({
          id: item._id,
          name: item.email,
          email: item.email,
          message: item.message,
          likes: item.likes,
          dislikes: item.dislikes,
          date: item.date
        })));
        this.isLoading = false;
      },
      error: (error: any) => {
        console.log(error);
        this._snackBar.open('ERROR: Please try again later', 'Close');
      }
    });
  }

  changeScore(message: Message, reaction: string, btn1: MatMiniFabButton, btn2: MatMiniFabButton) {
    reaction == 'like' ? message.likes++ : message.dislikes++;
    btn1.disabled = true;
    const btn2Children = btn2._elementRef.nativeElement.children;
    console.log(btn2Children[1].classList.add('icon-animation'));
    btn2.disabled = true;

    //Some update to the db
  }
}
