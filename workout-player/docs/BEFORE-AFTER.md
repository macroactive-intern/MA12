 FAIL  src/app/components/WorkoutPlayer.test.tsx > Last exercise boundary > completes workout without entering rest or looping
TestingLibraryElementError: Found multiple elements with the role "button" and name `/start/i`

Here are the matching elements:

Ignored nodes: comments, script, style
<button>
  Start
</button>

Ignored nodes: comments, script, style
<button>
  Start
</button>

Ignored nodes: comments, script, style
<button>
  Start
</button>

Ignored nodes: comments, script, style
<button>
  Start
</button>

Ignored nodes: comments, script, style
<button>
  Start
</button>

Ignored nodes: comments, script, style
<button>
  Start
</button>

Ignored nodes: comments, script, style
<button>
  Start
</button>

Ignored nodes: comments, script, style
<button>
  Start
</button>

(If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).

Ignored nodes: comments, script, style
<body>
  <div>
    <div>
      <p>
        Exercise 
        1
         of 
        2
      </p>
      <h2>
        Push-ups
      </h2>
      <p>
        Work
      </p>
      <div
        data-testid="countdown"
      >
        0
      </div>
      <button>
        Start
      </button>
    </div>
  </div>
  <div>
    <div>
      <p>
        Exercise 
        1
         of 
        2
      </p>
      <h2>
        Push-ups
      </h2>
      <p>
        Work
      </p>
      <div
        data-testid="countdown"
      >
        0
      </div>
      <button>
        Start
      </button>
    </div>
  </div>
  <div>
    <div>
      <p>
        Exercise 
        1
         of 
        2
      </p>
      <h2>
        Push-ups
      </h2>
      <p>
        Work
      </p>
      <div
        data-testid="countdown"
      >
        0
      </div>
      <button>
        Start
      </button>
    </div>
  </div>
  <div>
    <div>
      <p>
        Exercise 
        1
         of 
        2
      </p>
      <h2>
        Push-ups
      </h2>
      <p>
        Work
      </p>
      <div
        data-testid="countdown"
      >
        0
      </div>
      <button>
        Start
      </button>
    </div>
  </div>
  <div>
    <div>
      <p>
        Exercise 
        1
         of 
        2
      </p>
      <h2>
        Push-ups
      </h2>
      <p>
        Work
      </p>
      <div
        data-testid="countdown"
      >
        0
      </div>
      <button>
        Start
      </button>
    </div>
  </div>
  <div>
    <div>
      <p>
        Exercise 
        1
         of 
        2
      </p>
      <h2>
        Push-ups
      </h2>
      <p>
        Work
      </p>
      <div
        data-testid="countdown"
      >
        0
      </div>
      <button>
        Start
      </button>
    </div>
  </div>
  <div>
    <div>
      <p>
        Exercise 
        1
         of 
        2
      </p>
      <h2>
        Push-ups
      </h2>
      <p>
        Work
      </p>
      <div
        data-testid="countdown"
      >
        0
      </div>
      <button>
        Start
      </button>
    </div>
  </div>
  <div>
    <div>
      <p>
        Exercise 
        1
         of 
        1
      </p>
      <h2>
        Push-ups
      </h2>
      <p>
        Work
      </p>
      <div
        data-testid="countdown"
      >
        0
      </div>
      <button>
        Start
      </button>
    </div>
  </div>
</body>
 ❯ Object.getElementError node_modules/@testing-library/dom/dist/config.js:37:19
 ❯ getElementError node_modules/@testing-library/dom/dist/query-helpers.js:20:35
 ❯ getMultipleElementsFoundError node_modules/@testing-library/dom/dist/query-helpers.js:23:10
 ❯ node_modules/@testing-library/dom/dist/query-helpers.js:55:13
 ❯ node_modules/@testing-library/dom/dist/query-helpers.js:95:19
 ❯ src/app/components/WorkoutPlayer.test.tsx:119:28
    117|     render(<WorkoutPlayer exercises={singleExercise} />)
    118|
    119|     fireEvent.click(screen.getByRole('button', { name: /start/i }))
       |                            ^
    120|
    121|     // Advance past the work interval

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[6/8]⎯

 FAIL  src/app/components/WorkoutPlayer.test.tsx > Auto transition > transitions Work → Rest → Work for next exercise automatically
