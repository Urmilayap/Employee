const Joi = require('joi');


const checkEmployeeDetails = async (req, res, next) => {
try {
    const { first_name, last_name, email_id, phone_no, address } = req.body;
    console.log(req.body);
    const schema = Joi.object({
        first_name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        last_name: Joi.string()
            .alphanum()
            .min(1)
            .max(30)
            .required(),
        email_id: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }), 
        phone_no: Joi.string()
            .length(5)
            .pattern(/^[0-9]+$/)
            .required(),
        address: Joi.string()
            .alphanum()
            .min(3)
            .max(100)
            .required(),
    })
    await schema.validateAsync({ first_name: first_name,
        last_name: last_name,
        email_id: email_id,
        phone_no: phone_no,
        address: address
 });
    
   next(); 
} catch (error) {
    next(error);
}
}
  
  module.exports = {checkEmployeeDetails};
 
  