<template>
    <div>
        <div class="margin-nav">
            <b-navbar toggleable="lg" type="dark" id="menu-knight" class="navbar navbar-expand-md fixed-top" >
                <b-navbar-brand>
                    <router-link class="nav-link navbar-brand" to="/">
                      <img src="../../assets/images/helmet.png" class="icon-nav">
                    </router-link>

                </b-navbar-brand>

                <b-navbar-toggle target="nav-collapse" left></b-navbar-toggle>
                    <b-collapse id="nav-collapse" is-nav class="space text-left">
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item>
                            <router-link id="menu_home" class="nav-link" to="/">Knights</router-link>
                        </b-nav-item>
                    </b-navbar-nav>

                </b-collapse>
            </b-navbar>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            
        };
    },
    created() {
        
    },
    props: {

    },
    methods: {
        
    }
};
</script>


<style scoped>
.icon-nav {
  width: 40px;
  
}
.space {
  margin-right: 90px;
}
.icon-menu {
  color: #d2ab66;
}
.margin-nav {
  margin-top: 60px;
}
#menu-knight {
  background-color: #231f20;
}
#menu-knight a,
span {
  color: #d2ab66;
  
}
#menu-false span {
  margin-left: 15px;
  margin-right: 15px;
}
#menu-true {
  background-color: #231f20;
}
#menu-true a,
span {
  color: #d2ab66;
}
#menu-true span {
  margin-left: 25px;
  margin-right: 25px;
}
.dropdown-menu {
  background-color:#231f20 !important;
}
.dropdown-item {
  background-color:#d2ab66 !important;
  color: #231f20 !important;
}
li {
  margin-left: 10px;
}
</style>