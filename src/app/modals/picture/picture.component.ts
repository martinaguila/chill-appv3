import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ButtonFxService } from 'src/app/services/button-fx/button-fx.service';
import { Camera, CameraResultType, CameraSource  } from '@capacitor/camera';
import { VisionApiService } from 'src/app/services/vision-api/vision-api.service';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss'],
})
export class PictureComponent  implements OnInit {

  public base64Image: string;
  recording: boolean = false;
  result: any;

  constructor(
    private modalController: ModalController,
    private buttonService: ButtonFxService,
    private visionApiService: VisionApiService
  ) {
    this.base64Image = "";
    SpeechRecognition.requestPermission();
   }

  ngOnInit() {
    this.takePicture();
  }

  public onClickBack(): void {
    this.buttonService.playButtonClickSound();
    this.modalController.dismiss();
  }

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        source: CameraSource.Camera,
        resultType: CameraResultType.Base64,
      });

      this.base64Image = `data:image/jpeg;base64,${image.base64String}`;
      // alert(base64Image)
      this.visionApiService.sendToVisionApi(this.base64Image);

    } catch (error) {
      console.error('Error taking picture', error);
    }
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

}
