<template>

  <div id="home">
    <div class="mb-5">

      <v-container fluid>

        <v-alert
          id="alert-error"
          v-if="legacyError !== undefined"
          dense
          dismissible
          type="error"
        >
          {{ legacyError.message }}
        </v-alert>

        <v-alert
          id="alert-message"
          v-if="message !== undefined"
          dense
          dismissible
          type="success"
        >
          {{ message }}
        </v-alert>

        <div class="text-center mt-10 mb-5 py-2 grey--text text--darken-3">
          <span class="text-h1">
            <v-icon large class="grey--text text--darken-3">fab fa-github</v-icon>
          </span>
          <h1>
            Github profile indexer
          </h1>
          <h2 class="text-h4 text-subtitle-1">
            Find your favorite Github profiles here
          </h2>
        </div>

        <v-row>
          <v-col cols="12" sm='8' offset-sm='2' md='6' offset-md='3'>
            <v-form @submit="makeSearch()">
              <v-row no-gutters>
                <v-col cols="12" sm='10'>
                  <v-text-field
                    outlined
                    dense
                    :error-messages="errors.length > 0 ? 'Some errors occured with your request!' : null"
                    class="rounded-l rounded-r-0"
                    placeholder='Search by name, username, location, etc.'
                    v-model="searchString"
                  />
                </v-col>
                <v-col cols="12" sm='2'>
                  <v-btn
                    id="home-make-search"
                    color='primary'
                    class="py-5 rounded-r rounded-l-0"
                    :disabled="!searchString"
                    @click="makeSearch()"
                  >
                    Search
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>

      </v-container>
    </div>

    <div class="grey lighten-3 py-md-8 py-sm-4">
      <v-container>
        <div
          class="text-h4 grey--text lighten-1 text-center py-md-10 py-sm-3"
          v-if="searchResults === undefined"
        >
          Use the search bar to search for users
        </div>

        <div
          class="text-h4 grey--text lighten-1 text-center py-md-10 py-sm-3"
          v-else-if="searchResults.length === 0"
        >
          No results found
        </div>

        <results-list v-else
          :search="searchString"
          :results="searchResults"
          @updatedProfile="makeSearch()"
        />
      </v-container>
    </div>

  </div>

</template>

<script>
import ResultsList from '@/components/ResultsList'
import Factory from '@/api/factory'

const SearchAPI = Factory.getApi('search')

export default {
  name: 'Home',

  data () {
    return {
      searchString: undefined,
      searchResults: undefined,
      legacyError: undefined,
      message: undefined,
      errors: []
    }
  },

  components: {
    ResultsList
  },

  methods: {
    async makeSearch (value) {
      // redo search on update profile
      const searchQuery = value !== undefined ? value : this.searchString

      await SearchAPI.searchProfiles(searchQuery)
        .then((res) => {
          this.searchResults = res.data
        })
        .catch((err) => {
          this.errors.push(err)
        })
    }
  },

  beforeMount () {
    if (this.$route.params.error !== undefined) {
      if (this.$route.params.error.message === 'Request failed with status code 404') {
        this.legacyError = { message: 'Profile not found!' }
      } else {
        this.legacyError = this.$route.params.error
      }
    }

    if (this.$route.params.message !== undefined) {
      this.message = this.$route.params.message
    }
  }
}
</script>
