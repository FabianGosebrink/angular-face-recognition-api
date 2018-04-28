import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { FaceRecognitionService } from '../services/face-recognition.service';
import { AbstractCameraService } from '../services/abstract-camera.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  imageString = '';
  faceApiResponse: Observable<FaceRecognitionResponse>;
  subscriptionKey: string;

  constructor(
    private faceRecognitionService: FaceRecognitionService,
    private cameraService: AbstractCameraService
  ) {}

  processImage() {
    if (!this.subscriptionKey) {
      return;
    }

    this.faceApiResponse = this.cameraService.getPhoto().pipe(
      switchMap(base64Image => {
        this.imageString = base64Image;
        return this.faceRecognitionService.scanImage(
          this.subscriptionKey,
          base64Image
        );
      })
    );
  }
}
