import Vuetify from 'vuetify'

import DialogForm from '@/components/DialogForm'

import {
  mount,
  createLocalVue
} from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuetify)

describe('DialogForm.vue', () => {
  let vuetify
  let wrapper

  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(DialogForm, {
      localVue,
      propsData: {
        profile: {
          name: 'Andre',
          url: 'https://github.com/andre-filho'
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

    wrapper.find('#dialog-form-open').trigger('click')

    expect(showModal).toHaveBeenCalled()
  }),

  it('should close a dialog when btn is clicked', () => {
    const closeModal = jest.fn()
    wrapper.vm.closeModal = closeModal

    wrapper.vm.dialog = true
    wrapper.vm.$nextTick().then(() => {
      wrapper.find('#dialog-form-close').trigger('click')

      expect(closeModal).toHaveBeenCalled()
    })
  }),

  it('should update a profile when btn is clicked', () => {
    const update = jest.fn()
    wrapper.vm.update = update

    wrapper.vm.dialog = true
    wrapper.vm.$nextTick().then(() => {
      wrapper.find('#dialog-form-update').trigger('click')

      expect(update).toHaveBeenCalled()
    })
  }),

  it('should trigger refreshProfile', () => {
    wrapper = mount(DialogForm, {
      localVue,
      propsData: {
        refresh: true,
        profile: {
          name: 'Andre',
          url: 'https://github.com/andre-filho'
        }
      }
    })

    const update = jest.fn()
    wrapper.vm.update = update

    wrapper.vm.dialog = true
    wrapper.vm.$nextTick().then(() => {
      wrapper.find('#dialog-form-refresh').trigger('click')

      expect(update).toHaveBeenCalled()
    })

  })
})
