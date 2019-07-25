const AxiosApiEndPoints = {
    user: {
      get: "/api/exercise/user",
      post: "/api/exercise/update-user",
      patch: "/api/exercise/delete-user",
    },
    activity: {
      get: "/api/exercise/activity",
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