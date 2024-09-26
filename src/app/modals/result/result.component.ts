import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent  implements OnInit {

  resultText: string = "Result text";

  gifArr = [
    "../../../assets/gifs/keep-it-up.gif",
    "../../../assets/gifs/nice.gif",
    "../../../assets/gifs/that-is-correct.gif",
    "../../../assets/gifs/very-good.gif",
    "../../../assets/gifs/you-are-awesome-.gif"
  ];
  randomIndex: number = 0;

  constructor() { }

  ngOnInit() {}

  speak() {
    this.randomIndex = Math.floor(Math.random() * this.gifArr.length);
    console.log(this.randomIndex)
  }

}
