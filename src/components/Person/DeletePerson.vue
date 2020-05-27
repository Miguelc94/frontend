<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col">

        <h3>¿Esta seguro que desea eliminar esta persona?</h3>
        <p>Documento : {{ this.element.numeroDocumento }}</p>
        <p>Nombre : {{ this.element.nombre }}</p>
        <p>Apellido : {{ this.element.apellido }}</p>
        <p>Ciudad : {{ this.element.ciudad }}</p>

      </div>
    </div>

    <div class="row">
      <div class="col">
        <b-button v-on:click="deletePerson" variant="danger">Eliminar</b-button>
        <b-button type="submit" class="btn-large-spcare" :to="{ name: 'ListPerson' }">Cancelar</b-button>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert'
export default {
  data () {
    return {
      personId: this.$route.params.personId,
      element: {
        numeroDocumento: '',
        nombre: '',
        apellido: '',
        ciudad: ''
      }
    }
  }
  ,
  methods: {
    getPerson (){
      const path =  `http://localhost:8000/api/v1.0/persons/${this.personId}/ `

      axios.get(path).then((response) => {
        this.element.tipoDocumento = response.data.tipoDocumento
        this.element.numeroDocumento = response.data.numeroDocumento
        this.element.nombre = response.data.nombre
        this.element.apellido = response.data.apellido
        this.element.ciudad = response.data.ciudad
      })
      .catch((error) => {
        console.console.log(error);
      })
    },
    deletePerson (){
      const path =  `http://localhost:8000/api/v1.0/persons/${this.personId}/ `
      axios.delete(path).then((response) => {
        location.href = '/persons'
      })
      .catch((error) => {
        swal("No es posible eliminar la Persona.", "", "error")
        console.console.log(error);
      })

    }
  },
  created() {
    this.getPerson()
  }
}
</script>

<style lang="css" scoped>
</style>
