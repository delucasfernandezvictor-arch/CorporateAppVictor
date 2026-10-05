import { Component, OnInit, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
  imports: [
    DecimalPipe,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonText,
    IonTitle,
    IonToolbar,
  ],
})
export class NosotrosPage implements OnInit {
  private readonly geolocationService = inject(GeolocationService);
  private readonly oficinaLat = 40.4452;
  private readonly oficinaLon = -3.6115;

  distancia = signal<number | null>(null);
  error = signal('');

  async ngOnInit() {
    await this.obtenerDistancia();
  }

  async obtenerDistancia() {
    try {
      this.error.set('');
      const coords = await this.geolocationService.getCurrentPosition();
      const distancia = this.geolocationService.calcularDistancia(
        coords.latitude,
        coords.longitude,
        this.oficinaLat,
        this.oficinaLon,
      );

      this.distancia.set(distancia);
        } catch (e: any) {
      this.error.set(
        'No se pudo obtener la geolocalización: ' + (e?.message ?? e),
      );
    }
  }
}
