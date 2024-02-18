import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  select = new FormControl('');
    constructor(private http:HttpClient){}
    // Khai báo biến để lưu danh sách sản phẩm trả về từ API
    products:any;
    //  tạo biến để hiển thị thông báo
    mess = "";

    // Viết hàm gọi API lấy danh sách sản phẩm.
    ngOnInit(){
      this.getProducts();
    }
    getProducts(){
       this.http.get('http://localhost:3000/products').subscribe((data:any)=>{
          // gán dữ liệu trả về cho biên products
          this.products = data;
      });
    }
    // Viết hàm xóa sản phẩm
    onDelete(pid:any){
      if (confirm('Bạn có thực sự muốn xóa sản phẩm này?')){
        this.http.delete('http://localhost:3000/products/'+pid).subscribe((data:any)=>{
            //Gọi lại hàm getProducts để load lại danh sách sản phẩm sau khi xóa
            this.mess="Đã xóa thành công";
            this.getProducts();
            //   this.http.get('http://localhost:3000/products').subscribe((data:any)=>{
            //     // gán dữ liệu trả về cho biên products
            //     this.products = data;
            // });
            console.log(this.products);
        });       
        
      }
    }
    // Viết hàm lọc sản phẩm;
    Filter(){
        //  console.log(this.select.value); 
        this.http.get('http://localhost:3000/products?cat_id='+this.select.value).subscribe((data:any)=>{
          // gán dữ liệu trả về cho biên products
          this.products = data;
      });        
    }
}
