import express from 'express'
import db from '../db.js'

const router = express.Router()

router.get('/', (req, res) => {
  const getTodo = db.prepare('SELECT * FROM todo WHERE user_id = ?')
  const todo = getTodo.all(req.userId)
  res.json(todo)
})

router.post('/', (req, res) => {
  const { task } = req.body

  const insertTodo = db.prepare(
    'INSERT INTO todo (user_id, task) VALUES (?, ?)'
  )
  const result = insertTodo.run(req.userId, task)

  res.json({ id: result.lastInsertRowid, task, completes: 0 })
})

router.put('/:id', (req, res) => {
  const { completed } = req.body
  const { id } = req.params

  const updateTodo = db.prepare(
    'UPDATE todo SET isComplete = ? WHERE id = ?'
  )
  updateTodo.run(completed, id)

  res.json({ message: "Todo updated" })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  const deleteTodo = db.prepare(
    'DELETE FROM todo WHERE id = ? AND user_id = ?'
  )
  deleteTodo.run(id, req.userId)

  res.json({ message: "Todo deleted" })
})

export default router
