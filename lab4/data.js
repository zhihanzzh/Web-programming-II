let list = [
    { "id": 1, "first_name": "Raymond", "last_name": "Washington", "email": "rwashington0@vkontakte.ru", "gender": "Male", "ip_address": "214.64.240.51" },
    { "id": 2, "first_name": "Betty", "last_name": "Bowman", "email": "bbowman1@google.fr", "gender": "Female", "ip_address": "52.66.0.78" }
]


let targetPerson = {};
let exportedMethods = {
    getById : (id) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i]['id'] == id) {
                targetPerson = list[i];
                break
            }
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {            
                if (targetPerson) {
                    resolve(targetPerson);
                } else {
                    reject(new Error("target person not found"));
                }
            }, 5000);
        });
    }
}


module.exports = exportedMethods;