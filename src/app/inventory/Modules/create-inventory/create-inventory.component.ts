import { Component } from '@angular/core';
import { AbcComponentService } from 'src/app/ABC/abc-component.service';
import { Product } from '../../interfaces/Product';
import { ModalInventoryService } from '../../Services/modal-inventory.service';
import { Api_Service } from 'src/app/creditors/services/api.service';
import {Subscription} from 'rxjs'
import { Response } from 'src/app/interfaces/response';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Inventory } from '../../interfaces/Inventory';
import { DateServicesService } from 'src/app/services/date-services.service';
import { InventoryApiService } from '../../Services/inventory-api.service';

@Component({
  selector: 'app-create-inventory',
  templateUrl: './create-inventory.component.html',
  styleUrls: ['./create-inventory.component.css']
})
export class CreateInventoryComponent extends AbcComponentService<Inventory> {
  products! : Product[]
  subs! : Subscription 
  form_groups: { id: number; formGroup: FormGroup }[] = [];
  current_date : Date = new Date()
  Total_price! : number;
  data_info : Inventory[] = []
  on_create_today : boolean = false
  inventory_info! : {product: Product[]; inventory: Inventory[]}

  constructor(private modal_service : ModalInventoryService,
    private api : Api_Service<Inventory>,
    private builder : FormBuilder,
    private cdr: ChangeDetectorRef,
    private date : DateServicesService,
    private api_inventory : InventoryApiService
       ){
    super(api)
    
    this.inventory_info = {product: {} as Product[], inventory: {} as Inventory[]}
    
  }
  ngOnInit(){

    this.products = []
    this.form_groups = []
    this.api.load_all("products/")
    this.load_inventory()

  }

  update_total(form_: { id: number; formGroup: FormGroup }) {
    this.Total_price = 0;
    this.form_groups.forEach((form: { id: number; formGroup: FormGroup }) => {
      let total = form.formGroup.value.total_value as number
      this.Total_price += total

      if (form.id === form_.id) {
        form.formGroup.patchValue({
          total_value: form.formGroup.value.amount * form.formGroup.value.box_price
        });
      }
    });
  }

  async send(){
    
    await this.chek_date()
    
    this.data_info = []
    if(this.on_create_today){

      this.form_groups.forEach((form : {id: number; formGroup: FormGroup})=>{
        delete form.formGroup.value.product_name
        form.formGroup.value as Inventory
  
        this.data_info.push(form.formGroup.value)
      })
      console.log(this.data_info)
      this.create_or_update({url: "Inventorybox_create",data_dict : this.data_info})
        .then((res : Response)=>{
          if(res.Status){

            this.on_create_today = false
          }
        })
    }else{

      alert("Ya existe un inventario activo para el dia de hoy")
    }
    
    this.on_create_today = false
  }

  ngOnDestroy(){

    this.subs.unsubscribe()
  }

  async chek_date(){
    this.send_data_with_object(
      {
        url:"Inventorybox_check_date",

        object:{date_: this.date.now()} as {date_ : string}

      }).then((res : Response)=>{
        console.log(res)
        if(res.Data == ""){
          this.on_create_today = true
        }else{
          this.on_create_today = false
        }
      })
  }

  async load_inventory(){

    await this.chek_date()
    
    this.subs = this.api.get_all()
      .subscribe((res : Response)=>{
        console.log(res)
        this.inventory_info.product = res.Data
        this.form_groups = []
        this.products = res.Data

        if(this.on_create_today){
          for(let pro of this.inventory_info.product){
            let new_form = this.builder.group({
              id : [pro.id_product],
              product_name : [pro.product_name],
              amount : [0],
              box_price: [0],
              date_inventory : [this.date.now()],
              total_value: [2]
              
            })
            this.form_groups.push({ id: pro.id_product, formGroup: new_form })
          }
        }else{

          this.api_inventory.load_inventory("Inventorybox/")
          this.api_inventory.get_inventory_subject$()
            .subscribe((res : Response)=>{
              this.inventory_info.inventory = res.Data
              const consolidate_inventory_info = [...this.inventory_info.product, ...this.inventory_info.inventory]
              console.log(consolidate_inventory_info)
              for(let pro of this.inventory_info.product){
                let new_form = this.builder.group({
                  id : [pro.id_product],
                  product_name : [pro.product_name],
                  amount : [this.inventory_info.inventory],
                  box_price: [0],
                  date_inventory : [this.date.now()],
                  total_value: [2]
                  
                })
                this.form_groups.push({ id: pro.id_product, formGroup: new_form })
              }
            })
        }
             
      })
  }

  update_inventory(){


  }
}
