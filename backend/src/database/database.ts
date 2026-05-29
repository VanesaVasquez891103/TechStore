import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const PROJECT_ROOT = path.resolve(__dirname, '..', '..', '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'data');
const DB_FILE = path.join(DATA_DIR, 'techstore.db');

if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

export const db = new Database(DB_FILE);
db.pragma('foreign_keys = ON');

db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    lastName TEXT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    role TEXT NOT NULL DEFAULT 'customer' CHECK(role IN ('customer', 'admin'))
);

CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    type TEXT,
    description TEXT
);

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL DEFAULT 0,
    stock INTEGER NOT NULL DEFAULT 0,
    brand TEXT,
    image TEXT,
    categoryId INTEGER,
    FOREIGN KEY(categoryId) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    type TEXT,
    total REAL NOT NULL DEFAULT 0,
    status TEXT,
    date TEXT NOT NULL,
    shippingAddress TEXT,
    FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderId INTEGER,
    productId INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY(orderId) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY(productId) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderId INTEGER UNIQUE,
    method TEXT,
    amount REAL NOT NULL DEFAULT 0,
    date TEXT NOT NULL,
    status TEXT,
    FOREIGN KEY(orderId) REFERENCES orders(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS carts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER UNIQUE NOT NULL,
    createdAt TEXT NOT NULL,
    FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cartId INTEGER NOT NULL,
    productId INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY(cartId) REFERENCES carts(id) ON DELETE CASCADE,
    FOREIGN KEY(productId) REFERENCES products(id)
);
`);

function readJson<T>(fileName: string): T[] {
    const filePath = path.join(DATA_DIR, fileName);
    if (!fs.existsSync(filePath)) {
        return [];
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T[];
}

function isTableEmpty(tableName: string): boolean {
    const stmt = db.prepare(`SELECT COUNT(*) AS count FROM ${tableName}`);
    const result = stmt.get() as { count: number };
    return result.count === 0;
}

function seedUsers(): void {
    if (!isTableEmpty('users')) {
        return;
    }
    const users = readJson<any>('users.json');
    if (users.length === 0) {
        return;
    }
    const insert = db.prepare(
        'INSERT INTO users (name, lastName, email, password, phone, address, role) VALUES (?, ?, ?, ?, ?, ?, ?)' 
    );
    const insertMany = db.transaction((rows: any[]) => {
        for (const row of rows) {
            insert.run(
                row.name,
                row.lastName ?? null,
                row.email,
                row.password,
                row.phone ?? null,
                row.address ?? null,
                row.role ?? 'customer'
            );
        }
    });
    insertMany(users);
}

function seedCategories(): void {
    if (!isTableEmpty('categories')) {
        return;
    }
    const categories = readJson<any>('categories.json');
    if (categories.length === 0) {
        return;
    }
    const insert = db.prepare('INSERT INTO categories (id, name, type, description) VALUES (?, ?, ?, ?)');
    const insertMany = db.transaction((rows: any[]) => {
        for (const row of rows) {
            insert.run(row.id ?? null, row.name, row.type ?? null, row.description ?? null);
        }
    });
    insertMany(categories);
}

function seedProducts(): void {
    if (!isTableEmpty('products')) {
        return;
    }
    const products = readJson<any>('products.json');
    if (products.length === 0) {
        return;
    }
    const insert = db.prepare(
        'INSERT INTO products (id, name, description, price, stock, brand, image, categoryId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    );
    const insertMany = db.transaction((rows: any[]) => {
        for (const row of rows) {
            insert.run(
                row.id ?? null,
                row.name,
                row.description ?? null,
                row.price ?? 0,
                row.stock ?? 0,
                row.brand ?? null,
                row.image ?? null,
                row.categoryId ?? null
            );
        }
    });
    insertMany(products);
}

function seedOrders(): void {
    if (!isTableEmpty('orders')) {
        return;
    }
    const orders = readJson<any>('orders.json');
    if (orders.length === 0) {
        return;
    }
    const insertOrder = db.prepare(
        'INSERT INTO orders (id, userId, type, total, status, date, shippingAddress) VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    const insertItem = db.prepare(
        'INSERT INTO order_items (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)'
    );
    const insertMany = db.transaction((rows: any[]) => {
        for (const order of rows) {
            const dateValue = order.date ? new Date(order.date).toISOString() : new Date().toISOString();
            const orderInfo = insertOrder.run(
                order.id ?? null,
                order.userId,
                order.type ?? null,
                order.total ?? 0,
                order.status ?? null,
                dateValue,
                order.shippingAddress ?? null
            );
            const orderId = orderInfo.lastInsertRowid as number;
            if (Array.isArray(order.items)) {
                for (const item of order.items) {
                    insertItem.run(orderId, item.productId, item.quantity, item.price);
                }
            }
        }
    });
    insertMany(orders);
}

function seedOrderItems(): void {
    if (!isTableEmpty('order_items')) {
        return;
    }
    const items = readJson<any>('orderitems.json');
    if (items.length === 0) {
        return;
    }
    const insert = db.prepare(
        'INSERT INTO order_items (id, orderId, productId, quantity, price) VALUES (?, ?, ?, ?, ?)'
    );
    const insertMany = db.transaction((rows: any[]) => {
        for (const item of rows) {
            insert.run(
                item.id ?? null,
                item.orderId ?? null,
                item.productId,
                item.quantity,
                item.price
            );
        }
    });
    insertMany(items);
}

seedUsers();
seedCategories();
seedProducts();
seedOrders();
seedOrderItems();
