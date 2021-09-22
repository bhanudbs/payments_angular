import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Form, FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { MsgService } from '../msg.service';
import { ReceiverService } from '../receiver.service';
import { Sender } from '../sender';
import { SenderService } from '../sender.service';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';


@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})
export class SenderComponent implements OnInit {

  @Output()  emitter= new EventEmitter<any>()
  s:string
  f:NgForm
  msgTomodal(){
    this.emitter.emit(this.s)
    this.emitter.emit(this.f)
  }
  trans1=Transaction
  msgArray:any[]=[]
  instArray:any[]=[]
  balance:number
  od:string
  transferT:any
  sdnlist:any
  constructor(public matdialog: MatDialog,private senderS:SenderService, private receiverS:ReceiverService, private messageS:MsgService, private transactionS: TransactionService ) {}

  ngOnInit(): void {
    this.getinstructions()
  }

  getinstructions(){
    this.messageS.getAll()
    .subscribe(
      (data)=>{
        data.forEach(item =>this.instArray.push(item.instruction));
        data.forEach(item =>this.msgArray.push(item.msg));
        console.log(data);
        //this.instArray.push(...data['instruction'])
        //console.log(data)
        //console.log(data.length)
        //console.log(data[0])
        console.log(this.instArray)
        //this.instArray.push(data.instruction)
      }
    )
    console.log(this.instArray)
  }

  onfocusoutsender($event:any,form:NgForm){
    this.senderS.getCById($event.target.value)
    .subscribe(
      (data:{c_id:any; c_name:any; balance:any;overdraft:any}) =>{
      form.controls['c_id'].setValue(data.c_id);
      form.controls['c_name'].setValue(data.c_name);
      this.balance=data.balance
      this.od=data.overdraft
      form.controls['balance'].setValue(data.balance);
      }
    )

    this.senderS.getTransferT($event.target.value)
    .subscribe(
      (data)=>{
        this.transferT=data
        console.log(data)
        form.controls['transferType'].setValue(this.transferT)
      }
    )

  }

  onfocusoutreceiver($event:any,form:NgForm){
    this.receiverS.getBById($event.target.value)
    .subscribe(
      (data:{bic:any; name:any}) =>{
      form.controls['bic'].setValue(data.bic);
      form.controls['name'].setValue(data.name);
      }
    )
  }

  onfocusoutSDN($event:any,form:NgForm){
    this.receiverS.getSdn($event.target.value)
    .subscribe(
      (data)=>{if(data=="1"){this.sdnlist=true} else{this.sdnlist=false};console.log(this.sdnlist)}
    )
 }

  onfocusoutamount($event:any,form:NgForm){
    let tf=0.0025*Number($event.target.value)
    form.controls['tf'].setValue(tf)
    form.controls['clearB'].setValue(this.balance-tf-Number($event.target.value))
  }


  
  
  postaddtransaction($event:any,form:NgForm)
  {
    console.log("Request Sent")
     const trans1: Transaction={
      s_id:form.controls['c_id'].value,
      r_id:form.controls['acc_num'].value,
      b_id:form.controls['bic'].value,
      receiver_name:form.controls['acc_name'].value,
      amount:form.controls['amount'].value,
      msg:this.msgArray[this.instArray.indexOf(form.controls['msgCode'].value)],
      transaction_status:"Success"};
      this.transactionS.postaddtransaction(trans1)
      .subscribe(
        (data)=>{
          let stringg=JSON.stringify(data)
          //this.s=data.toString()
          this.s=data.transaction_status
          this.f=form
          console.log(this.s)
          this.openmodal()
          this.msgTomodal()
        }
      )
    }
    
    // let s_id=forms.controls["c_id"].value
    // let r_id=formr.controls['acc_num'].value
    // let amount=formt.controls['amount'].value+formt.controls['tf'].value
    // let b_id=formr.controls['bic'].value
    // let timestamp=Date.now()
    // let transaction_status="Success"
    // console.log(this.instArray)
    // console.log(formt.controls['msgCode'].value)
    // let index=this.instArray.indexOf(formt.controls['msgCode'].value)
    // console.log(index)
    // console.log(this.msgArray)
    // let msg=this.msgArray[index]
    // console.log(s_id+"\n "+r_id+"\n "+amount+"\n "+b_id+"\n "+timestamp+"\n "+transaction_status+"\n "+msg)
    
    // if(this.sdnlist==true){
    //   alert("Transaction Failed : SDN List")
    // }
    // if(this.od=="No" && formt.controls['clearB'].value<0){
    //   alert("Transaction Failed : No Overdraft, Low Balance")
    // }
    openmodal()
    {
      const dialogC = new MatDialogConfig()
      dialogC.disableClose=true
      dialogC.height="320px"
      dialogC.width="650px"
      dialogC.data={
        s:this.s,f:this.f}
      
      const modaldia=this.matdialog.open(ModalComponent, dialogC)
    }

}

