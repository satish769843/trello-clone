const { MOVE_CARD, CARD_FAIL } = require('./types')
const axios = require('axios')
const URL = process.env.REACT_APP_URL + 'api'
//
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const moveCard = (data, id) => async (dispatch) => {
  //
  const body = JSON.stringify(data)
  //   console.log('moveCard -> body', body);
  try {
    const res = await axios.patch(`${URL}/card/move/${id}`, body, config)
    dispatch({
      type: MOVE_CARD,
    })
    return res
  } catch (errr) {
    dispatch({
      type: CARD_FAIL,
    })
  }
}
export const addCard = (data) => async (dispatch) => {
  //
  const body = JSON.stringify(data)

  try {
    const res = await axios.post(`${URL}/card/add`, body, config)
    return res
  } catch (err) {
    dispatch({
      type: CARD_FAIL,
    })
  }
}

// edit Card
export const editCard = (data, id) => async (dispatch) => {
  const body = JSON.stringify(data)
  try {
    const res = await axios.patch(`${URL}/card/edit/${id}`, body, config)
  } catch (err) {
    dispatch({
      type: CARD_FAIL,
    })
  }
}

export const deleteCard = (listId, cardId) => async (dispatch) => {
  try {
    const res = await axios.delete(`${URL}/card/delete/${listId}/${cardId}`)
    return res
  } catch (err) {
    dispatch({
      type: CARD_FAIL,
    })
  }
}
