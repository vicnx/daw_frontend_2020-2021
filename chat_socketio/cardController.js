
const cardController = () => {    
    let getPlayerdata = (nickname) =>{
        let user = {
            username: nickname,
            cardmatrix: "card"+nickname,
            checksum: "checksum"+nickname
        }
        let user_global ={
            username: nickname,
            cardmatrix: "card"+nickname
        }
        return {user,user_global};
    }

    return {getPlayerdata: getPlayerdata}
};

module.exports = cardController();