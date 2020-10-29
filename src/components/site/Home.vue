<template>
    <div class="body container-fluid">
        <div class="row">
            <div class="col-md-6 align-self-center text-center text-menu">
                <h3>Knight</h3>
                <p class="text-justify">
                    Knight ou cavaleiro, desde o período medieval, designa o nobre que tem como característica a proteção do rei ou senhor feudal, equivalente a um militar moderno ou a um guerreiro no sentido mais tradiciona
                </p>
            </div>
            <div class="col-md-6 d-none d-md-block">
                <img src="../../assets/images/knight.png" class="knight-img"/>
            </div>
        </div>

        <div v-if="knights.length > 0" class="row card-knight-area text-left">
            <div v-for="(item, index) in knights" :key="index" class="col-md-6">
                <div class="card-heroes">
                    <div class="row">

                        <div class="col-md-4">
                            <img src="../../assets/images/knight-card.png" alt="knight" class="knight-card">
                        </div>
                        <div class="col-md-6">
                            <div v-if="indexItem !== index">
                                <b>Nome:</b> {{item.name}}
                                <img @click="editName(item.name, index, item._id)" src="../../assets/images/edit.png" alt="edit" class="icon-card-edit">
                            </div>
                            <div v-if="edit && indexItem === index">
                                <b>Nome:</b> <input type="text" v-model="nameToEdit">
                                <img @click="save()" src="../../assets/images/save.png" alt="edit" class="icon-card-edit">
                            </div>
                            <div>
                                <b>Idade:</b> {{getAge(item)}}
                            </div>
                            <div>
                                <b>Armas:</b> {{item.weapons.length}}
                            </div>
                            <div>
                                <b>Atributos:</b> {{item.keyAttribute}}
                            </div>
                            <div>
                                <b>Ataque:</b> {{getAttack(item)}}
                            </div>
                            <div>
                                <b>Exp:</b> {{getExp(item)}}
                            </div>
                        </div>
                        <div class="col-md-2 align-self-center">
                            <div>
                                <img @click="deleteItem(item)" src="../../assets/images/delete.png" alt="edit" class="icon-card">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="hall-of-heroes-area">
            <h5>Hall of Heroes</h5>
            <span >
                Conheça os heróis que estão no <b>Hall of Heroes.</b>
            </span>
            <span @click="filter('heroes')" class="ml-2">
                <img @click="deleteItem(item)" src="../../assets/images/search.png" alt="edit" class="icon-card">
            </span>
        </div>

        <div v-if="heroes.length > 0" class="row card-heroes-area text-left">
            <div v-for="(item, index) in heroes" :key="index" class="col-md-6">
                <div class="card-heroes">
                    <div class="row">

                        <div class="col-md-4">
                            <img src="../../assets/images/heroes.png" alt="knight" class="knight-card">
                        </div>
                        <div class="col-md-6">
                            <div>
                                <b>Nome:</b> {{item.name}}
                            </div>
                            <div>
                                <b>Idade:</b> {{getAge(item)}}
                            </div>
                            <div>
                                <b>Armas:</b> {{item.weapons.length}}
                            </div>
                            <div>
                                <b>Atributos:</b> {{item.keyAttribute}}
                            </div>
                            <div>
                                <b>Ataque:</b> {{getAttack(item)}}
                            </div>
                            <div>
                                <b>Exp:</b> {{getExp(item)}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { get, put, post, del } from '../../services/api'
import moment from 'moment'

export default {
    data() {
        return {
            edit: false,
            knights: [],
            heroes: [],
            nameToEdit: '',
            indexItem: null,
            itemId: null,
        };
    },
    props: {

    },
    created() {
        this.getHeroes()
    },
    methods: {
        async getHeroes() {
            await get('/knights')
            .then(res => {
                console.log(res)
                this.knights = res
            })
        },
        getAge(item) {
            const age = item.birthday !== '' ? moment().diff(item.birthday, 'years') : 0;
            return age
        },
        getAttack(item) {
            let mod = []
            item.weapons.length > 0 && item.weapons.map(i => {
                if(i.equipped) {
                    mod.push(i.mod)
                }
            })
            function getSum(total, num) {
                return total + Math.round(num);
            }
            const modWeaponEquiped = mod.reduce(getSum, 0)
            const KeyAttr = item.attributes.charisma + item.attributes.constitution + item.attributes.dexterity + item.attributes.intelligence + item.attributes.strength + item.attributes.wisdom
            let modValue;

            if(KeyAttr >= 0 && KeyAttr <= 8) modValue = -2
            if(KeyAttr > 9 && KeyAttr <= 10) modValue = -1
            if(KeyAttr > 11 && KeyAttr <= 12) modValue = 0
            if(KeyAttr > 13 && KeyAttr <= 15) modValue = 1
            if(KeyAttr > 16 && KeyAttr <= 18) modValue = 2
            if(KeyAttr > 19 && KeyAttr <= 20) modValue = 3

            if(!modValue) modValue = -2

            const attack = 10 + modValue + modWeaponEquiped
            return attack
        },
        getExp(item) {
            const age = item.birthday !== '' ? moment().diff(item.birthday, 'years') : 0;
            const exp = age > 7 ? Math.floor((age - 7) * Math.pow(22, 1.45)) : 0
            return exp
        },
        editName(name, index, id) {
            this.nameToEdit = name
            this.edit = true
            this.indexItem = index
            this.itemId = id
        },
        async save() {
            const data = {
                name: this.nameToEdit,
                nickname: this.nameToEdit
            }
            await put(`/knights/${this.itemId}`, data)
            .then(res => {
                if(res) {
                    this.edit = false
                    this.indexItem = null
                    this.getHeroes()
                } 
            })
        },
        async deleteItem(item) {
            await post('/heroes', item)
            .then(async res => {
                if(res) {
                    await del(`/knights/${item._id}`)
                    .then(res => {
                        if(res) {
                            this.getHeroes()
                        } 
                    })
                }
            })
        },
        async filter(type) {
            await get(`/knights?filter=${type}`)
            .then(res => {
                this.heroes = res
            })
        }

    },
};
</script>

<style scoped>
.body {
    background: #231f20;
    color: #d2ab66;
}
.knight-img {
    margin-top: 30px;
    width: 80%;
}
.card-knight-area {
    margin-top: 30px;
}
.text-menu {
    padding: 120px;
}
/* .card-knight-area {
    padding: 80px;
} */
.card-heroes {
    margin-top: 30px;
    padding: 30px;
    background: #444041;
}
.knight-card {
    width: 80%;
}
.icon-card-edit {
    margin-left: 8px;
    width: 15px;
    cursor: pointer;
}
.icon-card {
    width: 20px;
    cursor: pointer;
}
.hall-of-heroes-area {
    margin-top: 50px;
    padding-bottom: 30px;
}
.card-heroes-area {
    padding-bottom: 80px;
}
</style>