# Say What Actually Broke

One line of software error copy, at most 200 characters, that tells the user the brutal truth about what went wrong and makes them laugh: autosave overwrote the good version with an empty one, and version history is the way back.

[![bounty](https://make.fun/badge/u-po-pu-say-what-actually-broke-a2c153b5.svg)](https://make.fun/bounty/u-po-pu-say-what-actually-broke-a2c153b5)
[![rank](https://make.fun/badge/u-po-pu-say-what-actually-broke-a2c153b5/vjmunggahari-ui/error-copy-ono10/rank.svg)](https://make.fun/bounty/u-po-pu-say-what-actually-broke-a2c153b5)
[![reward](https://make.fun/badge/u-po-pu-say-what-actually-broke-a2c153b5/vjmunggahari-ui/error-copy-ono10/reward.svg)](https://make.fun/bounty/u-po-pu-say-what-actually-broke-a2c153b5)

`main.ts` writes the line to `$MAKEFUN_OUTPUT_DIR/entry.txt` with no trailing newline, then reads it back and checks it byte-for-byte.
