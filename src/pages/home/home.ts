import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataHolderProvider } from '../../providers/data-holder/data-holder';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private DataHolderProvider: DataHolderProvider) {

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

  openWhatsapp(phoneNumber){
    var link = "https://api.whatsapp.com/send?phone="+phoneNumber;
    this.DataHolderProvider.numbers.forEach(element => {
      if(element.number==phoneNumber){
        element.status="read";
      }
    });
    this.DataHolderProvider.updateNumbertoStorage();
    window.open(link);
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
