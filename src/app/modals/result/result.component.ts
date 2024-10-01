import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { GreetingsFxService } from 'src/app/services/greetings-fx/greetings-fx.service';
import { SpeakComponent } from '../speak/speak.component';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent  implements OnInit {

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
    private greetingsFxService: GreetingsFxService
  ) {
    this.paramRes = this.navParams.get('paramRes');
    this.paramText = this.navParams.get("paramText");
    console.log(this.paramRes)
   }

  ngOnInit() {}

  // speak() {
  //   this.randomIndex = Math.floor(Math.random() * this.gifArr.length);
  //   console.log(this.randomIndex)
  // }

  async startRecognition() {

    const { available } = await SpeechRecognition.available();
let matchesArr: Array<any> = [];

if (available) {
  this.greetingsFxService.playButtonClickSound("say.mp3");        
  // this.isPressed = true;
  // this.recording = true;

  SpeechRecognition.start({
    popup: false,
    partialResults: true,
    language: 'en-US'
  });

  // Handle partial results (intermediate results during recognition)
  // SpeechRecognition.addListener('partialResults', (data: any) => {
  //   const recognizedText = data.matches[0];
  //   const paramText = this.paramText;
  //   if (recognizedText) matchesArr.push(recognizedText);

  //   if (matchesArr.includes(paramText.toLowerCase())) {
  //     this.isMatched = true;
  //   } else {
  //     this.isMatched = false;
  //   }
  // });

  const modalSpeak = await this.modalController.create({
    component: SpeakComponent,
    cssClass: 'loader-modal'
  });
  await modalSpeak.present(); // Present the modal

  modalSpeak.onDidDismiss().then(() => {
    // Listen for the listeningState event to determine if recognition has stopped
    SpeechRecognition.addListener('listeningState', (data: any) => {
      alert(JSON.stringify(data))
      if (data.status === 'stopped') {
        // Recognition has stopped, handle final logic here
        if (matchesArr.includes(this.paramText.toLowerCase())) {
          this.isMatched = true;
          this.randomIndex = Math.floor(Math.random() * this.gifArr.length);
        } else {
          this.isMatched = false;
        }

        // Mark recording as finished
        this.recording = false;
        this.isPressed = false;
      }
    });
  }); 
  }

  }

  async stopRecognition() {
    this.recording = false;
    await SpeechRecognition.stop();
  }

  close() {
    this.modalController.dismiss();
  }

}
