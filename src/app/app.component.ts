import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WelcomeComponent } from './modals/welcome/welcome.component';
import { BgMusicService } from './services/bg-music/bg-music.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private modalController: ModalController,
    private bgMusicService: BgMusicService
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
    return await modal.present();
  }
}
