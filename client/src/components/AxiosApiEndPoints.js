const AxiosApiEndPoints = {
    activity: {
      get: "/api/exercise/activities",
      post: "/api/exercise/add-activity",
      patch: "/api/exercise/delete-activity",
    },
    exercise: {
      get: "/api/exercise/exercises",
      post: "/api/exercise/add-exercise",
      patch: "/api/exercise/delete-exercise",
    }
  }

  export default AxiosApiEndPoints;