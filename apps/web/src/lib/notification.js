export async function send_notification(title, options) {
    if (Notification.permission == "default") {
        await Notification.requestPermission()
        send_notification(title, options)
        return
    }

    if (Notification.permission == "denied") {
        return
    }

    new Notification(title, options)
}
