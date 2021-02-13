const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//-------ROUTES-------//

//create a to do

app.post('/todos', async(req,res) => {
    try {
        const {desc_st} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO tb_todo (desc_st) VALUES($1) RETURNING * ", 
            [desc_st]
        );
        
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all to dos

app.get('/todos', async(req, res) =>{
    try {
        const allTodos = await pool.query("SELECT * FROM tb_todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get a to do

app.get('/todos/:id', async (req, res) =>{
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM tb_todo WHERE todo_id = $1", [id]);

        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//update a to do

app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { desc_st } = req.body;
        const updateTodo = await pool.query("UPDATE tb_todo SET desc_st = $1 WHERE todo_id = $2", [desc_st, id]);

        res.json("Task updated to: " + desc_st);
    } catch (err) {
        console.error(err.message);
    }
});

//delete a to do

app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM tb_todo WHERE todo_id = $1", [id]);

        res.json('Task deleted!');
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
});

