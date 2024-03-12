import { faker } from "@faker-js/faker";
import fs from "fs-extra";

// const fs = require("fs-extra");
// const { data: products } = require("./products.json");

const productType = [
  "truyen tranh",
  "tieu thuyet",
  "truyen cuoi",
  "sach hoc tap",
  "sach tham khao",
  "sach kinh doanh",
];

const products = [];
const createproduct = (id) => {
  const name = faker.lorem.words();
  const price = faker.number.int({ min: 20000, max: 100000 });
  const product = productType[Math.floor(Math.random() * (6 - 1 + 1)) + 1];
  const color = faker.color.human();
  const createdAt = faker.date.past();
  const image = faker.image.url();
  return { id, name, price, product, color, createdAt, image };
};

for (var i = 0; i < 1000; i++) {
  products.push(createproduct(i));
}

async function writeData() {
  try {
    await fs.writeJson("./products.json", { data: products });
    console.log("success!");
  } catch (err) {
    console.error(err);
  }
}
writeData();
