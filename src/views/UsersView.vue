<template>
  <v-data-table
    :headers="headers"
    :items="usuArios"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Usuários</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn 
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Adicionar
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="User"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.username"
                      label="Username"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.Email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.Password"
                      label="Password"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.Endereco"
                      label="Endereço"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Deseja cancelar esse usuário?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
      
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>

import axios from "axios";
      
export default {
  name: "usuArios",
    data: () => ({
      dialog: false,
      dialogDelete: false,
      
      headers: [
        {
          text: 'User',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Username', value: 'username' },
        { text: 'Email', value: 'email' },
        { text: 'Password', value: 'street' },
        { text: 'Endereço', value: 'city'},
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      usuArios: [],
      editedIndex: -1,
      editedItem: {
        Name:"",
        username:"",
        Email:"",
        Password:"",
        Endereco: "",
      },
      defaultItem: {
        Name:"",
        USername:"",
        Email:"",
        Password:"",
        Endereco: "",
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },  

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.getUser()
    },

    methods: {
      
      getUser () {
        axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res)=> {
        this.usuArios = res.data;
        }).catch((error)=>{
          console.log(error);
        })

      },
        

      editItem (item) {
        this.editedIndex = this.usuArios.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.usuArios.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.usuArios.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.usuArios[this.editedIndex], this.editedItem)
        } else {
          this.usuArios.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>

<style scoped>
.mb-2{
  background: linear-gradient(315deg, #42d392 25%, #647eff)
}
</style>