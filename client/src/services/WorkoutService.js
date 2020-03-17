import Api from '@/services/Api'

export default {
  index(data) {
    return Api().post('workouts', data)
  },
  post(token) {
    return Api().post('workouts/create', token)
  },
  newSet(token, workoutID){
    return Api().post('workouts/set/new', {token: token, workoutID: workoutID})
  },
  deleteSet(token, setID){
    return Api().post('workouts/set/delete', {token: token, setID: setID})
  },
  newSetLog(token, setID, exerciseName){
    return Api().post('workouts/set/log', {token: token, setID: setID, exercise: exerciseName})
  },
  updateSetLog(token, setLog){
    Api().patch('workouts/set/log/update', {token: token, setLog: setLog})
  },
  updateSetLogExercise(token, set, exercise){
    Api().patch('workouts/set/exercise/update', {token: token, setID: set, exercise: exercise})
  },
  update(token, id, name) {
    //name == new name
    Api().patch('workouts/update', {token, id, name})
  },
  delete(token, id) {
    Api().delete(`workouts/delete/${id}`, { data: { }, headers: { "Authorization": token } })
  }
}
