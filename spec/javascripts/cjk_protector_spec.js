(function() {
  describe('cjkProtector', function() {
    var sharedExamplesForCjkProtector;
    beforeEach(function() {
      loadFixtures('cjk_form.html');
      return this.$submitButton = $(':submit');
    });
    it('is available on the jQuery object', function() {
      return expect($.fn.cjkProtector).toBeDefined();
    });
    it('should overwrite the settings', function() {
      var errorMessage, plugin;
      errorMessage = 'new error message';
      plugin = new $.cjkProtector($('input'), {
        errorMessage: errorMessage
      });
      return expect(plugin.settings.errorMessage).toBe(errorMessage);
    });
    describe('callbacks', function() {
      var greeter;
      greeter = {
        sayHello: function() {
          return 'hi';
        },
        sayGoodbye: function() {
          return 'bye';
        }
      };
      it('calls onError when invalid characters', function() {
        var plugin;
        spyOn(greeter, 'sayHello').and.callThrough();
        plugin = new $.cjkProtector($('input'), {
          onError: function() {
            return greeter.sayHello();
          }
        });
        $('input').val('请告诉我们任何关于').trigger('change');
        return expect(greeter.sayHello).toHaveBeenCalled();
      });
      return it('calls onSuccess when valid characters', function() {
        var plugin;
        spyOn(greeter, 'sayGoodbye').and.callThrough();
        plugin = new $.cjkProtector($('input'), {
          onSuccess: function() {
            return greeter.sayGoodbye();
          }
        });
        $('input').val('latin characters').trigger('change');
        return expect(greeter.sayGoodbye).toHaveBeenCalled();
      });
    });
    sharedExamplesForCjkProtector = function(element) {
      it('adds the field_with_errors class when CJK characters found', function() {
        var $element, expectedErrorMessage;
        $element = $(element);
        $element.cjkProtector();
        $element.val('请告诉我们任何关于').trigger('change');
        expect($element.parent().hasClass('field_with_errors')).toBeTruthy();
        expectedErrorMessage = 'Please use latin characters';
        return expect($element.parent().find('span.error').text()).toBe(expectedErrorMessage);
      });
      return it('removes the field_with_errors class when no CJK characters found', function() {
        var $element;
        $element = $(element);
        $element.cjkProtector();
        $element.val('请告诉我们任何关于').trigger('change');
        $element.val('latin characters').trigger('change');
        expect($element.parent().hasClass('field_with_errors')).toBeFalsy();
        return expect($element.parent().find('span.error').length).toBe(0);
      });
    };
    describe('input', function() {
      return sharedExamplesForCjkProtector('input');
    });
    return describe('textarea', function() {
      return sharedExamplesForCjkProtector('textarea');
    });
  });

}).call(this);
