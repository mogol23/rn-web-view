import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
  // console.log('--',navigationRef)
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}