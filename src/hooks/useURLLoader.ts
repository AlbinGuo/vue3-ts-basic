import {ref} from 'vue'
import axios from 'axios'

function useURLLoader<T>(url: string) {
  const loading = ref(true)
  const loaded  = ref(false)
  const result = ref<T | null>(null)

  axios.get(url).then((rawData) => {
    console.log('-----rawData-----',rawData.data)
    loading.value = false
    loaded.value = true
    result.value = rawData.data
  }).
  catch(e => {
    console.log(e)
  })


  return {
    loading,
    loaded,
    result
  }
}

export default useURLLoader