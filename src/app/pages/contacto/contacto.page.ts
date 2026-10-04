import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  imports: [
    FormsModule,
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonText,
    IonTextarea,
    IonTitle,
    IonToolbar,
  ],
})
export class ContactoPage implements OnInit {
  private readonly messagesService = inject(MessagesService);

  correo = '';
  mensaje = '';
  enviado = signal(false);
  error = signal('');

  async ngOnInit() {
    const lastMessage = await this.messagesService.getLastMessage();

    if (lastMessage) {
      this.correo = lastMessage.correo;
      this.mensaje = lastMessage.mensaje;
    }
  }

  async enviar() {
    if (!this.correo.trim() || !this.mensaje.trim()) {
      this.enviado.set(false);
      this.error.set('Completa el correo y el mensaje.');
      return;
    }

    await this.messagesService.saveMessage({
      correo: this.correo,
      mensaje: this.mensaje,
    });

    this.error.set('');
    this.enviado.set(true);
  }
}
