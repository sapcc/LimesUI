import useQueryClientFn from "./lib/apiClient"

const AsyncWorker = ({ mockAPI }) => {
    useQueryClientFn(mockAPI)
    return null
  }
  
  export default AsyncWorker
