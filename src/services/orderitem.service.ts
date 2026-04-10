import * as fs from 'fs';
import * as path from 'path';
import { IOrderItem } from '../interfaces/order.interfaces';
import { CreateOrderItemDto, UpdateOrderItemDto, DeleteOrderItemDto } from '../dtos/orderitem.dto';

const DATA_DIR = path.join(__dirname, '../../data');
const ORDER_ITEMS_FILE = path.join(DATA_DIR, 'orderitems.json');

export class OrderItemService {
    private items: IOrderItem[] = [];

    constructor() {
        this.loadItems();
    }

    private ensureDataDirectoryExists(): void {
        if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR, { recursive: true });
        }
    }

    private loadItems(): void {
        this.ensureDataDirectoryExists();
        if (!fs.existsSync(ORDER_ITEMS_FILE)) {
            fs.writeFileSync(ORDER_ITEMS_FILE, JSON.stringify([], null, 2));
        }
        const data = fs.readFileSync(ORDER_ITEMS_FILE, 'utf-8');
        this.items = JSON.parse(data);
    }

    private saveItems(): void {
        this.ensureDataDirectoryExists();
        fs.writeFileSync(ORDER_ITEMS_FILE, JSON.stringify(this.items, null, 2));
    }

    getAll(): IOrderItem[] {
        return this.items;
    }

    getById(id: number): IOrderItem | null {
        return this.items.find(item => item.id === id) || null;
    }

    create(dto: CreateOrderItemDto): IOrderItem {
        const existing = this.items.find(item =>
            item.productId === dto.productId &&
            item.quantity === dto.quantity &&
            item.price === dto.price
        );
        if (existing) {
            return existing;
        }
        const newId = this.items.length > 0 ? Math.max(...this.items.map(item => item.id)) + 1 : 1;
        const newItem: IOrderItem = {
            id: newId,
            productId: dto.productId,
            quantity: dto.quantity,
            price: dto.price
        };
        this.items.push(newItem);
        this.saveItems();
        return newItem;
    }

    update(dto: UpdateOrderItemDto): IOrderItem | null {
        const index = this.items.findIndex(item => item.id === dto.id);
        if (index === -1) {
            return null;
        }
        const item = this.items[index];
        if (dto.productId !== undefined) item.productId = dto.productId;
        if (dto.quantity !== undefined) item.quantity = dto.quantity;
        if (dto.price !== undefined) item.price = dto.price;
        this.saveItems();
        return item;
    }

    delete(dto: DeleteOrderItemDto): boolean {
        const index = this.items.findIndex(item => item.id === dto.id);
        if (index === -1) {
            return false;
        }
        this.items.splice(index, 1);
        this.saveItems();
        return true;
    }
}
