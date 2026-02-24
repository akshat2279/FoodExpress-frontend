/* eslint-disable @typescript-eslint/no-explicit-any */
import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from '../config/api';

class SocketService {
  private socket: Socket | null = null;

  connect(): void {
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {
        transports: ['websocket', 'polling'],
      });

      this.socket.on('connect', () => {
      });

      this.socket.on('disconnect', () => {
      });

      this.socket.on('error', () => {
      });
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinOrder(orderId: string): void {
    if (this.socket) {
      this.socket.emit('joinOrder', orderId);
    }
  }

  leaveOrder(orderId: string): void {
    if (this.socket) {
      this.socket.emit('leaveOrder', orderId);
    }
  }

  onOrderStatusUpdate(callback: (order: any) => void): void {
    if (this.socket) {
      this.socket.on('orderStatusUpdated', callback);
    }
  }

  offOrderStatusUpdate(): void {
    if (this.socket) {
      this.socket.off('orderStatusUpdated');
    }
  }
}

export const socketService = new SocketService();
