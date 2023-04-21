import { EventEmitter } from 'events'

class $bus extends EventEmitter {
    state;
    constructor() {
        super();
        this.state ={
            userdata:{
                username: null,
                email:''
            },
            cart:[],
            cartCount:0,
            

        }
    }
    setUserData(data) {
        this.state.userdata = data;
        this.emit('userdata', this.state.userdata);
    }
    addCartCount(){
        this.state.cartCount++;
        this.emit('cartCount', this.state.cartCount);
    }



};

export default new $bus();