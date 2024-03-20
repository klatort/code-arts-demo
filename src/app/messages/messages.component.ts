import { Component, OnInit } from '@angular/core';
import { Message } from '../interfaces/message';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMiniFabButton } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit {

  messages: Message[] = [];
  isLoading: boolean = true;
  totalMessages: number | undefined;
  pageIndex: number = 0;
  pageSize: number = 10;
  page: number = 1;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    await this.getPages();
    this.add('1');
  }

  add(p: string) {
    this.messages = [];
    this.isLoading = true;

    this.http.get('http://localhost:3000/msg/get?page=' + p + '&pageSize=' + this.pageSize.toString()).subscribe({
      next: (response: any) => {
        this.messages.push(...response.map((item: any) => ({
          id: item._id,
          name: item.name,
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

  getPages() {
    try {
      this.http.get('http://localhost:3000/msg/pages').subscribe({
        next: (response: any) => {
          console.log(response);
          this.totalMessages = response.totalMessages;
        },
        error: (error: any) => {
          console.log(error);
          this._snackBar.open('ERROR: Please try again later', 'Close');
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  changeScore(message: Message, reaction: string, btn1: MatMiniFabButton, btn2: MatMiniFabButton) {
    reaction == 'like' ? message.likes++ : message.dislikes++;
    btn1.disabled = true;
    const btn2Children = btn2._elementRef.nativeElement.children;
    console.log(btn2Children[1].classList.add('icon-animation'));
    btn2.disabled = true;

    //Some update to the db
    this.http.put('http://localhost:3000/msg/' + message.id, {
      action: reaction
    }).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
        btn1.disabled = false;
        const btn2Children = btn2._elementRef.nativeElement.children;
        btn2Children[1].classList.remove('icon-animation');
        btn2.disabled = false;
        this._snackBar.open('ERROR: Please try again later', 'Close');
      }
    });
  }

  onPageChange(e: any) {
    this.pageIndex = e.pageIndex;
    console.log(e, this.pageIndex);
    this.add(this.pageIndex.toString());
  }
}
