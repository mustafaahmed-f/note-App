// const connection = require('../../../DB/connection.js')
import connection  from "../../../DB/connection.js";


const getUsers = (req,res,next)=>{
    const query = `SELECT id , name , email , age FROM users`;
    connection.execute(query , (error,result,fields)=>{
        if(error){return res.json({message:"Query error"})};
        if(result.length){
            return res.json({message : "Done" , result})
        }
        else { return res.json ({message : "No Users Found .."})}
    })
   
}

const listUsersByIDs = (req, res, next) => {
    const { id } = req.query;
  
    const query = `SELECT id , name , email , age FROM users WHERE id IN (${id})`;
    connection.execute(query, (error, result, fields) => {
      if (error) {
        return res.json({ message: "Query error" });
      }
      if (result.length) {
        return res.json({ message: "Done", result });
      } else {
        return res.json({ message: "No users found !!" });
      }
    });
}

const oldestThree = (req,res,next) =>{
    const query = `SELECT id,name,email,age FROM users ORDER BY age DESC LIMIT 3`
    connection.execute(query ,(error, result, fields)=>{
        if (error) {
            return res.json({ message: "Query error" });
          };
          if (result.length) {
            return res.json({ message: "Done", result });
          }
           else {
            return res.json({ message: "No users found !!" });
          }
    } )
}

const signIn = (req,res,next)=>{
   const {email , password} = req.body;
   const query = `SELECT id,name,email,age FROM users WHERE email = '${email}' AND password = '${password}'`;
   connection.execute(query , (error,result)=>{
    if (error) {
        return res.json({ message: "Query error" });
      };

      if (!result.length) {
        return res.json({message : "Email or password incorrect .."})
      }
      else{
        return res.json({message : "Signed in successfully" , result})
      }
   })
}

const signUp = (req,res,next) =>{
    const {name , email , password , age } = req.body;
    const query = `SELECT * FROM users where email = '${email}'`
    connection.execute(query , (error,result)=>{
        if (error) {
            return res.json({ message: "Query error" });
          };
          if (result.length) {
            return res.json({message : "User already exists"})
          }
          else{
            const query2 = `INSERT INTO users SET name = '${name}' , email = '${email}' , password = '${password}' , age = ${age}`
            connection.execute(query2, (error,result)=>{
                if (error) {
                    return res.json({ message: "Query error" });
                  };

                //   return result.affectedRows?  res.json({message : "signed up successfully" , result}):res.json({message: "Failed to sign up"})4
                if (result.affectedRows) {
                    return res.json({ message: "signed up successfully" });
                  } else {
                    return res.json({ message: "Failed to sign up" });
                  }
            })
          }
    })
}

const updateUser =  (req,res,next) =>{
        const {name , email , password , age } = req.body;
        const query = `SELECT * FROM users where email = '${email}'`
        connection.execute(query , (error,result)=>{
            if (error) {
                return res.json({ message: "Query error" });
              };
              if (!result.length) {
                return res.json({message : "User doesn't exist"})
              }
              else{
                const query2 = `UPDATE users SET name = '${name}' , email = '${email}' , password = '${password}' , age = ${age} WHERE email = '${email}'`
                connection.execute(query2, (error,result)=>{
                    if (error) {
                        return res.json({ message: "Query error" });
                      };
    
                      return result.affectedRows?  res.json({message : "updated successfully" }):res.json({message: "Failed to update user"})
                    
                })
              }
        })
}

const deleteUser = (req,res,next) =>{
        const {id } = req.params;
        const query = `SELECT * FROM users where id = ${id}`
        connection.execute(query , (error,result)=>{
            if (error) {
                return res.json({ message: "Query error" });
              };
              if (!result.length) {
                return res.json({message : "User doesn't exist"})
              }
              else{
                const query2 = `DELETE FROM users WHERE id = ${id}`
                connection.execute(query2, (error,result)=>{
                    if (error) {
                        return res.json({ message: "Query error" });
                      };
    
                      return result.affectedRows?  res.json({message : "Deleted successfully" }):res.json({message: "Failed to delete user"})
                    
                })
              }
        })


}

const searchByNameAndAge = (req, res, next) => {
    const { letter, age } = req.params;
    const query = `SELECT id , name , email , age FROM users WHERE age < ${age} AND name LIKE '${letter}%'`;
  
    connection.execute(query, (error, result, fields) => {
      if (error) {
        return res.json({ message: "Query error" });
      }
      if (result.length) {
        return res.json({ message: "Done", result });
      } else {
        return res.json({ message: "No users found" });
      }
    });
  }


  const getPassword=(req,res,next)=>{
    const {email} = req.body;
   const query = `SELECT password FROM users WHERE email = '${email}'`;
   connection.execute(query , (error,result)=>{
    if (error) {
        return res.json({ message: "Query error" });
      };

      if (!result.length) {
        return res.json({message : "Email incorrect .."})
      }
      else{
        return res.json({message : "Done" , result})
      }
   })
  }
    
const searchByAge = (req, res, next) => {
    const { age1, age2 } = req.query;
    const query = `SELECT id , name , email , age FROM users WHERE age BETWEEN ${age1} AND ${age2}`;
  
    connection.execute(query, (error, result, fields) => {
      if (error) {
        return res.json({ message: "Query error" });
      }
      else{
        if (result.length) {
          return res.json({ message: "Done", result });
        } else {
          return res.json({ message: "No users found" });
        }
      }
      
    });
  }

export {
    getUsers,
    listUsersByIDs,
    oldestThree,
    signIn,
    signUp,
    updateUser,
    deleteUser,
    searchByNameAndAge,
    searchByAge,
    getPassword
}