import {ref} from 'vue'
import {projectFirestore} from '../firebase/config'

const useDocument = (collection, id) => {
  const error = ref(null)
  const isPending = ref(false)

  const deleteDoc = async () => {
    isPending.value = true
    error.value = null

    try {
      const res = await projectFirestore.collection(collection).doc(id).delete()
      isPending.value = false
      return res
    } catch (err) {
      console.log(err.message)
      error.value = 'could not delete the document'
      isPending.value = false
    }
  }

  return {error, deleteDoc, isPending}
}

export default useDocument