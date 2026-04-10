import * as fs from 'fs';
import * as path from 'path';
import { IOrder } from '../interfaces/order.interfaces';
import { CreateOrderDto, UpdateOrderDto, DeleteOrderDto } from '../dtos/order.dto';

const DATA_DIR = path.join(__dirname, '../../data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

export class OrderService {
    private orders: IOrder[] = [];

    constructor() {
        this.loadOrders();
    }

    private ensureDataDirectoryExists(): void {
        if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR, { recursive: true });
        }
    }

    private loadOrders(): void {
        this.ensureDataDirectoryExists();
        if (!fs.existsSync(ORDERS_FILE)) {
            fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
        }
        const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
        const parsed = JSON.parse(data);
        this.orders = parsed.map((order: any) => ({ ...order, date: new Date(order.date) }));
    }

    private saveOrders(): void {
        this.ensureDataDirectoryExists();
        fs.writeFileSync(ORDERS_FILE, JSON.stringify(this.orders, null, 2));
    }

    getAll(): IOrder[] {
        return this.orders;
    }

    getById(id: number): IOrder | null {
        return this.orders.find(order => order.id === id) || null;
    }

    create(dto: CreateOrderDto): IOrder {
        const existing = this.orders.find(order =>
            order.userId === dto.userId &&
            order.type === dto.type &&
            order.total === dto.total &&
            order.status === dto.status &&
            JSON.stringify(order.items) === JSON.stringify(dto.items)
        );
        if (existing) {
            return existing;
        }
        const newId = this.orders.length > 0 ? Math.max(...this.orders.map(o => o.id)) + 1 : 1;
        const newOrder: IOrder = {
            id: newId,
            userId: dto.userId,
            type: dto.type,
            items: dto.items,
            total: dto.total,
            status: dto.status,
            date: new Date()
        };
        this.orders.push(newOrder);
        this.saveOrders();
        return newOrder;
    }

    update(dto: UpdateOrderDto): IOrder | null {
        const index = this.orders.findIndex(order => order.id === dto.id);
        if (index === -1) {
            return null;
        }
        const order = this.orders[index];
        if (dto.userId !== undefined) order.userId = dto.userId;
        if (dto.type !== undefined) order.type = dto.type;
        if (dto.items !== undefined) order.items = dto.items;
        if (dto.total !== undefined) order.total = dto.total;
        if (dto.status !== undefined) order.status = dto.status;
        this.saveOrders();
        return order;
    }

    delete(dto: DeleteOrderDto): boolean {
        const index = this.orders.findIndex(order => order.id === dto.id);
        if (index === -1) {
            return false;
        }
        this.orders.splice(index, 1);
        this.saveOrders();
        return true;
    }
}