TestingLibraryElementError: Found multiple elements with the role "button" and name `/start/i`

Here are the matching elements:

Ignored nodes: comments, script, style
<button>
  Start
</button>

Ignored nodes: comments, script, style
<button>
  Start
</button>

Ignored nodes: comments, script, style
<button>
  Start
</button>

Ignored nodes: comments, script, style
<button>
  Start
</button>

Ignored nodes: comments, script, style
<button>
  Start
</button>

Ignored nodes: comments, script, style
<button>
  Start
</button>

Ignored nodes: comments, script, style
<button>
  Start
</button>

Ignored nodes: comments, script, style
<button>
  Start
</button>

Ignored nodes: comments, script, style
<button>
  Start
</button>

(If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).

Ignored nodes: comments, script, style
<body>
  <div>
    <div>
      <p>
        Exercise 
        1
         of 
        2
      </p>
      <h2>
        Push-ups
      </h2>
      <p>
        Work
      </p>
      <div
        data-testid="countdown"
      >
        0
      </div>
      <button>
        Start
      </button>
    </div>
  </div>
  <div>
    <div>
      <p>
        Exercise 
        1
         of 
        2
      </p>
      <h2>
        Push-ups
      </h2>
      <p>
        Work
      </p>
      <div
        data-testid="countdown"
      >
        0
      </div>
      <button>
        Start
      </button>
    </div>
  </div>
  <div>
    <div>
      <p>
        Exercise 
        1
         of 
        2
      </p>
      <h2>
        Push-ups
      </h2>
      <p>
        Work
      </p>
      <div
        data-testid="countdown"
      >
        0
      </div>
      <button>
        Start
      </button>
    </div>
  </div>
  <div>
    <div>
      <p>
        Exercise 
        1
         of 
        2
      </p>
      <h2>
        Push-ups
      </h2>
      <p>
        Work
      </p>
      <div
        data-testid="countdown"
      >
        0
      </div>
      <button>
        Start
      </button>
    </div>
  </div>
  <div>
    <div>
      <p>
        Exercise 
        1
         of 
        2
      </p>
      <h2>
        Push-ups
      </h2>
      <p>
        Work
      </p>
      <div
        data-testid="countdown"
      >
        0
      </div>
      <button>
        Start
      </button>
    </div>
  </div>
  <div>
    <div>
      <p>
        Exercise 
        1
         of 
        2
      </p>
      <h2>
        Push-ups
      </h2>
      <p>
        Work
      </p>
      <div
        data-testid="countdown"
      >
        0
      </div>
      <button>
        Start
      </button>
    </div>
  </div>
  <div>
    <div>
      <p>
        Exercise 
        1
         of 
        2
      </p>
      <h2>
        Push-ups
      </h2>
      <p>
        Work
      </p>
      <div
        data-testid="countdown"
      >
        0
      </div>
      <button>
        Start
      </button>
    </div>
  </div>
  <div>
    <div>
      <p>
        Exercise 
        1
         of 
        1
      </p>
      <h2>
        Push-ups
      </h2>
      <p>
        Work
      </p>
      <div
        data-testid="countdown"
      >
        0
      </div>
      <button>
        Start
      </button>
    </div>
  </div>
  <div>
    <div>
      <p>
        Exercise 
        1
         of 
        2
      </p>
      <h2>
        Push-ups
      </h2>
      <p>
        Work
      </p>
      <div
        data-testid="countdown"
      >
        0
      </div>
      <button>
        Start
      </button>
    </div>
  </div>
