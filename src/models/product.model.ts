import db from "../database/index";
import Product from "../types/product.type";

class ProductModel {
  //create a new product
  async createProduct(product: Product): Promise<Product> {
    try {
      const client = await db.connect();
      const sql = `INSERT INTO products (name, price) values($1, $2) RETURNING id, name, price`;
      const result = await client.query(sql, [product.name, product.price]);
      client.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `product creation failed: ${product.name}, messageError: ${
          (err as Error).message
        }`
      );
    }
  }

  async getProductId(id: number): Promise<Product> {
    try {
      const client = await db.connect();
      const sql = `SELECT id, name, price FROM products WHERE id=($1)`;
      const result = await client.query(sql, [id]);
      client.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `product id number ${id} doesn't exist or something wrong ${
          (err as Error).message
        }`
      );
    }
  }

  async getMany(): Promise<Product[]> {
    try {
      const client = await db.connect();
      const sql = `SELECT id, name, price FROM products`;
      const result = await client.query(sql);
      client.release();
      return result.rows;
    } catch (err) {
      throw new Error(`can't get products ${(err as Error).message}`);
    }
  }

  async updateProduct(id: number, product: Product): Promise<Product> {
    try {
      const client = await db.connect();
      const sql = `UPDATE products SET name= $1 , price = $2 WHERE id = ${id} Returning *`;
      const result = await client.query(sql, [product.name, product.price]);
      client.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `can not update product: ${product.name}, Error: ${
          (err as Error).message
        }`
      );
    }
  }

  async deleteProductId(id: number): Promise<Product> {
    try {
      const client = await db.connect();
      const sql = `DELETE FROM products WHERE id=($1) RETURNING *`;
      const result = await client.query(sql, [id]);
      client.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `can not delete product which has id num: ${id}, ${
          (err as Error).message
        }`
      );
    }
  }
}

export default ProductModel;
