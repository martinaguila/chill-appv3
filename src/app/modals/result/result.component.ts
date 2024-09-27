import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent  implements OnInit {

  resultText: string = "Result text";
  recording: boolean = false;
  micImg: string = "../../../assets/images/mic.png";

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
//   dump = [
//     {
//         "kind": "customsearch#result",
//         "title": "Cat World | Best Friends Animal Society - Save Them All",
//         "htmlTitle": "Cat World | Best Friends Animal Society - Save Them All",
//         "link": "https://bestfriends.org/sites/default/files/styles/hero_mobile/public/hero-dash/Asana3808_Dashboard_Standard.jpg?h=ebad9ecf&itok=cWevo33k",
//         "displayLink": "bestfriends.org",
//         "snippet": "Cat World | Best Friends Animal Society - Save Them All",
//         "htmlSnippet": "Cat World | Best Friends Animal Society - Save Them All",
//         "mime": "image/jpeg",
//         "fileFormat": "image/jpeg",
//         "image": {
//             "contextLink": "https://bestfriends.org/sanctuary/about-sanctuary/animal-areas/cat-world",
//             "height": 710,
//             "width": 660,
//             "byteSize": 75428,
//             "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT07EF0zWnzu8ZjeXcoUhgOwKyt2gbynifRFGJwBiFK2HJh2XisVtoNfEc&s",
//             "thumbnailHeight": 140,
//             "thumbnailWidth": 130
//         }
//     },
//     {
//         "kind": "customsearch#result",
//         "title": "The Cats (& Humans) of Istanbul - YouTube",
//         "htmlTitle": "The <b>Cats</b> (&amp; Humans) of Istanbul - YouTube",
//         "link": "https://i.ytimg.com/vi/wd6JPuPqE84/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLApGvL4vG-4nhE83c0r8Wc-iKAWYg",
//         "displayLink": "m.youtube.com",
//         "snippet": "The Cats (& Humans) of Istanbul - YouTube",
//         "htmlSnippet": "The <b>Cats</b> (&amp; Humans) of Istanbul - YouTube",
//         "mime": "image/jpeg",
//         "fileFormat": "image/jpeg",
//         "image": {
//             "contextLink": "https://m.youtube.com/watch?v=wd6JPuPqE84",
//             "height": 386,
//             "width": 686,
//             "byteSize": 82285,
//             "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFt1XoayDkdz3WqEfqt17PzPiWIw9cGIOdH2-8VXWVfWkG5xmgQNo4X3Y&s",
//             "thumbnailHeight": 78,
//             "thumbnailWidth": 139
//         }
//     },
//     {
//         "kind": "customsearch#result",
//         "title": "The Natural History of Domestic Cats | Alley Cat Allies",
//         "htmlTitle": "The Natural History of Domestic <b>Cats</b> | Alley Cat Allies",
//         "link": "http://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg",
//         "displayLink": "www.alleycat.org",
//         "snippet": "The Natural History of Domestic Cats | Alley Cat Allies",
//         "htmlSnippet": "The Natural History of Domestic <b>Cats</b> | Alley Cat Allies",
//         "mime": "image/jpeg",
//         "fileFormat": "image/jpeg",
//         "image": {
//             "contextLink": "https://www.alleycat.org/resources/the-natural-history-of-the-cat/",
//             "height": 463,
//             "width": 703,
//             "byteSize": 107329,
//             "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ZZ2PW_PFfQOXhrE3thlj_pkLTIpQDhTzxaUTzIZDAO5g91nwkC5-Sqs&s",
//             "thumbnailHeight": 92,
//             "thumbnailWidth": 140
//         }
//     }
// ]

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
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
    this.recording = !this.recording;
    if (this.recording) {
      this.micImg = "../../../assets/images/mic-muted.png";
    } else {
      this.micImg = "../../../assets/images/mic.png";
    }
    // const { available } = await SpeechRecognition.available();
    
    // if (available) {
    //   this.recording = true;
    //   SpeechRecognition.start({
    //     popup: false,
    //     partialResults: true,
    //     language: 'en-US'
    //   });

    //   SpeechRecognition.addListener('partialResults', (data: any) => {
    //     alert(data.matches);
    //     // this.result = data.matches;
    //   });
    // }
  }

  async stopRecognition() {
    this.micImg = "../../../assets/images/mic.png";
    // this.isRecording = false;
    // await SpeechRecognition.stop();
  }

  close() {
    this.modalController.dismiss();
  }

}
