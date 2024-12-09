const mongoose = require('mongoose')

const categoryModel = new mongoose.Schema({
 
    Category_name:{
        type:String
    },

    Category_img:{
            type:String
    },
    subCategory: 
        {
         type: mongoose.Schema.Types.ObjectId, // Referencing the ObjectId of Category
        ref: "category",
        default:null
              },
    //   ParentCategory_id: { type: String},
    
   
    

    

  
  
})

module.exports = mongoose.model("category" , categoryModel)