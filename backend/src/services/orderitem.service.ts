import { db } from '../database/database';
import { IOrderItem } from '../interfaces/order.interfaces';
import { CreateOrderItemDto, UpdateOrderItemDto, DeleteOrderItemDto } from '../dtos/orderitem.dto';

const getAllItemsStmt = db.prepare('SELECT id, productId, quantity, price FROM order_items');
const getItemByIdStmt = db.prepare('SELECT id, productId, quantity, price FROM order_items WHERE id = ?');
const getExistingItemStmt = db.prepare(
    'SELECT id, productId, quantity, price FROM order_items WHERE productId = ? AND quantity = ? AND price = ? AND orderId IS NULL'
);
const insertItemStmt = db.prepare('INSERT INTO order_items (productId, quantity, price) VALUES (?, ?, ?)');
const updateItemStmt = db.prepare('UPDATE order_items SET productId = ?, quantity = ?, price = ? WHERE id = ?');
const deleteItemStmt = db.prepare('DELETE FROM order_items WHERE id = ?');

export class OrderItemService {
    getAll(): IOrderItem[] {
        return getAllItemsStmt.all() as IOrderItem[];
    }

    getById(id: number): IOrderItem | null {
        return getItemByIdStmt.get(id) as IOrderItem | null;
    }

    create(dto: CreateOrderItemDto): IOrderItem {
        const existing = getExistingItemStmt.get(dto.productId, dto.quantity, dto.price) as IOrderItem | undefined;
        if (existing) {
            return existing;
        }
        const result = insertItemStmt.run(dto.productId, dto.quantity, dto.price);
        return {
            id: Number(result.lastInsertRowid),
            productId: dto.productId,
            quantity: dto.quantity,
            price: dto.price
        };
    }

    update(dto: UpdateOrderItemDto): IOrderItem | null {
        const existing = this.getById(dto.id);
        if (!existing) {
            return null;
        }
        const updatedItem = {
            id: dto.id,
            productId: dto.productId ?? existing.productId,
            quantity: dto.quantity ?? existing.quantity,
            price: dto.price ?? existing.price
        };
        updateItemStmt.run(updatedItem.productId, updatedItem.quantity, updatedItem.price, dto.id);
        return updatedItem;
    }

    delete(dto: DeleteOrderItemDto): boolean {
        const result = deleteItemStmt.run(dto.id);
        return result.changes > 0;
    }
}
