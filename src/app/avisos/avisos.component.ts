import { Component, OnInit } from '@angular/core';
import * as confetti from 'canvas-confetti';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.css']
})
export class AvisosComponent implements OnInit {

 
  days=0;
  hours=0; 
  minutes=0;
  seconds=0;
  
  runInterval(){
    setInterval(()=>{
      const contDownTime = new Date('March 28, 2025 23:59:00').getTime();
      const now = new Date().getTime();
      const distance = contDownTime-now;
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    }, 100)
  }
  
   

  ngOnInit() {
    this.runInterval();
  }
}


