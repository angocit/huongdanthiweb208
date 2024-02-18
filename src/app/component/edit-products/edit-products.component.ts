import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-products',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule],
  templateUrl: './edit-products.component.html',
  styleUrl: './edit-products.component.css'
})
export class EditProductsComponent {
 // http = inject(HttpClient)
 route = inject(ActivatedRoute);
 constructor(private http:HttpClient){}
 //  tạo biến để hiển thị thông báo
 mess = "";
 productid:any;
   formProduct = new FormGroup({
        name: new FormControl('',Validators.required),
        image: new FormControl('',Validators.required),
        cat_id: new FormControl('',Validators.required),
        price: new FormControl('',[Validators.required,Validators.pattern('[0-9]+')])
   });
   onSubmit(){
         // Lấy dữ liệu từ form
         const name = this.formProduct.controls.name.value;
         const image = this.formProduct.controls.image.value;
         const cat_id = this.formProduct.controls.cat_id.value;
         const price = this.formProduct.controls.price.value;
         // Sử dụng httpClient để Gửi request phương thức post lên API của json-server=> import httpClientModule
         this.http.put('http://localhost:3000/products/'+this.productid,{
           name,image,cat_id,price
         }).subscribe(data=>{
             if (data!==null){
                 this.mess = "Cập nhật thành công";
             }
         });
   }
   ngOnInit(){
        // Lấy thông tin id từ url
        let pid = this.route.snapshot.params["id"];
        this.productid = pid;
        this.getProductById(pid);
   }
   // Viết hàm lấy thông tin sản phẩm từ id
   getProductById(pid:any){
     this.http.get('http://localhost:3000/products/'+pid).subscribe((data:any)=>{
          // Set FormControl theo dữ liệu lấy được từ API
          this.formProduct.setValue({
            name:data.name,
            image:data.image,
            cat_id:data.cat_id,
            price:data.price
          })
     })
   }
}
