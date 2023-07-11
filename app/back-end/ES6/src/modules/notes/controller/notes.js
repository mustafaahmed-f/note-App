// const connection = require('../../../DB/connection.js')
import connection from "../../../DB/connection.js";

const getAllNotes = (req, res, next) => {
  const query = `SELECT * FROM notes`;
  connection.execute(query, (error, result) => {
    if (error) {
      return res.json({ message: "Query error" });
    }
    if (result.length) {
      return res.json({ message: "Done", result });
    } else {
      return res.json({ message: "No notes found .." });
    }
  });
};

const getNotesWithOweners = (req, res, next) => {
  const query = `SELECT n.id as notes_id , n.title as notes_title , n.content as notes_content  , u.id as User_ID , u.name as user_name , u.email as user_email , u.age as user_age  FROM notes as n LEFT JOIN users as u ON u.id = n.user_id`;
  connection.execute(query, (error, result) => {
    if (error) {
      return res.json({ message: "Query error" });
    }
    if (result.length) {
      return res.json({ message: "Done", result });
    } else {
      return res.json({ message: "No notes found" });
    }
  });
};

const searchNotes = (req,res,next) =>{
    const {user_id , title} = req.params;
    const query = `SELECT id,title,content FROM notes WHERE user_id = ${user_id} AND title LIKE '${title}%' `
    connection.execute(query,(error,result)=>{
      if(error){return res.json({message:"Query error"})};
      if(!result.length){return res.json({message:"No notes found"})}
      else{
        return res.json({message:"Done" , result});
      }
    })
}

const addNotes = (req, res, next) => {
  const { title, content, user_id } = req.body;
  const query1 = `SELECT * from users WHERE id = ${user_id}`;
  connection.execute(query1, (error, result) => {
    if (error) {
      return res.json({ message: "Query error" });
    }
    if (!result.length) {
      return res.json({ message: "User is not found" });
    } else {
      const query2 = `SELECT * FROM notes WHERE user_id = ${user_id} AND title = '${title}'`;
      connection.execute(query2, (error, result) => {
        if (error) {
          return res.json({ message: "Query error" });
        }
        if (result.length) {
          return res.json({ message: "Note already exists .." });
        }
         else {
          const query3 = `INSERT INTO notes SET title = '${title}' , content = '${content}' , user_id = ${user_id}`;
          connection.execute(query3, (error, result) => {
            if (error) {
              return res.json({ message: "Query error" });
            }
            return result.affectedRows
              ? res.json({ message: "Note added successfully !" })
              : res.json({ message: "Failed to add note" });
          });
        }
      });
    }
  });
};

const updateNotes = (req, res, next) => {
  const { id, title, content, user_id } = req.body;

  //query to check if note already exists
  const query = `SELECT * from notes WHERE user_id = ${user_id} AND id = ${id}`;
  connection.execute(query, (error, result) => {
    if (error) {
      return res.json({ message: "Query error" });
    }
    if (!result.length) {
      return res.json({ messsage: "Note doesn't exist" });
    } else {
      const query2 = `UPDATE notes SET title = '${title}' , content = '${content}'  WHERE user_id = ${user_id} AND id = ${id}`;
      connection.execute(query2, (error, result) => {
        if (error) {
          return res.json({ message: "Query error" });
        }
        return result.affectedRows
          ? res.json({ message: "Note updates successfully !" })
          : res.json({ message: "Failed to update note" });
      });
    }
  });
};

const deleteNote = (req, res, next) => {
  const { id, user_id } = req.params;

  //query to check if note already exists
  const query = `SELECT * from notes WHERE user_id = ${user_id} AND id = ${id}`;
  connection.execute(query, (error, result) => {
    if (error) {
      return res.json({ message: "Query error" });
    }
    if (!result.length) {
      return res.json({ messsage: "Note doesn't exist" });
    } else {
      const query3 = `DELETE FROM notes WHERE user_id = ${user_id} AND id = ${id}`;
      connection.execute(query3, (error, result) => {
        if (error) {
          return res.json({ message: "Query error" });
        }
        return result.affectedRows
          ? res.json({ message: "Note deleted successfully !" })
          : res.json({ message: "Failed to delete note" });
      }); 
    }
  });
};

//For Front end we get notes of specific user

const getNotesOfUser = (req, res, next) => {
  const { user_id } = req.params;
  const query = `SELECT id , title , content FROM notes where user_id = ${user_id}`;
  connection.execute(query, (error, result) => {
    if (!result.length) {
      return res.json({ message: "No notes found" });
    } else {
      return res.json({ message: "Done", result });
    }
  });
};

const getSpecificNote = (req,res,result)=>{
  const {user_id , note_id} = req.params;
  const query = `SELECT id,title,content FROM notes WHERE user_id = ${user_id} AND id = ${note_id}`;
  connection.execute(query,(error,result)=>{
    if (error) {
      return res.json({ message: "Query error" });
    };
    if (!result.length) {
      return res.json({ message: "No notes found" });
    } else {
      return res.json({ message: "Done", result });
    }

  })
}

export {
  getAllNotes,
  getNotesWithOweners,
  addNotes,
  updateNotes,
  deleteNote,
  getNotesOfUser,
  searchNotes,
  getSpecificNote
};
