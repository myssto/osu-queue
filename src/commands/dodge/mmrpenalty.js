// ADMIN
// Deduct MMR from players who dodge a match

// ARG
// (req) mmr: int (0 to disable)
// starts_at: int (min=1 How many dodges before incuring penalty)
// repeat_multiplier: int (0 to disable, (time = time + round(time * dodges * repeat_multiplier)))