import Vuetify from 'vuetify'

import DialogDelete from '@/components/DialogDelete'

import {
  mount,
  createLocalVue
} from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuetify)

describe('DialogDelete.vue', () => {
  let vuetify
  let wrapper

  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(DialogDelete, {
      localVue,
      propsData: {
        profile: {
          name: 'Andre'
        }
      }
    })
  })

  it('is a vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  }),

  it('should open a dialog when btn is clicked', () => {
    const showModal = jest.fn()
    wrapper.vm.showModal = showModal

    wrapper.find('#dialog-delete-open').trigger('click')

    expect(showModal).toHaveBeenCalled()
  }),

  it('should close a dialog when btn is clicked', () => {
    const closeModal = jest.fn()
    wrapper.vm.closeModal = closeModal

    wrapper.vm.dialog = true
    wrapper.vm.$nextTick().then(() => {
      wrapper.find('#dialog-delete-close').trigger('click')

      expect(closeModal).toHaveBeenCalled()
    })
  }),

  it('should delete a profile when btn is clicked', () => {
    const deleteAction = jest.fn()
    wrapper.vm.deleteAction = deleteAction

    wrapper.vm.dialog = true
    wrapper.vm.$nextTick().then(() => {
      wrapper.find('#dialog-delete-delete').trigger('click')

      expect(deleteAction).toHaveBeenCalled()
    })
  })
})
