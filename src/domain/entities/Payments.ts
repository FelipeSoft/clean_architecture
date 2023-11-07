export default class Payments {
    public userId: number;
    public countNumber: number;
    public paymentForm: number;
    public transition: number;
    public installments: number;
    public balance: number;
  
    public constructor(
      paymentForm: number,
      transition: number,
      installments: number,
      balance: number,
      userId: number,
      countNumber: number
    ) {
      this.paymentForm = paymentForm;
      this.transition = transition;
      this.installments = installments;
      this.balance = balance;
      this.countNumber = countNumber;
      this.userId = userId;
    }
  
    public enterCash(value: number): void {
      this.balance += value;
    }
  
    public exitCash(value: number): void {
      if (this.balance >= value) {
        this.balance -= value;
      } else {
        throw new Error("Saldo insuficiente para o saque.");
      }
    }
  
    public paymentTax(): void {
      if (this.paymentForm <= 4 && this.balance >= this.transition) {
        this.balance -= this.transition;
      } else if (this.paymentForm > 4 && this.balance >= this.transition) {
        for (let i = 0; i < this.installments; i++) {
          this.balance -= (this.transition / this.installments) * 0.5;
        }
      } else {
        throw new Error("Saldo insuficiente para a compra");
      }
    }

    public updateBalance(): number{
        return this.balance;
    }
  }
  