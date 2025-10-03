interface Product {
    id: number,
    name: string,
    price: number
}

class Books implements Product {
    id: number;
    name: string;
    price: number;
    author: string;

    constructor(id: number, name: string, price: number, author: string) {
        this.id = id,
            this.name = name;
        this.price = price;
        this.author = author;
    }

    printInfo(): void {
        console.log(
            `Book ID: ${this.id}, Name: ${this.name}, Price: $${this.price}, Author: ${this.author}`
        );
    }
}

const myBooks = new Books(1, "TypeScript Handbook", 25, "John Doe");
myBooks.printInfo();