import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VisionApiService {

  constructor(private http: HttpClient) { }

  sendToVisionApi(base64Image: string) {
    const visionApiUrl = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA16UYUHW479vgMM3xmQwia-Pt276WpdVU';
    
    const requestBody = {
      requests: [
        {
          image: {
            content: base64Image.replace('data:image/jpeg;base64,', '')
          },
          features: [
            {
              type: "LABEL_DETECTION", // Choose the type of feature you need
              maxResults: 10
            }
          ]
        }
      ]
    };
  
    this.http.post(visionApiUrl, requestBody).subscribe((response: any) => {
      console.log('Vision API Response:', response);
      alert('Vision API Response:'+ response)
    }, (error: any) => {
      console.error('Error with Vision API:', error);
      alert('Error with Vision API:'+ JSON.stringify(error));
    });
  }
}
