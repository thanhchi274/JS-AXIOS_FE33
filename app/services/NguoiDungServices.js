function NguoiDungService(){
    this.mangNguoiDung =[];
    this.layDanhSachNguoiDung = function(){
        //vì bất đồng bộ tỏng js
       return axios({
            //get lấy data
            //post thêm 
            //put:Cập nhật
            //delete: xoá
            method:"GET",
            url:"http://5dce9e0375f9360014c25fe3.mockapi.io/api/Nguoidung"
            })
    };
    this.themNguoiDung = function(nguoiDung){
        return axios({
            method:"POST",
            url:"http://5dce9e0375f9360014c25fe3.mockapi.io/api/Nguoidung",
            data:nguoiDung
        })
    };
    this.xoaNguoiDung = function(id){
        return axios({
            method:"DELETE",
            url:`http://5dce9e0375f9360014c25fe3.mockapi.io/api/Nguoidung/${id}`
    })
};
    this.layThongTinNguoiDung =function(id){
        return axios({
            method:"GET",
            url:`http://5dce9e0375f9360014c25fe3.mockapi.io/api/Nguoidung/${id}`
    })
    };
    this.capNhatNguoiDung =function(id,nguoiDung){
        return axios({
            method:"PUT",
            url:`http://5dce9e0375f9360014c25fe3.mockapi.io/api/Nguoidung/${id}`,
            data:nguoiDung
    })
    };
    this.TimKiemNguoiDung = function(chuoiTimKiem, danhSachNguoiDung){
        return danhSachNguoiDung.filter(function(item){
            return item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase())>-1
        });
    }
}