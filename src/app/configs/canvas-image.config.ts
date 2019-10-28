import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

const camera = new Camera();

export const canvasImageConfig: CameraOptions = {
  quality: 75,
  targetHeight: 1100,
  targetWidth: 1100,
  destinationType: camera.DestinationType.FILE_URI,
  encodingType: camera.EncodingType.JPEG,
  mediaType: camera.MediaType.PICTURE,
  correctOrientation: true,
};
