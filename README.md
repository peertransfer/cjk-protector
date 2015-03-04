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
$(":input").cjkProtector()
```

## Options

### errorClass (string)

CSS class name added on input's wrapper `div` element when CJK characters are found.

*Default value is 'field\_with\_errors'*

```javascript
$(":input").cjkProtector({
  errorClass: "cjk_error"
});
```

### errorMessage (string)

Error message displayed when CJK characters are found.

*Default value is 'Please use latin characters'*

```javascript
$(":input").cjkProtector({
  errorMessage: "CJK characters found!"
});
```

### onError (function)

Called when CJK characters are found.

*Default value is empty*

```javascript
$(":input").cjkProtector({
  onError: function() {
  	console.log("CJK characters found!")
  }
});
```

### onSuccess (function)

Called when CJK characters disappear.

*Default value is empty*

```javascript
$(":input").cjkProtector({
  onSuccess: function() {
  	console.log("Valid characters!")
  }
});
```
