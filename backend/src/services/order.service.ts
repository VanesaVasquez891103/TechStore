import { db } from '../database/database';
import { IOrder, IOrderItem } from '../interfaces/order.interfaces';
import { CreateOrderDto, UpdateOrderDto, DeleteOrderDto } from '../dtos/order.dto';

const getOrderByIdStmt = db.prepare('SELECT id, userId, type, total, status, date, shippingAddress FROM orders WHERE id = ?');
const getAllOrdersStmt = db.prepare('SELECT id, userId, type, total, status, date, shippingAddress FROM orders');
const getOrdersByUserIdStmt = db.prepare('SELECT id, userId, type, total, status, date, shippingAddress FROM orders WHERE userId = ?');
const insertOrderStmt = db.prepare('INSERT INTO orders (userId, type, total, status, date, shippingAddress) VALUES (?, ?, ?, ?, ?, ?)');
const deleteOrderStmt = db.prepare('DELETE FROM orders WHERE id = ?');
const deleteOrderItemsByOrderStmt = db.prepare('DELETE FROM order_items WHERE orderId = ?');
const insertOrderItemStmt = db.prepare('INSERT INTO order_items (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)');

function mapOrder(order: any): IOrder {
    const items = db.prepare('SELECT id, productId, quantity, price FROM order_items WHERE orderId = ?').all(order.id) as IOrderItem[];
    return {
        id: order.id,
        userId: order.userId,
        type: order.type,
        items,
        total: order.total,
        status: order.status,
        date: new Date(order.date),
        shippingAddress: order.shippingAddress ?? undefined
    };
}

export class OrderService {
    getAll(userId?: number): IOrder[] {
        const rows = userId !== undefined ? getOrdersByUserIdStmt.all(userId) : getAllOrdersStmt.all();
        return rows.map(mapOrder);
    }

    getById(id: number): IOrder | null {
        const order = getOrderByIdStmt.get(id);
        return order ? mapOrder(order) : null;
    }

    create(dto: CreateOrderDto): IOrder {
        const insert = db.transaction(() => {
            const result = insertOrderStmt.run(
                dto.userId,
                dto.type,
                dto.total,
                dto.status,
                new Date().toISOString(),
                dto.shippingAddress ?? null
            );
            const orderId = Number(result.lastInsertRowid);
            for (const item of dto.items) {
                insertOrderItemStmt.run(orderId, item.productId, item.quantity, item.price);
            }
            return orderId;
        });
        const orderId = insert();
        const createdOrder = this.getById(orderId);
        if (!createdOrder) {
            throw new Error('No se pudo crear la orden');
        }
        return createdOrder;
    }

    update(dto: UpdateOrderDto): IOrder | null {
        const existing = this.getById(dto.id);
        if (!existing) {
            return null;
        }

        const updatedOrder = {
            id: dto.id,
            userId: dto.userId ?? existing.userId,
            type: dto.type ?? existing.type,
            total: dto.total ?? existing.total,
            status: dto.status ?? existing.status,
            date: existing.date,
            shippingAddress: dto.shippingAddress ?? existing.shippingAddress,
            items: dto.items ?? existing.items
        } as IOrder;

        const updates: string[] = [];
        const params: any[] = [];
        if (dto.userId !== undefined) {
            updates.push('userId = ?');
            params.push(dto.userId);
        }
        if (dto.type !== undefined) {
            updates.push('type = ?');
            params.push(dto.type);
        }
        if (dto.total !== undefined) {
            updates.push('total = ?');
            params.push(dto.total);
        }
        if (dto.status !== undefined) {
            updates.push('status = ?');
            params.push(dto.status);
        }
        if (dto.shippingAddress !== undefined) {
            updates.push('shippingAddress = ?');
            params.push(dto.shippingAddress);
        }
        if (updates.length > 0) {
            params.push(dto.id);
            db.prepare(`UPDATE orders SET ${updates.join(', ')} WHERE id = ?`).run(...params);
        }

        if (dto.items !== undefined) {
            const items = dto.items;
            const updateItems = db.transaction(() => {
                deleteOrderItemsByOrderStmt.run(dto.id);
                for (const item of items) {
                    insertOrderItemStmt.run(dto.id, item.productId, item.quantity, item.price);
                }
            });
            updateItems();
        }

        return this.getById(dto.id);
    }

    delete(dto: DeleteOrderDto): boolean {
        const result = deleteOrderStmt.run(dto.id);
        return result.changes > 0;
    }
}
