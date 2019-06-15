import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DataHolderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataHolderProvider {

  public isInternetWorking = true;
  public numbers: {id: number, name: string, number: string, country: string, status: string}[] = [];
  public nNumbers = 0;

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello DataHolderProvider Provider');
    this.getNumbersFromStorageOnLogin();
  }

  getNumbersFromStorageOnLogin(){
    this.storage.get('numbers').then((val) => {

      if (val===null){
        console.log("no numbers found. Error!!!", val);
      }
      else{
        this.numbers = val;
        this.nNumbers = val.length;
        console.log("some numbers found", val);    
      }
    }); 
  }

  getNumbers(){
    //populating data
    //console.log("trans1", this.transactions)
   return this.numbers;
 }

  getNumbersFromServer(){
    var InitiateGetTransactions = function(textIdInp, callback) // How can I use this callback?
     {
         var request = new XMLHttpRequest();
         request.onreadystatechange = function()
         {
             if (request.readyState == 4 && request.status == 200)
             {
                 callback(request.responseText); // Another callback here
             }
             if (request.readyState == 4 && request.status == 0)
             {
                  _this.isInternetWorking = false;
                 console.log("no response for transactions") // Another callback here
             }
         }; 
         request.open("POST", "http://game.anomoz.com/api/wchat/post/read_numbers.php?country=PK");
         request.send();
     }
     
     var _this = this;
     var frameTransactions = function mycallback(data) {
       //_this.numbers = []
       console.log("transactions received from server," , data)
       var dataParsed
       dataParsed = JSON.parse(data);
       if(dataParsed.message=="none"){
         console.log("no transactions")
       }
       else{
         var sampleTrans = dataParsed
           console.log(sampleTrans)
          for (var i=0; i<sampleTrans.length; i++){
              var a = {id:sampleTrans[i].id, name: sampleTrans[i].name, number: sampleTrans[i].number, country: sampleTrans[i].country, status: 'new'}
              if(sampleTrans[i].id>_this.nNumbers){
                _this.numbers.push(a);
                _this.nNumbers +=1;
              }
          }
          //add to local storage
          _this.updateNumbertoStorage();
       }
     }
     InitiateGetTransactions(1, frameTransactions); //passing mycallback as a method 
  }

  updateNumbertoStorage(){
    console.log("transactions storage updated", this.numbers)
    this.storage.set('numbers', this.numbers);
  }


}
