import { Injectable } from '@angular/core';
import {NativeAudio} from '@capacitor-community/native-audio'

@Injectable({
  providedIn: 'root'
})
export class BgMusicService {

  private isMusicLoaded: boolean = false;
  private bgSound: HTMLAudioElement;
  private isMuted: boolean = false;
  private savedVolume: number = 1; // Default volume

  constructor() {
    this.bgSound = new Audio();
    this.bgSound.src = 'assets/sounds/background.mp3';
   }

  preloadAudio() {
    try {
      NativeAudio.preload({
        assetId: 'bgMusic',
        assetPath: 'assets/sounds/background.mp3',
        audioChannelNum: 1,
        isUrl: false
      });
      this.isMusicLoaded = true;
      alert("here")
    } catch (error) {
      alert('Failed to preload background music: '+ error);
    }
  }

  play() {
    // if (!this.isMusicLoaded) {
    //   alert('Background music is not loaded yet.');
    //   return;
    // }

    // // NativeAudio.loop('bgMusic').then(() => {
    // //   NativeAudio.setVolume({
    // //     assetId: 'bgMusic',
    // //     volume: 1,
    // //   });
    // //   console.log('Background music started successfully.');
    // // }).catch(error => {
    // //   console.error('Failed to start background music', error);
    // // });
    // NativeAudio.loop({
    //   assetId: 'bgMusic'
    // });
    this.bgSound.play();
    this.bgSound.loop = true;
  }

  mute() {
    if (!this.isMuted) {
      this.savedVolume = this.bgSound.volume; // Save current volume
      this.bgSound.volume = 0; // Set volume to 0 (muted)
      this.isMuted = true;
      console.log('Background music muted.');
    }
  }

  unMute() {
    // NativeAudio.setVolume({
    //   assetId: 'bgMusic',
    //   volume: 1,
    // });
    if (this.isMuted) {
      this.bgSound.volume = this.savedVolume; // Restore saved volume
      this.isMuted = false;
      console.log('Background music unmuted.');
    }

  }
}
