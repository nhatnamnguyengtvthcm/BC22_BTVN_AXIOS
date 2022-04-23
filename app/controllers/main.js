function getEleId(id){
    return document.getElementById(id);
};
var service = new Service();
BindingUserList();
function validateUserInfo(userName, fullName, passWord, email, image, userType, langugage, description){
   
}

function getUerInfo(){

}

function BindingUserList(){
    var res = service.fetchData();
    var userList = res.data;
    var content = "";
    for (let index = 0; index < userList.length; index++) {
        content += `
        <tr>
            
            <td>${index + 1}</td>
            <td>${userList[index].userName}</td>
            <td>${userList[index].passWord}</td>
            <td>${userList[index].fullName}</td>
            <td>${userList[index].email}</td>
            <td>${userList[index].langugage}</td>
            <td>${userList[index].userType}</td>
            <td>${userList[index].userType}</td>
            <td><button class="btn btn-process">Sửa</button></td>
            
        </tr>
        `
        
    }
    getEleId("tblDanhSachNguoiDung").innerHTML = content;
}