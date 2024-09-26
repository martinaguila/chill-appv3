import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ButtonFxService } from 'src/app/services/button-fx/button-fx.service';
import { BgMusicService } from 'src/app/services/bg-music/bg-music.service';
import { OpeningFxService } from 'src/app/services/opening-fx/opening-fx.service';
import { GreetingsFxService } from 'src/app/services/greetings-fx/greetings-fx.service';
import { CustomSearchService } from 'src/app/services/custom-search/custom-search.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent  implements OnInit {

  public welcomeMessages: Array<string>;
  public counter: number = 0;

  test123 = {
    "kind": "customsearch#search",
    "url": {
        "type": "application/json",
        "template": "https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json"
    },
    "queries": {
        "request": [
            {
                "title": "Google Custom Search - cats",
                "totalResults": "38560000000",
                "searchTerms": "cats",
                "count": 5,
                "startIndex": 1,
                "inputEncoding": "utf8",
                "outputEncoding": "utf8",
                "safe": "off",
                "cx": "3445a144d26f841f7",
                "searchType": "image",
                "imgSize": "large"
            }
        ],
        "nextPage": [
            {
                "title": "Google Custom Search - cats",
                "totalResults": "38560000000",
                "searchTerms": "cats",
                "count": 5,
                "startIndex": 6,
                "inputEncoding": "utf8",
                "outputEncoding": "utf8",
                "safe": "off",
                "cx": "3445a144d26f841f7",
                "searchType": "image",
                "imgSize": "large"
            }
        ]
    },
    "context": {
        "title": "chill-app"
    },
    "searchInformation": {
        "searchTime": 0.421351,
        "formattedSearchTime": "0.42",
        "totalResults": "38560000000",
        "formattedTotalResults": "38,560,000,000"
    },
    "items": [
        {
            "kind": "customsearch#result",
            "title": "Cat World | Best Friends Animal Society - Save Them All",
            "htmlTitle": "<b>Cat</b> World | Best Friends Animal Society - Save Them All",
            "link": "https://bestfriends.org/sites/default/files/styles/hero_mobile/public/hero-dash/Asana3808_Dashboard_Standard.jpg?h=ebad9ecf&itok=cWevo33k",
            "displayLink": "bestfriends.org",
            "snippet": "Cat World | Best Friends Animal Society - Save Them All",
            "htmlSnippet": "<b>Cat</b> World | Best Friends Animal Society - Save Them All",
            "mime": "image/jpeg",
            "fileFormat": "image/jpeg",
            "image": {
                "contextLink": "https://bestfriends.org/sanctuary/about-sanctuary/animal-areas/cat-world",
                "height": 710,
                "width": 660,
                "byteSize": 75428,
                "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT07EF0zWnzu8ZjeXcoUhgOwKyt2gbynifRFGJwBiFK2HJh2XisVtoNfEc&s",
                "thumbnailHeight": 140,
                "thumbnailWidth": 130
            }
        },
        {
            "kind": "customsearch#result",
            "title": "Cats (2019) - IMDb",
            "htmlTitle": "<b>Cats</b> (2019) - IMDb",
            "link": "https://m.media-amazon.com/images/M/MV5BOTA3NmU1NDMtYzcxMC00ZjI5LTllZWItYWI3MmZkNTE1ZTg0XkEyXkFqcGdeQW1hcmNtYW5u._V1_QL75_UX500_CR0,0,500,281_.jpg",
            "displayLink": "www.imdb.com",
            "snippet": "Cats (2019) - IMDb",
            "htmlSnippet": "<b>Cats</b> (2019) - IMDb",
            "mime": "image/jpeg",
            "fileFormat": "image/jpeg",
            "image": {
                "contextLink": "https://www.imdb.com/title/tt5697572/",
                "height": 281,
                "width": 500,
                "byteSize": 15540,
                "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvbCdQnJQPQozYAzir0Z_nuJakHpSvUIWbjtcIMTcfo0OMeWzC6Kzw2yU&s",
                "thumbnailHeight": 73,
                "thumbnailWidth": 130
            }
        },
        {
            "kind": "customsearch#result",
            "title": "Can Cats See in the Dark? | How Cats Eyes Work TexVetPets",
            "htmlTitle": "Can <b>Cats</b> See in the Dark? | How <b>Cats</b> Eyes Work TexVetPets",
            "link": "https://149360918.v2.pressablecdn.com/wp-content/uploads/2015/12/cat-15-beaver-night-vision-feature-image-01-610x428.jpg",
            "displayLink": "www.texvetpets.org",
            "snippet": "Can Cats See in the Dark? | How Cats Eyes Work TexVetPets",
            "htmlSnippet": "Can <b>Cats</b> See in the Dark? | How <b>Cats</b> Eyes Work TexVetPets",
            "mime": "image/jpeg",
            "fileFormat": "image/jpeg",
            "image": {
                "contextLink": "https://www.texvetpets.org/article/can-cats-see-in-the-dark/",
                "height": 428,
                "width": 610,
                "byteSize": 10868,
                "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEeX6rTw1HSpkPuWp17zPmSnL5KnF-PaYff_sBsFnf0_Route-qwpHDg&s",
                "thumbnailHeight": 95,
                "thumbnailWidth": 136
            }
        },
        {
            "kind": "customsearch#result",
            "title": "Is my cat's kneading normal?",
            "htmlTitle": "Is my <b>cat&#39;s</b> kneading normal?",
            "link": "https://www.aaha.org/wp-content/uploads/2024/03/f6e040623ac24c5eb1de09dc0ed20b66.jpg",
            "displayLink": "www.aaha.org",
            "snippet": "Is my cat's kneading normal?",
            "htmlSnippet": "Is my <b>cat&#39;s</b> kneading normal?",
            "mime": "image/jpeg",
            "fileFormat": "image/jpeg",
            "image": {
                "contextLink": "https://www.aaha.org/resources/is-my-cats-kneading-normal/",
                "height": 360,
                "width": 640,
                "byteSize": 141594,
                "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToeZGg7lxg98grq3WpVz6f82nAO2MhresHMuavhBOOG0yTG9vlnz7JIg&s",
                "thumbnailHeight": 77,
                "thumbnailWidth": 137
            }
        },
        {
            "kind": "customsearch#result",
            "title": "10 Fun Facts About Ginger Cats",
            "htmlTitle": "10 Fun Facts About Ginger <b>Cats</b>",
            "link": "https://images.wagwalkingweb.com/media/daily_wag/blog_articles/hero/1662059373.7306607/10-fun-facts-about-ginger-cats-4.png",
            "displayLink": "wagwalking.com",
            "snippet": "10 Fun Facts About Ginger Cats",
            "htmlSnippet": "10 Fun Facts About Ginger <b>Cats</b>",
            "mime": "image/png",
            "fileFormat": "image/png",
            "image": {
                "contextLink": "https://wagwalking.com/daily/10-fun-facts-about-ginger-cats",
                "height": 555,
                "width": 832,
                "byteSize": 75365,
                "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjFXhtwlLH9yhzk-x7ew71_alAAsshOnxaIAcFgshT6_lWc9xIgq4fGg&s",
                "thumbnailHeight": 96,
                "thumbnailWidth": 144
            }
        }
    ]
}

  constructor(
    private modalController: ModalController,
    private buttonService: ButtonFxService,
    private bgMusicService: BgMusicService,
    private openingService: OpeningFxService,
    private greetingsFxService: GreetingsFxService,
    private customSearchService: CustomSearchService
  ) {
    this.welcomeMessages = [
      "Welcome to Chill App!",
      "Chill App will greet you when you open the app.",
      "Go out to take pictures and guess it.",
      "Chill App will determine if your guess is right or wrong.",
      "Let's begin!"
    ];
    this.counter = 0;
   }

  ngOnInit() {
    const isFirstTime = localStorage.getItem('firstTime');
    if (isFirstTime !== 'true') {
      localStorage.setItem('firstTime', 'true');
    } else {
      this.counter = 4;
    }
    // this.customSearchService.customeSearchApi();
    // console.log(this.test123.items[0].image.thumbnailLink)
    // this.getSearchResults()
  }

  private getSearchResults(): void {
    this.customSearchService.customeSearchApi().subscribe(
      (response: any) => {
        console.log(response);
        const thumbnailLink = response.items[0].image.thumbnailLink;
        console.log('Thumbnail Link:', thumbnailLink);
      },
      (error: any) => {
        console.error('Error with Vision API:', error);
        alert('Error with Vision API: ' + JSON.stringify(error));
      }
    );
  }

  public buttonOnClick(): void {
    this.buttonService.playButtonClickSound();
    if (this.counter === 4) {
      this.greetingsFxService.playButtonClickSound("voice_begin.mp3");        

      setTimeout(() => {
        this.bgMusicService.play();
        this.openingService.playOpeningClickSound();
        this.modalController.dismiss();
      }, 2000);
      return;
    }
    this.counter += 1;

    if (this.counter === 1) {
      this.greetingsFxService.playButtonClickSound("voice_greet.mp3");        
    } else if (this.counter === 2) {
      this.greetingsFxService.playButtonClickSound("voice_guess.mp3");        
    } else if (this.counter === 3) {
      this.greetingsFxService.playButtonClickSound("voice_determine.mp3");        
    }
  }

}
