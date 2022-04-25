
function getEleId(id){
    return document.getElementById(id);
}
// var user = new User();
var service = new Service();
var user_arr = [];
var userIdDeleted = "";
var userIdUpdated = "";
var user
BindingUserList();
function validateUserInfo(userName, fullName, passWord, email, image, userType, langugage, description, is_new  = true){
    var is_valid = true;
    if (is_new){
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

function getUerInfo(is_new=true){
    var taiKhoan = getEleId("TaiKhoan").value;
    var hoTen = getEleId("HoTen").value;
    var matKhau = getEleId("MatKhau").value;
    var email = getEleId("Email").value;
    var hinhAnh = getEleId("HinhAnh").value;
    var loaiND = getEleId("loaiNguoiDung").value;
    var ngonNgu = getEleId("loaiNgonNgu").value;
    var moTa = getEleId("MoTa").value;
    user = null;
    if (validateUserInfo(taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, ngonNgu, moTa, is_new)) {
        user = new User(taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, ngonNgu, moTa);

    }
    return user;
    
}

function BindingUserList(){
    document.getElementsByClassName("message").innerHTML = "";
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
            <td><button class="btn btn-primary" class="btn btn-success"
            data-toggle="modal"
            data-target="#myModal" onclick = "suaUser(${arr[index].id})">Sửa</button></td>
            <td><button class="btn btn-danger" id="XoaND"  data-toggle="modal" data-target="#deleteModalId" onclick="deleteUser(${arr[index].id})">Xoá</button></td>
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

function deleteUser(user_id){
    userIdDeleted = user_id;
    console.log(`userIdDeleted:${userIdDeleted}`);
}

function confirmDeleteUser(){
    promiss = service.deleteUser(userIdDeleted);
    promiss
    .then(function(result){
        userIdDeleted = "";
        console.log(result);
        BindingUserList();
        getEleId("userModalDeletedClose").click();

    })
    .catch(function(error){
        console.log(result);
    });
}

function loadUserDetail(user_id){
    promiss = service.getDetailUser(user_id);
    promiss
    .then(function(result){
        user = result.data;
        getEleId("TaiKhoan").value = user.taiKhoan;
        getEleId("HoTen").value = user.hoTen;
        getEleId("MatKhau").value = user.matKhau;
        getEleId("Email").value = user.email;
        getEleId("HinhAnh").value = user.hinhAnh;
        getEleId("loaiNguoiDung").value = user.loaiND;
        getEleId("loaiNgonNgu").value = user.ngonNgu;
        getEleId("MoTa").value = user.moTa;
        
    })
    .catch(function(error){
        console.log(result);
    });
}



function suaUser(user_id){
    console.log("in suaUser");
    var messages = document.getElementsByClassName("message");
    console.log(messages);
    // Array.prototype.forEach.call(messages, function(message) {
    //     // Do stuff here
    //     message.innerHTML = "";
    // });
    for(var i = 0; i<messages.length; i++){
        messages[i].innerHTML = "";
        inputs[i].value = "";
    }
    
   
    userIdUpdated = user_id;
    loadUserDetail(user_id);
    getEleId("addUserBtn").style.display = "none";
    getEleId("upadateUserBtn").style.display = "block";
   
}

function themUser(){
    var messages = document.getElementsByClassName("message");
    // Array.prototype.forEach.call(messages, function(message) {
    //     // Do stuff here
    //     console.log(message);
    //     message.innerHTML = "";
    // });
    var inputs = document.querySelectorAll("input");
   
    // messages.forEach((message) => {
    //     console.log(message);
    //     message.innerHTML = ""
    // })
    for(var i = 0; i<messages.length; i++){
        messages[i].innerHTML = "";
        inputs[i].value = "";
    }
    getEleId("addUserBtn").style.display = "block";
    getEleId("upadateUserBtn").style.display = "none";
}

function updateUser(user_id){
    var user = getUerInfo(false);
    console.log(`user:${user}`);
    if(user == null){
        console.log("return user null");
        // getEleId("userModalClose").click();
        return;
    }
    var promiss = service.UpdateUser(user, userIdUpdated);
    promiss
    .then (function(result){
        userIdUpdated = "";
        BindingUserList();
        console.log(result);
        getEleId("userModalClose").click();
    })
    .catch(function(error){
        console.log(error);
    });
}
