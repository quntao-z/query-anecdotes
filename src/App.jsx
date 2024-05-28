import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, increaseVote } from './request'
import { useNotificationDispatch } from './NotificationContext'


const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes  
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: increaseVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
    }
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote})
    dispatch('VOTED')
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
