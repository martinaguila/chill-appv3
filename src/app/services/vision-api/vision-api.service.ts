import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../loader/loader.service';
import { ModalController } from '@ionic/angular';
import { LoadingComponent } from 'src/app/modals/loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class VisionApiService {

  private modal: any;

  constructor(
    private http: HttpClient,
    private modalController: ModalController
    ) { }

  sendToVisionApi(base64Image: string) {
    this.openLoader()
    const visionApiUrl = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyB-lO74kRdrl-Ny2oe3vRo7y_JmFtHvMYA";
    
    const requestBody = {
      requests: [
        {
          image: {
            content: base64Image.replace('data:image/jpeg;base64,', '')
          },
          features: [
            {
              type: "OBJECT_LOCALIZATION",
              maxResults: 10
            }
          ]
        }
      ]
    };
  
    this.http.post(visionApiUrl, requestBody).subscribe((response: any) => {
      // Extract descriptions from the response
      alert(JSON.stringify(response))
      const descriptionsArray = response.responses[0].localizedObjectAnnotations.map((label: any) => label.name);

      // Display the descriptions array
      console.log('Descriptions:', descriptionsArray);
      
      // Optionally, show the array in an alert or use it elsewhere in your app
      alert('Descriptions: ' + JSON.stringify(descriptionsArray));
      // this.loaderService.hideLoader();
      this.closeLoader();
    }, (error: any) => {
      console.error('Error with Vision API:', error);
      alert('Error with Vision API:'+ JSON.stringify(error));
      // this.loaderService.hideLoader();
      this.closeLoader();
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

}
