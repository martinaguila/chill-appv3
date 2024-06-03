import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource  } from '@capacitor/camera';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  imageUrl: any;
  recording: boolean = false;
  result: any;

  constructor(
  ) {
    this.imageUrl = "";
    SpeechRecognition.requestPermission();
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

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera // Use CameraSource.Photos for gallery access
      });

      // Display the taken picture
      this.imageUrl = image.webPath; // Assuming you are using Angular and imageUrl is a property bound to an img tag in your HTML
    } catch (error) {
      console.error('Error taking picture', error);
    }
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
}
