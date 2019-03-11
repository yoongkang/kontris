# Kontris

Here's Kontris: [https://kontris.yoongkang.com](https://kontris.yoongkang.com)

## What's this?

This is a Tetris clone built with [kontra.js](https://straker.github.io/kontra/).

## How to play?

Just use your arrow keys. You could also rotate left and right using the Q and W keys.

## Why did you make this?

I was talking to a friend attending a coding bootcamp, and I mentioned how I was a little tired of seeing Tic-Tac-Toe in portfolios of bootcamp graduates.

Don't get me wrong, I think making Tic-Tac-Toe is a great achievement. But it's a little overdone because literally everyone else also does it.

I suggested doing something along the lines of Tetris instead. A lot more impressive.

If you're a bootcamp student, please look at this code to see how you can use Kontra.js to create a similar game, not necessarily Tetris. You could also fork this and add some features, like:

* Scoring
* The concept of levels, currently we have one speed. Can you vary the speed based on how much you've scored?
* Show the next piece
* Design a better random generator for Tetrominoes -- currently it's using `Math.random()` but a much better way is to generate a sequence of 7 Tetrominoes ordered randomly. This prevents you from possibly going a long time without a stick piece, for example.
* High score -- can you integrate this with a Rails or Django backend to save the high score?
* Refactoring -- this code isn't perfect, and done over a course of two evenings where I wasn't completely sober.

If you've done some changes you're happy with, you are quite welcome to make a Pull Request and I'm happy to give you personalised feedback on your code (I'll be nice, don't worry).

You could also keep this in your own repo and highlight the changes you've done. Remember, in your career you're far more likely to work on an existing codebase than a one you started -- so if you're able to show that you can do this it would be very impressive.

## How do I build this?

You need a relatively recent version of Node.js and npm.

Then run these commands:

```
$ npm install
$ npm run start
```

You should then be able to view this on https://localhost:8080

To create a production build:

```
$ npm run build
```

Have fun!

## I have a question

Always happy to help you out. Please create an issue, or email me at yoongkang.lim@gmail.com

## License

MIT