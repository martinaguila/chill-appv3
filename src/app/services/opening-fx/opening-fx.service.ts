import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpeningFxService {

  private openingSound: HTMLAudioElement;

  constructor() {
    this.openingSound = new Audio();
    this.openingSound.src = 'assets/sounds/opening.mp3';
   }

  playOpeningClickSound() {
    this.openingSound.play();
  }
}
