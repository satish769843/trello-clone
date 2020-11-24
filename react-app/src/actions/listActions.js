const { GET_LIST, LIST_FAIL } = require('./types')
const axios = require('axios')
const URL = process.env.REACT_APP_URL + 'api'
// get List
export const getList = () => async (dispatch) => {
  try {
    const res = await axios.get(`${URL}/list`)

    dispatch({
      type: GET_LIST,
      payload: res.data.results,
    })

    return res.data.results
  } catch (err) {
    dispatch({
      type: LIST_FAIL,
    })
  }
}
