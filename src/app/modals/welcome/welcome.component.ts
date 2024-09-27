import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ButtonFxService } from 'src/app/services/button-fx/button-fx.service';
import { BgMusicService } from 'src/app/services/bg-music/bg-music.service';
import { OpeningFxService } from 'src/app/services/opening-fx/opening-fx.service';
import { GreetingsFxService } from 'src/app/services/greetings-fx/greetings-fx.service';
import { CustomSearchService } from 'src/app/services/custom-search/custom-search.service';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent  implements OnInit {

  public welcomeMessages: Array<string>;
  public counter: number = 0;

  searchResults: Array<any> = [];

  constructor(
    private modalController: ModalController,
    private buttonService: ButtonFxService,
    private bgMusicService: BgMusicService,
    private openingService: OpeningFxService,
    private greetingsFxService: GreetingsFxService,
    private customSearchService: CustomSearchService
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

    // this.customSearchService.customeSearchApi();
    // console.log(this.test123.items[0].image.thumbnailLink)



    // this.getSearchResults()
    // this.wakoko2()
  }

  async wakoko2() {
    const modal = await this.modalController.create({
      component: ResultComponent,
      cssClass: 'result-modal',
    });
    await modal.present(); // Present the modal
  }

  async wakoko(searchResult: any) {
    const modal = await this.modalController.create({
      component: ResultComponent,
      cssClass: 'result-modal',
      componentProps: {
        paramRes: searchResult,
      }
    });
    await modal.present(); // Present the modal
  }

  private getSearchResults(): void {
    // this.customSearchService.customeSearchApi().subscribe(
    //   (response: any) => {
    //     // console.log(response);
    //     const newResponse = response.items.slice(0, 3);
    //     this.searchResults = newResponse;
    //     const thumbnailLink = response.items[0].image.thumbnailLink;
    //     console.log('Thumbnail Link:', this.searchResults);
    //     this.wakoko(this.searchResults)
    //   },
    //   (error: any) => {
    //     console.error('Error with Vision API:', error);
    //     alert('Error with Vision API: ' + JSON.stringify(error));
    //   }
    // );
  }

  public buttonOnClick(): void {
    this.buttonService.playButtonClickSound();
    if (this.counter === 4) {
      this.greetingsFxService.playButtonClickSound("voice_begin.mp3");        

      setTimeout(() => {
        this.bgMusicService.play();
        this.openingService.playOpeningClickSound();
        this.modalController.dismiss();
      }, 2000);
      return;
    }
    this.counter += 1;

    if (this.counter === 1) {
      this.greetingsFxService.playButtonClickSound("voice_greet.mp3");        
    } else if (this.counter === 2) {
      this.greetingsFxService.playButtonClickSound("voice_guess.mp3");        
    } else if (this.counter === 3) {
      this.greetingsFxService.playButtonClickSound("voice_determine.mp3");        
    }
  }

}
