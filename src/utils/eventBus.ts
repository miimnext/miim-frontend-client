/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventType } from "@/enum/eventType";
type EventHandler = (...args: any[]) => void;

class EventBus {
  private events: Record<string, EventHandler[]> = {};
  on(event: EventType, handler: EventHandler) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(handler);
  }
  off(event: EventType, handler: EventHandler) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((h) => h !== handler);
    }
  }
  emit(event: EventType, ...args: any[]) {
    if (this.events[event]) {
      this.events[event].forEach((handler) => handler(...args));
    }
  }
}

const eventBus = new EventBus();
export default eventBus;
