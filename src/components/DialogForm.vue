<template>
  <div>
    <v-btn
      v-if="refresh"
      id="dialog-form-refresh"
      icon
      dense
      color="blue-grey"
      :loading="loading"
      @click="update"
    >
      <v-icon small>fas fa-sync</v-icon>
    </v-btn>

    <v-btn
      v-else
      id="dialog-form-open"
      icon
      dense
      color="blue-grey"
      @click.stop="showModal"
    >
      <v-icon small>fas fa-edit</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">
            Edit profile
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

            <v-form
              lazy-validation
              @submit="update"
            >
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    dense
                    outlined
                    required
                    label="Name"
                    hint="Leave unchanged to keep the previous value"
                    :placeholder="name"
                    v-model="name"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    dense
                    outlined
                    required
                    label="Github URL"
                    hint="Leave unchanged to keep the previous value"
                    :placeholder="url"
                    v-model="url"
                  />
                </v-col>
              </v-row>
            </v-form>

          </v-container>
        </v-card-text>
        <v-card-actions class="pb-6 px-6">
          <v-spacer></v-spacer>
          <v-btn
            id="dialog-form-close"
            text
            color="blue-grey"
            @click="closeModal"
          >
            Close
          </v-btn>
          <v-btn
            id="dialog-form-update"
            depressed
            dark
            color="blue-grey"
            :loading="loading"
            @click="update"
          >
            <v-icon small left>fas fa-save</v-icon> Save
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
  name: 'DialogForm',

  data () {
    return {
      name: '',
      url: '',
      dialog: false,
      loading: false,
      errors: []
    }
  },

  props: {
    refresh: {
      type: Boolean,
      default: () => false
    },
    profile: {
      type: Object,
      required: true
    }
  },

  methods: {
    async editProfile () {
      const profileData = {
        name: !this.refresh ? this.name : this.profile.name,
        url: !this.refresh ? this.url : this.profile.url
      }

      await ProfileAPI.updateProfile(this.profile.id, profileData)
        .then((res) => {
          this.name = res.data.name
          this.url = res.data.url

          const updatedProfile = res.data
          // pass updated profile info to parent
          this.$emit('updatedEvent', updatedProfile)
          this.loading = false
          this.dialog = false
        })
        .catch((err) => {
          this.errors.push(err)
          this.loading = false
        })
    },

    update () {
      this.loading = true
      this.editProfile()
    },

    showModal () {
      this.dialog = true
    },

    closeModal () {
      this.dialog = false
    }
  },

  beforeMount () {
    this.name = this.profile.name
    this.url = this.profile.url
  }
}
</script>
