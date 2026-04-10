import * as fs from 'fs';
import * as path from 'path';
import { IProduct } from '../interfaces/product.interfaces';
import { CreateProductDto, UpdateProductDto, DeleteProductDto } from '../dtos/product.dto';

const DATA_DIR = path.join(__dirname, '../../data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');

export class ProductService {
    private products: IProduct[] = [];

    constructor() {
        this.loadProducts();
    }

    private ensureDataDirectoryExists(): void {
        if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR, { recursive: true });
        }
    }

    private loadProducts(): void {
        this.ensureDataDirectoryExists();
        if (!fs.existsSync(PRODUCTS_FILE)) {
            fs.writeFileSync(PRODUCTS_FILE, JSON.stringify([], null, 2));
        }
        const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
        this.products = JSON.parse(data);
    }

    private saveProducts(): void {
        this.ensureDataDirectoryExists();
        fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(this.products, null, 2));
    }

    getAll(): IProduct[] {
        return this.products;
    }

    getById(id: number): IProduct | null {
        return this.products.find(product => product.id === id) || null;
    }

    create(dto: CreateProductDto): IProduct {
        const existing = this.products.find(product => product.name === dto.name && product.categoryId === dto.categoryId);
        if (existing) {
            return existing;
        }
        const newId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
        const newProduct: IProduct = {
            id: newId,
            name: dto.name,
            price: dto.price,
            stock: dto.stock,
            categoryId: dto.categoryId
        };
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    update(dto: UpdateProductDto): IProduct | null {
        const index = this.products.findIndex(product => product.id === dto.id);
        if (index === -1) {
            return null;
        }
        const product = this.products[index];
        if (dto.name !== undefined) product.name = dto.name;
        if (dto.price !== undefined) product.price = dto.price;
        if (dto.stock !== undefined) product.stock = dto.stock;
        if (dto.categoryId !== undefined) product.categoryId = dto.categoryId;
        this.saveProducts();
        return product;
    }

    delete(dto: DeleteProductDto): boolean {
        const index = this.products.findIndex(product => product.id === dto.id);
        if (index === -1) {
            return false;
        }
        this.products.splice(index, 1);
        this.saveProducts();
        return true;
    }
}
