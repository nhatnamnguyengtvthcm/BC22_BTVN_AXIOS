
function getEleId(id){
    return document.getElementById(id);
}
// var user = new User();
var service = new Service();
var user_arr = [];
BindingUserList();
function validateUserInfo(userName, fullName, passWord, email, image, userType, langugage, description){
    var is_valid = true;
   
    for (let index = 0; index < user_arr.length; index++) {
        console.log(user_arr[index].taiKhoan);
        if(user_arr[index].taiKhoan == userName){
            console.log("invalid username");
            getEleId("messageUserName").innerHTML = "UserName has exists!";
            getEleId("messageUserName").style.color = "red";
            is_valid &= false;
            break; 
        }
    }
    var regexFullName = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    console.log(`regexFullName:${fullName.match(regexFullName)}`)
    if (!fullName.match(regexFullName)){
        getEleId("messageFullName").innerHTML = "FullName has specical chacracter or number!";
        getEleId("messageFullName").style.color = "red";
        is_valid &= false;
    }
    
    var regexPassWord =  /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,8}$/g;
    console.log(`regexpass:${passWord.match(regexPassWord)}`)
    if (!passWord.match(regexPassWord)) {
        
        getEleId("messagePassWord").innerHTML = "Password has specical chacracter or number!";
        getEleId("messagePassWord").style.color = "red";
        is_valid &= false;
    }
    var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(regexEmail)) {
        getEleId("messageEmail").innerHTML = "Email wrong format!";
        getEleId("messageEmail").style.color = "red";
        is_valid &= false;
    } 
    if(!userType){
        getEleId("messageUserType").innerHTML = "User Type must be choice!";
        getEleId("messageUserType").style.color = "red";
        is_valid &= false;
    }
    if(!langugage){
        getEleId("messageLangugage").innerHTML = "Langugae must be choice!";
        getEleId("messageLangugage").style.color = "red";
        is_valid &= false;
    }
    return is_valid;
}

function getUerInfo(){
    var taiKhoan = getEleId("TaiKhoan").value;
    var hoTen = getEleId("HoTen").value;
    var matKhau = getEleId("MatKhau").value;
    var email = getEleId("Email").value;
    var hinhAnh = getEleId("HinhAnh").value;
    var loaiND = getEleId("loaiNguoiDung").value;
    var ngonNgu = getEleId("loaiNgonNgu").value;
    var moTa = getEleId("MoTa").value;
    user = null;
    if (validateUserInfo(taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, ngonNgu, moTa)) {
        user = new User(taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, ngonNgu, moTa);

    }
    return user;
    
}

function BindingUserList(){
    var promiss = service.fetchData();
    promiss
    .then(function (result) {
      // getEleID("loading").style.display = "none";
    //   console.log(result.data);
      user_arr = result.data
      renderUserList(user_arr);
    })
    .catch(function (error) {
      console.log(error);
    });
   
}

function renderUserList(arr){
    var content = "";
    for (let index = 0; index < arr.length; index++) {
        content += `
        <tr>
            
            <td>${index + 1}</td>
            <td>${arr[index].taiKhoan}</td>
            <td>${arr[index].matKhau}</td>
            <td>${arr[index].hoTen}</td>
            <td>${arr[index].email}</td>
            <td>${arr[index].ngonNgu}</td>
            <td>${arr[index].loaiND}</td>
            <td><button class="btn btn-primary">Sửa</button></td>
            <td><button class="btn btn-danger">Xoá</button></td>
            
        </tr>
        `
        
    }
    getEleId("tblDanhSachNguoiDung").innerHTML = content;
}

function addUser(){
    var user = getUerInfo();
    console.log(`user:${user}`);
    if(user == null){
        console.log("return user null");
        // getEleId("userModalClose").click();
        return;
    }
    var promiss = service.addUser(user);
    promiss
    .then (function(result){
        BindingUserList();
        console.log(result);
        getEleId("userModalClose").click();
    })
    .catch(function(error){
        console.log(error);
    });
    
}