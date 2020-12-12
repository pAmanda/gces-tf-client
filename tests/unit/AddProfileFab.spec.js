import Vuetify from 'vuetify'

import AddProfileFab from '@/components/AddProfileFab'

import {
  mount,
  createLocalVue
} from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuetify)

describe('AddProfileFab.vue', () => {
  let vuetify
  let wrapper

  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(AddProfileFab, {
      localVue
    })
  })

  it('is a vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  }),

  it('should open a dialog when btn is clicked', () => {
    const showModal = jest.fn()
    wrapper.vm.showModal = showModal

    wrapper.find('.v-btn--fab').trigger('click')

    expect(showModal).toHaveBeenCalled()
  }),

  it('should close a dialog when btn is clicked', () => {
    const closeModal = jest.fn()
    wrapper.vm.closeModal = closeModal

    wrapper.vm.dialog = true
    wrapper.vm.$nextTick().then(() => {
      wrapper.find('#modal-close').trigger('click')

      expect(closeModal).toHaveBeenCalled()
    })
  }),

  it('should create a profile when btn is clicked', () => {
    const create = jest.fn()
    wrapper.vm.create = create

    wrapper.vm.dialog = true
    wrapper.vm.$nextTick().then(() => {
      wrapper.find('#modal-create').trigger('click')

      expect(create).toHaveBeenCalled()
    })
  })
})
