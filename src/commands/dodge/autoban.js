// ADMIN
// Auto ban players who cause a match to cancel by not joining the match channel

// ARG
// (req) time: int (In seconds, 0 to disable)
// starts_at: int (min=1 How many dodges before incuring penalty)
// repeat_multiplier: int (0 to disable, (time = time + round(time * dodges * repeat_multiplier)))
// repeat_capout: int (min=1 Ammount of dodges before perma-ban)