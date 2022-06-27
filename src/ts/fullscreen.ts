/**
 * --------------------------------------------
 * AdminLTE fullscreen.ts
 * License MIT
 * --------------------------------------------
 */

 import {
    domReady
} from './util/index'

/**
 * Constants
 * ====================================================
 */

const CLASS_NAME_FULLSCREEN = 'fullscreen'
const CLASS_NAME_FULLSCREEN_FALSE = 'fullscreen-false'
const CLASS_NAME_FULLSCREEN_TRUE = 'fullscreen-true'

/**
 * Class Definition
 * ====================================================
 */
class FullScreen {
    toggleFullScreen(): void {
        if (document.fullscreenEnabled) {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();

            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        }
    }
}

/**
 *
 * Data Api implementation
 * ====================================================
 */

domReady(() => {
    const button = document.getElementsByClassName(CLASS_NAME_FULLSCREEN)

    for (const btn of button) {
        btn.addEventListener('click', event => {
            event.preventDefault()
            const data = new FullScreen()
            data.toggleFullScreen()
        })
    }

    /**
    * If F12 DevTools are open and in the browser window then the 
    * height/width will be off and this does not work as expected
     */
    window.addEventListener('resize', () => {
        const windowWidth = window.innerWidth * window.devicePixelRatio;
        const windowHeight = window.innerHeight * window.devicePixelRatio;
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        if (((windowWidth / screenWidth) >= 0.95) && ((windowHeight / screenHeight) >= 0.95)) {
            const icon = document.getElementsByClassName(CLASS_NAME_FULLSCREEN_FALSE)
            for (const i of icon) {
                i.classList.replace(CLASS_NAME_FULLSCREEN_FALSE, CLASS_NAME_FULLSCREEN_TRUE);
            }
        } else {
            const icon = document.getElementsByClassName(CLASS_NAME_FULLSCREEN_TRUE)
            for (const i of icon) {
                i.classList.replace(CLASS_NAME_FULLSCREEN_TRUE, CLASS_NAME_FULLSCREEN_FALSE)
            }
        }
    });
})

export default FullScreen