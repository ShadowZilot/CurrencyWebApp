let currentAction

export default class MainButton {
    static setActionToMainButton(action) {
        if (currentAction != null) {
            Telegram.WebApp.offEvent("mainButtonClicked", currentAction)
        }
        currentAction = action
        Telegram.WebApp.onEvent("mainButtonClicked", currentAction)
    }
}