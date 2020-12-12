import Vuetify from 'vuetify'
import VListItem from 'vuetify'
import VListItemAvatar from 'vuetify'
import VSubheader from 'vuetify'

import ResultsList from '@/components/ResultsList'
import DialogDelete from '@/components/DialogDelete'
import DialogForm from '@/components/DialogForm'

import {
  mount,
  createLocalVue
} from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuetify)

describe('ResultsList.vue', () => {
  let vuetify
  let wrapper

  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(ResultsList, {
      localVue,
      propsData: {
        results: [
          {
            id: 1,
            name: 'andre',
            username: 'andre-filho',
            url: 'url',
            image_url: 'image_url'
          }
        ],
        search: 'andre'
      }
    })
  })

  it('is a vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  }),

  it('should render data', () => {
    expect(wrapper.find('.v-subheader').exists()).toBeTruthy()
    expect(wrapper.find('.v-list-item').exists()).toBeTruthy()
    expect(wrapper.find('#results-list-gh-link').exists()).toBeTruthy()
    expect(wrapper.find('#dialog-form-open').exists()).toBeTruthy()
    expect(wrapper.find('#dialog-delete-open').exists()).toBeTruthy()

    expect(wrapper.find('#profile-name').text()).toBe('andre')
    expect(wrapper.find('#profile-username').text()).toBe('andre-filho')
  }),

  it('should not render VSubheader component if query is empty', () => {
    wrapper = mount(ResultsList, {
      localVue,
      propsData: {
        results: [
          {
            id: 1,
            name: 'andre',
            username: 'andre-filho',
            url: 'url',
            image_url: 'image_url'
          }
        ],
        search: ''
      }
    })

    expect(wrapper.find('.v-subheader').exists()).toBe(false)
  })
})