</body>
 ❯ Object.getElementError node_modules/@testing-library/dom/dist/config.js:37:19
 ❯ getElementError node_modules/@testing-library/dom/dist/query-helpers.js:20:35
 ❯ getMultipleElementsFoundError node_modules/@testing-library/dom/dist/query-helpers.js:23:10
 ❯ node_modules/@testing-library/dom/dist/query-helpers.js:55:13
 ❯ node_modules/@testing-library/dom/dist/query-helpers.js:95:19
 ❯ src/app/components/WorkoutPlayer.test.tsx:142:28
    140|     render(<WorkoutPlayer exercises={twoExercises} />)
    141|
    142|     fireEvent.click(screen.getByRole('button', { name: /start/i }))
       |                            ^
    143|
    144|     // End of first work phase → rest starts

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[7/8]⎯

 FAIL  src/app/components/WorkoutPlayer.test.tsx > Unmount cleanup > clears the timer on unmount without errors
TestingLibraryElementError: Found multiple elements with the role "button" and name `/start/i`

Here are the matching elements:

Ignored nodes: comments, script, style
<button>
  Start
</button>

Ignored nodes: comments, script, style
<button>
  Start
</button>

Ignored nodes: comments, script, style
<button>
  Start
</button>

Ignored nodes: comments, script, style
<button>
  Start
</button>

Ignored nodes: comments, script, style
<button>
  Start
</button>

Ignored nodes: comments, script, style
<button>
  Start
</button>

Ignored nodes: comments, script, style
<button>
  Start
</button>

Ignored nodes: comments, script, style
<button>
  Start
</button>

Ignored nodes: comments, script, style
<button>
  Start
</button>

Ignored nodes: comments, script, style
<button>
  Start
</button>

(If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).

Ignored nodes: comments, script, style
<body>
  <div>
    <div>
      <p>
        Exercise 
        1
         of 
        2
      </p>
      <h2>
        Push-ups
      </h2>
      <p>
        Work
      </p>
      <div
        data-testid="countdown"
      >
        0
      </div>
      <button>
        Start
      </button>
    </div>
  </div>
  <div>
    <div>
      <p>
        Exercise 
        1
         of 
        2
      </p>
      <h2>
        Push-ups
      </h2>
      <p>
        Work
      </p>
      <div
        data-testid="countdown"
      >
        0
      </div>
      <button>
        Start
      </button>
    </div>
  </div>
  <div>
    <div>
      <p>
        Exercise 
        1
         of 
        2
      </p>
      <h2>
        Push-ups
      </h2>
      <p>
        Work
      </p>
      <div
        data-testid="countdown"
      >
        0
      </div>
      <button>
        Start
      </button>
    </div>
  </div>
  <div>
    <div>
      <p>
        Exercise 
        1
         of 
        2
      </p>
      <h2>
        Push-ups
      </h2>
      <p>
        Work
      </p>
      <div
        data-testid="countdown"
      >
        0
      </div>
      <button>
        Start
      </button>
    </div>
  </div>
  <div>
    <div>
      <p>
        Exercise 
        1
         of 
        2
      </p>
      <h2>
        Push-ups
      </h2>
      <p>
        Work
      </p>
      <div
        data-testid="countdown"
      >
        0
      </div>
      <button>
        Start
      </button>
    </div>
  </div>
  <div>
    <div>
      <p>
        Exercise 
        1
         of 
        2
      </p>
      <h2>
        Push-ups
      </h2>
      <p>
        Work
      </p>
      <div
        data-testid="countdown"
      >
        0
      </div>
      <button>
        Start
      </button>
    </div>
  </div>
  <div>
    <div>
      <p>
        Exercise 
        1
         of 
        2
      </p>
      <h2>
        Push-ups
      </h2>
      <p>
        Work
      </p>
      <div
        data-testid="countdown"
      >
        0
      </div>
      <button>
        Start
      </button>
    </div>
  </div>
  <div>
    <div>
      <p>
        Exercise 
        1
         of 
        1
      </p>
      <h2>
        Push-ups
      </h2>
      <p>
        Work
      </p>
      <div
        data-testid="countdown"
      >
        0
      </div>
      <button>
        Start
      </button>
    </div>
  </div>
  <div>
    <div>
      <p>
        Exercise 
        1
         of 
        2
      </p>
      <h2>
        Push-ups
      </h2>
      <p>
        Work
      </p>
      <div
        data-testid="countdown"
      >
        0
      </div>
      <button>
        Start
      </button>
    </div>
  </div>
  <div>
    <div>
      No exercises available
    </div>
  </div>
  <div>
    <div>
      <p>
        Exercise 
        1
         of 
        2
      </p>
      <h2>
        Push-ups
      </h2>
      <p>
        Work
      </p>
      <div
        data-testid="countdown"
      >
        0
      </div>
      <button>
        Start
      </button>
    </div>
  </div>
