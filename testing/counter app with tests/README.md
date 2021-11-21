# Instructions
 This Counter app is being used for learning how to write tests for React application. 
 Please go over the files and the components and make sure you understand how the app works and what it does.

#Write Tests for:
## TO THE WHOLE APP:
-	Add testIds to the elements that you suspect you might need to grab to test.

## NAVBAR:
-	Renders without crashing
-	Test that it shows the right amount of elements.

## COUNTER:
-	Renders without crashing
-	Each button triggers a callback to the parent. Use jest.fn() to mock them up.
-	String Zero displayed on counter.value === 0.
-	Background style is yellow on conuter.value===0
-	Background style is blue on counter.value!==0
-	Displays the right number + The style of the background is blue
-	Displays the given number at counter.value

## COUNTERS:
-	Renders without crashing
-	Triggers onReset when refresh button is clicked. Use jest.fn()
-	Triggers onRestart when Restart button is clicked. Use jest.fn()
-	Renders The right amount of counters when counters.length is 3
-	Renders the right amount of counters when counters.length Is 0

## APP:
-   Renders without crashing
-	Renders 4 counters upon start
-	Adding 1 to a counter, adds 1
-	Decrement 1 to a counter, decrements 1
-	Deleting a counter
-	Cart Amount gets updated
-	Reset all Counters resets all the counters to zero
-	Refresh launches window.location.reload(). On beforeAll replace the original window.location.reload for a jest.fn(). Restore the original window.location.reload on afterAll(Cleanup).

## Additionally:
-   Make it cover 100% of your code.