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
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import NavigationIcon from '@material-ui/icons/Navigation'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import styled from 'styled-components'
import { clickedCardQuestion, toggleResponseHover } from 'actions'
import { connect, useSelector } from 'react-redux'
import { Flex } from '@/utility'
import Fab from '@material-ui/core/Fab'
import Icon from '@material-ui/core/Icon'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Drag } from 'mdi-material-ui'
import { sortableHandle } from 'react-sortable-hoc'
import SortableList from './sortableList'

const DragHandle = sortableHandle(({ children }) => (
  <Drag style={{ marginRight: '1rem' }} />
))
const ResponseCard = ({
  id,
  text,
  owner,
  workflow,
  index,
  isHoveringQuestion,
  responses,
}) => (
  // const items = responses.filter(item => item.owner === id)

  <ExpansionPanel>
    <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <DragHandle></DragHandle>
      <Typography>{text}</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Flex column>
        {responses
          .filter(item => item.owner === id)
          .map(item => (
            <ExpansionPanel style={{ width: '100%' }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{item.text}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {/* <div>
                  <Typography>ID: {item.id}</Typography>
                  <Typography>OWNER: {item.owner}</Typography>
                  <Typography>INDEX: {item.index}</Typography>
                </div> */}
                <div>
                  {responses
                    .filter(nextItem => nextItem.owner === item.id)
                    .map(currentItem => (
                      <div key={currentItem.id}>{currentItem.text}</div>
                    ))}
                  {/* <SortableList
                    items={responses}
                    currentItem={responses.filter(
                      nextItem => nextItem.owner === item.id
                    )}
                  ></SortableList> */}
                  {/* {responses
                    .filter(nextItem => nextItem.owner === item.id)
                    .map(currentItem => (
                      <SortableList
                        key={currentItem.id}
                        items={responses}
                        currentItem={currentItem}
                      />
                    ))} */}
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
      </Flex>
    </ExpansionPanelDetails>
  </ExpansionPanel>
)

export default connect(
  state => ({
    isHoveringQuestion: state.ui.isHoveringQuestion,
    responses: state.responses.unSaved,
  }),
  { clickedCardQuestion, toggleResponseHover }
)(ResponseCard)