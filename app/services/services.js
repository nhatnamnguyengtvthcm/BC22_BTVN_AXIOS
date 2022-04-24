function Service() {
    this.fetchData = function(){
        return axios({
            url: "https://625569798646add390d6709e.mockapi.io/api/User",
            method: "GET",
        })
            
    } 
    this.addUser = function(user){
        return axios({
            url: "https://625569798646add390d6709e.mockapi.io/api/User",
            data: user,
            method: "POST"
        })
    }
    this.deleteUser = function(user_id){
        return axios({
            url: `https://625569798646add390d6709e.mockapi.io/api/User/${user_id}`,
            data: user,
            method: "DELETE"
        })
    }
    this.getDetailUser = function(user_id){
        return axios({
            url: `https://625569798646add390d6709e.mockapi.io/api/User/${user_id}`,
            data: user,
            method: "GET"
        })
    }

    this.UpdateUser = function(user){
        return axios({
            url: `https://625569798646add390d6709e.mockapi.io/api/User/${user_id}`,
            data: user,
            method: "UPDATE"
        })
    }
}