import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-steps-list',
  templateUrl: './steps-list.component.html',
  styleUrls: ['./steps-list.component.scss']
})
export class StepsListComponent implements OnInit {
  @Input() steps;
  @Input() stage;
  @Input() isFinal;
  
  constructor() { }

  ngOnInit() {
   
  }

}
