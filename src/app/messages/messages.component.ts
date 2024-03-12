import { Component, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../interfaces/message';
import { MatMiniFabButton } from '@angular/material/button';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  
  messages: Message[] = [];
  isLoading: boolean = true;

  constructor() {
    this.add();
  }

  add() {
    const exampleMsg1: Message = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@huawei.com',
      message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A ratione ad recusandae voluptate iure repellendus animi. Atque ex omnis est et exercitationem. Aspernatur, est! Laudantium ipsa modi voluptatem dolorum voluptates!',
      likes: 10,
      dislikes: 5
    }
    const exampleMsg2: Message = {
      id: 2,
      name: 'John Doe',
      email: 'john.doe@huawei.com',
      message: 'Hello World!',
      likes: 12,
      dislikes: 3
    }
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        if (i % 2 == 0) {
            this.messages.push({...exampleMsg1});
        } else {
          this.messages.push({...exampleMsg2});

        }
      }
      this.isLoading = false;
    }, 2000);
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
