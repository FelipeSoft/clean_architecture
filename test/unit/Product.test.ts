import Product from "../../src/domain/entities/Product";

describe('Product', () => {
  it('should calculate tax of shipping correctly for price >= 10', () => {
    const product = new Product('Product 1', 5, 15);
    const result = product.calculateTaxOfShipping();
    expect(result).toBe(4.5); // (15 * 0.30)
  });

  // o segundo era pra ter passado pq o valor  é menor que 10

  it('should calculate tax of shipping correctly for price < 10', () => {
    const product = new Product('Product 2', 5, 5);
    const result = product.calculateTaxOfShipping();
    expect(result).toBe(5); // No tax, as price is less than 10
  });

  it('should calculate final price with discount correctly for price >= 100', () => {
    const product = new Product('Product 3', 5, 120);
    const result = product.calculateFinalPriceWithDiscount();
    expect(result).toBe(36); // (120 * 0.30) = 36
  });

  it('should calculate final price with discount correctly for price < 100', () => {
    const product = new Product('Product 4', 5, 80);
    const result = product.calculateFinalPriceWithDiscount();
    expect(result).toBe(80); // No discount, as price is less than 100
  });

  it('should calculate total correctly', () => {
    const product = new Product('Product 5', 5, 50);
    const result = product.calculateTotal();
    expect(result).toBe(65); // (50 - 0) + 15
  });

  it('should throw an error for negative total', () => {
    expect(() => new Product('Product 6', 5, -5)).toThrowError('Negative value');
  });
});
