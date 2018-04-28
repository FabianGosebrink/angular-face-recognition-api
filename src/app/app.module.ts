import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormsModule } from '@angular/forms';
import { BoolToYesNoPipe } from './pipes/bool-to-yes-no/bool-to-yes-no.pipe';
import {
  AbstractCameraService,
  cameraFactory
} from './services/abstract-camera.service';
import { DesktopCameraService } from './services/desktop-camera.service';
import { FaceRecognitionService } from './services/face-recognition.service';
import { MobileCameraService } from './services/mobile-camera.service';
import { PlatformInformationProvider } from './services/platform-information.provider';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ContentComponent,
    BoolToYesNoPipe,
    TableComponent
  ],
  imports: [FormsModule, BrowserModule, HttpClientModule],
  providers: [
    DesktopCameraService,
    MobileCameraService,
    FaceRecognitionService,
    PlatformInformationProvider,
    {
      provide: AbstractCameraService,
      useFactory: cameraFactory,
      deps: [PlatformInformationProvider]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
