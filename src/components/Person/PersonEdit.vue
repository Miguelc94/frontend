<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col text-left">
        <h2>Editar Persona</h2>
        <div class="row">
          <div class="col">
            <div class="card">
              <div class="card-body">

                <form @submit="onSubmit">

                  <div class="form-group row">
                    <label for="tipoDocumento" class="col-sm-2 col-form-label">TipoDoc</label>
                    <div class="col-sm-6">
                    <select name="tipoDocumento" class="form-control" v-model.trim="form.tipoDocumento" required>
                        <option v-for="tipo in tiposDocumentos" :value="tipo.id" >
                          {{ tipo.tipo_Documento }}
                        </option>
                    </select>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="numeroDocumento" class="col-sm-2 col-form-label">Documento</label>
                    <div class="col-sm-6">
                      <input type="text" placeholder="Documento" name="numeroDocumento" class="form-control" v-model.trim="form.numeroDocumento">
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="nombre" class="col-sm-2 col-form-label">Nombre</label>
                    <div class="col-sm-6">
                      <input type="text" placeholder="Nombre" name="nombre" class="form-control" v-model.trim="form.nombre">
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="apellido" class="col-sm-2 col-form-label">Apellido</label>
                    <div class="col-sm-6">
                      <input type="text" placeholder="Apellido" name="apellido" class="form-control" v-model.trim="form.apellido">
                    </div>
                  </div>


                  <div class="form-group row">
                    <label for="ciudad" class="col-sm-2 col-form-label">Ciudad</label>
                    <div class="col-sm-6">
                      <select name="ciudad" class="form-control" v-model.trim="form.ciudad" required>
                          <option v-for="ciu in ciudades" :value="ciu.id" >
                            {{ ciu.nombre_Ciudad }}
                          </option>
                      </select>
                    </div>
                  </div>

                  <div class="rows">
                    <div class="col text-left">
                      <b-button type="submit" variant="primary">
                        Editar
                      </b-button>
                      <b-button type="submit" class="btn-large-spcare" :to="{ name: 'ListPerson' }">
                        Cancelar
                      </b-button>
                    </div>
                  </div>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert'
export default {
  data() {
    return {
      personId: this.$route.params.personId,
      form: {
        tipoDocumento: '',
        numeroDocumento: '',
        nombre: '',
        apellido: '',
        ciudad: ''
      },
      ciudades: [],
      tiposDocumentos: []
    }
  },
  methods: {
    onSubmit(evt){
      evt.preventDefault()

      const path =  `http://localhost:8000/api/v1.0/persons/${this.personId}/ `

      axios.put(path, this.form).then((response) => {
        this.form.tipoDocumento = response.data.tipoDocumento
        this.form.numeroDocumento = response.data.numeroDocumento
        this.form.nombre = response.data.nombre
        this.form.apellido = response.data.apellido
        this.form.ciudad = response.data.ciudad

        swal("Persona actualizada exitosamente.", "", "success")
        location.href = '/persons'
      })
      .catch((error) => {
        console.console.log(error);
      })
    },
    getPerson (){
      const path =  `http://localhost:8000/api/v1.0/persons/${this.personId}/ `

      axios.get(path).then((response) => {
        this.form.tipoDocumento = response.data.tipoDocumento
        this.form.numeroDocumento = response.data.numeroDocumento
        this.form.nombre = response.data.nombre
        this.form.apellido = response.data.apellido
        this.form.ciudad = response.data.ciudad
      })
      .catch((error) => {
        console.console.log(error);
      })
    },
    getCiudades () {

      const path = 'http://127.0.0.1:8000/api/v1.0/nombreCiudad/'
      axios.get(path).then((response) => {
        this.ciudades = response.data
      })
      .catch((error) => {
        console.log(error)
      })
    },
    getDocumentos () {

      const path = 'http://127.0.0.1:8000/api/v1.0/tipoDocumento/'
      axios.get(path).then((response) => {
        this.tiposDocumentos = response.data
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  created() {
    this.getDocumentos(),
    this.getCiudades(),
    this.getPerson()
  }
}
</script>

<style lang="css" scoped>
</style>
