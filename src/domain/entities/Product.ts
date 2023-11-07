export default class Product {
    public name: string;
    public quantity: number;
    public productId?: number;
    public price: number;
    public tax?: number;

    public constructor(name: string, quantity: number, price: number) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;

        this.calculateTaxOfShipping();
        this.calculateFinalPriceWithDiscount();
        this.calculateTotal();
    }

    public calculateTaxOfShipping(): number {
        let tax: number | null = 0;
        tax = this.price >= 10 ? this.price * 0.3 : null;

        if(tax !== null) {
            if (tax <= 0 || this.price < 10) {
                throw new Error("Cannot use this price and/or tax.");
            }
            return tax;
        }
        return this.price;
    

        // let tax = 0;
        // if (this.price >= 10) {
        //     tax = this.price * 0.30;
        // }else{
        //     return this.price;
        // }
        
        // if (tax >= 0) {
        //     return tax;
        // } else {
        //     throw new Error("Negative value");
        // }
    }

    public calculateFinalPriceWithDiscount(): number {
        let discount = 0;
        if (this.price >= 100) {
            discount = this.price * 0.30; 
        }else{
            return this.price;
        }
        if (discount >= 0) {
            return discount;
        } else {
            throw new Error("Negative value");
        }
    }

    public calculateTotal(): number {
        const price = this.price;
        const newPriceWithDiscount = this.calculateFinalPriceWithDiscount();
        const tax = this.calculateTaxOfShipping();
        
        if(newPriceWithDiscount == price){
            var total = price + tax;
        }else{
            var total = (price - newPriceWithDiscount) + tax;
        }
        
        if (total >= 0) {
            return total;
        } else {
            throw new Error("Negative value");
        }
    }
}
