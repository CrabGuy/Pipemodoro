export type TimerType = {
    id: number,
    created_at: string,
    ends_at: string,
    canceled: boolean,
    client_timer_id: string,
    label: string | null,
    fired: boolean,
    user_id: string,
    timer_type: string,
}

