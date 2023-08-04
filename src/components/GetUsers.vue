<template>
  
</template>

<script>

export default  {
    methods: {
        getUsers(){
            fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(data)
        }
    }
    
}
</script>

<style>

</style>