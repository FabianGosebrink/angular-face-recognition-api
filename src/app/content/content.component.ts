import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FaceRecognitionService } from '../services/face-recognition.service';
import { FaceRecognitionResponse } from '../models/face.model';
import { DesktopCameraService } from '../services/desktop-camera.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent {
  imageString = '';
  faceApiResponse: Observable<FaceRecognitionResponse>;
  subscriptionKey: string;

  constructor(
    private faceRecognitionService: FaceRecognitionService,
    private cameraService: DesktopCameraService
  ) {}

  processImage() {
    if (!this.subscriptionKey) {
      return;
    }

    this.faceApiResponse = this.cameraService.getPhoto().pipe(
      switchMap((base64Image: string) => {
        this.imageString = base64Image;
        return this.faceRecognitionService.scanImage(
          this.subscriptionKey,
          base64Image
        );
      })
    );
  }
}
