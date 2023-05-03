import { EventEmitter } from 'events'

interface BusState {
  userdata: {
    username: string | null;
    email: string;
  };
  cart: any[];
  cartCount: number;
}

class $bus extends EventEmitter {
  state: BusState;
  constructor() {
    super();
    this.state ={
      userdata: {
        username: null,
        email: '',
      },
      cart: [],
      cartCount: 0,
    };
  }
  setUserData(data: { username: string; email: string; }): void {
    this.state.userdata = data;
    this.emit('userdata', this.state.userdata);
  }
  addCartCount(): void {
    this.state.cartCount++;
    this.emit('cartCount', this.state.cartCount);
  }
  setCartCount(data):void { // 添加 setCartCount 方法
    this.state.cartCount = data.count;
    this.emit('cartCount', this.state.cartCount);
  }
}

export default new $bus();
