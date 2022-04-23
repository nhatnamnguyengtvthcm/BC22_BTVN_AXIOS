function Service() {
    this.fetchData = function(){
        return aixos ({
            url: "https://625569798646add390d6709e.mockapi.io/api/user",
            method : "GET"
        })
    }

    this.addUser = function(user){
        return axios({
            url: "https://625569798646add390d6709e.mockapi.io/api/user",
            data: user,
            method: "POST"
        })
    }

    this.deleteUser = function(user_id){
        return axios({
            url: "https://625569798646add390d6709e.mockapi.io/api/user/${user_id}",
            data: user,
            method: "DELETE"
        })
    }

    this.getDetailUser = function(user_id){
        return axios({
            url: "https://625569798646add390d6709e.mockapi.io/api/user/${user_id}",
            data: user,
            method: "GET"
        })
    }

    this.UpdateUser = function(user){
        return axios({
            url: "https://625569798646add390d6709e.mockapi.io/api/user/${user_id}";
            data: user,
            method: "UPDATE"
        })
    }

}