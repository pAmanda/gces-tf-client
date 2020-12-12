<template>
  <div>
    <v-fab-transition>
      <v-btn
        id="modal-open"
        color="blue-grey"
        dark
        fixed
        bottom
        right
        fab
        @click.stop="showModal"
      >
        <v-icon small>fas fa-user-plus</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">
            Add new profile
          </span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <div
              v-if="errors.length > 0"
            >
              <v-alert
                v-for="err in errors"
                :key="err.id"
                dense
                dismissible
                type="error"
              >
                {{ err }}
              </v-alert>
            </div>

            <v-row>
              <v-col cols="12">
                <v-text-field
                  dense
                  outlined
                  required
                  label="Name"
                  hint="Ex.: Bruce Wayne"
                  placeholder="Ex.: Bruce Wayne"
                  v-model="name"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  dense
                  outlined
                  required
                  label="Github URL"
                  hint="Ex.: https://github.com/totally-not-batman"
                  placeholder='totally-not-batman'
                  prefix='https://github.com/'
                  v-model="url"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="pb-6 px-6">
          <v-spacer></v-spacer>
          <v-btn
            id="modal-close"
            text
            color="blue-grey"
            @click="closeModal"
          >
            Close
          </v-btn>
          <v-btn
            id="modal-create"
            depressed
            dark
            color="blue-grey"
            :loading="loading"
            @click="create"
          >
            <v-icon small left>fas fa-user-plus</v-icon> Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Factory from '@/api/factory'

const ProfileAPI = Factory.getApi('profiles')

export default {
  name: 'AddProfileFab',

  data () {
    return {
      name: '',
      url: '',
      dialog: false,
      loading: false,
      errors: []
    }
  },

  methods: {
    async createProfile () {
      const profileData = {
        name: this.name,
        url: `https://github.com/${this.url}`
      }

      await ProfileAPI.createProfile(profileData)
        .then((res) => {
          const createdProfile = res.data
          // pass created profile info to parent
          this.$emit('createdEvent', createdProfile)
          this.loading = false
          this.dialog = false
        })
        .catch((err) => {
          this.errors.push(err)
          this.loading = false
        })
    },

    showModal () {
      this.dialog = true
    },

    closeModal () {
      this.dialog = false
    },

    create () {
      this.loading = true
      this.createProfile()
    }
  }
}
</script>
