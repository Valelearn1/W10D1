import { useState, useEffect } from 'react'
import { Alert, Button, ListGroup } from 'react-bootstrap'

const SingleComment = ({ comment, refreshComments }) => {
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    if (!feedback) return
    const timer = setTimeout(() => setFeedback(null), 4000)
    return () => clearTimeout(timer)
  }, [feedback])

  const deleteComment = async (asin) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return
    }
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments/' + asin,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTQ2NTNlY2E0NjE0NDAwMTVlMDVjZjMiLCJpYXQiOjE3ODI5OTM5MDAsImV4cCI6MTc4NDIwMzUwMH0.BfZqaFoCGBdXZSZRNKmGHKCm2T8TxxdiDYjh6rzXXb8',
          },
        }
      )
      if (response.ok) {
        // Stessa idea di AddComment: il commento è stato cancellato sul
        // server, avvisiamo CommentArea di rifare la fetch così sparisce
        // subito anche dalla lista a schermo.
        refreshComments()
      } else {
        setFeedback({ variant: 'danger', message: 'Errore: la recensione non è stata cancellata.' })
      }
    } catch (error) {
      setFeedback({ variant: 'danger', message: 'Errore: la recensione non è stata cancellata.' })
    }
  }

  return (
    <ListGroup.Item>
      {feedback && (
        <Alert
          variant={feedback.variant}
          onClose={() => setFeedback(null)}
          dismissible
          className="mb-2"
        >
          {feedback.message}
        </Alert>
      )}
      <div>
        {'★'.repeat(Number(comment.rate)) +
          '☆'.repeat(5 - Number(comment.rate))}
      </div>
      {comment.comment}
      <Button
        variant="danger"
        className="ml-2"
        onClick={() => deleteComment(comment._id)}
      >
        Delete
      </Button>
    </ListGroup.Item>
  )
}

export default SingleComment
