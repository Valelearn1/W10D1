import { ListGroup } from 'react-bootstrap'
import SingleComment from './SingleComment'

const CommentList = ({ commentsToShow, refreshComments }) => (
  <ListGroup style={{ color: 'black' }} className="mt-2">
    {commentsToShow.map((comment) => (
      // refreshComments viene semplicemente "girata" a ogni SingleComment:
      // CommentList non la usa direttamente, fa solo da tramite.
      <SingleComment
        comment={comment}
        refreshComments={refreshComments}
        key={comment._id}
      />
    ))}
  </ListGroup>
)

export default CommentList
