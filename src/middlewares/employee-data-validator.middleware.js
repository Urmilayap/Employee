// import employeeDetailsModel from '../models/employeeDetails.model';
// const { errorUtils } = require('../utils');

//  checkEmployeeDetails = async (req, res, next) => {
//    try {
//      const { first_name, last_name, email_id, phone_no, address } = req.body;

//    }

//  [  
//    req.body.first_name('first_name')
//         .isAlpha().withMessage('firstName should be alpa')
//         .isLength({min: 3 , max: 10}).withMessage('firstName should not be empty, should be more than three and less than 10 character')
//         .trim(),

//         next()
//     ,
//     body('last_name')
//         .isAlpha().withMessage('lastName should be alpha')
//         .isLength({min: 1 , max: 10}).withMessage('lastName should not be empty, should be more than one and less than 10 character')
//         .trim(),
   
//         next()
//     ,
//     body('email_id')
//         .isEmail().withMessage('email id should be in correct formate')
//         .trim(),
//         next()
//     ,
//     body('phone_no')
//         .isNumeric().withMessage('phone number should be numbers only')
//         .isLength({min: 3 , max: 10}).withMessage('phone number should not be empty, should be more than three and less than 10 numbers')
//         .trim(),
//         next()
//     ,
//     body('address')
//         .isAlphanumeric().withMessage('address should be alphanumeric')
//         .isLength({min: 3 , max: 50}).withMessage('address should not be empty, should be more than three and less than 50 numbers')
//         .trim(),
    
//         next()
//     ,
// ];
// }

// const checkEmployeeDetails = async (req, res, next) => {
//     const check = req.body;
//     try {
      
//       await employeeDetailsModel.validate(check);
//       next();
//     } catch (err) {
//         errorUtils.throwPreconditionFailed({ message: 'Validation error' });
//     }
//   };
  
//   module.exports = checkEmployeeDetails;
  