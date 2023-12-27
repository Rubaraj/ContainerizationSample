import * as localObj from '../controller/cs_controller_CustomerDetail.js'

export default function(app){
  
    app.post('/2',localObj.insertData)
}