const { body } = require("express-validator");

const checkEmployeeDetails = async (req, res, next) => {
try {

    [

        body("first_name")
            .exists().withMessage("first name is required").isString().withMessage("first name should be string"),
      
        body("last_name")
            .exists().withMessage("last name is required").isString().withMessage("last name should be string"),
          
        body("email_id")
            .exists().withMessage("Email id is required").isEmail().withMessage("email id should be in correct formate"),
    
        body("address")
            .exists().isString().withMessage("address should be string").isLength({min: 3, max: 50})
            .withMessage("address should be atlest 3 characters"),
        
        body("phone_no")
            .exists().isNumeric().withMessage("phone number should be number").isLength({min:3, max:10 })
            .withMessage("phone number should be min 3 and max 10")
      
      ];
   next(); 
} catch (error) {
    next(error);
}


}
  
  module.export = {checkEmployeeDetails};
 
  