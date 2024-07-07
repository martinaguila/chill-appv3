import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource  } from '@capacitor/camera';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { BgMusicService } from '../services/bg-music/bg-music.service';
import { MenuComponent } from '../modals/menu/menu.component';
import { ModalController } from '@ionic/angular';
import { PictureComponent } from '../modals/picture/picture.component';
import { ButtonFxService } from '../services/button-fx/button-fx.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  imageUrl: any;
  recording: boolean = false;
  result: any;
  private isVolume: boolean;
  public volumeIcon: string;

  constructor(
    private bgMusicService: BgMusicService,
    private modalController: ModalController,
    private buttonService: ButtonFxService
  ) {
    this.imageUrl = "";
    SpeechRecognition.requestPermission();
    this.isVolume = true;
    this.volumeIcon = 'volume-high-outline';
  }

  ngOnInit() {
    this.speakGreeting();
  }

  async startRecognition() {
    const { available } = await SpeechRecognition.available();
    
    if (available) {
      this.recording = true;
      SpeechRecognition.start({
        popup: false,
        partialResults: true,
        language: 'en-US'
      });

      SpeechRecognition.addListener('partialResults', (data: any) => {
        alert(data.matches);
        this.result = data.matches;
      });
    }
  }

  async stopRecognition() {
    this.recording = false;
    await SpeechRecognition.stop();
  }

  // async takePicture() {
  //   try {
  //     const image = await Camera.getPhoto({
  //       quality: 90,
  //       allowEditing: false,
  //       resultType: CameraResultType.Uri,
  //       source: CameraSource.Camera // Use CameraSource.Photos for gallery access
  //     });

  //     // Display the taken picture
  //     this.imageUrl = image.webPath; // Assuming you are using Angular and imageUrl is a property bound to an img tag in your HTML
  //   } catch (error) {
  //     console.error('Error taking picture', error);
  //   }
  // }

  async takePicture() {
    this.buttonService.playButtonClickSound();
    const modal = await this.modalController.create({
      component: PictureComponent,
      cssClass: 'picture-modal'
    });
    return await modal.present();
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
        return 'Good morning';
    } else if (hour >= 12 && hour < 18) {
        return 'Good afternoon';
    } else {
        return 'Good evening';
    }
  }

  async speakGreeting() {
    const greeting = this.getGreeting();
    await this.speakText(greeting);
  }

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
