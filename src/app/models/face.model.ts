interface FaceRecognitionResponse {
  faceId: string;
  faceRectangle: FaceRectangle;
  faceAttributes: FaceAttributes;
}

interface FaceAttributes {
  smile: number;
  headPose: HeadPose;
  gender: string;
  age: number;
  facialHair: FacialHair;
  glasses: string;
  emotion: Emotion;
  blur: Blur;
  exposure: Exposure;
  noise: Noise;
  makeup: Makeup;
  accessories: Accessory[];
  occlusion: Occlusion;
  hair: Hair;
}

interface Hair {
  bald: number;
  invisible: boolean;
  hairColor: HairColor[];
}

interface HairColor {
  color: string;
  confidence: number;
}

interface Occlusion {
  foreheadOccluded: boolean;
  eyeOccluded: boolean;
  mouthOccluded: boolean;
}

interface Accessory {
  type: string;
  confidence: number;
}

interface Makeup {
  eyeMakeup: boolean;
  lipMakeup: boolean;
}

interface Noise {
  noiseLevel: string;
  value: number;
}

interface Exposure {
  exposureLevel: string;
  value: number;
}

interface Blur {
  blurLevel: string;
  value: number;
}

interface Emotion {
  anger: number;
  contempt: number;
  disgust: number;
  fear: number;
  happiness: number;
  neutral: number;
  sadness: number;
  surprise: number;
}

interface FacialHair {
  moustache: number;
  beard: number;
  sideburns: number;
}

interface HeadPose {
  pitch: number;
  roll: number;
  yaw: number;
}

interface FaceRectangle {
  top: number;
  left: number;
  width: number;
  height: number;
}
