import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule,CommonModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent {
  // http = inject(HttpClient)
   constructor(private http:HttpClient){}
  //  tạo biến để hiển thị thông báo
  mess = "";
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
          this.http.post('http://localhost:3000/products',{
            name,image,cat_id,price
          }).subscribe(data=>{
              if (data!==null){
                  this.mess = "Thêm mới thành công";
                  // Đưa các ô input về giá trị trống
                  this.formProduct.setValue({
                    name:"",
                    image:"",
                    cat_id:cat_id,
                    price:""
                  })
              }
          });
    }
}
