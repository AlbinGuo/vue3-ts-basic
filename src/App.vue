<template>
  <div id="app">
    <div v-if="loading">Loading</div>
    <div v-if="loaded">
      <img :src="result[0].url" alt="">
    </div>

    <h1>{{count}}</h1>
    <h1>{{double}}</h1>
    <ul>
      <li v-for="num in numbers" :key="num"><h1>{{ num }}</h1></li>
    </ul>
    <div>{{ x }} -- {{ y }}</div>
    
    <button @click="increase">增加</button>
  </div>
</template>

<script lang="ts">
  import { computed, reactive, toRefs, watch }  from 'vue'
  import useMousePosition from './hooks/useMousePosition'
  import useURLLoader from './hooks/useURLLoader'


  interface DataProps {
    count: number;
    double: number;
    increase: () => {};
    numbers: number[];
    person: {name?: string};
  }

  interface DogResult {
    message: string;
    status: string;
  }

  interface CatResult {
    id: string;
    url: string;
    width: number;
    height: number;
  }

  export default {
    name: 'App',
    setup() {
      // const count = ref(0)
      // const double = computed(() => {
      //   return count.value * 2
      // })

      // const increase = () => {
      //   count.value++
      // }

      const data: DataProps = reactive({
        count: 0,
        double: computed(() => data.count * 4),
        increase: () => data.count++,
        numbers: [1,2,3],
        person: {}
      })


      


      const ss = useMousePosition()
      const cat = useURLLoader<CatResult[]>('https://api.thecatapi.com/v1/images/search?limit=1')
    
      watch(cat.result, () => {
        if(cat.result){
          console.log('cat.result.value?.message==',cat.result.value[0]?.url)
        }
      })


      const refData = toRefs(data)

      return {
        // count, double, increase
        ...refData,
        ...ss,
        ...cat
      }


    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1 {
  font-size: 5rem;
}
button {
  font-size: 3rem;
}
</style>
