import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class VisionApiService {

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService
    ) { }

  sendToVisionApi(base64Image: string) {
    this.loaderService.showLoader();
    const visionApiUrl = "https://vision.googleapis.com/v1/images:annotate?key=";
    
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
      this.loaderService.hideLoader();
    }, (error: any) => {
      console.error('Error with Vision API:', error);
      alert('Error with Vision API:'+ JSON.stringify(error));
      this.loaderService.hideLoader();
    });
  }
}
