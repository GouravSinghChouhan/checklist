import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-draganddrop',
  templateUrl: './draganddrop.component.html',
  styleUrls: ['./draganddrop.component.css']
})
export class DraganddropComponent implements OnInit {

  numbers: number[] = [];
   
  constructor() {
    for(let i = 0; i<1000; i++) {
      this.numbers.push(i);
    }
   }

  ngOnInit() {
  }

  drop(event : CdkDragDrop<number[]>) {
    moveItemInArray(this.numbers,event.previousIndex,event.currentIndex);
  }

}
