<template>
  <div>
    <div>
      <!-- src="https://baazarproductions.com/wp-content/uploads/2018/02/background-horizontal-dark-wood.jpg" -->
      <!-- src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" -->
      <v-container id="profile-header">
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center" cols="12">
            <v-avatar size="150" class="mb-5">
              <v-img
                :src="profile.image_url"
                lazy-src="https://via.placeholder.com/50.png"
              />
            </v-avatar>

            <h1 class="display-1  mb-4">
              {{ profile.name }}
            </h1>

            <h3 class=" mb-3">
              @{{ profile.username }}
            </h3>

            <div v-if="profile.organizations.length > 0" class="mt-5">
              <h4 class="subheading">
                Organizations
              </h4>

              <div>
                <v-btn
                  dark
                  dense
                  depressed
                  class="ma-3"
                  color="blue-grey"
                  v-for="org in profile.organizations"
                  :key="org.id"
                >
                  {{ org }}
                </v-btn>
              </div>

            </div>

            <p class="text-h6 mt-4 mb-1">
              Profile actions
            </p>
            <v-row dense class="">
              <v-spacer></v-spacer>
              <v-col cols="1">
                <v-btn
                  dense
                  icon
                  class="mx-2"
                  color="blue-grey"
                  :href="profile.url"
                >
                  <v-icon small>fab fa-github</v-icon>
                </v-btn>
              </v-col>

              <v-col cols="1">
                <dialog-form :profile="profile" @updatedEvent="treatEvent" refresh/>
              </v-col>

              <v-col cols="1">
                <dialog-form :profile="profile" @updatedEvent="treatEvent"/>
              </v-col>

              <v-col cols="1">
                <dialog-delete :profile=profile @deletedEvent="treatDelete"/>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="mt-3 grey lighten-3">
      <v-container class="pt-10 pb-10">
        <p class="display-1 text-center mt-5 mb-10">
          Profile data from github
        </p>

        <v-row>
          <v-col
            sm="12"
            md="8" offset-md="2"
          >
            <v-simple-table id="information-table">
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td class="font-weight-bold">Full name</td>
                    <td>{{ profile.name }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">Github username</td>
                    <td>{{ profile.username }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">Email</td>
                    <td>Email is only shown on Github for logged-in users.</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">Stars</td>
                    <td>{{ profile.stars }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">Followers</td>
                    <td>{{ profile.followers }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">Following</td>
                    <td>{{ profile.subscriptions }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">Contributions in last year</td>
                    <td>{{ profile.contributions }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-container>
    </div>

  </div>
</template>

<script>
import Factory from '@/api/factory'

import DialogForm from '@/components/DialogForm'
import DialogDelete from '@/components/DialogDelete'

const ProfilesAPI = Factory.getApi('profiles')

export default {
  name: 'ProfileView',

  components: {
    DialogForm,
    DialogDelete
  },

  data () {
    return {
      profile: {},
      formattedProfileInfo: [],
      errors: []
    }
  },

  methods: {
    checkRouteGivenProfile () {
      if (this.$route.params.profile === undefined) {
        return false
      }
      this.profile = this.$route.params.profile
      return true
    },

    async getProfile () {
      await ProfilesAPI.getProfile(this.$route.params.id)
        .then((res) => {
          this.profile = res.data
        })
        .catch((err) => {
          this.errors.push(err)
          this.$router.push({
            name: 'home',
            params: { error: err }
          })
        })
    },

    treatEvent (value) {
      this.profile = value
    },

    treatDelete (value) {
      this.$router.push({
        name: 'home',
        params: { message: 'Profile deleted successfully!' }
      })
    }
  },

  beforeMount () {
    if (!this.checkRouteGivenProfile()) {
      this.getProfile()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
