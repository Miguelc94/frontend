import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import ListPerson from '@/components/Person/ListPerson'
import PersonEdit from '@/components/Person/PersonEdit'
import DeletePerson from '@/components/Person/DeletePerson'
import NewPerson from '@/components/Person/NewPerson'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/persons',
      name: 'ListPerson',
      component: ListPerson
    },
    {
      path: '/persons/:personId/edit',
      name: 'PersonEdit',
      component: PersonEdit
    },
    {
      path: '/persons/:personId/delete',
      name: 'DeletePerson',
      component: DeletePerson
    },
    {
      path: '/persons/new',
      name: 'NewPerson',
      component: NewPerson
    }
  ],
  mode: 'history'
})
