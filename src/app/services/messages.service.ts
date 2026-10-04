import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export interface ContactMessage {
  correo: string;
  mensaje: string;
}

@Injectable({ providedIn: 'root' })
export class MessagesService {
  private readonly storageKey = 'ultimoMensaje';

  async saveMessage(message: ContactMessage) {
    await Preferences.set({
      key: this.storageKey,
      value: JSON.stringify(message),
    });
  }

  async getLastMessage(): Promise<ContactMessage | null> {
    const { value } = await Preferences.get({ key: this.storageKey });

    return value ? JSON.parse(value) as ContactMessage : null;
  }
}
