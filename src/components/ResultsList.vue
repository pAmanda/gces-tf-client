<template>

  <v-list two-line>
    <v-subheader v-if="query !== ''">Search results for: "{{ query }}"</v-subheader>

    <v-list-item
      v-for="profile in results"
      :key="profile.username"
    >
      <v-list-item-avatar>
        <v-img
          :src="profile.image_url"
          lazy-src="https://via.placeholder.com/50.png"
        />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title id="profile-name" class="text-capitalize" v-text="profile.name"/>
        <v-list-item-title id="profile-username" class="grey--text" v-text="profile.username"/>
        <v-list-item-subtitle>
          <a
            id="results-list-gh-link"
            v-if="profile.url"
            class="text-decoration-none"
            :href="profile.url"
          >
            <v-icon small>fab fa-github</v-icon> {{ profile.url }}
          </a>
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <v-row dense>
          <v-col>
            <dialog-form :profile=profile @updatedEvent="treatEvent"/>
          </v-col>
          <v-col>
            <v-btn
              icon
              dense
              color="blue-grey"
              :to="{ name: 'profileView', params: { id: profile.id, profile: profile }}"
            >
              <v-icon small>fas fa-eye</v-icon>
            </v-btn>
          </v-col>
          <v-col>
            <dialog-delete :profile=profile @deletedEvent="treatEvent"/>
          </v-col>
        </v-row>
      </v-list-item-action>

    </v-list-item>
  </v-list>

</template>

<script>
import DialogForm from '@/components/DialogForm'
import DialogDelete from '@/components/DialogDelete'

export default {
  name: 'ResultsList',

  components: {
    DialogForm,
    DialogDelete
  },

  data () {
    return {
      query: '',
      errors: []
    }
  },

  props: {
    results: Array,
    search: String
  },

  methods: {
    treatEvent () {
      // pass the search argument back to parent to redo the request
      this.$emit('updatedProfile', this.query)
    }
  },

  mounted () {
    this.query = this.search ? this.search : ''
  },

  updated () {
    this.query = this.search ? this.search : ''
  }
}
</script>
