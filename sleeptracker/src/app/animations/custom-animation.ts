// src/app/animations/custom-animation.ts
import { Animation, AnimationController } from '@ionic/angular';

export const customTransition = (baseEl: HTMLElement, opts?: any): Animation => {
  const DURATION = 1000;
  const animationCtrl = new AnimationController();

  const rootAnimation = animationCtrl.create()
    .addElement(opts.enteringEl)
    .duration(DURATION)
    .easing('ease-in')
    .fill('both')
    .fromTo('transform', 'translateX(100%)', 'translateX(0)')
    .fromTo('opacity', 0.01, 1);

  const leavingAnimation = animationCtrl.create()
    .addElement(opts.leavingEl)
    .duration(DURATION)
    .fill('both')
    .fromTo('transform', 'translateX(0)', 'translateX(-100%)')
    .fromTo('opacity', 1, 0.01);

  // This will animate both the leaving and entering elements together
  return animationCtrl.create().addAnimation([rootAnimation, leavingAnimation]);
};
