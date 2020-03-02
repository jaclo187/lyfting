import Api from '@/services/Api'

export default {
  index(token) {
    return Api().post('workouts', token)
  }
}
