import { Component, OnInit } from '@angular/core';
import { MessageService } from '@shared/components/message/message.service';

@Component({
  selector: 'im-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }
  info() {
    this.messageService.show({
      dismissible: true,
      type: 'danger',
      content: 'asda asd 大师的ad阿萨德阿达阿萨德阿萨德翁群翁切位俺成熟'
    });
  }
}
