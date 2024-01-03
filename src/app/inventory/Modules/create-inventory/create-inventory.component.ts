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
  selector: 'app-create-inventory',
  templateUrl: './create-inventory.component.html',
  styleUrls: ['./create-inventory.component.css']
})
export class CreateInventoryComponent extends AbcComponentService<Inventory> {
  products! : Product[]
  subs! : Subscription 
  form_groups: { id: number; formGroup: FormGroup }[] = [];
  current_date! : string
  Total_price : number = 0;
  data_info : Inventory[] = []
  on_create_today : boolean = false
  inventory_info! : {product: Product[]; inventory: Inventory[]}
  form_group_leng : number = 0
  last_total : number = 0
  profit! : Profit
  subs_profit! : Subscription
  constructor(private modal_service : ModalInventoryService,
    private api : Api_Service<Inventory>,
    private builder : FormBuilder,
    private cdr: ChangeDetectorRef,
    private date : DateServicesService,
    private api_inventory : InventoryApiService

       ){
    super(api)
    
    this.inventory_info = {product: {} as Product[], inventory: {} as Inventory[]}
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

  private chargue_info_to_send(){

      this.data_info = [] //Se reinicia la informacion a enviar, para que no se acomule.
      this.form_groups.forEach((form : {id: number; formGroup: FormGroup})=>{
      delete form.formGroup.value.product_name
      form.formGroup.value as Inventory

      this.data_info.push(form.formGroup.value)
    })
    
    
    
  }
  private async update_total_inventary(){
    this.Total_price = 0
    this.form_groups.forEach((form: { id: number; formGroup: FormGroup })=>{
      let total = form.formGroup.value.total_value as number
      this.Total_price += total

    })

    this.profit.total_box = this.Total_price
    this.api_inventory.update_profit("total_box",this.profit)
  }

  async update_total(form_: { id: number; formGroup: FormGroup }) {
    
    this.Total_price = 0;
    this.form_groups.forEach((form: { id: number; formGroup: FormGroup }) => {
      
      if (form.id === form_.id) {
        form.formGroup.patchValue({
          total_value: form.formGroup.value.amount * form.formGroup.value.box_price
        });
      }

      let total = form.formGroup.value.total_value as number
      this.Total_price += total
    })
    this.profit.total_box = this.Total_price
    this.api_inventory.update_profit("total_box",this.profit)

  }


  async send(){

    await this.chek_date()
    
    if(this.on_create_today){

      this.chargue_info_to_send()
      
      console.log(this.data_info)
      this.create_or_update({url: "Inventorybox_create",data_dict : this.data_info})
        .then((res : Response)=>{
          if(res.Status){

            this.on_create_today = false
            this.form_groups = [] //Si se crea correctamente, se reinician los formularios
          }
        })
    }else{

      alert("Ya existe un inventario activo para el dia de hoy")
    }
    
    this.on_create_today = false
  }

  async chek_date(){
    const res = await  this.send_data_with_object(
      {
        url:"Inventorybox_check_date",

        object:{date_: this.date.now()} as {date_ : string}

      })

      if (res.Data == "") {
        this.on_create_today = true;
      } else {
        this.on_create_today = false;
      }
  }

  async load_inventory(){

    this.inventory_info.product = []
    this.form_groups = []
    this.products = []

    //console.log(this.form_groups)
    
    this.subs = this.api.get_all()
      .subscribe(async (res : Response)=>{

        this.inventory_info.product = res.Data
        this.products = res.Data
        
        if(this.on_create_today){
          this.inventory_info.product = []
          this.form_groups = []

          //cargando productos de inventario de cajas
          for(let pro of res.Data){
            let new_form = this.builder.group({
              id : [pro.id_product],
              product_name : [pro.product_name],
              amount : [0],
              box_price: [pro.box_value],
              date_inventory : [this.date.now()],
              total_value: [0]
              
            })
            this.form_groups.push({ id: pro.id_product, formGroup: new_form })
          }
        }  


      })

      if(!this.on_create_today){
        
        this.products = []

        await this.api_inventory.load_inventory("Inventorybox/",{date_: this.date.now()} as {date_ : string})
        
        this.subs = this.api_inventory.get_inventory_subject$()
          .subscribe(async(res : Response)=>{

            if(res.Status){
            this.inventory_info.inventory = res.Data
            this.form_groups = []  
              for(let pro of res.Data){

                //console.log(num)
                let new_form = this.builder.group({
                  id : [pro.id],
                  product_name : [pro.product_name],
                  amount : [pro.amount],
                  box_price: [pro.box_price],
                  date_inventory : [this.date.now()],
                  total_value: [pro.total_value]
                  
                })
                this.form_groups.push({ id: pro.id_product, formGroup: new_form })
                this.form_group_leng = this.form_groups.length
              }

              this.update_total_inventary()
            }else{

            }
            
          })
                 
      }
     
  }

  update_inventory(){
    
    this.chargue_info_to_send()
    console.log(this.data_info)
    if(!this.on_create_today){

      this.create_or_update({url:"Inventorybox_update", data_dict: this.data_info })
        .then((res:Response)=>{
          console.log(res)
        })
    }
  }

  ngOnDestroy(){

    
    if(this.subs != null){
      this.subs.unsubscribe()
    }
    // if(this.subs_profit != null){
    //   this.subs_profit.unsubscribe()
    // }
    
  }

  
}
