describe 'cjkProtector', ->
  beforeEach ->
    loadFixtures 'cjk_form.html'
    @$submitButton = $ ':submit'

  it 'is available on the jQuery object', ->
    expect( $.fn.cjkProtector ).toBeDefined()

  it 'should overwrite the settings', ->
    errorMessage = 'new error message'
    plugin = new $.cjkProtector $('input'), { errorMessage: errorMessage }

    expect( plugin.settings.errorMessage ).toBe errorMessage

  describe 'callbacks', ->
    greeter =
      sayHello: -> 'hi'
      sayGoodbye: -> 'bye'

    it 'calls onError when invalid characters', ->
      spyOn(greeter, 'sayHello').and.callThrough()

      plugin = new $.cjkProtector $('input'), { onError: -> greeter.sayHello() }

      $('input').val('请告诉我们任何关于').trigger 'change'

      expect( greeter.sayHello ).toHaveBeenCalled()

    it 'calls onSuccess when valid characters', ->
      spyOn(greeter, 'sayGoodbye').and.callThrough()

      plugin = new $.cjkProtector $('input'), { onSuccess: -> greeter.sayGoodbye() }

      $('input').val('latin characters').trigger 'change'

      expect( greeter.sayGoodbye ).toHaveBeenCalled()

  sharedExamplesForCjkProtector = (element) ->
    it 'adds the field_with_errors class when CJK characters found', ->
      $element = $ element
      $element.cjkProtector()

      $element.val('请告诉我们任何关于').trigger 'change'

      expect( $element.parent().hasClass('field_with_errors') ).toBeTruthy()
      expectedErrorMessage = 'Please use latin characters'
      expect( $element.parent().find('span.error').text() ).toBe expectedErrorMessage

    it 'removes the field_with_errors class when no CJK characters found', ->
      $element = $ element
      $element.cjkProtector()

      $element.val('请告诉我们任何关于').trigger 'change'
      $element.val('latin characters').trigger 'change'

      expect( $element.parent().hasClass('field_with_errors') ).toBeFalsy()
      expect( $element.parent().find('span.error').length ).toBe(0)

  describe 'input', ->
    sharedExamplesForCjkProtector 'input'

  describe 'textarea', ->
    sharedExamplesForCjkProtector 'textarea'
