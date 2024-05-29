import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => axios.get(baseUrl).then(res => res.data)

export const createAnecdotes = (newAnecdote) => {
    const getId = () => (100000 * Math.random()).toFixed(0)

    const anecdote = {
        content: newAnecdote,
        id: getId(),
        votes: 0
    }

    return axios.post(baseUrl, anecdote).then(res => res.data)
}

export const increaseVote = (anecdote) => {
    const newAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
    }

    axios.put(`${baseUrl}/${anecdote.id}`, newAnecdote)
}

