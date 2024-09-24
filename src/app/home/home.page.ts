import { Component } from '@angular/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { BgMusicService } from '../services/bg-music/bg-music.service';
import { MenuComponent } from '../modals/menu/menu.component';
import { ModalController } from '@ionic/angular';
import { PictureComponent } from '../modals/picture/picture.component';
import { ButtonFxService } from '../services/button-fx/button-fx.service';
import { GreetingsFxService } from '../services/greetings-fx/greetings-fx.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private isVolume: boolean;
  public volumeIcon: string;

  constructor(
    private bgMusicService: BgMusicService,
    private modalController: ModalController,
    private buttonService: ButtonFxService,
    private greetingsFxService: GreetingsFxService
  ) {
    this.isVolume = true;
    this.volumeIcon = 'volume-high-outline';
  }

  ngOnInit() {
    this.getGreeting();
  }

  async takePicture() {
    this.buttonService.playButtonClickSound();
    const modal = await this.modalController.create({
      component: PictureComponent,
      cssClass: 'picture-modal'
    });
    return await modal.present();
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

  // async speakGreeting() {
  //   const greeting = this.getGreeting();
  //   // await this.speakText(greeting);
  // }

  async speakText(text: string) {
    try {
        await TextToSpeech.speak({
            text: text,
            rate: 1.0 // Adjust the speech rate as needed
        });
    } catch (error) {
        console.error('Error speaking text', error);
    }
  }

  async onMenuClick() {
    this.buttonService.playButtonClickSound();
    const modal = await this.modalController.create({
      component: MenuComponent,
      cssClass: 'menu-modal'
    });
    return await modal.present();
  }

  public onVolumeClick(): void {
    this.buttonService.playButtonClickSound();
    this.isVolume = !this.isVolume;

    if (this.isVolume) {
      this.volumeIcon = "volume-high-outline";
      this.bgMusicService.unMute();
    } else {
      this.volumeIcon = "volume-mute-outline";
      this.bgMusicService.mute();
    }
  }
}
