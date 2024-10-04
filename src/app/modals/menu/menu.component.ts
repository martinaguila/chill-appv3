import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ButtonFxService } from 'src/app/services/button-fx/button-fx.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  constructor(
    private modalController: ModalController,
    private buttonService: ButtonFxService
  ) { }

  ngOnInit() {}

  close() {
    this.buttonService.playButtonClickSound();
    this.modalController.dismiss();
  }

  async openModal(index: number) {
    this.buttonService.playButtonClickSound();
    const modal = await this.modalController.create({
      component: PopupComponent,
      cssClass: 'result-modal',
      componentProps: {
        paramIndex: index
      }
    });
    await modal.present(); // Present the modal
    // modal.onDidDismiss().then(() => {
    //   this.modalController.dismiss();
    // });
  }

}