</body>
 ❯ Object.getElementError node_modules/@testing-library/dom/dist/config.js:37:19
 ❯ getElementError node_modules/@testing-library/dom/dist/query-helpers.js:20:35
 ❯ getMultipleElementsFoundError node_modules/@testing-library/dom/dist/query-helpers.js:23:10
 ❯ node_modules/@testing-library/dom/dist/query-helpers.js:55:13
 ❯ node_modules/@testing-library/dom/dist/query-helpers.js:95:19
 ❯ src/app/components/WorkoutPlayer.test.tsx:173:28
    171|
    172|     const { unmount } = render(<WorkoutPlayer exercises={twoExercises} />)
    173|     fireEvent.click(screen.getByRole('button', { name: /start/i }))
       |                            ^
    174|
    175|     unmount()

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[8/8]⎯


 Test Files  1 failed (1)
      Tests  8 failed | 3 passed (11)
   Start at  14:59:26
   Duration  1.15s (transform 45ms, setup 0ms, import 176ms, tests 166ms, environment 671ms)

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

After

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 RUN  v4.1.9 C:/Users/mccor/Desktop/Projects/MacroActive/MA12/workout-player

stderr | src/app/components/WorkoutPlayer.test.tsx > Pause / Resume > pauses the countdown and resumes from the same value
An update to WorkoutPlayer inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act

stderr | src/app/components/WorkoutPlayer.test.tsx > Skip Rest > shows Skip Rest button during rest phase and skips to next work phase
An update to WorkoutPlayer inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act

stderr | src/app/components/WorkoutPlayer.test.tsx > Auto transition > transitions Work → Rest → Work for next exercise automatically
An update to WorkoutPlayer inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act

 ✓ src/app/components/WorkoutPlayer.test.tsx (11 tests) 149ms
   ✓ Initial state (5)
     ✓ shows the first exercise name 24ms
     ✓ shows Exercise 1 of X 3ms
     ✓ shows Work phase ready 2ms
     ✓ shows Start button 65ms
     ✓ does not show Skip Rest button 6ms
   ✓ Pause / Resume (1)
     ✓ pauses the countdown and resumes from the same value 16ms
   ✓ Skip Rest (1)
     ✓ shows Skip Rest button during rest phase and skips to next work phase 13ms
   ✓ Last exercise boundary (1)
     ✓ completes workout without entering rest or looping 6ms
   ✓ Auto transition (1)
     ✓ transitions Work → Rest → Work for next exercise automatically 6ms
   ✓ Empty exercises (1)
     ✓ does not crash and shows no exercises available message 1ms
   ✓ Unmount cleanup (1)
     ✓ clears the timer on unmount without errors 4ms

 Test Files  1 passed (1)
      Tests  11 passed (11)
   Start at  15:01:39
   Duration  1.15s (transform 41ms, setup 0ms, import 176ms, tests 149ms, environment 678ms)