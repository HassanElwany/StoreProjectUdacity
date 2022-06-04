import ProductModel from "../product.model";
import Product from "../../types/product.type";

const productModel = new ProductModel();

//Testing existence of methods

it("existence of get all products", () => {
  expect(productModel.getMany).toBeDefined();
});

it("existence of get product by id", () => {
  expect(productModel.getProductId).toBeDefined();
});

it("existence of creating product", () => {
  expect(productModel.createProduct).toBeDefined();
});

it("existence update product", () => {
  expect(productModel.updateProduct).toBeDefined();
});

it("existence of deleting product method", () => {
  expect(productModel.deleteProductId).toBeDefined();
});

//testing functionality of methods

it("testing created function", async () => {
  const productOne: Product = await productModel.createProduct({
    name: "bookOne",
    price: 10,
  });
  expect(productOne.name).toBe("bookOne");
});

it("testing get all product", async () => {
  const products = await productModel.getMany();
  expect(products.length).toEqual(1);
});

it("deleting method", async () => {
  const deletedProduct = await productModel.deleteProductId(1);
  expect(deletedProduct.id).toEqual(1);
});
