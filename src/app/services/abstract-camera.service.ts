import { Observable } from 'rxjs/Observable';

import { DesktopCameraService } from './desktop-camera.service';
import { MobileCameraService } from './mobile-camera.service';
import { PlatformInformationProvider } from './platform-information.provider';

export function cameraFactory(
  platformInformationProvider: PlatformInformationProvider
): AbstractCameraService {
  if (platformInformationProvider.isMobileDevice) {
    return new MobileCameraService();
  }

  return new DesktopCameraService();
}

interface ICameraService {
  getPhoto(): Observable<string>;
}

export abstract class AbstractCameraService implements ICameraService {
  abstract getPhoto(): Observable<string>;
}
