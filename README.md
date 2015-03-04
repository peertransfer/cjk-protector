# cjkProtector jQuery plugin

Protect your inputs/textareas from Chinese, Japanese and Korean (CJK) characters.

## Usage

```html
<form>
  <div>
    <input type="text">
  </div>
  <div>
    <textarea></textarea>
  </div>
  <input type="submit">
</form>
```

```javascript
$(":input").cjkProtector();
```

## Options

### errorMessage (string)

Error message displayed when CJK characters are found.

```javascript
$(":input").cjkProtector({
  errorMessage: "CJK characters found!"
});
```

### onError (function)

Called when CJK characters are found.

```javascript
$(":input").cjkProtector({
  onError: function() {
  	console.log("CJK characters found!")
  }
});
```

### onSuccess (function)

Called when CJK characters disappear.

```javascript
$(":input").cjkProtector({
  onSuccess: function() {
  	console.log("Valid characters!")
  }
});
```
