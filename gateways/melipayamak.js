const axios = require('axios');
const request=require('request')


const getInfo = (auth, callback) => {

    let username = auth.username;
    let password = auth.password;
    axios({
        method: 'post',
        url: 'https://rest.payamak-panel.com/api/SendSMS/GetCredit',
        data: {
            username,
            password
        }
    })
        .then((result) => { return result.data })
        .then((result) => {

            if (result.Value !== null && result.RetStatus === 1 && result.StrRetStatus === 'Ok') {
                callback({ status: 200, 'result': `${Math.floor(result.Value)} عدد` })
            } else {
                callback({ status: 401, result: 'error in getting data successfully' })
            }
        })
        .catch((err) => {
            callback('Error in sending and getting data')
        })
}



const sendSms=(auth, message, sender, receptor, callback)=>{

    let username=auth.username;
    let password=auth.password;
    


    axios({

        method: 'post',
        url: 'https://rest.payamak-panel.com/api/SendSMS/SendSMS',
        data: {
            username,
            password,
            sender,
            receptor,
            message
        }
    })
    .then((result)=>{

        let data=result.data;
        

        if(data['RetStatus'] == 1 && data['StrRetStatus']=='Ok'){
            callback({ status: 200, message: 'successfully sent message' })
        }else{
            callback({ status: 401, message: 'error in sending...' })
        }
    })
    .catch(err=>{
        callback('Error in getting and passing data')
    })

}



module.exports = {
    sendSms,
    getInfo
}