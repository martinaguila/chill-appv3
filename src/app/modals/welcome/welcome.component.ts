import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ButtonFxService } from 'src/app/services/button-fx/button-fx.service';
import { BgMusicService } from 'src/app/services/bg-music/bg-music.service';
import { OpeningFxService } from 'src/app/services/opening-fx/opening-fx.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent  implements OnInit {

  public welcomeMessages: Array<string>;
  public counter: number = 0;

  constructor(
    private modalController: ModalController,
    private buttonService: ButtonFxService,
    private bgMusicService: BgMusicService,
    private openingService: OpeningFxService
  ) {
    this.welcomeMessages = [
      "Welcome to Chill App!",
      "Chill App will greet you when you open the app.",
      "Go out to take pictures and guess it.",
      "Chill App will determine if your guess is right or wrong.",
      "Let's begin!"
    ];
    this.counter = 0;
   }

  ngOnInit() {
    const isFirstTime = localStorage.getItem('firstTime');

    if (isFirstTime !== 'true') {
      localStorage.setItem('firstTime', 'true');
    } else {
      this.counter = 4;
    }
  }

  public buttonOnClick(): void {
    this.buttonService.playButtonClickSound();
    if (this.counter === 4) {
      this.bgMusicService.play();
      this.openingService.playOpeningClickSound();
      this.modalController.dismiss();
      return;
    }
    this.counter += 1;
  }

}
