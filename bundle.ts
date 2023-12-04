import { v4 as uuidv4 } from 'uuid';

class Item {
    private id: string;
    private name: string;
    private price: number;
    private description: string;

    constructor(name: string, price: number, description: string) {
        this.id = uuidv4();
        this.name = name;
        this.price = price;
        this.description = description;
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    getDescription(): string {
        return this.description;
    }
}

class User {
    private id: string;
    private name: string;
    private age: number;
    private cart: Item[];

    constructor(name: string, age: number) {
        this.id = uuidv4();
        this.name = name;
        this.age = age;
        this.cart = [];
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getAge(): number {
        return this.age;
    }

    addToCart(item: Item): void {
        this.cart.push(item);
    }

    removeFromCart(item: Item): void {
        this.cart = this.cart.filter((cartItem) => cartItem.getId() !== item.getId());
    }

    removeQuantityFromCart(item: Item, quantity: number): void {
        let remainingQuantity = quantity;
        this.cart = this.cart.filter((cartItem) => {
            if (cartItem.getId() === item.getId() && remainingQuantity > 0) {
                remainingQuantity--;
                return false;
            }
            return true;
        });
    }

    cartTotal(): number {
        return this.cart.reduce((total, item) => total + item.getPrice(), 0);
    }

    printCart(): void {
        console.log(`User's Cart:`);
        this.cart.forEach((item) => {
            console.log(`- ${item.getName()}: $${item.getPrice()}`);
        });
        console.log(`Total: $${this.cartTotal()}`);
    }
}

class Shop {
    private items: Item[];

    constructor() {
        this.items = [
            new Item('Milk', 5, 'A carton of Milk'),
            new Item('Eggs', 6, 'A carton of eggs'),
            new Item('Bundle of bananas', 1, 'A large bundle of bananas')
        ];
    }

    getItems(): Item[] {
        return this.items;
    }
}


const shop = new Shop();
const user = new User('John', 30);

const itemsAvailable = shop.getItems();
user.addToCart(itemsAvailable[0]); 
user.addToCart(itemsAvailable[1]);
user.addToCart(itemsAvailable[2]);
user.printCart();


