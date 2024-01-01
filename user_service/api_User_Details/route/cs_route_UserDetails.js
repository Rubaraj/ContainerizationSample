import * as localObj from '../controller/cs_controller_UserDetails.js'

export default function(app){
  
    app.post('/1',localObj.insertData)
}