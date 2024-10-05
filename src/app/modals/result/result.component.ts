import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { GreetingsFxService } from 'src/app/services/greetings-fx/greetings-fx.service';
import { SpeakComponent } from '../speak/speak.component';
import { ButtonFxService } from 'src/app/services/button-fx/button-fx.service';
import { ConfettiComponent } from '../confetti/confetti.component';
import { ErrorComponent } from '../error/error.component';
import { BgMusicService } from 'src/app/services/bg-music/bg-music.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {

  resultText: string = "Result text";
  recording: boolean = false;
  micImg: string = "../../../assets/images/mic.png";
  isMatched: boolean = false;
  isPressed: boolean = false;

  gifArr = [
    "../../../assets/gifs/keep-it-up.gif",
    "../../../assets/gifs/nice.gif",
    "../../../assets/gifs/that-is-correct.gif",
    "../../../assets/gifs/very-good.gif",
    "../../../assets/gifs/you-are-awesome-.gif"
  ];

  randomIndex: number = 0;
  paramRes: Array<any> = [];
  paramText: string = "";

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private greetingsFxService: GreetingsFxService,
    private buttonService: ButtonFxService,
    private bgMusicService: BgMusicService
  ) {
    this.paramRes = this.navParams.get('paramRes');
    this.paramText = this.navParams.get("paramText");
  }

  ngOnInit() {}

  async startRecognition() {
    this.buttonService.playButtonClickSound();
  
    // Check if speech recognition is available
    const { available } = await SpeechRecognition.available();
    if (!available) {
      this.displayError("Speech recognition not available on this device.");
      return;
    }
  
    const options = {
      language: 'en-US',
      matches: 5,
      showPartial: false,
    };
  
    const modalSpeak = await this.modalController.create({
      component: SpeakComponent,
      cssClass: 'loader-modal'
    });
    await modalSpeak.present();
  
    try {
      const result = await SpeechRecognition.start(options);
  
      // Check if `matches` is defined, otherwise use an empty array
      const recognizedText = (result.matches || []).map((match: string) => match.toLowerCase());
  
      // Close the "speak" modal after recognition
      await modalSpeak.dismiss();
      this.bgMusicService.play();
      this.isPressed = true;
      
      if (recognizedText.includes(this.paramText.toLowerCase())) {
        this.isMatched = true;
        this.randomIndex = Math.floor(Math.random() * this.gifArr.length);
        await this.openConfetti();
      } else {
        this.isMatched = false;
        // this.displayError("Try again. You didn't match the word.");
      }
    } catch (error) {
      this.displayError("Cannot recognize clearly. Please try again.");
    } finally {
      this.stopRecognition();
    }
  }
  

  async displayError(message: string) {
    const modal = await this.modalController.create({
      component: ErrorComponent,
      cssClass: 'exit-modal',
      componentProps: {
        paramMessage: message
      }
    });
    await modal.present();

    setTimeout(async () => {
      this.greetingsFxService.playButtonClickSound("try-again.mp3");
    }, 200);
  }

  async stopRecognition() {
    this.recording = false;
    try {
      await SpeechRecognition.stop();
    } catch (error) {
      console.error("Error stopping speech recognition:", error);
    }
  }

  close() {
    this.buttonService.playButtonClickSound();
    this.modalController.dismiss();
  }

  async openConfetti() {
    const modal = await this.modalController.create({
      component: ConfettiComponent,
      cssClass: 'conf-modal'
    });
    await modal.present();
  }
}
