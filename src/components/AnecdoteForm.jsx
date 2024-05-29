import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdotes } from "../request"
import { handleCreateEvent, handleError, useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdotes,
    onSuccess: (anecdote) => {
      handleCreateEvent(dispatch, anecdote.content)
      queryClient.invalidateQueries({queryKey: ["anecdotes"]})
    },
    onError: (error) => {
      handleError(dispatch, error.response.data)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
