function getEle(id){
    return document.getElementById(id);
}
var nguoiDungService  =new NguoiDungService();
function themNguoiDungTest(){
    console.log("Thêm người dùng");
}
getListUser();
//200 là thành công
//500:
//404:
//401: ví dụ "Token"
//403: "permission"
function getListUser(){
    nguoiDungService.layDanhSachNguoiDung()
    .then(function(result){
        this.mangNguoiDung = result.data;
        renderTable(result.data);
        setLocalStorage(result.data);

    })
    .catch(function(errors){
        console.log(errors);
    });    
}
function renderTable(mangNguoiDung){
    var contentHTML="";
    mangNguoiDung.map(function(item, index){
        contentHTML +=`
        <tr>
        <td>${index +1}</td>
        <td>${item.taiKhoan}</td>
        <td>${item.matKhau}</td>
        <td>${item.hoTen}</td>
        <td>${item.email}</td>
        <td>${item.soDT}</td>
        <td>${item.maLoaiNguoiDung}</td>
        <td>
            <button class="btn btn-success" onclick="suaNguoiDung('${item.id}')" data-toggle="modal"
            data-target="#myModal">Sửa</button>
            <button class="btn btn-danger" onclick="xoaNguoiDung('${item.id}')">Xóa</button>
        </td>
        </tr>`;
    });
    getEle("tblDanhSachNguoiDung").innerHTML =contentHTML;
}
getEle("btnThemNguoiDung").addEventListener("click",function(){
    document.getElementsByClassName("modal-title")[0].innerHTML ="Thêm Nhân Viên";
    var footer =`<button class="btn btn-success" onclick="themNhanVien()">Thêm</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});
function themNhanVien(){
    var _taiKhoan = getEle("TaiKhoan").value;
    var _hoTen = getEle("HoTen").value;
    var _matKhau = getEle("MatKhau").value;
    var _email = getEle("Email").value;
    var _soDT = getEle("SoDienThoai").value;
    var _loaiNguoiDung = getEle("loaiNguoiDung").value;

    var nguoiDung =new NguoiDung(_taiKhoan,_hoTen,_matKhau,_email,_soDT,_loaiNguoiDung);
    nguoiDungService.themNguoiDung(nguoiDung)
    .then(function(result){
        //load lại trang nếu thêm thành công
        // location.reload();
        //dùng single page
        getListUser();
        alert("Thêm người dùng thành công");
    })
    .catch(function(errors){
        console.log(errors);
    });
    // nguoiDungService.mangNguoiDung(nguoiDung);
}
/**
Xoá Người dùng
**/
function setLocalStorage(danhSachNguoiDung){
    localStorage.setItem("DSNV",JSON.stringify(danhSachNguoiDung));
}
function getLocalStorage(){
  return JSON.parse(localStorage.getItem("DSNV"));
}
function xoaNguoiDung(id){
    nguoiDungService.xoaNguoiDung(id)
    .then(function(result){
        alert("Xoá Người dùng thành công")
        getListUser();
    })
    .catch(function(errors){
        console.log(errors);
    });
}
function suaNguoiDung(id){
    getEle("modal-title").innerHTML ="Cập nhật Người dùng";
    var footer=`<button class="btn btn-success" onclick="capNhatNguoiDung('${id}')">Cập Nhật</button>`
    getEle("modal-footer").innerHTML =footer;

    nguoiDungService.layThongTinNguoiDung(id)
    .then(function(result){
        console.log(result.data);
        getEle("TaiKhoan").value =result.data.taiKhoan;
        getEle("HoTen").value =result.data.hoTen;
        getEle("MatKhau").value =result.data.matKhau;
        getEle("Email").value =result.data.email;
        getEle("SoDienThoai").value = result.data.soDT;
        getEle("loaiNguoiDung").value =result.data.maLoaiNguoiDung;
    })
    .catch(function(errors){
        console.log(errors);
    });
}
function capNhatNguoiDung(id){
    var _taiKhoan = getEle("TaiKhoan").value;
    var _hoTen = getEle("HoTen").value;
    var _matKhau = getEle("MatKhau").value;
    var _email = getEle("Email").value;
    var _soDT = getEle("SoDienThoai").value;
    var _loaiNguoiDung = getEle("loaiNguoiDung").value;

    var nguoiDung =new NguoiDung(_taiKhoan,_hoTen,_matKhau,_email,_soDT,_loaiNguoiDung);
    nguoiDungService.capNhatNguoiDung(id,nguoiDung)
    .then(function(result){
        getListUser();
        alert("Đã Cập nhật thành công");
    })
    .catch(function(errors){
        console.log(errors);
    })
}
getEle("timkiemInput").addEventListener("keyup",function(){
    var chuoiTimKiem = getEle("timkiemInput").value;
    var danhSachNguoiDung = getLocalStorage();
    var mangTimKiem =nguoiDungService.TimKiemNguoiDung(chuoiTimKiem,danhSachNguoiDung);
    renderTable(mangTimKiem);
})