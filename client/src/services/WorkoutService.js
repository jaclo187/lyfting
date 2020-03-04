import Api from '@/services/Api'

export default {
  index(data) {
    return Api().post('workouts', data)
  },
  post(token) {
    return Api().post('workouts/create', token)
  },
  update(token, id, name) {
    //name == new name
    Api().patch('workouts/update', {token, id, name})
  },
  delete(token, id) {
    Api().delete(`workouts/delete/${id}`, { data: { }, headers: { "Authorization": token } })
  }
}
