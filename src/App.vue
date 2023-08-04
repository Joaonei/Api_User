<template>
  <v-app id ="inspire">
    <v-card
    
    >
    <v-navigation-drawer
      v-model="drawer"
      temporary
      app
    >
      <v-list dense nav>
        <v-list-item-title class="text-h6">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>

        <v-list-item link :to="item.route" v-for="(item, index) in routes" :key="index">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
  
    
      <v-app-bar color="indigo" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title >Application</v-toolbar-title>
      </v-app-bar>
    </v-card>
      <v-main>
          <router-view></router-view>
      </v-main>
      
      <v-footer color="cyan" app>
        <span class="white--text"> <a href="https://github.com/Joaonei" target="_blank"> Joaonei </a> &copy; {{ new Date().getFullYear() }} </span>
      </v-footer>
  </v-app>
    </template>

    <script>
    export default{
      props:{
        source: String
      },
      data: ()=> ({
        drawer: null,
        routes: [
          {
          name:"Home",
          icon:"mdi-home",
          route:"/"
        },
        {
          name:"Usuários",
          icon:"mdi-account",
          route:"/users_view"
        },
        {
          name:"Contas",
          icon:"mdi-cash-multiple",
          route:"/contas_view"
        },
        {
          name:"Relatórios",
          icon:"mdi-chart-line",
          route:"/relatorios_view"
        },
        {
          name:"Contact",
          icon:"mdi-email",
          route:"/about"
        },
        ],
    })
  };
    </script>