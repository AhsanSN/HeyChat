import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataHolderProvider } from '../../providers/data-holder/data-holder';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor( private file: File, private socialSharing: SocialSharing, public navCtrl: NavController, private DataHolderProvider: DataHolderProvider) {

  }

  numbers = [];
  nNumbers = 0;

  ionViewWillLoad(){
    console.log('ionViewWillEnter homepage');
    this.numbers = this.DataHolderProvider.getNumbers();
    this.DataHolderProvider.getNumbersFromServer();
    console.log("number home", this.numbers)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionsPage');
    this.numbers = this.DataHolderProvider.getNumbers();

  }

  ionViewWillEnter(){

    var _this = this;
    setTimeout(function(){
      _this.updateData1_4()
    }, 200);

    setTimeout(function(){
      _this.updateData1_4()
    }, 500);

    setTimeout(function(){
      _this.updateData1_4()
    }, 900);

    setTimeout(function(){
      _this.updateData1_4()
    }, 1500);
  }

  updateData1_4(){
    this.numbers = this.DataHolderProvider.numbers;
    this.nNumbers = this.DataHolderProvider.nNumbers;
    console.log("updated " , this.DataHolderProvider.numbers)
  }

  async openWhatsapp(phoneNumber){
    
    var link = "whatsapp://send?phone="+phoneNumber;
    this.DataHolderProvider.numbers.forEach(element => {
      if(element.number==phoneNumber){
        element.status="read";
      }
    });
    this.DataHolderProvider.updateNumbertoStorage();
     
    //window.open(link);
    //window.plugins.socialSharing.shareViaWhatsAppToPhone('+31611111111', 'Message via WhatsApp', null /* img */, null /* url */, function() {console.log('share ok')})
    
    window['plugins'].socialsharing.shareViaWhatsAppToPhone(phoneNumber, 'Hey!', null /* img */, null /* url */, function() {console.log('share ok')})
    
  
  }

  favorite(phoneNumber){
    this.DataHolderProvider.numbers.forEach(element => {
      if(element.number==phoneNumber){
        element.status="favorite";
      }
    });
    this.DataHolderProvider.updateNumbertoStorage();
  }

  delete(phoneNumber){
    this.DataHolderProvider.numbers.forEach(element => {
      if(element.number==phoneNumber){
        element.status="archived";
      }
    });
    this.DataHolderProvider.updateNumbertoStorage();
  }

 

}
