<template>
  <div>
    <v-btn
      id="dialog-delete-open"
      icon
      dense
      color="error"
      @click.stop="showModal"
    >
      <v-icon small>fas fa-times</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="350px">
      <v-card>
        <v-card-title class="headline">
          Delete profile
        </v-card-title>

        <v-card-text>
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

          You're about to delete {{ profile.name + "'s" }} profile from this
          application. Are you sure?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            id="dialog-delete-close"
            text
            dense
            color="blue-grey"
            @click="closeModal">
            cancel
          </v-btn>

          <v-btn
            id="dialog-delete-delete"
            depressed
            dense
            color="error"
            :loading="loading"
            @click="deleteAction"
          >
            <v-icon small left>fas fa-trash</v-icon> delete
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
      dialog: false,
      loading: false,
      errors: []
    }
  },

  props: {
    profile: {
      type: Object,
      required: true
    }
  },

  methods: {
    async deleteProfile () {
      await ProfileAPI.deleteProfile(this.profile.id)
        .then((res) => {
          // pass deleted profile info to parent
          this.$emit('deletedEvent')
          this.loading = false
          this.dialog = false
        })
        .catch((err) => {
          this.errors.push(err)
          this.loading = false
        })
    },

    deleteAction () {
      this.loading = true
      this.deleteProfile()
    },

    showModal () {
      this.dialog = true
    },

    closeModal () {
      this.dialog = false
    }
  }
}
</script>
