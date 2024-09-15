import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ButtonFxService } from 'src/app/services/button-fx/button-fx.service';
import { Camera, CameraResultType, CameraSource  } from '@capacitor/camera';
import { VisionApiService } from 'src/app/services/vision-api/vision-api.service';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss'],
})
export class PictureComponent  implements OnInit {

  constructor(
    private modalController: ModalController,
    private buttonService: ButtonFxService,
    private visionApiService: VisionApiService
  ) { }

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

      const base64Image = `data:image/jpeg;base64,${image.base64String}`;
      alert(base64Image)
      this.visionApiService.sendToVisionApi(base64Image);

    } catch (error) {
      console.error('Error taking picture', error);
    }
  }

}
