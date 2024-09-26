import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WelcomeComponent } from './modals/welcome/welcome.component';
import { BgMusicService } from './services/bg-music/bg-music.service';
import { GreetingsFxService } from './services/greetings-fx/greetings-fx.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private modalController: ModalController,
    private bgMusicService: BgMusicService,
    private greetingsFxService: GreetingsFxService
  ) {
    this.initializeApp();
    // this.bgMusicService.preloadAudio();
  }

  private initializeApp(): void {
    const isFirstTime = localStorage.getItem('firstTime');

    // if (isFirstTime !== 'true') {
    //   this.showWelcomeMessage();
    //   localStorage.setItem('firstTime', 'true');
    // }

    this.showWelcomeMessage();
  }

  async showWelcomeMessage() {
    const modal = await this.modalController.create({
      component: WelcomeComponent,
      cssClass: 'welcome-modal'
    });
    await modal.present();

    modal.onDidDismiss().then(() => {
      this.getGreeting();
    });
  }

  private getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      this.greetingsFxService.playButtonClickSound("good-morning.mp3");  
    } else if (hour >= 12 && hour < 18) {
      this.greetingsFxService.playButtonClickSound("good-afternoon.mp3");
    } else {
      this.greetingsFxService.playButtonClickSound("good-evening.mp3");
    }
  }
}
