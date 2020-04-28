import { Observable } from 'rxjs';

declare const window: any;

export class DesktopCameraService {
  private getMediaDevices(): any {
    const mediaDevices =
      (window.navigator.mozGetUserMedia || window.navigator.webkitGetUserMedia
        ? {
            getUserMedia: (options: any) => {
              return new Promise((resolve, reject) => {
                (
                  window.navigator.mozGetUserMedia ||
                  window.navigator.webkitGetUserMedia
                ).call(window.navigator, options, resolve, reject);
              });
            },
          }
        : null) || window.navigator.mediaDevices;

    return mediaDevices;
  }

  getPhoto(): Observable<string> {
    return new Observable((observer: any) => {
      this.getMediaDevices()
        .getUserMedia({ video: true, audio: false })
        .then(
          (stream: any) => {
            const doc = document;
            const videoElement = doc.createElement('video');
            videoElement.srcObject = stream;
            videoElement.play();

            const takePhotoInternal = () => {
              const canvasElement = doc.createElement('canvas');
              canvasElement.setAttribute(
                'width',
                videoElement.videoWidth.toString()
              );
              canvasElement.setAttribute(
                'height',
                videoElement.videoHeight.toString()
              );

              setTimeout(() => {
                const context = canvasElement.getContext('2d');
                context.drawImage(
                  videoElement,
                  0,
                  0,
                  videoElement.videoWidth,
                  videoElement.videoHeight
                );

                const url = canvasElement.toDataURL('image/png');

                videoElement.pause();

                if (stream.stop) {
                  stream.stop();
                }

                if (stream.getAudioTracks) {
                  stream.getAudioTracks().forEach((track: any) => {
                    track.stop();
                  });
                }

                if (stream.getVideoTracks) {
                  stream.getVideoTracks().forEach((track: any) => {
                    track.stop();
                  });
                }

                observer.next(url);
                observer.complete();
              }, 500);
            };

            if (videoElement.readyState >= videoElement.HAVE_FUTURE_DATA) {
              takePhotoInternal();
            } else {
              videoElement.addEventListener(
                'canplay',
                function () {
                  takePhotoInternal();
                },
                false
              );
            }
          },
          (error: any) => {
            console.log(error);
          }
        );
    });
  }
}
