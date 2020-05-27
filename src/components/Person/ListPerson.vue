<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col text-left">
        <div>
          <h2>Listado de Personas</h2>
          <b-button size="sm" :to="{name: 'NewPerson'}" variant="primary">
            Nueva Persona
          </b-button>
          <br/>
          <br/>
        </div>
        <div class="col-md-12">
          <b-table striped hover :items="persons" :fields="fields">

            <template v-slot:cell(action)="data"> <!---<template slot="action" slot-scope="data"> -->
              <b-button size="sm" variant="primary" :to=" { name:'PersonEdit', params: {personId: data.item.id} }">
                Editar
              </b-button>
              <b-button size="sm" variant="danger" :to=" { name:'DeletePerson', params: {personId: data.item.id} }">
                Eliminar
              </b-button>
            </template>

          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      fields: [
        {key: 'tipoDocumento', label: 'TipoDoc'},
        {key: 'numeroDocumento', label: 'Documento'},
        {key: 'nombre', label: 'Nombre'},
        {key: 'apellido', label: 'Apellido'},
        {key: 'ciudad', label: 'Ciudad'},
        {key: 'action', label: ''},
      ],
      persons: [],
      ciudades: [],
      tiposDocumentos: []
    }
  },
  methods: {
    getPersons () {

      const path = 'http://localhost:8000/api/v1.0/persons/'
      axios.get(path).then((response) => {
        this.persons = response.data
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  created(){
    this.getPersons()
  }
}
</script>

<style lang="css" scoped>
</style>
