/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React from 'react'
import {
  Divider,
  Container,
  CardActions,
  CardContent,
  Card,
  Typography,
  ListItemIcon,
  ListItemText,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core'
import styled from 'styled-components'
import {
  clickedCardQuestion,
  toggleQuestionHover,
  deleteWorkflowQuestion,
  loadQuestionAnswers,
  addQuestionAnswer,
  setActiveQuestionId,
  toggleDeleteQuestionModal,
} from 'actions'
import { connect, useSelector } from 'react-redux'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Icon from '@material-ui/core/Icon'
import DeleteIcon from '@material-ui/icons/Delete'
import NavigationIcon from '@material-ui/icons/Navigation'

const Flex = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const QuestionCard = ({
  id,
  index,
  deleteWorkflowQuestion,
  isDeleteQuestionModalOpen,
  isHoveringQuestion,
  question_id,
  question_text,
  setActiveQuestionId,
  toggleDeleteQuestionModal,
  toggleQuestionHover,
  DragHandle,
}) => (
  <Card
    // onMouseEnter={() => toggleQuestionHover(!isHoveringQuestion)}
    // onMouseLeave={() => toggleQuestionHover(!isHoveringQuestion)}
    style={{
      marginBottom: '1rem',
      border: question_id === id ? '1.5px solid #035985' : '',
    }}
    // onClick={() => setActiveQuestionId(id)}
  >
    <CardContent onClick={() => clickedCardQuestion(id)}>
      <Flex>
        <Typography variant="h5" component="h2">
          {question_text}
        </Typography>
        <DragHandle />
      </Flex>
      <Typography color="textSecondary" gutterBottom>
        Order: {JSON.stringify(index)}
      </Typography>
    </CardContent>
    <Divider />
    <CardActions>
      <Button size="small">Edit</Button>
      {/* {isHoveringQuestion && question_id === id ? ( */}
      <Button
        size="small"
        color="secondary"
        onClick={() => toggleDeleteQuestionModal(id)}
      >
        Delete
      </Button>
      {/* ) : null} */}
      <Dialog
        open={isDeleteQuestionModalOpen}
        onClose={() => toggleDeleteQuestionModal(!isDeleteQuestionModalOpen)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Delete Question</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this question and all the questions
            attached to it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div>
            <Fab color="primary" aria-label="Add">
              <AddIcon />
            </Fab>
            <Fab color="secondary" aria-label="Edit">
              <Icon>edit_icon</Icon>
            </Fab>
            <Fab variant="extended" aria-label="Delete">
              <NavigationIcon />
              Extended
            </Fab>
            <Fab disabled aria-label="Delete">
              <DeleteIcon />
            </Fab>
          </div>
        </DialogActions>
      </Dialog>
    </CardActions>
  </Card>
)

/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

/*
{
  addQuestionAnswer,
  answers,
  clickedCardQuestion,
  deleteWorkflowQuestion,
  DragHandle,
  id,
  isDeleteQuestionModalOpen,
  isHoveringQuestion,
  lickedCardQuestion,
  loadingAnswers,
  loadingQuestions,
  loadQuestionAnswers,
  question_id,
  question_text,
  questions,
  setActiveQuestionId,
  toggleDeleteQuestionModal,
  toggleQuestionHover,
}
*/

export default connect(
  state => ({
    isHoveringQuestion: state.ui.isHoveringQuestion,
    questions: state.workflow.questions,
    answers: state.workflow.answers,
    question_id: state.workflow.question_id,
    loadingAnswers: state.workflow.loadingAnswers,
    loadingQuestions: state.workflow.loadingQuestions,
    isDeleteQuestionModalOpen: state.ui.isDeleteQuestionModalOpen,
  }),
  {
    clickedCardQuestion,
    toggleQuestionHover,
    deleteWorkflowQuestion,
    loadQuestionAnswers,
    addQuestionAnswer,
    setActiveQuestionId,
    toggleDeleteQuestionModal,
  }
)(QuestionCard)
// const QuestionCard = ({
//   id,
//   index,
//   question_text,
//   order,
//   workflow_id,
//   DragHandle,
// }) => (
//     <Card
//       // onMouseEnter={() => toggleQuestionHover(!isHoveringQuestion)}
//       // onMouseLeave={() => toggleQuestionHover(!isHoveringQuestion)}
//       style={{
//         marginBottom: '1rem',
//         // border: question_id === id ? '1.5px solid #035985' : '',
//       }}
//     // onClick={() => setActiveQuestionId(id)}
//     >
//       <CardContent
//       // onClick={() => clickedCardQuestion(id)}
//       >
//         <Flex>
//           <Typography variant="h5" component="h2">
//             {question_text}
//           </Typography>
//           <DragHandle />
//         </Flex>
//         <Typography color="textSecondary" gutterBottom>
//           Id: {id}
//           Order: {order}
//           Index: {index}
//         </Typography>
//       </CardContent>
//       <Divider />
//       <CardActions>
//         <Button size="small">Edit</Button>
//         {/* {isHoveringQuestion && question_id === id ? ( */}
//         <Button
//           size="small"
//           color="secondary"
//         // onClick={() => toggleDeleteQuestionModal(id)}
//         >
//           Delete
//       </Button>
//         {/* ) : null} */}
//         <Dialog
//           // open={isDeleteQuestionModalOpen}
//           // onClose={() => toggleDeleteQuestionModal(!isDeleteQuestionModalOpen)}
//           aria-labelledby="form-dialog-title"
//         >
//           <DialogTitle id="form-dialog-title">Delete Question</DialogTitle>
//           <DialogContent>
//             <DialogContentText>
//               Are you sure you want to delete this question and all the questions
//               attached to it?
//           </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button
//               // onClick={() =>
//               //   toggleDeleteQuestionModal(!isDeleteQuestionModalOpen)
//               // }
//               color="primary"
//             >
//               Cancel
//           </Button>
//             <Button
//             /* onClick={() => deleteWorkflowQuestion(id)}  */ color="primary"
//             >
//               Delete Question
//           </Button>
//           </DialogActions>
//         </Dialog>
//       </CardActions>
//     </Card>
//   )
// export default QuestionCard