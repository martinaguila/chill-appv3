import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ButtonFxService } from 'src/app/services/button-fx/button-fx.service';
import { Camera, CameraResultType, CameraSource  } from '@capacitor/camera';
import { VisionApiService } from 'src/app/services/vision-api/vision-api.service';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { LoadingComponent } from '../loading/loading.component';
import { CustomSearchService } from 'src/app/services/custom-search/custom-search.service';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss'],
})
export class PictureComponent  implements OnInit {

  public base64Image: string;
  recording: boolean = false;
  result: any;
  private modal: any;
  searchResults: Array<any> = [];

  constructor(
    private modalController: ModalController,
    private buttonService: ButtonFxService,
    private visionApiService: VisionApiService,
    private customSearchService: CustomSearchService
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
      this.getVisionResult(this.base64Image);

    } catch (error) {
      console.error('Error taking picture', error);
    }
  }

  private getVisionResult(base64Image: string): void {
    this.openLoader();
    this.visionApiService.sendToVisionApi(base64Image).subscribe(
      (response: any) => {
        // alert(JSON.stringify(response));

        // alert(JSON.stringify(response.responses[0].localizedObjectAnnotations[0].name));
        this.getSearchResult(response.responses[0].localizedObjectAnnotations[0].name);
      },
      (error: any) => {
        this.closeLoader();

        console.error('Error with Vision API:', error);
        alert('Error with Vision API: ' + JSON.stringify(error));
      }
    );
  }

  getSearchResult(searchText: string) {
    this.customSearchService.customeSearchApi(searchText).subscribe(
      (response: any) => {
        // console.log(response);
        const newResponse = response.items.slice(0, 3);
        this.searchResults = newResponse;
        // alert('asd:'+ JSON.stringify(this.searchResults));
        this.openResult(this.searchResults, searchText)
      },
      (error: any) => {
        this.closeLoader();

        console.error('Error with Vision API:', error);
        alert('Error with Vision API: ' + JSON.stringify(error));
      }
    );
  }

  async openResult(searchResult: any, searchText: string) {
    this.closeLoader();
    const modal = await this.modalController.create({
      component: ResultComponent,
      cssClass: 'result-modal',
      componentProps: {
        paramRes: searchResult,
        paramText: searchText
      }
    });
    await modal.present(); // Present the modal
    modal.onDidDismiss().then(() => {
      this.modalController.dismiss();
    });
  }

  async openLoader() {
    this.modal = await this.modalController.create({
      component: LoadingComponent,
      cssClass: 'loader-modal'
    });
    await this.modal.present(); // Present the modal
  }

  async closeLoader() {
    if (this.modal) {
      await this.modal.dismiss(); // Dismiss the modal
      this.modal = null; // Reset the modal instance
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
