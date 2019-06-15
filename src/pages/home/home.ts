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
    console.log("updated " + this.numbers)
  }
 

}
