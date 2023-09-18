# Pomodoro Timer

The main component of this application is the `setInterval()` method, which executes a code snipet repeatedlly with a fixed time delay between calls:
```javascript
setInterval(function, delay);
```

The time delay is in milliseconds. Additionally, `setInterval()` returns a numeric id that identifies the timer created:

```javascript
const timerId = setInterval(function, 3000);
```

The snipet above calls the setInterval method and stores the interval id in `timerId` which can then be used later if you wish to stop the method from being called, using `clearInterval()` and passing the id as the argument:

```javascript
clearInterval(timerId)
```

