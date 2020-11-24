import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import swal from 'sweetalert'
import BlockUi from 'react-block-ui'
import 'react-block-ui/style.css'
import { getList } from '../../actions/listActions'
import { connect } from 'react-redux'
import {
  moveCard,
  addCard,
  editCard,
  deleteCard,
} from '../../actions/cardAction'

import {
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from 'reactstrap'
const Card = ({
  getList,
  listTitle,
  moveCard,
  addCard,
  editCard,
  deleteCard,
}) => {
  const [columns, setColumns] = useState({ items: [] })
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [_id, set_id] = useState(null)
  const [cardId, setCardId] = useState(null)
  const [blocking, setBlocking] = useState(false)

  const onDragEnd = (result, list) => {
    if (!result.destination) return
    // // Listing
    // const reorder = (list, startIndex, endIndex) => {
    //   const result = Array.from(list);
    //   const [removed] = result.splice(startIndex, 1);
    //   result.splice(endIndex, 0, removed);

    //   return result;
    // };
    // // Get All Item
    // const itemSubItemMap = columns.items.reduce((acc, data) => {
    //   acc[data._id] = data.cardId;
    //   return acc;
    // }, {});
    // const sourceParentId = result.source.droppableId;

    // const destParentId = parseInt(result.destination.droppableId);

    // const sourceSubItems = itemSubItemMap[sourceParentId];

    // const destSubItems = itemSubItemMap[destParentId];
    // let newItems = [...columns.items];
    // console.log('onDragEnd -> newItems', newItems);
    const { source, destination } = result

    if (source.droppableId !== destination.droppableId) {
      const { droppableId, index } = destination
      const Id = source.droppableId
      const sourceColumn = list.find(
        (column) => column._id === source.droppableId
      )

      const copiedItems = [...sourceColumn.cardId]
      const [removed] = copiedItems.splice(source.index, 1)

      const data = {
        fromId: Id,
        toId: droppableId,
        toIndex: index,
      }
      moveCard(data, removed._id).then((res) => {
        setBlocking(true)
        getList().then((res) => {
          setTimeout(() => {
            setBlocking(false)
            setColumns({ items: res })
          }, 1000)
        })
      })
    } else {
      const { droppableId, index } = destination
      // const reorderedSubItems = reorder(
      //   sourceSubItems,
      //   result.source.index,
      //   result.destination.index
      // );

      // newItems = newItems.map((item) => {
      //   if (item._id === sourceParentId) {
      //     item.cardId = reorderedSubItems;
      //   }
      //   return item;
      // });
      // setColumns({ items: newItems });
      const sourceColumn = list.find(
        (column) => column._id === source.droppableId
      )

      const copiedItems = [...sourceColumn.cardId]
      const [removed] = copiedItems.splice(source.index, 1)
      const data = {
        fromId: droppableId,
        toId: droppableId,
        toIndex: index,
      }
      moveCard(data, removed._id).then((res) => {
        setBlocking(true)
        getList().then((res) => {
          setTimeout(() => {
            setBlocking(false)
            setColumns({ items: res })
          }, 1000)
        })
      })
    }
  }
  const toggleCategoryModal = (e) => {
    setShowModal(false)
    set_id(null)
    setName('')
    setCardId(null)
  }
  const onClickModel = (e, id) => {
    setShowModal(true)
    set_id(null)
    setCardId(id)
  }
  const onFieldChange = (e) => {
    setName(e.target.value)
  }
  const toggleSaveModal = (e) => {
    setShowModal(false)
    const data = {
      title: name,
      listId: cardId,
    }
    if (!_id) {
      addCard(data).then((res) => {
        getList().then((res) => setColumns({ items: res }))
        setCardId(null)
        setName('')
        swal({
          title: 'Card Add Successfully!',
          icon: 'success',
          timer: 3000,
        })
      })
    } else {
      const data = {
        title: name,
      }
      editCard(data, _id).then((res) => {
        getList().then((res) => setColumns({ items: res }))
        swal({
          title: 'Card Edit Successfully!',
          icon: 'success',
          timer: 3000,
        })
      })
    }
  }
  const onEditModal = (e, item) => {
    setShowModal(true)
    set_id(item._id)
    setName(item.title)
  }
  const onDeleteItem = (e, id, item) => {
    swal({
      title: 'Are you sure?',
      text: `Are you sure that you want to delete ${item.title} Card ?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // console.log(id, item._id)
        deleteCard(id, item._id).then((res) => {
          swal({
            title: 'Card Delete Successfully!',
            icon: 'success',
            timer: 3000,
          })
          getList().then((res) => setColumns({ items: res }))
        })
      }
    })
  }
  useEffect(() => {
    getList().then((res) => setColumns({ items: res }))
  }, [getList])
  // console.log(columns);
  const { list, loading } = listTitle
  return (
    <>
      {
        <DragDropContext onDragEnd={(results) => onDragEnd(results, list)}>
          {!loading && list.length > 0 ? (
            columns.items.map((column) => {
              return (
                <BlockUi tag='div' blocking={blocking}>
                  <div
                    className='card mb-3 border-primary mr-5'
                    style={{ width: '400px' }}
                    key={column._id}
                  >
                    <div className='card-header d-flex'>
                      <div className='mr-auto row-hl'>{column.title}</div>
                      <div className='row-hl'>
                        <button
                          className='btn btn-primary'
                          onClick={(e) => onClickModel(e, column._id)}
                        >
                          <i className='fa fa-plus '></i>
                        </button>
                      </div>
                    </div>

                    <div style={{ margin: 8 }}>
                      <Droppable droppableId={column._id}>
                        {(provided) => {
                          return (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >
                              {column.cardId.map((item, index) => {
                                return (
                                  <Draggable
                                    key={item._id}
                                    draggableId={item._id}
                                    index={index}
                                  >
                                    {(provided) => {
                                      return (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          <div
                                            className=' card mx-1 my-1 card-body border-secondary'
                                            style={{ padding: '0px' }}
                                          >
                                            <div className='d-flex'>
                                              <div className='p-4 mr-auto row-hl '>
                                                <p className='card-text border-primary'>
                                                  {item.title}
                                                </p>
                                              </div>
                                              <div className='p-4 item-hl'>
                                                <button
                                                  className='btn btn-primary mr-2'
                                                  onClick={(e) =>
                                                    onEditModal(e, item)
                                                  }
                                                >
                                                  <i className='fa fa-pencil '></i>
                                                </button>
                                                <button
                                                  className='btn btn-danger'
                                                  onClick={(e) =>
                                                    onDeleteItem(
                                                      e,
                                                      column._id,
                                                      item
                                                    )
                                                  }
                                                >
                                                  <i className='fa fa-trash'></i>
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    }}
                                  </Draggable>
                                )
                              })}
                              {provided.placeholder}
                            </div>
                          )
                        }}
                      </Droppable>
                    </div>
                  </div>
                </BlockUi>
              )
            })
          ) : (
            <h1>Loading...</h1>
          )}
        </DragDropContext>
      }

      {/* ============================= {MODAL} ============================= */}
      <Modal isOpen={showModal}>
        <ModalHeader toggle={(e) => toggleCategoryModal(e)}>
          Save Card
        </ModalHeader>
        <ModalBody>
          <FormGroup row>
            <Col xs='12'>
              <label>Title</label>
            </Col>
            <Col xs='12'>
              <input
                placeholder='Enter Title'
                rows='3'
                type='text'
                name='title'
                value={name}
                onChange={(e) => onFieldChange(e)}
                className='form-control '
              />
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter className='px-4'>
          <button
            className='btn btn-primary '
            onClick={(e) => toggleSaveModal(e)}
          >
            <span> Save</span>
          </button>
          <button
            className='btn btn-outline-warning'
            onClick={(e) => toggleCategoryModal(e)}
          >
            <span> Cancel</span>
          </button>
        </ModalFooter>
      </Modal>
      {/* ================  Modal Close ============== */}
    </>
  )
}
Card.propTypes = {
  getList: PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired,
  editCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  listTitle: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
  listTitle: state.list,
})
export default connect(mapStateToProps, {
  getList,
  moveCard,
  addCard,
  editCard,
  deleteCard,
})(Card)
