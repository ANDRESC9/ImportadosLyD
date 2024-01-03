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
import { Profit } from '../../interfaces/Profit';

@Component({
  selector: 'app-inventory-units',
  templateUrl: './inventory-units.component.html',
  styleUrls: ['./inventory-units.component.css']
})
export class InventoryUnitsComponent extends AbcComponentService<Inventory> {

  form_groups_unit: { id: number; formGroup: FormGroup }[] = [];
  Total_price_unit : number = 0;
  on_create_today_unit : boolean = true
  data_info : Inventory[] = []
  current_date! : string
  products_unit! : Product[]
  subs! : Subscription
  total_price: number = 0
  profit! : Profit
  subs_profit! : Subscription
  constructor(private modal_service : ModalInventoryService,
    private api : Api_Service<Inventory>,
    private builder : FormBuilder,
    private date : DateServicesService,
    private api_inventory : InventoryApiService
       ){
    super(api)
    
    this.current_date = this.date.now()
    
  }

  async ngOnInit(){

    this.subs_profit = this.api_inventory.get_profit$()
      .subscribe((pro : Profit)=>{
        this.profit = pro
      })

    try {

      await this.api.load_all("products/");
      await this.chek_date();
      await this.load_inventory();

    } catch (error) {
      console.error("Error during initialization:", error);
    }
  }
  private async update_total_inventary(){
    this.Total_price_unit = 0
    this.form_groups_unit.forEach((form: { id: number; formGroup: FormGroup })=>{
      let total = form.formGroup.value.total_value as number
      this.Total_price_unit += total

    })

    this.profit.total_unit = this.Total_price_unit
    this.api_inventory.update_profit("total_unit",this.profit)
  }

  async update_total(form_: { id: number; formGroup: FormGroup }) {

    this.total_price = 0
    this.form_groups_unit.forEach((form: { id: number; formGroup: FormGroup }) => {
      
      if (form.id === form_.id) {
        form.formGroup.patchValue({
          total_value: form.formGroup.value.amount * form.formGroup.value.unit_value
        });
      }

      let total = form.formGroup.value.total_value as number
      this.Total_price_unit += total

    })
    this.profit.total_unit = this.Total_price_unit
    this.api_inventory.update_profit("total_unit",this.profit)
  }

  private chargue_info_to_send(){

      this.data_info = [] //Se reinicia la informacion a enviar, para que no se acomule.
      this.form_groups_unit.forEach((form : {id: number; formGroup: FormGroup})=>{
      delete form.formGroup.value.product_name
      form.formGroup.value as Inventory

      this.data_info.push(form.formGroup.value)
    })

    console.log(this.data_info)
  }

  async load_inventory(){

    this.form_groups_unit = []
    
    this.subs = this.api.get_all()
      .subscribe(async (res : Response)=>{
        this.products_unit = res.Data  
        
        if(this.on_create_today_unit){
          this.form_groups_unit = []

          //cargando productos de inventario por unidades
          for(let pro of res.Data){
            let new_form = this.builder.group({
              id : [pro.id_product],
              product_name : [pro.product_name],
              amount : [0],
              box_price: [pro.box_value],
              date_inventory : [this.date.now()],
              total_value: [0],
              unit_value : [pro.unit_product_value],
              
            })
            this.form_groups_unit.push({ id: pro.id_product, formGroup: new_form })
          }
        }

        
      })

      if(!this.on_create_today_unit){
        
        this.products_unit = []

        await this.api_inventory.load_inventory("Inventoryunit/",{date_: this.date.now()} as {date_ : string})
        this.subs = this.api_inventory.get_inventory_subject$()
          .subscribe(async(res : Response)=>{
            console.log(res)
            if(res.Status){

            this.form_groups_unit = []  
              for(let pro of res.Data){

                //console.log(num)
                let new_form = this.builder.group({
                  id : [pro.id],
                  product_name : [pro.product_name],
                  amount : [pro.amount],
                  box_price: [pro.box_price],
                  date_inventory : [this.date.now()],
                  total_value: [pro.total_value],
                  unit_value : [pro.product_unit_value],
                  
                })
                this.form_groups_unit.push({ id: pro.id_product, formGroup: new_form })

              }
              this.update_total_inventary()

            }else{
              //console.log(res.Messague)
            }
            
          })
                 
      }
     
  }

  async chek_date(){
    const res = await  this.send_data_with_object(
      {
        url:"Inventoryunit_check_date",

        object:{date_: this.date.now()} as {date_ : string}

      })

      if (res.Data == "") {
        this.on_create_today_unit = true;
      } else {
        this.on_create_today_unit = false;
      }
  }


  async send(type : string){

    await this.chek_date()
    
    if(this.on_create_today_unit){

      this.chargue_info_to_send()
      
      console.log(this.data_info)
      this.create_or_update({url: "Inventoryunit_create",data_dict : this.data_info})
        .then((res : Response)=>{
          if(res.Status){

            this.on_create_today_unit = false
            this.form_groups_unit = [] //Si se crea correctamente, se reinician los formularios
          }
        })
    }else{

      alert("Ya existe un inventario activo para el dia de hoy")
    }
    
    this.on_create_today_unit = false
  }


  update_inventory(){
    
    this.chargue_info_to_send()
    console.log(this.data_info)
    if(!this.on_create_today_unit){

      this.create_or_update({url:"Inventoryunit_update", data_dict: this.data_info })
        .then((res:Response)=>{
          console.log(res)
        })
    }
  }

  ngOnDestroy(){

    this.subs.unsubscribe()
  }
}
